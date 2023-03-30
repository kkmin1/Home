const odeint = require('ode45-cash-karp');
const linspace = require('linspace');
const { plot } = require('nodeplotlib');

function system(t, y, a, b, c, d) {
    const x = y[0];
    const y_ = y[1];
    const dydt = [a * x - b * y_, c * x - d * y_];
    return dydt;
}

const a = 1;
const b = 1;
const c = 1;
const d = 2;
const y1 = [1, 2];
const y2 = [-0.2, 2];
const y3 = [0.2, -2];
const y4 = [-1, -2];
const t_span = linspace(0, 10, 1000);

const sol1 = odeint(system.bind(null, a, b, c, d), y1, t_span);
const sol2 = odeint(system.bind(null, a, b, c, d), y2, t_span);
const sol3 = odeint(system.bind(null, a, b, c, d), y3, t_span);
const sol4 = odeint(system.bind(null, a, b, c, d), y4, t_span);

// ... rest of the code

const x_min = -2;
const x_max = 2;
const y_min = -2;
const y_max = 2;
const x = linspace(x_min, x_max, 20);
const y = linspace(y_min, y_max, 20);
const u = Array(x.length).fill(0);
const v = Array(y.length).fill(0);

// calculate the vector field
for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < y.length; j++) {
        const yprime = system(0, [x[i], y[j]], a, b, c, d);
        u[i] = yprime[0];
        v[i] = yprime[1];
    }
}

// calculate and plot eigenvectors
const J = [[a, -b], [c, -d]];
const eigvals = numeric.eig(J).lambda.x;
const eigvecs = numeric.eig(J).E.x;
const eigvec1 = eigvecs[0];
const eigvec2 = eigvecs[1];

// calculate start and end points of eigenvector 1
const x_start = 0;
const y_start = 0;
const x_end1 = eigvec1[0] * (x_max - x_min) / 2;
const y_end1 = eigvec1[1] * (y_max - y_min) / 2;


// plot eigenvector 1
const trace1 = {
    x: [0, x_end1],
    y: [0, y_end1],
    mode: 'lines',
    line: { color: 'red', width: 1.5 },
};
const trace2 = {
    x: [0, -x_end1],
    y: [0, -y_end1],
    mode: 'lines',
    line: { color: 'red', width: 1.5 },
};

// calculate midpoints of eigenvector 1
const x_mid1 = (x_start + x_end1) / 2;
const y_mid1 = (y_start + y_end1) / 2;

// calculate arrow start and end points for eigenvector 1
const arrow_start1a = [x_mid1, y_mid1];
const arrow_end1a = numeric.add(
    arrow_start1a,
    numeric.mul(0.1, system(0, arrow_start1a, a, b, c, d))
);
const arrow_start1b = [-x_mid1, -y_mid1];
const arrow_end1b = numeric.add(
    arrow_start1b,
    numeric.mul(0.1, system(0, arrow_start1b, a, b, c, d))
);

// plot arrows for eigenvector 1
const trace3 = {
    x: [arrow_start1a[0], arrow_end1a[0]],
    y: [arrow_start1a[1], arrow_end1a[1]],
    mode: 'lines',
    line: { color: '#004d00', width: 2 },
};
const trace4 = {
    x: [arrow_start1b[0], arrow_end1b[0]],
    y: [arrow_start1b[1], arrow_end1b[1]],
    mode: 'lines',
    line: { color: 'green', width: 2 },
};

// plot data
plot([trace1, trace2, trace3, trace4]);

const trace5 = {
    x: x,
    y: y,
    u: u,
    v: v,
    type: 'quiver',
    line: { color: 'gray' },
};
const trace6 = {
    x: sol1.map((row) => row[0]),
    y: sol1.map((row) => row[1]),
    mode: 'lines',
    line: { color: 'blue', width: 1.5 },
};
const trace7 = {
    x: sol2.map((row) => row[0]),
    y: sol2.map((row) => row[1]),
    mode: 'lines',
    line: { color: 'blue', width: 1.5 },
};
const trace8 = {
    x: sol3.map((row) => row[0]),
    y: sol3.map((row) => row[1]),
    mode: 'lines',
    line: { color: 'blue', width: 1.5 },
};
const trace9 = {
    x: sol4.map((row) => row[0]),
    y: sol4.map((row) => row[1]),
    mode: 'lines',
    line: { color: 'blue', width: 1.5 },
};

const layout = {
    xaxis: { title: 'x', range: [x_min, x_max] },
    yaxis: { title: 'y', range: [y_min, y_max] },
    title: 'Phase Diagram',
};

plot([trace5, trace6, trace7, trace8, trace9], layout);