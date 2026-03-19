(() => {
  const SVG_NS = "http://www.w3.org/2000/svg";

  function createNode(tag, attrs = {}) {
    const node = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        node.setAttribute(key, String(value));
      }
    });
    return node;
  }

  function nearlyEqual(a, b, eps = 1e-9) {
    return Math.abs(a - b) <= eps;
  }

  function rewriteUnaryMinusExponent(expression) {
    return expression.replace(
      /(^|[+\-*/,(])-((?:\([^()]+\)|[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?))\*\*((?:\([^()]+\)|[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?))/g,
      "$1-(($2)**$3)"
    );
  }

  function compileExpression(expression) {
    if (typeof expression === "function") {
      return expression;
    }
    if (typeof expression !== "string") {
      throw new Error("Expression must be a string or function.");
    }
    const normalized = rewriteUnaryMinusExponent(expression
      .replace(/\u2212/g, "-")
      .replace(/\s+/g, "")
      .replace(/(\d)([xy(])/g, "$1*$2")
      .replace(/([xy\)])(\d)/g, "$1*$2")
      .replace(/([xy\)])([xy(])/g, "$1*$2")
      .replace(/\^/g, "**"));
    return new Function("x", "y", "params", `with (Math) { with (params || {}) { return ${normalized}; } }`);
  }

  function dedupePoints(points, tolerance) {
    const result = [];
    points.forEach((point) => {
      const exists = result.some((saved) => Math.hypot(saved.x - point.x, saved.y - point.y) <= tolerance);
      if (!exists) {
        result.push(point);
      }
    });
    return result;
  }

  class PhaseDiagramRenderer {
    constructor(options) {
      this.options = this.normalizeOptions(options);
      this.is1D = !String(this.options.system.dy || "").trim();
      this.dx = compileExpression(this.options.system.dx);
      this.dy = this.is1D ? (() => 0) : compileExpression(this.options.system.dy);
      if (this.is1D) {
        this.options.yRange = this.compute1DRange();
      }
    }

    normalizeOptions(options) {
      if (!options || !options.target) {
        throw new Error("target is required.");
      }
      const target = typeof options.target === "string" ? document.querySelector(options.target) : options.target;
      if (!target) {
        throw new Error("target element was not found.");
      }
      const width = options.width || 760;
      const height = options.height || 470;
      const margin = { top: 34, right: 48, bottom: 48, left: 48, ...(options.margin || {}) };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      const plotSize = Math.max(40, Math.min(innerWidth, innerHeight));
      const plotLeft = margin.left + (innerWidth - plotSize) / 2;
      const plotTop = margin.top + (innerHeight - plotSize) / 2;

      return {
        target,
        width,
        height,
        margin,
        plotBox: {
          left: plotLeft,
          top: plotTop,
          right: plotLeft + plotSize,
          bottom: plotTop + plotSize,
          size: plotSize
        },
        xRange: options.xRange || [-28, 28],
        yRange: options.yRange || [-12, 24],
        params: options.params || {},
        system: options.system,
        style: {
          axisColor: "#b8c0cc",
          dxNullclineColor: "#4b5cff",
          dyNullclineColor: "#d64545",
          gridColor: "#d7dee8",
          frameColor: "#7c8aa0",
          componentColor: "#ff3131",
          resultantColor: "#31c84e",
          labelColor: "#111111",
          background: "#ffffff",
          ...(options.style || {})
        },
        vectorField: {
          enabled: false,
          xCount: 18,
          yCount: 12,
          color: "#64748b",
          opacity: 0.3,
          strokeWidth: 1,
          arrowSize: 4,
          scale: 16,
          minLength: 7,
          maxLength: 13,
          ...(options.vectorField || {})
        },
        trajectories: {
          enabled: false,
          color: "#d8a11d",
          opacity: 0.8,
          strokeWidth: 1.1,
          dt: 0.035,
          steps: 900,
          arrows: true,
          arrowSize: 5,
          arrowSpacing: 90,
          perRegion: 3,
          seeds: [],
          ...(options.trajectories || {})
        }
      };
    }

    evaluate(x, y) {
      return {
        dx: Number(this.dx(x, y, this.options.params)),
        dy: Number(this.dy(x, y, this.options.params))
      };
    }

    evaluate1D(x) {
      return Number(this.dx(x, 0, this.options.params));
    }

    compute1DRange(samples = 480) {
      const { xRange } = this.options;
      const span = xRange[1] - xRange[0];
      if (!Number.isFinite(span) || Math.abs(span) < 1e-9) {
        return [-1, 1];
      }
      const halfRange = Math.abs(span) / 2;
      return [-halfRange, halfRange];
    }

    toScreenX(x) {
      const { xRange, plotBox } = this.options;
      return plotBox.left + ((x - xRange[0]) / (xRange[1] - xRange[0])) * plotBox.size;
    }

    toScreenY(y) {
      const { yRange, plotBox } = this.options;
      return plotBox.bottom - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plotBox.size;
    }

    inBounds(x, y) {
      const { xRange, yRange } = this.options;
      return x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y <= yRange[1];
    }

    numericalJacobian(x, y) {
      const h = 1e-5;
      const fx1 = this.evaluate(x + h, y);
      const fx0 = this.evaluate(x - h, y);
      const fy1 = this.evaluate(x, y + h);
      const fy0 = this.evaluate(x, y - h);
      return {
        a: (fx1.dx - fx0.dx) / (2 * h),
        b: (fy1.dx - fy0.dx) / (2 * h),
        c: (fx1.dy - fx0.dy) / (2 * h),
        d: (fy1.dy - fy0.dy) / (2 * h)
      };
    }

    newtonRefine(startX, startY, maxIter = 40) {
      let x = startX;
      let y = startY;
      for (let iter = 0; iter < maxIter; iter += 1) {
        const value = this.evaluate(x, y);
        const jac = this.numericalJacobian(x, y);
        const det = jac.a * jac.d - jac.b * jac.c;
        if (!Number.isFinite(det) || Math.abs(det) < 1e-12) {
          return null;
        }
        const deltaX = (jac.d * value.dx - jac.b * value.dy) / det;
        const deltaY = (-jac.c * value.dx + jac.a * value.dy) / det;
        x -= deltaX;
        y -= deltaY;
        if (!Number.isFinite(x) || !Number.isFinite(y)) {
          return null;
        }
        if (Math.hypot(deltaX, deltaY) < 1e-10) {
          break;
        }
      }
      const residual = this.evaluate(x, y);
      if (!this.inBounds(x, y) || Math.hypot(residual.dx, residual.dy) > 1e-8) {
        return null;
      }
      return { x, y };
    }

    findEquilibria() {
      const starts = [];
      const { xRange, yRange } = this.options;
      for (let i = 0; i <= 4; i += 1) {
        for (let j = 0; j <= 4; j += 1) {
          starts.push({
            x: xRange[0] + ((xRange[1] - xRange[0]) * i) / 4,
            y: yRange[0] + ((yRange[1] - yRange[0]) * j) / 4
          });
        }
      }

      const roots = [];
      starts.forEach((start) => {
        const refined = this.newtonRefine(start.x, start.y, 40);
        if (refined) {
          roots.push(refined);
        }
      });
      return dedupePoints(roots, 1e-2);
    }

    contourSegments(valueAt, nx = 160, ny = 160) {
      const { xRange, yRange } = this.options;
      const segments = [];
      const dx = (xRange[1] - xRange[0]) / nx;
      const dy = (yRange[1] - yRange[0]) / ny;
      for (let i = 0; i < nx; i += 1) {
        for (let j = 0; j < ny; j += 1) {
          const x0 = xRange[0] + i * dx;
          const x1 = x0 + dx;
          const y0 = yRange[0] + j * dy;
          const y1 = y0 + dy;
          const corners = [
            { x: x0, y: y0, v: valueAt(x0, y0) },
            { x: x1, y: y0, v: valueAt(x1, y0) },
            { x: x1, y: y1, v: valueAt(x1, y1) },
            { x: x0, y: y1, v: valueAt(x0, y1) }
          ];
          const hits = [];
          for (let e = 0; e < 4; e += 1) {
            const a = corners[e];
            const b = corners[(e + 1) % 4];
            if ((a.v <= 0 && b.v >= 0) || (a.v >= 0 && b.v <= 0)) {
              const denom = b.v - a.v;
              const t = Math.abs(denom) < 1e-12 ? 0.5 : -a.v / denom;
              if (t >= 0 && t <= 1) {
                hits.push({
                  x: a.x + (b.x - a.x) * t,
                  y: a.y + (b.y - a.y) * t
                });
              }
            }
          }
          if (hits.length >= 2) {
            segments.push([hits[0], hits[1]]);
          }
        }
      }
      return segments;
    }

    rk4(x, y, dt) {
      const k1 = this.evaluate(x, y);
      const k2 = this.evaluate(x + 0.5 * dt * k1.dx, y + 0.5 * dt * k1.dy);
      const k3 = this.evaluate(x + 0.5 * dt * k2.dx, y + 0.5 * dt * k2.dy);
      const k4 = this.evaluate(x + dt * k3.dx, y + dt * k3.dy);
      return {
        x: x + (dt / 6) * (k1.dx + 2 * k2.dx + 2 * k3.dx + k4.dx),
        y: y + (dt / 6) * (k1.dy + 2 * k2.dy + 2 * k3.dy + k4.dy)
      };
    }

    integrate(seed, dt, steps) {
      const points = [{ x: seed.x, y: seed.y }];
      let x = seed.x;
      let y = seed.y;
      for (let i = 0; i < steps; i += 1) {
        const next = this.rk4(x, y, dt);
        if (!Number.isFinite(next.x) || !Number.isFinite(next.y) || !this.inBounds(next.x, next.y)) {
          break;
        }
        points.push(next);
        x = next.x;
        y = next.y;
        if (this.equilibrium && Math.hypot(x - this.equilibrium.x, y - this.equilibrium.y) < 0.08) {
          break;
        }
      }
      return points;
    }

    interceptOnXAxis(valueAt) {
      const { xRange } = this.options;
      const y = 0;
      let prevX = xRange[0];
      let prevV = valueAt(prevX, y);
      for (let i = 1; i <= 400; i += 1) {
        const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / 400;
        const v = valueAt(x, y);
        if ((prevV <= 0 && v >= 0) || (prevV >= 0 && v <= 0)) {
          const t = Math.abs(v - prevV) < 1e-12 ? 0.5 : -prevV / (v - prevV);
          return prevX + (x - prevX) * t;
        }
        prevX = x;
        prevV = v;
      }
      return null;
    }

    interceptOnYAxis(valueAt) {
      const { yRange } = this.options;
      const x = 0;
      let prevY = yRange[0];
      let prevV = valueAt(x, prevY);
      for (let i = 1; i <= 400; i += 1) {
        const y = yRange[0] + ((yRange[1] - yRange[0]) * i) / 400;
        const v = valueAt(x, y);
        if ((prevV <= 0 && v >= 0) || (prevV >= 0 && v <= 0)) {
          const t = Math.abs(v - prevV) < 1e-12 ? 0.5 : -prevV / (v - prevV);
          return prevY + (y - prevY) * t;
        }
        prevY = y;
        prevV = v;
      }
      return null;
    }

    findRootsAlongX(y, valueAt, steps = 500, maxIter = 60) {
      const { xRange } = this.options;
      const roots = [];
      let prevX = xRange[0];
      let prevV = valueAt(prevX, y);
      for (let i = 1; i <= steps; i += 1) {
        const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / steps;
        const v = valueAt(x, y);
        if ((prevV <= 0 && v >= 0) || (prevV >= 0 && v <= 0)) {
          let loX = prevX;
          let hiX = x;
          let loV = prevV;
          let hiV = v;
          for (let iter = 0; iter < maxIter; iter += 1) {
            const midX = 0.5 * (loX + hiX);
            const midV = valueAt(midX, y);
            if (Math.abs(midV) < 1e-9) {
              loX = midX;
              hiX = midX;
              break;
            }
            if ((loV <= 0 && midV >= 0) || (loV >= 0 && midV <= 0)) {
              hiX = midX;
              hiV = midV;
            } else {
              loX = midX;
              loV = midV;
            }
          }
          roots.push(0.5 * (loX + hiX));
        }
        prevX = x;
        prevV = v;
      }
      return dedupePoints(roots.map((x) => ({ x, y })), 1e-6).map((point) => point.x);
    }

    findRootsAlongY(x, valueAt, steps = 500, maxIter = 60) {
      const { yRange } = this.options;
      const roots = [];
      let prevY = yRange[0];
      let prevV = valueAt(x, prevY);
      for (let i = 1; i <= steps; i += 1) {
        const y = yRange[0] + ((yRange[1] - yRange[0]) * i) / steps;
        const v = valueAt(x, y);
        if ((prevV <= 0 && v >= 0) || (prevV >= 0 && v <= 0)) {
          let loY = prevY;
          let hiY = y;
          let loV = prevV;
          let hiV = v;
          for (let iter = 0; iter < maxIter; iter += 1) {
            const midY = 0.5 * (loY + hiY);
            const midV = valueAt(x, midY);
            if (Math.abs(midV) < 1e-9) {
              loY = midY;
              hiY = midY;
              break;
            }
            if ((loV <= 0 && midV >= 0) || (loV >= 0 && midV <= 0)) {
              hiY = midY;
              hiV = midV;
            } else {
              loY = midY;
              loV = midV;
            }
          }
          roots.push(0.5 * (loY + hiY));
        }
        prevY = y;
        prevV = v;
      }
      return dedupePoints(roots.map((yy) => ({ x, y: yy })), 1e-6).map((point) => point.y);
    }

    findRootAlongY(x, valueAt, maxIter = 60) {
      const { yRange } = this.options;
      let prevY = yRange[0];
      let prevV = valueAt(x, prevY);
      for (let i = 1; i <= 500; i += 1) {
        const y = yRange[0] + ((yRange[1] - yRange[0]) * i) / 500;
        const v = valueAt(x, y);
        if ((prevV <= 0 && v >= 0) || (prevV >= 0 && v <= 0)) {
          let loY = prevY;
          let hiY = y;
          let loV = prevV;
          let hiV = v;
          for (let iter = 0; iter < maxIter; iter += 1) {
            const midY = 0.5 * (loY + hiY);
            const midV = valueAt(x, midY);
            if (Math.abs(midV) < 1e-8) {
              return midY;
            }
            if ((loV <= 0 && midV >= 0) || (loV >= 0 && midV <= 0)) {
              hiY = midY;
              hiV = midV;
            } else {
              loY = midY;
              loV = midV;
            }
          }
          return 0.5 * (loY + hiY);
        }
        prevY = y;
        prevV = v;
      }
      return null;
    }

    findRootAlongX(y, valueAt, maxIter = 60) {
      const { xRange } = this.options;
      let prevX = xRange[0];
      let prevV = valueAt(prevX, y);
      for (let i = 1; i <= 500; i += 1) {
        const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / 500;
        const v = valueAt(x, y);
        if ((prevV <= 0 && v >= 0) || (prevV >= 0 && v <= 0)) {
          let loX = prevX;
          let hiX = x;
          let loV = prevV;
          let hiV = v;
          for (let iter = 0; iter < maxIter; iter += 1) {
            const midX = 0.5 * (loX + hiX);
            const midV = valueAt(midX, y);
            if (Math.abs(midV) < 1e-8) {
              return midX;
            }
            if ((loV <= 0 && midV >= 0) || (loV >= 0 && midV <= 0)) {
              hiX = midX;
              hiV = midV;
            } else {
              loX = midX;
              loV = midV;
            }
          }
          return 0.5 * (loX + hiX);
        }
        prevX = x;
        prevV = v;
      }
      return null;
    }

    representativeAnchors() {
      const { xRange, yRange } = this.options;
      const buckets = new Map([
        ['++', []],
        ['+-', []],
        ['-+', []],
        ['--', []]
      ]);
      const nx = 64;
      const ny = 44;
      const padX = 0.08 * (xRange[1] - xRange[0]);
      const padY = 0.08 * (yRange[1] - yRange[0]);

      for (let ix = 0; ix < nx; ix += 1) {
        for (let iy = 0; iy < ny; iy += 1) {
          const x = xRange[0] + padX + ((ix + 0.5) / nx) * (xRange[1] - xRange[0] - 2 * padX);
          const y = yRange[0] + padY + ((iy + 0.5) / ny) * (yRange[1] - yRange[0] - 2 * padY);
          const value = this.evaluate(x, y);
          if (!Number.isFinite(value.dx) || !Number.isFinite(value.dy)) {
            continue;
          }
          const key = `${value.dx >= 0 ? '+' : '-'}${value.dy >= 0 ? '+' : '-'}`;
          buckets.get(key).push({ x, y });
        }
      }

      const anchors = [];
      buckets.forEach((points) => {
        if (!points.length) {
          return;
        }
        const mean = points.reduce((acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }), { x: 0, y: 0 });
        mean.x /= points.length;
        mean.y /= points.length;
        let best = points[0];
        let bestDist = Infinity;
        for (const point of points) {
          const dist = Math.hypot(point.x - mean.x, point.y - mean.y);
          if (dist < bestDist) {
            bestDist = dist;
            best = point;
          }
        }
        anchors.push(best);
      });

      return anchors;
    }

    clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    traceNullclineByX(valueAt, samples = 320) {
      const { xRange } = this.options;
      const parts = [];
      let current = [];
      let pending = [];
      for (let i = 0; i <= samples; i += 1) {
        const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / samples;
        const y = this.findRootAlongY(x, valueAt, 50);
        if (y === null || !Number.isFinite(y)) {
          if (current.length) {
            pending.push({ x, y: null });
            if (pending.length > 2) {
              if (current.length > 1) {
                parts.push(current);
              }
              current = [];
              pending = [];
            }
          }
        } else {
          if (pending.length) {
            pending.forEach((miss, index) => {
              const t = (index + 1) / (pending.length + 1);
              const prev = current[current.length - 1];
              current.push({
                x: miss.x,
                y: prev.y + (y - prev.y) * t
              });
            });
            pending = [];
          }
          current.push({ x, y });
        }
      }
      if (current.length > 1) {
        parts.push(current);
      }
      return parts;
    }

    traceNullclineByY(valueAt, samples = 320) {
      const { yRange } = this.options;
      const parts = [];
      let current = [];
      let pending = [];
      for (let i = 0; i <= samples; i += 1) {
        const y = yRange[0] + ((yRange[1] - yRange[0]) * i) / samples;
        const x = this.findRootAlongX(y, valueAt, 50);
        if (x === null || !Number.isFinite(x)) {
          if (current.length) {
            pending.push({ x: null, y });
            if (pending.length > 2) {
              if (current.length > 1) {
                parts.push(current);
              }
              current = [];
              pending = [];
            }
          }
        } else {
          if (pending.length) {
            pending.forEach((miss, index) => {
              const t = (index + 1) / (pending.length + 1);
              const prev = current[current.length - 1];
              current.push({
                x: prev.x + (x - prev.x) * t,
                y: miss.y
              });
            });
            pending = [];
          }
          current.push({ x, y });
        }
      }
      if (current.length > 1) {
        parts.push(current);
      }
      return parts;
    }

    pathFromPoints(points, color, width) {
      const d = points.map((point, index) => {
        const sx = this.toScreenX(point.x);
        const sy = this.toScreenY(point.y);
        return `${index === 0 ? "M" : "L"} ${sx} ${sy}`;
      }).join(" ");
      return createNode("path", {
        d,
        fill: "none",
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      });
    }

    flattenGeometry(geometry) {
      if (!geometry) {
        return [];
      }
      if (Array.isArray(geometry) && geometry.length === 2 && geometry[0] && "x" in geometry[0]) {
        return geometry;
      }
      if (Array.isArray(geometry)) {
        return geometry.flatMap((part) => this.flattenGeometry(part));
      }
      return [];
    }

    nullclineLabelText(expression) {
      return `${String(expression || "").trim()} = 0`;
    }

    addPointAnnotation(svg, point, text, color, dx = 10, dy = -10, anchor = "start", radius = 3.2) {
      const sx = this.toScreenX(point.x);
      const sy = this.toScreenY(point.y);
      svg.appendChild(createNode("circle", {
        cx: sx,
        cy: sy,
        r: radius,
        fill: color
      }));
      svg.appendChild(this.label(sx + dx, sy + dy, text, 17, color, anchor));
    }

    hasAnnotatedPoint(point, tolerance = 1e-3) {
      return (this.annotatedPoints || []).some((saved) =>
        Math.hypot(saved.x - point.x, saved.y - point.y) <= tolerance
      );
    }

    registerAnnotatedPoint(point) {
      if (!this.annotatedPoints) {
        this.annotatedPoints = [];
      }
      this.annotatedPoints.push({ x: point.x, y: point.y });
    }

    choosePointLabelPlacement(point, text, candidates) {
      const sx = this.toScreenX(point.x);
      const sy = this.toScreenY(point.y);
      const { plotBox } = this.options;
      const bounds = {
        left: plotBox.left + 6,
        right: plotBox.right - 6,
        top: plotBox.top + 6,
        bottom: plotBox.bottom - 6
      };
      const segments = this.labelObstacleSegments();
      let best = null;
      let bestScore = -Infinity;

      candidates.forEach((candidate) => {
        const x = sx + candidate.dx;
        const y = sy + candidate.dy;
        const rect = this.labelRect(x, y, text, candidate.anchor, 17);
        const anchorBox = this.anchorNeighborhoodRect(x, y, 5);
        if (!this.isRectWithinBounds(rect, bounds)) {
          return;
        }
        const intersects =
          this.rectIntersectsAnySegment(rect, segments) ||
          this.rectIntersectsAnySegment(anchorBox, segments) ||
          this.overlapsPlacedLabels(rect);
        const clearance = this.rectDistanceToSegments(rect, segments);
        const markerDistance = Math.min(
          Math.hypot(rect.left - sx, rect.top - sy),
          Math.hypot(rect.right - sx, rect.top - sy),
          Math.hypot(rect.left - sx, rect.bottom - sy),
          Math.hypot(rect.right - sx, rect.bottom - sy)
        );
        const score = Math.min(clearance, markerDistance) - (intersects ? 1000 : 0);
        if (score > bestScore) {
          best = { ...candidate, rect };
          bestScore = score;
        }
      });

      return best;
    }

    axisIsNullcline(axis, fixedValue, valueAt, samples = 48, tolerance = 1e-7) {
      if (axis === "x") {
        const { xRange } = this.options;
        for (let i = 0; i <= samples; i += 1) {
          const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / samples;
          const value = valueAt(x, fixedValue);
          if (!Number.isFinite(value) || Math.abs(value) > tolerance) {
            return false;
          }
        }
        return true;
      }

      const { yRange } = this.options;
      for (let i = 0; i <= samples; i += 1) {
        const y = yRange[0] + ((yRange[1] - yRange[0]) * i) / samples;
        const value = valueAt(fixedValue, y);
        if (!Number.isFinite(value) || Math.abs(value) > tolerance) {
          return false;
        }
      }
      return true;
    }

    annotateIntercepts(svg, valueAt, color) {
      const xIntercepts = this.axisIsNullcline("x", 0, valueAt) ? [] : this.findRootsAlongX(0, valueAt);
      const yIntercepts = this.axisIsNullcline("y", 0, valueAt) ? [] : this.findRootsAlongY(0, valueAt);

      xIntercepts.forEach((xIntercept) => {
        if (!this.inBounds(xIntercept, 0) || nearlyEqual(xIntercept, 0, 1e-3)) {
          return;
        }
        const point = { x: xIntercept, y: 0 };
        if (this.hasAnnotatedPoint(point)) {
          return;
        }
        const text = `(${this.formatNumber(xIntercept)}, 0)`;
        const placement = this.choosePointLabelPlacement(point, text, [
          { dx: 0, dy: -14, anchor: "middle" },
          { dx: 0, dy: 22, anchor: "middle" },
          { dx: 12, dy: -14, anchor: "start" },
          { dx: -12, dy: -14, anchor: "end" },
          { dx: 12, dy: 22, anchor: "start" },
          { dx: -12, dy: 22, anchor: "end" }
        ]);
        if (!placement) {
          return;
        }
        this.addPointAnnotation(
          svg,
          point,
          text,
          color,
          placement.dx,
          placement.dy,
          placement.anchor
        );
        this.registerPlacedLabel(placement.rect);
        this.registerAnnotatedPoint(point);
      });

      yIntercepts.forEach((yIntercept) => {
        if (!this.inBounds(0, yIntercept) || nearlyEqual(yIntercept, 0, 1e-3)) {
          return;
        }
        const point = { x: 0, y: yIntercept };
        if (this.hasAnnotatedPoint(point)) {
          return;
        }
        const text = `(0, ${this.formatNumber(yIntercept)})`;
        const placement = this.choosePointLabelPlacement(point, text, [
          { dx: 12, dy: -10, anchor: "start" },
          { dx: -12, dy: -10, anchor: "end" },
          { dx: 12, dy: 20, anchor: "start" },
          { dx: -12, dy: 20, anchor: "end" },
          { dx: 0, dy: -14, anchor: "middle" },
          { dx: 0, dy: 24, anchor: "middle" }
        ]);
        if (!placement) {
          return;
        }
        this.addPointAnnotation(
          svg,
          point,
          text,
          color,
          placement.dx,
          placement.dy,
          placement.anchor
        );
        this.registerPlacedLabel(placement.rect);
        this.registerAnnotatedPoint(point);
      });
    }

    annotateNullclineLabel(svg, geometry, text, color, offsetSign = 1) {
      const points = this.flattenGeometry(geometry);
      if (points.length < 2) {
        return;
      }

      const midIndex = Math.floor(points.length / 2);
      const prev = points[Math.max(0, midIndex - 1)];
      const next = points[Math.min(points.length - 1, midIndex + 1)];
      const anchor = points[midIndex];
      let tx = this.toScreenX(next.x) - this.toScreenX(prev.x);
      let ty = this.toScreenY(next.y) - this.toScreenY(prev.y);
      const tangentLength = Math.hypot(tx, ty) || 1;
      tx /= tangentLength;
      ty /= tangentLength;

      const nx = -ty * offsetSign;
      const ny = tx * offsetSign;
      const sx = this.toScreenX(anchor.x);
      const sy = this.toScreenY(anchor.y);
      const { plotBox } = this.options;
      const bounds = {
        left: plotBox.left + 6,
        right: plotBox.right - 6,
        top: plotBox.top + 6,
        bottom: plotBox.bottom - 6
      };
      const obstacles = this.labelObstacleSegments();
      const anchorMode = tx >= 0 ? "start" : "end";
      const candidates = [
        { alongNormal: 20, alongTangent: 0, anchor: anchorMode },
        { alongNormal: 28, alongTangent: 0, anchor: anchorMode },
        { alongNormal: 36, alongTangent: 0, anchor: anchorMode },
        { alongNormal: 44, alongTangent: 0, anchor: anchorMode },
        { alongNormal: 56, alongTangent: 0, anchor: anchorMode },
        { alongNormal: 24, alongTangent: 14, anchor: anchorMode },
        { alongNormal: 24, alongTangent: -14, anchor: anchorMode },
        { alongNormal: 36, alongTangent: 18, anchor: anchorMode },
        { alongNormal: 36, alongTangent: -18, anchor: anchorMode },
        { alongNormal: 52, alongTangent: 24, anchor: anchorMode },
        { alongNormal: 52, alongTangent: -24, anchor: anchorMode },
        { alongNormal: -24, alongTangent: 0, anchor: anchorMode === "start" ? "end" : "start" },
        { alongNormal: -36, alongTangent: 18, anchor: anchorMode === "start" ? "end" : "start" },
        { alongNormal: -36, alongTangent: -18, anchor: anchorMode === "start" ? "end" : "start" },
        { alongNormal: 28, alongTangent: 0, anchor: "middle" }
      ];
      let bestCandidate = null;
      let bestScore = -Infinity;

      for (const candidate of candidates) {
        const labelX = sx + nx * candidate.alongNormal + tx * candidate.alongTangent;
        const labelY = sy + ny * candidate.alongNormal + ty * candidate.alongTangent;
        const rect = this.labelRect(labelX, labelY, text, candidate.anchor, 18);
        const anchorBox = this.anchorNeighborhoodRect(labelX, labelY, 5);
        if (!this.isRectWithinBounds(rect, bounds)) {
          continue;
        }

        const intersects =
          this.rectIntersectsAnySegment(rect, obstacles, geometry) ||
          this.rectIntersectsAnySegment(anchorBox, obstacles, geometry) ||
          this.overlapsPlacedLabels(rect);
        const distance = this.rectDistanceToSegments(rect, obstacles, geometry);
        const score = distance - (intersects ? 1000 : 0);
        if (score > bestScore) {
          bestScore = score;
          bestCandidate = { labelX, labelY, anchor: candidate.anchor, rect };
        }
      }

      if (bestCandidate) {
        svg.appendChild(this.label(bestCandidate.labelX, bestCandidate.labelY, text, 18, color, bestCandidate.anchor));
        this.registerPlacedLabel(bestCandidate.rect);
        return;
      }

      const fallbackX = this.clamp(sx + nx * 28, bounds.left + 40, bounds.right - 40);
      const fallbackY = this.clamp(sy + ny * 28, bounds.top + 18, bounds.bottom - 6);
      const fallbackRect = this.labelRect(fallbackX, fallbackY, text, "middle", 18);
      svg.appendChild(this.label(fallbackX, fallbackY, text, 18, color, "middle"));
      this.registerPlacedLabel(fallbackRect);
    }

    geometryToSegments(geometry) {
      if (!geometry) {
        return [];
      }
      if (Array.isArray(geometry) && geometry.length === 2 && geometry[0] && "x" in geometry[0] && geometry[1] && "x" in geometry[1]) {
        return [[geometry[0], geometry[1]]];
      }
      if (Array.isArray(geometry) && geometry.length > 2 && geometry.every((point) => point && "x" in point && "y" in point)) {
        const segments = [];
        for (let i = 1; i < geometry.length; i += 1) {
          segments.push([geometry[i - 1], geometry[i]]);
        }
        return segments;
      }
      if (Array.isArray(geometry)) {
        return geometry.flatMap((part) => this.geometryToSegments(part));
      }
      return [];
    }

    pointToSegmentDistance(px, py, ax, ay, bx, by) {
      const abx = bx - ax;
      const aby = by - ay;
      const lenSq = abx * abx + aby * aby;
      if (lenSq < 1e-9) {
        return Math.hypot(px - ax, py - ay);
      }
      const t = this.clamp(((px - ax) * abx + (py - ay) * aby) / lenSq, 0, 1);
      const qx = ax + abx * t;
      const qy = ay + aby * t;
      return Math.hypot(px - qx, py - qy);
    }

    pointInRect(px, py, rect) {
      return px >= rect.left && px <= rect.right && py >= rect.top && py <= rect.bottom;
    }

    orientation(ax, ay, bx, by, cx, cy) {
      return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    }

    onSegment(ax, ay, bx, by, px, py) {
      return (
        px >= Math.min(ax, bx) - 1e-9 &&
        px <= Math.max(ax, bx) + 1e-9 &&
        py >= Math.min(ay, by) - 1e-9 &&
        py <= Math.max(ay, by) + 1e-9
      );
    }

    segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
      const o1 = this.orientation(ax, ay, bx, by, cx, cy);
      const o2 = this.orientation(ax, ay, bx, by, dx, dy);
      const o3 = this.orientation(cx, cy, dx, dy, ax, ay);
      const o4 = this.orientation(cx, cy, dx, dy, bx, by);

      if ((o1 > 0 && o2 < 0 || o1 < 0 && o2 > 0) && (o3 > 0 && o4 < 0 || o3 < 0 && o4 > 0)) {
        return true;
      }
      if (Math.abs(o1) < 1e-9 && this.onSegment(ax, ay, bx, by, cx, cy)) return true;
      if (Math.abs(o2) < 1e-9 && this.onSegment(ax, ay, bx, by, dx, dy)) return true;
      if (Math.abs(o3) < 1e-9 && this.onSegment(cx, cy, dx, dy, ax, ay)) return true;
      if (Math.abs(o4) < 1e-9 && this.onSegment(cx, cy, dx, dy, bx, by)) return true;
      return false;
    }

    labelRect(x, y, text, anchor, fontSize = 17) {
      const width = Math.max(44, text.length * (fontSize * 0.58));
      const height = fontSize + 8;
      let left = x;
      if (anchor === "end") {
        left = x - width;
      } else if (anchor === "middle") {
        left = x - width / 2;
      }
      return {
        left,
        right: left + width,
        top: y - height + 4,
        bottom: y + 4
      };
    }

    anchorNeighborhoodRect(x, y, radius = 5) {
      return {
        left: x - radius,
        right: x + radius,
        top: y - radius,
        bottom: y + radius
      };
    }

    rectsOverlap(a, b, padding = 4) {
      return !(
        a.right + padding < b.left ||
        b.right + padding < a.left ||
        a.bottom + padding < b.top ||
        b.bottom + padding < a.top
      );
    }

    overlapsPlacedLabels(rect) {
      return (this.placedLabelRects || []).some((saved) => this.rectsOverlap(rect, saved));
    }

    registerPlacedLabel(rect) {
      if (!this.placedLabelRects) {
        this.placedLabelRects = [];
      }
      this.placedLabelRects.push(rect);
    }

    isRectWithinBounds(rect, bounds) {
      return (
        rect.left >= bounds.left &&
        rect.right <= bounds.right &&
        rect.top >= bounds.top &&
        rect.bottom <= bounds.bottom
      );
    }

    rectEdges(rect) {
      return [
        [rect.left, rect.top, rect.right, rect.top],
        [rect.right, rect.top, rect.right, rect.bottom],
        [rect.right, rect.bottom, rect.left, rect.bottom],
        [rect.left, rect.bottom, rect.left, rect.top]
      ];
    }

    rectIntersectsSegment(rect, segment) {
      const [a, b] = segment;
      const ax = this.toScreenX(a.x);
      const ay = this.toScreenY(a.y);
      const bx = this.toScreenX(b.x);
      const by = this.toScreenY(b.y);

      if (this.pointInRect(ax, ay, rect) || this.pointInRect(bx, by, rect)) {
        return true;
      }

      return this.rectEdges(rect).some(([x1, y1, x2, y2]) =>
        this.segmentsIntersect(ax, ay, bx, by, x1, y1, x2, y2)
      );
    }

    rectIntersectsAnySegment(rect, segments, excludedGeometry = null) {
      const excludedSegments = excludedGeometry ? this.geometryToSegments(excludedGeometry) : [];
      return segments.some((segment) => {
        const sameExcluded = excludedSegments.some(([a, b]) =>
          Math.hypot(a.x - segment[0].x, a.y - segment[0].y) < 1e-6 &&
          Math.hypot(b.x - segment[1].x, b.y - segment[1].y) < 1e-6
        );
        if (sameExcluded) {
          return false;
        }
        return this.rectIntersectsSegment(rect, segment);
      });
    }

    rectDistanceToSegments(rect, segments, excludedGeometry = null) {
      const excludedSegments = excludedGeometry ? this.geometryToSegments(excludedGeometry) : [];
      const corners = [
        { x: rect.left, y: rect.top },
        { x: rect.right, y: rect.top },
        { x: rect.left, y: rect.bottom },
        { x: rect.right, y: rect.bottom }
      ];
      let minDistance = Infinity;

      segments.forEach((segment) => {
        const sameExcluded = excludedSegments.some(([a, b]) =>
          Math.hypot(a.x - segment[0].x, a.y - segment[0].y) < 1e-6 &&
          Math.hypot(b.x - segment[1].x, b.y - segment[1].y) < 1e-6
        );
        if (sameExcluded) {
          return;
        }
        corners.forEach((corner) => {
          const distance = this.pointToSegmentDistance(
            corner.x,
            corner.y,
            this.toScreenX(segment[0].x),
            this.toScreenY(segment[0].y),
            this.toScreenX(segment[1].x),
            this.toScreenY(segment[1].y)
          );
          if (distance < minDistance) {
            minDistance = distance;
          }
        });
      });

      return minDistance;
    }

    axisSegments() {
      const { xRange, yRange } = this.options;
      return [
        [{ x: xRange[0], y: 0 }, { x: xRange[1], y: 0 }],
        [{ x: 0, y: yRange[0] }, { x: 0, y: yRange[1] }]
      ];
    }

    labelObstacleSegments() {
      return [
        ...(this.dxNullclineSegments || []),
        ...(this.dyNullclineSegments || []),
        ...this.axisSegments()
      ];
    }

    equilibriumLabelPlacement(point, text) {
      const candidateOffsets = [
        { dx: 14, dy: -14, anchor: "start" },
        { dx: 14, dy: 22, anchor: "start" },
        { dx: -14, dy: -14, anchor: "end" },
        { dx: -14, dy: 22, anchor: "end" },
        { dx: 0, dy: -18, anchor: "middle" },
        { dx: 0, dy: 28, anchor: "middle" },
        { dx: 24, dy: -26, anchor: "start" },
        { dx: 24, dy: 30, anchor: "start" },
        { dx: -24, dy: -26, anchor: "end" },
        { dx: -24, dy: 30, anchor: "end" }
      ];
      return this.choosePointLabelPlacement(point, text, candidateOffsets);
    }

    fitAffine(valueAt) {
      const basisSamples = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
      ];
      const values = basisSamples.map((point) => valueAt(point.x, point.y));
      if (values.some((value) => !Number.isFinite(value))) {
        return null;
      }
      const c = values[0];
      const a = values[1] - c;
      const b = values[2] - c;
      const coeffs = { a, b, c };

      // Extra probe points prevent nonlinear functions like x^2 - y
      // from being misclassified as affine by coincidence.
      const verificationSamples = [
        { x: 0.5, y: 0.5 },
        { x: 2, y: 0 },
        { x: 0, y: 2 },
        { x: 2, y: 1 },
        { x: -1, y: 1.5 }
      ];

      for (const point of verificationSamples) {
        const actual = valueAt(point.x, point.y);
        const predicted = coeffs.a * point.x + coeffs.b * point.y + coeffs.c;
        if (!Number.isFinite(actual) || Math.abs(actual - predicted) > 1e-6) {
          return null;
        }
      }

      return coeffs;
    }

    affineNullclineSegment(valueAt) {
      const coeffs = this.fitAffine(valueAt);
      if (!coeffs) {
        return null;
      }
      const { a, b, c } = coeffs;
      const { xRange, yRange } = this.options;
      const hits = [];
      const addHit = (x, y) => {
        if (!Number.isFinite(x) || !Number.isFinite(y) || !this.inBounds(x, y)) {
          return;
        }
        if (!hits.some((point) => Math.hypot(point.x - x, point.y - y) < 1e-6)) {
          hits.push({ x, y });
        }
      };

      if (Math.abs(b) > 1e-10) {
        addHit(xRange[0], -(a * xRange[0] + c) / b);
        addHit(xRange[1], -(a * xRange[1] + c) / b);
      }
      if (Math.abs(a) > 1e-10) {
        addHit(-(b * yRange[0] + c) / a, yRange[0]);
        addHit(-(b * yRange[1] + c) / a, yRange[1]);
      }
      if (hits.length < 2) {
        return null;
      }

      let bestPair = null;
      let bestDist = -1;
      for (let i = 0; i < hits.length; i += 1) {
        for (let j = i + 1; j < hits.length; j += 1) {
          const dist = Math.hypot(hits[i].x - hits[j].x, hits[i].y - hits[j].y);
          if (dist > bestDist) {
            bestDist = dist;
            bestPair = [hits[i], hits[j]];
          }
        }
      }
      return bestPair;
    }

    buildSvg() {
      const { width, height, style, vectorField, trajectories } = this.options;
      const svg = createNode("svg", {
        viewBox: `0 0 ${width} ${height}`,
        width,
        height,
        role: "img",
        "aria-label": "Phase diagram"
      });
      svg.appendChild(createNode("rect", { x: 0, y: 0, width, height, fill: style.background }));
      const defs = createNode("defs");
      [
        ["red-arrow", style.componentColor],
        ["green-arrow", style.resultantColor]
      ].forEach(([id, color]) => defs.appendChild(this.marker(id, color)));
      if (this.is1D) {
        defs.appendChild(this.chevronMarker("curve-arrow", style.dxNullclineColor, 8));
      }
      if (vectorField.enabled) {
        defs.appendChild(this.customMarker("vf-arrow", vectorField.color, vectorField.arrowSize));
      }
      if (trajectories.enabled && trajectories.arrows) {
        defs.appendChild(this.customMarker("traj-arrow", trajectories.color, trajectories.arrowSize));
      }
      svg.appendChild(defs);
      return svg;
    }

    tickStep(min, max, targetCount = 8) {
      const span = Math.abs(max - min);
      if (!Number.isFinite(span) || span <= 0) {
        return 1;
      }
      const rough = span / targetCount;
      const magnitude = 10 ** Math.floor(Math.log10(rough));
      const normalized = rough / magnitude;
      let nice = 1;
      if (normalized > 5) {
        nice = 10;
      } else if (normalized > 2) {
        nice = 5;
      } else if (normalized > 1) {
        nice = 2;
      }
      return nice * magnitude;
    }

    drawGrid(svg) {
      const { xRange, yRange, style, plotBox } = this.options;
      const left = plotBox.left;
      const right = plotBox.right;
      const top = plotBox.top;
      const bottom = plotBox.bottom;
      const xStep = this.tickStep(xRange[0], xRange[1], 8);
      const yStep = this.tickStep(yRange[0], yRange[1], 8);

      const xStart = Math.ceil(xRange[0] / xStep) * xStep;
      for (let x = xStart; x <= xRange[1] + 1e-9; x += xStep) {
        const sx = this.toScreenX(x);
        svg.appendChild(createNode("line", {
          x1: sx,
          y1: top,
          x2: sx,
          y2: bottom,
          stroke: style.gridColor,
          "stroke-width": nearlyEqual(x, 0, 1e-9) ? 1.2 : 0.9,
          opacity: nearlyEqual(x, 0, 1e-9) ? 0.55 : 0.8
        }));
      }

      const yStart = Math.ceil(yRange[0] / yStep) * yStep;
      for (let y = yStart; y <= yRange[1] + 1e-9; y += yStep) {
        const sy = this.toScreenY(y);
        svg.appendChild(createNode("line", {
          x1: left,
          y1: sy,
          x2: right,
          y2: sy,
          stroke: style.gridColor,
          "stroke-width": nearlyEqual(y, 0, 1e-9) ? 1.2 : 0.9,
          opacity: nearlyEqual(y, 0, 1e-9) ? 0.55 : 0.8
        }));
      }
    }

    drawFrame(svg) {
      const { style, plotBox } = this.options;
      svg.appendChild(createNode("rect", {
        x: plotBox.left,
        y: plotBox.top,
        width: plotBox.size,
        height: plotBox.size,
        fill: "none",
        stroke: style.frameColor,
        "stroke-width": 1.6
      }));
    }

    drawTickLabels(svg) {
      const { xRange, yRange, plotBox } = this.options;
      const xStep = this.tickStep(xRange[0], xRange[1], 8);
      const yStep = this.tickStep(yRange[0], yRange[1], 8);
      const xAxisY = this.clamp(this.toScreenY(0), plotBox.top, plotBox.bottom);
      const yAxisX = this.clamp(this.toScreenX(0), plotBox.left, plotBox.right);
      const xLabelY = plotBox.bottom + 22;
      const yLabelX = plotBox.left - 10;
      const tickLabelColor = "#555555";

      const xStart = Math.ceil(xRange[0] / xStep) * xStep;
      for (let x = xStart; x <= xRange[1] + 1e-9; x += xStep) {
        const sx = this.toScreenX(x);
        svg.appendChild(this.label(sx, xLabelY, this.formatNumber(x), 15, tickLabelColor, "middle"));
      }

      const yStart = Math.ceil(yRange[0] / yStep) * yStep;
      for (let y = yStart; y <= yRange[1] + 1e-9; y += yStep) {
        const sy = this.toScreenY(y);
        svg.appendChild(this.label(yLabelX, sy + 5, this.formatNumber(y), 15, tickLabelColor, "end"));
      }
    }

    marker(id, color) {
      const size = 6;
      const refX = 5.25;
      const refY = 3;
      const marker = createNode("marker", {
        id,
        markerWidth: size,
        markerHeight: size,
        refX,
        refY,
        orient: "auto",
        markerUnits: "userSpaceOnUse"
      });
      marker.appendChild(createNode("path", {
        d: "M 0 0 L 6 3 L 0 6 z",
        fill: color
      }));
      return marker;
    }

    customMarker(id, color, size) {
      const marker = createNode("marker", {
        id,
        markerWidth: size,
        markerHeight: size,
        refX: size * 0.875,
        refY: size * 0.5,
        orient: "auto",
        markerUnits: "userSpaceOnUse"
      });
      marker.appendChild(createNode("path", {
        d: `M 0 0 L ${size} ${size * 0.5} L 0 ${size} z`,
        fill: color
      }));
      return marker;
    }

    chevronMarker(id, color, size) {
      const marker = createNode("marker", {
        id,
        markerWidth: size,
        markerHeight: size,
        refX: size * 0.8,
        refY: size * 0.5,
        orient: "auto",
        markerUnits: "userSpaceOnUse"
      });
      marker.appendChild(createNode("path", {
        d: `M ${size * 0.15} ${size * 0.15} L ${size * 0.75} ${size * 0.5} L ${size * 0.15} ${size * 0.85}`,
        fill: "none",
        stroke: color,
        "stroke-width": 1.7,
        "stroke-linecap": "round",
        "stroke-linejoin": "round"
      }));
      return marker;
    }

    drawAxes(svg) {
      const { axisColor, labelColor } = this.options.style;
      const { plotBox } = this.options;
      const xAxisY = this.toScreenY(0);
      const yAxisX = this.toScreenX(0);
      svg.appendChild(createNode("line", {
        x1: yAxisX,
        y1: xAxisY,
        x2: plotBox.left,
        y2: xAxisY,
        stroke: axisColor,
        "stroke-width": 1.8,
        "stroke-linecap": "butt"
      }));
      svg.appendChild(createNode("line", {
        x1: yAxisX,
        y1: xAxisY,
        x2: plotBox.right,
        y2: xAxisY,
        stroke: axisColor,
        "stroke-width": 1.8,
        "stroke-linecap": "butt"
      }));
      svg.appendChild(createNode("line", {
        x1: yAxisX,
        y1: xAxisY,
        x2: yAxisX,
        y2: plotBox.top,
        stroke: axisColor,
        "stroke-width": 1.8,
        "stroke-linecap": "butt"
      }));
      svg.appendChild(createNode("line", {
        x1: yAxisX,
        y1: xAxisY,
        x2: yAxisX,
        y2: plotBox.bottom,
        stroke: axisColor,
        "stroke-width": 1.8,
        "stroke-linecap": "butt"
      }));

      svg.appendChild(this.label(plotBox.right + 12, xAxisY + 6, "x", 26, labelColor));
      svg.appendChild(this.label(yAxisX, plotBox.top - 10, this.is1D ? "dx/dt" : "y", 26, labelColor, "middle"));
      svg.appendChild(this.label(yAxisX - 12, xAxisY + 18, "0", 15, labelColor));
    }

    drawVectorField(svg) {
      const { vectorField, xRange, yRange } = this.options;
      if (!vectorField.enabled) {
        return;
      }

      for (let ix = 0; ix < vectorField.xCount; ix += 1) {
        for (let iy = 0; iy < vectorField.yCount; iy += 1) {
          const x = xRange[0] + ((ix + 0.5) / vectorField.xCount) * (xRange[1] - xRange[0]);
          const y = yRange[0] + ((iy + 0.5) / vectorField.yCount) * (yRange[1] - yRange[0]);
          const { dx, dy } = this.evaluate(x, y);
          const mag = Math.hypot(dx, dy);
          if (!Number.isFinite(mag) || mag < 1e-9) {
            continue;
          }

          const sx = this.toScreenX(x);
          const sy = this.toScreenY(y);
          const ux = dx / mag;
          const uy = -dy / mag;
          const len = Math.max(vectorField.minLength, Math.min(vectorField.maxLength, mag * vectorField.scale));
          const ex = sx + ux * len;
          const ey = sy + uy * len;

          svg.appendChild(createNode("line", {
            x1: sx,
            y1: sy,
            x2: ex,
            y2: ey,
            stroke: vectorField.color,
            "stroke-width": vectorField.strokeWidth,
            opacity: vectorField.opacity,
            "stroke-linecap": "round",
            "marker-end": "url(#vf-arrow)"
          }));
        }
      }
    }

    classifyRegion(point) {
      const value = this.evaluate(point.x, point.y);
      return `${value.dx >= 0 ? "+" : "-"}${value.dy >= 0 ? "+" : "-"}`;
    }

    boundarySamples(samplesPerEdge = 120) {
      const { xRange, yRange } = this.options;
      const points = [];
      for (let i = 0; i <= samplesPerEdge; i += 1) {
        const tx = i / samplesPerEdge;
        const x = xRange[0] + tx * (xRange[1] - xRange[0]);
        points.push({ x, y: yRange[0], edge: "bottom", t: tx });
        points.push({ x, y: yRange[1], edge: "top", t: tx });
      }
      for (let i = 1; i < samplesPerEdge; i += 1) {
        const ty = i / samplesPerEdge;
        const y = yRange[0] + ty * (yRange[1] - yRange[0]);
        points.push({ x: xRange[0], y, edge: "left", t: ty });
        points.push({ x: xRange[1], y, edge: "right", t: ty });
      }
      return points;
    }

    defaultTrajectorySeeds() {
      const { trajectories } = this.options;
      const targetPerRegion = trajectories.perRegion || 3;
      const regions = new Map([
        ["++", []],
        ["+-", []],
        ["-+", []],
        ["--", []]
      ]);
      const candidates = this.boundarySamples(180)
        .map((point) => ({ ...point, region: this.classifyRegion(point) }))
        .filter((point) => regions.has(point.region));

      for (const [region, bucket] of regions.entries()) {
        const regionPoints = candidates.filter((point) => point.region === region);
        if (!regionPoints.length) {
          continue;
        }
        const stride = regionPoints.length / targetPerRegion;
        for (let i = 0; i < targetPerRegion; i += 1) {
          const idx = Math.min(regionPoints.length - 1, Math.floor((i + 0.5) * stride));
          const chosen = regionPoints[idx];
          bucket.push({ x: chosen.x, y: chosen.y });
        }
      }

      return Array.from(regions.values()).flat();
    }

    polylineLength(points) {
      let total = 0;
      for (let i = 1; i < points.length; i += 1) {
        total += Math.hypot(
          this.toScreenX(points[i].x) - this.toScreenX(points[i - 1].x),
          this.toScreenY(points[i].y) - this.toScreenY(points[i - 1].y)
        );
      }
      return total;
    }

    addTrajectoryArrows(svg, points, trajectories) {
      if (points.length < 3 || !trajectories.arrows) {
        return;
      }
      let accumulated = 0;
      let nextMark = trajectories.arrowSpacing;
      for (let i = 1; i < points.length; i += 1) {
        const x1 = this.toScreenX(points[i - 1].x);
        const y1 = this.toScreenY(points[i - 1].y);
        const x2 = this.toScreenX(points[i].x);
        const y2 = this.toScreenY(points[i].y);
        const segLen = Math.hypot(x2 - x1, y2 - y1);
        if (segLen < 1e-6) {
          continue;
        }
        while (accumulated + segLen >= nextMark) {
          const t = (nextMark - accumulated) / segLen;
          const px = x1 + (x2 - x1) * t;
          const py = y1 + (y2 - y1) * t;
          const ux = (x2 - x1) / segLen;
          const uy = (y2 - y1) / segLen;
          const back = 10;
          svg.appendChild(createNode("line", {
            x1: px - ux * back,
            y1: py - uy * back,
            x2: px,
            y2: py,
            stroke: trajectories.color,
            "stroke-width": trajectories.strokeWidth,
            opacity: trajectories.opacity,
            "stroke-linecap": "round",
            "marker-end": "url(#traj-arrow)"
          }));
          nextMark += trajectories.arrowSpacing;
        }
        accumulated += segLen;
      }
    }

    drawTrajectories(svg) {
      const { trajectories } = this.options;
      if (!trajectories.enabled) {
        return;
      }
      const seeds = trajectories.seeds.length ? trajectories.seeds : this.defaultTrajectorySeeds();
      seeds.forEach((seed) => {
        const start = Array.isArray(seed) ? { x: seed[0], y: seed[1] } : seed;
        const points = this.integrate(start, trajectories.dt, trajectories.steps);
        if (points.length < 2) {
          return;
        }
        if (this.polylineLength(points) < 28) {
          return;
        }
        const d = points.map((point, index) => {
          const sx = this.toScreenX(point.x);
          const sy = this.toScreenY(point.y);
          return `${index === 0 ? "M" : "L"} ${sx} ${sy}`;
        }).join(" ");
        svg.appendChild(createNode("path", {
          d,
          fill: "none",
          stroke: trajectories.color,
          "stroke-width": trajectories.strokeWidth,
          opacity: trajectories.opacity,
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }));
        this.addTrajectoryArrows(svg, points, trajectories);
      });
    }

    label(x, y, text, size, color, anchor = "start") {
      const node = createNode("text", {
        x,
        y,
        "font-size": size,
        "font-family": "Times New Roman, serif",
        "text-anchor": anchor,
        fill: color,
        stroke: "#ffffff",
        "stroke-width": 3,
        "paint-order": "stroke",
        "stroke-linejoin": "round"
      });
      node.textContent = text;
      return node;
    }

    drawNullclines(svg) {
      const { dxNullclineColor, dyNullclineColor } = this.options.style;
      const dxValue = (x, y) => this.evaluate(x, y).dx;
      const dyValue = (x, y) => this.evaluate(x, y).dy;

      const dxLine = this.affineNullclineSegment(dxValue);
      let dxGeometry = null;
      if (dxLine) {
        dxGeometry = dxLine;
        svg.appendChild(this.segment(dxLine, dxNullclineColor, 1.8));
      } else {
        const dxParts = this.traceNullclineByX(dxValue, 360);
        if (dxParts.length) {
          dxGeometry = dxParts;
          dxParts.forEach((part) => svg.appendChild(this.pathFromPoints(part, dxNullclineColor, 1.8)));
        } else {
          const dxSegments = this.contourSegments(dxValue, 120, 120);
          dxGeometry = dxSegments;
          dxSegments.forEach((segment) => svg.appendChild(this.segment(segment, dxNullclineColor, 1.8)));
        }
      }

      const dyLine = this.affineNullclineSegment(dyValue);
      let dyGeometry = null;
      if (dyLine) {
        dyGeometry = dyLine;
        svg.appendChild(this.segment(dyLine, dyNullclineColor, 1.8));
      } else {
        const dyParts = this.traceNullclineByX(dyValue, 360);
        if (dyParts.length) {
          dyGeometry = dyParts;
          dyParts.forEach((part) => svg.appendChild(this.pathFromPoints(part, dyNullclineColor, 1.8)));
        } else {
          const dySegments = this.contourSegments(dyValue, 120, 120);
          dyGeometry = dySegments;
          dySegments.forEach((segment) => svg.appendChild(this.segment(segment, dyNullclineColor, 1.8)));
        }
      }

      this.dxGeometry = dxGeometry;
      this.dyGeometry = dyGeometry;
      this.dxNullclineSegments = this.geometryToSegments(dxGeometry);
      this.dyNullclineSegments = this.geometryToSegments(dyGeometry);
    }

    drawLabels(svg) {
      this.drawEquilibrium(svg);
    }

    sample1DCurve(samples = 420) {
      const { xRange, yRange } = this.options;
      const parts = [];
      let current = [];
      for (let i = 0; i <= samples; i += 1) {
        const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / samples;
        const y = this.evaluate1D(x);
        if (!Number.isFinite(y) || y < yRange[0] || y > yRange[1]) {
          if (current.length > 1) {
            parts.push(current);
          }
          current = [];
          continue;
        }
        current.push({ x, y });
      }
      if (current.length > 1) {
        parts.push(current);
      }
      return parts;
    }

    find1DRoots() {
      return this.findRootsAlongX(0, (x) => this.evaluate1D(x));
    }

    draw1DCurve(svg) {
      const parts = this.sample1DCurve();
      parts.forEach((part) => svg.appendChild(this.pathFromPoints(part, this.options.style.dxNullclineColor, 1.8)));
      return parts;
    }

    draw1DCurveArrows(svg, parts) {
      parts.forEach((part) => {
        if (part.length < 5) {
          return;
        }
        const arrowCount = Math.max(4, Math.min(9, Math.floor(part.length / 18)));
        const step = Math.max(6, Math.floor(part.length / (arrowCount + 1)));
        for (let i = step; i < part.length - step; i += step) {
          const prev = part[Math.max(0, i - 2)];
          const next = part[Math.min(part.length - 1, i + 2)];
          const value = this.evaluate1D(part[i].x);
          if (!Number.isFinite(value) || Math.abs(value) < 1e-9) {
            continue;
          }
          let tx = this.toScreenX(next.x) - this.toScreenX(prev.x);
          let ty = this.toScreenY(next.y) - this.toScreenY(prev.y);
          const length = Math.hypot(tx, ty) || 1;
          tx /= length;
          ty /= length;
          if (value < 0) {
            tx *= -1;
            ty *= -1;
          }
          const px = this.toScreenX(part[i].x);
          const py = this.toScreenY(part[i].y);
          const back = 18;
          svg.appendChild(createNode("line", {
            x1: px - tx * back,
            y1: py - ty * back,
            x2: px,
            y2: py,
            stroke: this.options.style.dxNullclineColor,
            "stroke-width": 1.3,
            "stroke-linecap": "round",
            "marker-end": "url(#curve-arrow)"
          }));
        }
      });
    }

    draw1DLabels(svg) {
      this.find1DRoots().forEach((x) => {
        if (!Number.isFinite(x) || !this.inBounds(x, 0)) {
          return;
        }
        const point = { x, y: 0 };
        svg.appendChild(createNode("circle", {
          cx: this.toScreenX(point.x),
          cy: this.toScreenY(0),
          r: 5.4,
          fill: this.equilibriumColor(this.classifyEquilibrium(point))
        }));
      });
    }

    render1D() {
      this.dxGeometry = null;
      this.dyGeometry = null;
      this.dxNullclineSegments = [];
      this.dyNullclineSegments = [];
      this.placedLabelRects = [];
      this.annotatedPoints = [];
      const svg = this.buildSvg();
      this.drawGrid(svg);
      this.drawFrame(svg);
      this.drawAxes(svg);
      this.drawTickLabels(svg);
      const parts = this.draw1DCurve(svg);
      this.draw1DCurveArrows(svg, parts);
      this.draw1DLabels(svg);
      this.options.target.innerHTML = "";
      this.options.target.appendChild(this.buildLegend());
      this.options.target.appendChild(svg);
      this.options.target.appendChild(this.buildEquilibriumSummary());
      return svg;
    }

    buildLegend() {
      const legend = document.createElement("div");
      legend.style.display = "inline-flex";
      legend.style.flexDirection = "column";
      legend.style.alignItems = "flex-start";
      legend.style.gap = "8px";
      legend.style.marginBottom = "18px";
      legend.style.fontFamily = "\"Times New Roman\", serif";
      legend.style.fontSize = "16px";
      legend.style.color = "#111111";
      legend.style.textAlign = "left";

      [
        { color: this.options.style.dxNullclineColor, text: this.is1D ? String(this.options.system.dx).trim() : this.nullclineLabelText(this.options.system.dx) },
        ...(!this.is1D ? [{ color: this.options.style.dyNullclineColor, text: this.nullclineLabelText(this.options.system.dy) }] : [])
      ].forEach((item) => {
        const entry = document.createElement("div");
        entry.style.display = "inline-flex";
        entry.style.alignItems = "center";
        entry.style.gap = "0";

        const prefix = document.createElement("span");
        prefix.textContent = "nullcline";
        prefix.style.marginRight = "0";

        const swatch = document.createElement("span");
        swatch.style.display = "inline-block";
        swatch.style.width = "12px";
        swatch.style.height = "12px";
        swatch.style.background = item.color;
        swatch.style.border = "1px solid #111111";
        swatch.style.flexShrink = "0";
        swatch.style.margin = "0 2px";
        swatch.style.verticalAlign = "middle";

        const colon = document.createElement("span");
        colon.textContent = ":";
        colon.style.marginLeft = "0";
        colon.style.marginRight = "2px";

        const text = document.createElement("span");
        text.textContent = item.text;

        entry.appendChild(prefix);
        entry.appendChild(swatch);
        entry.appendChild(colon);
        entry.appendChild(text);
        legend.appendChild(entry);
      });

      return legend;
    }

    segment([a, b], color, width) {
      return createNode("line", {
        x1: this.toScreenX(a.x),
        y1: this.toScreenY(a.y),
        x2: this.toScreenX(b.x),
        y2: this.toScreenY(b.y),
        stroke: color,
        "stroke-width": width,
        "stroke-linecap": "round"
      });
    }

    formatNumber(value) {
      const rounded = Math.abs(value) < 1e-9 ? 0 : value;
      const formatted = Number.isInteger(Math.round(rounded)) && Math.abs(rounded - Math.round(rounded)) < 1e-6
        ? String(Math.round(rounded))
        : rounded.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
      return formatted === "-0" ? "0" : formatted;
    }

    drawComponentArrows(svg) {
      const { componentColor, resultantColor } = this.options.style;
      const anchors = this.representativeAnchors();
      const marginPx = 18;
      anchors.forEach((anchor) => {
        const evalAt = this.evaluate(anchor.x, anchor.y);
        const sx = this.toScreenX(anchor.x);
        const sy = this.toScreenY(anchor.y);

        const dxRoots = [
          ...this.findRootsAlongX(anchor.y, (x, y) => this.evaluate(x, y).dx),
          ...this.findRootsAlongX(anchor.y, (x, y) => this.evaluate(x, y).dy)
        ];
        const dyRoots = [
          ...this.findRootsAlongY(anchor.x, (x, y) => this.evaluate(x, y).dx),
          ...this.findRootsAlongY(anchor.x, (x, y) => this.evaluate(x, y).dy)
        ];

        const horizontalCandidates = dxRoots
          .map((rootX) => this.toScreenX(rootX) - sx)
          .filter((delta) => evalAt.dx >= 0 ? delta > 0 : delta < 0);
        const verticalCandidates = dyRoots
          .map((rootY) => this.toScreenY(rootY) - sy)
          .filter((delta) => evalAt.dy >= 0 ? delta < 0 : delta > 0);

        const horizontalLimit = horizontalCandidates.length
          ? Math.min(...horizontalCandidates.map((delta) => Math.abs(delta))) - marginPx
          : 52;
        const verticalLimit = verticalCandidates.length
          ? Math.min(...verticalCandidates.map((delta) => Math.abs(delta))) - marginPx
          : 52;

        let px = Math.max(10, Math.min(40, horizontalLimit));
        let py = Math.max(10, Math.min(40, verticalLimit));

        const boundaryGap = (testX, testY) => {
          const dxRootsAtY = [
            ...this.findRootsAlongX(testY, (x, y) => this.evaluate(x, y).dx),
            ...this.findRootsAlongX(testY, (x, y) => this.evaluate(x, y).dy)
          ];
          const dyRootsAtX = [
            ...this.findRootsAlongY(testX, (x, y) => this.evaluate(x, y).dx),
            ...this.findRootsAlongY(testX, (x, y) => this.evaluate(x, y).dy)
          ];
          const horizontalGap = dxRootsAtY.length
            ? Math.min(...dxRootsAtY.map((rootX) => Math.abs(this.toScreenX(rootX) - testX)))
            : Infinity;
          const verticalGap = dyRootsAtX.length
            ? Math.min(...dyRootsAtX.map((rootY) => Math.abs(this.toScreenY(rootY) - testY)))
            : Infinity;
          return Math.min(horizontalGap, verticalGap);
        };

        let hx = sx + (evalAt.dx >= 0 ? px : -px);
        let vy = sy + (evalAt.dy >= 0 ? -py : py);

        let diagonalGap = boundaryGap(hx, vy);
        let attempts = 0;
        while (diagonalGap < marginPx && attempts < 8) {
          px *= 0.82;
          py *= 0.82;
          hx = sx + (evalAt.dx >= 0 ? px : -px);
          vy = sy + (evalAt.dy >= 0 ? -py : py);
          diagonalGap = boundaryGap(hx, vy);
          attempts += 1;
        }

        px = Math.max(8, px);
        py = Math.max(8, py);
        hx = sx + (evalAt.dx >= 0 ? px : -px);
        vy = sy + (evalAt.dy >= 0 ? -py : py);

        svg.appendChild(createNode("line", {
          x1: sx,
          y1: sy,
          x2: hx,
          y2: sy,
          stroke: componentColor,
          "stroke-width": 1.2,
          "stroke-linecap": "butt",
          "marker-end": "url(#red-arrow)"
        }));
        svg.appendChild(createNode("line", {
          x1: sx,
          y1: sy,
          x2: sx,
          y2: vy,
          stroke: componentColor,
          "stroke-width": 1.2,
          "stroke-linecap": "butt",
          "marker-end": "url(#red-arrow)"
        }));
        svg.appendChild(createNode("line", {
          x1: sx,
          y1: sy,
          x2: hx,
          y2: vy,
          stroke: resultantColor,
          "stroke-width": 1.2,
          "stroke-linecap": "butt",
          "marker-end": "url(#green-arrow)"
        }));
      });
    }

    drawEquilibrium(svg) {
      if (!this.equilibria || !this.equilibria.length) {
        return;
      }
      this.equilibria.forEach((point) => {
        const kind = this.classifyEquilibrium(point);
        svg.appendChild(createNode("circle", {
          cx: this.toScreenX(point.x),
          cy: this.toScreenY(point.y),
          r: 5.4,
          fill: this.equilibriumColor(kind)
        }));
      });
    }

    equilibriumColor(kind) {
      if (kind === "stable") {
        return "#22c55e";
      }
      if (kind === "unstable") {
        return "#ef4444";
      }
      if (kind === "saddle") {
        return "#f59e0b";
      }
      return "#64748b";
    }

    signWithTolerance(value, tolerance = 1e-8) {
      if (!Number.isFinite(value) || Math.abs(value) <= tolerance) {
        return 0;
      }
      return value > 0 ? 1 : -1;
    }

    classifyEquilibrium(point) {
      if (this.is1D) {
        const { xRange } = this.options;
        const span = Math.abs(xRange[1] - xRange[0]);
        const baseDelta = Math.max(span * 0.01, 1e-4);
        const deltas = [baseDelta, baseDelta * 2, baseDelta * 4];
        let leftSign = 0;
        let rightSign = 0;

        for (const delta of deltas) {
          const leftX = point.x - delta;
          const rightX = point.x + delta;
          leftSign = this.signWithTolerance(this.evaluate1D(leftX));
          rightSign = this.signWithTolerance(this.evaluate1D(rightX));
          if (leftSign !== 0 || rightSign !== 0) {
            if (leftSign !== 0 && rightSign !== 0) {
              break;
            }
          }
        }

        if (leftSign === 0 || rightSign === 0) {
          return "indeterminate";
        }

        if (leftSign > 0 && rightSign < 0) {
          return "stable";
        }
        if (leftSign < 0 && rightSign > 0) {
          return "unstable";
        }
        return "saddle";
      }

      const jac = this.numericalJacobian(point.x, point.y);
      const trace = jac.a + jac.d;
      const det = jac.a * jac.d - jac.b * jac.c;
      if (!Number.isFinite(trace) || !Number.isFinite(det)) {
        return "indeterminate";
      }
      if (det < -1e-8) {
        return "saddle";
      }
      if (trace < -1e-8 && det > 1e-8) {
        return "stable";
      }
      if (trace > 1e-8 && det > 1e-8) {
        return "unstable";
      }
      return "indeterminate";
    }

    equilibriumDescription(kind) {
      if (kind === "stable") {
        return "안정균형(stable equilibrium)";
      }
      if (kind === "unstable") {
        return "불안정균형(unstable equilibrium)";
      }
      if (kind === "saddle") {
        return "안장점(saddle point)";
      }
      return "판별불가(indeterminate)";
    }

    buildEquilibriumSummary() {
      const wrap = document.createElement("div");
      wrap.style.marginTop = "12px";
      wrap.style.fontFamily = "\"Noto Sans KR\", sans-serif";
      wrap.style.fontSize = "15px";
      wrap.style.color = "#223247";
      wrap.style.display = "inline-flex";
      wrap.style.flexDirection = "column";
      wrap.style.alignItems = "flex-start";
      wrap.style.gap = "8px";
      wrap.style.textAlign = "left";

      const title = document.createElement("div");
      title.textContent = "균형 설명";
      title.style.fontSize = "15px";
      title.style.fontWeight = "700";
      title.style.color = "#314256";
      wrap.appendChild(title);

      const points = this.is1D
        ? dedupePoints(
            this.find1DRoots()
              .filter((x) => Number.isFinite(x))
              .map((x) => ({ x, y: 0 })),
            5e-2
          )
        : dedupePoints(this.equilibria || [], 5e-2);

      if (!points.length) {
        const empty = document.createElement("div");
        empty.textContent = "균형점: 없음";
        wrap.appendChild(empty);
        return wrap;
      }

      points.forEach((point) => {
        const kind = this.classifyEquilibrium(point);
        const row = document.createElement("div");
        row.style.display = "inline-flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";

        const swatch = document.createElement("span");
        swatch.style.display = "inline-block";
        swatch.style.width = "12px";
        swatch.style.height = "12px";
        swatch.style.background = this.equilibriumColor(kind);
        swatch.style.border = "1px solid rgba(17, 24, 39, 0.18)";
        swatch.style.borderRadius = "2px";
        swatch.style.flexShrink = "0";

        const label = document.createElement("span");
        label.textContent = this.is1D
          ? `(${this.formatNumber(point.x)}, 0): ${this.equilibriumDescription(kind)}`
          : `(${this.formatNumber(point.x)}, ${this.formatNumber(point.y)}): ${this.equilibriumDescription(kind)}`;

        row.appendChild(swatch);
        row.appendChild(label);
        wrap.appendChild(row);
      });
      return wrap;
    }

    render() {
      if (this.is1D) {
        return this.render1D();
      }
      const equilibria = this.findEquilibria();
      this.equilibria = equilibria;
      this.equilibrium = equilibria[0] || { x: 0, y: 0 };
      this.dxGeometry = null;
      this.dyGeometry = null;
      this.dxNullclineSegments = [];
      this.dyNullclineSegments = [];
      this.placedLabelRects = [];
      this.annotatedPoints = [];
      const svg = this.buildSvg();
      this.drawGrid(svg);
      this.drawFrame(svg);
      this.drawVectorField(svg);
      this.drawAxes(svg);
      this.drawTickLabels(svg);
      this.drawNullclines(svg);
      this.drawTrajectories(svg);
      this.drawComponentArrows(svg);
      this.drawLabels(svg);
      this.options.target.innerHTML = "";
      this.options.target.appendChild(this.buildLegend());
      this.options.target.appendChild(svg);
      this.options.target.appendChild(this.buildEquilibriumSummary());
      return svg;
    }
  }

  window.PhaseDiagramRenderer = PhaseDiagramRenderer;
})();
