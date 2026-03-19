/**
 * LaTeX Table Strict Library - Physical Double Line Solution
 */
const LaTeXTable = {
    renderAll: function () {
        // Accept either explicit blocks (`.latex-table-code`) or plain <p> blocks that contain a tabular
        document.querySelectorAll('.latex-table-code, p').forEach(el => {
            // decode simple HTML entities that may be present inside the element
            let rawCode = el.textContent || el.innerText || '';
            rawCode = rawCode.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

            // Only process elements that actually contain a tabular environment
            if (!/\\?begin\{tabular\}/i.test(rawCode)) return;

            const rendered = this.parse(rawCode);

            // If the source element is explicitly the code block (e.g. <pre class="latex-table-code">),
            // replace its innerHTML. For generic <p>, insert the rendered table after it and remove the <p>.
            const tag = el.tagName ? el.tagName.toLowerCase() : '';
            if (el.classList && el.classList.contains('latex-table-code')) {
                el.innerHTML = rendered;
                el.style.display = 'block';
            } else if (tag === 'pre') {
                el.innerHTML = rendered;
                el.style.display = 'block';
            } else {
                el.insertAdjacentHTML('afterend', rendered);
                el.remove();
            }
        });
    },

    parse: function (code) {
        let unitMatch = code.match(/\(단위\s?:\s?.+?\)/);
        let unitHtml = unitMatch ? `<div class="lt-external-unit">${unitMatch[0]}</div>` : '';
        let cleanCode = code.replace(/\(단위\s?:\s?.+?\)/g, '').trim();

        const bodyMatch = cleanCode.match(/\\?begin{tabular}{(.+?)}([\s\S]+?)\\?end{tabular}/);
        if (!bodyMatch) return "Format Error";

        // \arrayrulecolor{color} 감지 (백슬래시가 제거된 경우도 허용)
        let lineColor = "#000";
        const colorMatch = cleanCode.match(/\\?arrayrulecolor{(.+?)}/);
        if (colorMatch) {
            lineColor = colorMatch[1].trim();
        }

        // split on LaTeX row breaks (\\) or plain newlines if backslashes were removed
        const rawRows = bodyMatch[2].trim().split(/\\\\|\r?\n/);

        // First pass: parse rows into structured cells so we can measure widths
        const parsedRows = [];
        let maxCols = 0;
        rawRows.forEach((row) => {
            const hasDouble = /\\?hline\s*\\?hline/.test(row);
            const contentPart = row.replace(/\\?hline/g, '').trim();
            if (!contentPart) return;

            const cells = contentPart.split('&').map(s => s.trim());
            if (cells.length > maxCols) maxCols = cells.length;

            const rowObj = { hasDouble: hasDouble, cells: [] };
            cells.forEach((cell, cIdx) => {
                let raw = cell;
                let className = (cIdx === 0) ? 'lt-cell lt-bg-header' : 'lt-cell';
                raw = this.applyFontStyles(raw);

                if (/\\?diagbox/.test(raw)) {
                    const match = raw.match(/\\?diagbox{(.+?)}{(.+?)}/);
                    if (match) {
                        rowObj.cells.push({ isDiag: true, top: this.applyFontStyles(match[2]), bottom: this.applyFontStyles(match[1]), className: className });
                        return;
                    }
                }

                const formatted = raw.replace('(', '<br>(');
                rowObj.cells.push({ isDiag: false, html: formatted, className: className });
            });
            parsedRows.push(rowObj);
        });

        // Measure widths by creating an offscreen measuring element
        const meas = document.createElement('div');
        meas.style.position = 'absolute';
        meas.style.left = '-9999px';
        meas.style.top = '0';
        meas.style.visibility = 'hidden';
        meas.style.whiteSpace = 'nowrap';
        meas.style.boxSizing = 'border-box';
        meas.style.padding = '6px 12px';
        meas.style.fontSize = '15px';
        meas.style.fontWeight = '600';
        meas.style.fontFamily = 'inherit';
        document.body.appendChild(meas);

        const colMax = new Array(maxCols).fill(0);
        parsedRows.forEach(r => {
            r.cells.forEach((cell, ci) => {
                if (cell.isDiag) {
                    // measure both parts and take the larger
                    const top = (cell.top || '').replace(/<br\s*\/?>/gi, ' ');
                    const bottom = (cell.bottom || '').replace(/<br\s*\/?>/gi, ' ');
                    meas.innerHTML = top;
                    let w1 = meas.getBoundingClientRect().width;
                    meas.innerHTML = bottom;
                    let w2 = meas.getBoundingClientRect().width;
                    const w = Math.max(w1, w2);
                    if (w > colMax[ci]) colMax[ci] = w;
                } else {
                    const html = (cell.html || '').replace(/<br\s*\/?>/gi, ' ');
                    meas.innerHTML = html;
                    const w = meas.getBoundingClientRect().width;
                    if (w > colMax[ci]) colMax[ci] = w;
                }
            });
        });
        document.body.removeChild(meas);

        // ensure a sensible minimum width for first (row-header) column
        if (colMax[0] < 80) colMax[0] = 80;
        for (let i = 1; i < colMax.length; i++) if (colMax[i] < 60) colMax[i] = 60;

        // Build colgroup using measured pixel widths (add border/padding accounted already)
        const totalPx = colMax.reduce((a,b) => a + b, 0) || 1;
        let colgroup = '<colgroup>';
        for (let i=0;i<colMax.length;i++) {
            colgroup += `<col style="width:${Math.round(colMax[i])}px">`;
        }
        colgroup += '</colgroup>';

        // Second pass: assemble HTML using parsedRows and colgroup
        let html = `<div class="lt-outer-wrapper" style="--lt-line-color: ${lineColor};">${unitHtml}<table class="lt-container" style="width:auto;table-layout:auto;border-spacing:0;border-collapse:collapse;">` + colgroup;

        parsedRows.forEach((r) => {
            const rowClass = r.hasDouble ? 'lt-row lt-double-row' : 'lt-row';
            html += `<tr class="${rowClass}">`;
            // render each column, if a row has fewer cells, render empty cells
            for (let ci = 0; ci < maxCols; ci++) {
                const cell = r.cells[ci];
                if (!cell) {
                    html += `<td class="lt-cell"><div class="lt-content-inner"></div></td>`;
                    continue;
                }
                if (cell.isDiag) {
                    html += `
                        <td class="${cell.className}" style="padding:0; min-width:80px;">
                            <div class="lt-diag-wrapper">
                                <svg class="lt-diag-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <line x1="0" y1="0" x2="100" y2="100" stroke-width="2"/>
                                </svg>
                                <span class="lt-diag-text lt-diag-top">${cell.top}</span>
                                <span class="lt-diag-text lt-diag-bottom">${cell.bottom}</span>
                            </div>
                        </td>`;
                } else {
                    html += `<td class="${cell.className}"><div class="lt-content-inner">${cell.html}</div></td>`;
                }
            }
            html += '</tr>';
        });

        html += '</table></div>';
        return html;
    },

    applyFontStyles: function (str) {
        str = str.replace(/\\?textbf{(.+?)}/g, '<strong style="font-weight: 900 !important; color: #000;">$1</strong>');
        str = str.replace(/\\?color{(.+?)}{(.+?)}/g, '<span style="color:$1 !important;">$2</span>');
        str = str.replace(/\\?fontsize{(.+?)}{(.+?)}/g, '<span style="font-size:$1px !important; line-height: 1;">$2</span>');
        return str;
    }
};

const ltStyle = document.createElement('style');
ltStyle.innerHTML = `
    .lt-outer-wrapper { 
        display: block; 
        margin: 20px auto; /* 가운데 정렬 */
        text-align: center; /* 내부 테이블을 가운데에 배치 */
        --lt-line-color: #000; 
        color: #000; /* 텍스트 기본 색상 검정으로 고정 */
        width: auto;
        box-sizing: border-box;
    }
    .lt-external-unit { text-align: center; font-size: 14px; font-weight: 600; color: #000; margin-bottom: 8px; display:block; }
    .lt-container { display: inline-table; border-collapse: collapse; border-top: 2.5px solid var(--lt-line-color); border-left: 2.5px solid var(--lt-line-color); background: #fff; table-layout: fixed; border-spacing: 0; }
    .lt-row { min-height: 56px !important; position: relative; }
    .lt-cell { 
        border-right: 2.5px solid var(--lt-line-color); border-bottom: 2.5px solid var(--lt-line-color); 
        padding: 6px 12px; text-align: center; vertical-align: middle;
        white-space: nowrap; min-height: 56px !important; box-sizing: border-box;
        word-break: keep-all; line-height: 1.2; font-size: 15px;
        position: relative;
        overflow: hidden;
    }

    /* 이중선(\hline\hline) 구현: 셀 하단에 가상의 선을 하나 더 추가 */
    .lt-double-row .lt-cell::after {
        content: '';
        position: absolute;
        left: 0;
        top: 4px; /* 위쪽 테두리와의 간격 조정 */
        width: 100%;
        height: 2.5px; /* 메인 테두리 두께(2.5px)와 일치시킴 */
        background-color: var(--lt-line-color);
        z-index: 10;
    }

    .lt-bg-header { background-color: #e8effa !important; }
    .lt-content-inner { font-size: 15px; font-weight: 600; color: #000 !important; }
    .lt-diag-wrapper { width: 100%; height: 56px; position: relative; box-sizing: border-box; }
    .lt-diag-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
    .lt-diag-svg line { stroke: var(--lt-line-color); stroke-width: 2.5; shape-rendering: crispEdges; }
    /* Match the diagonal cell text to regular cell text to avoid thinner/blurry rendering */
    .lt-diag-text { position: absolute; font-size: 15px; font-weight: 600; color: #000; line-height: 1; z-index: 2; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
    /* Use pixel-based offsets to avoid subpixel positioning which can cause blurriness */
    .lt-diag-top { top: 8px; right: 10px; }
    .lt-diag-bottom { bottom: 8px; left: 10px; }
    .latex-table-code { display: none; }
`;
document.head.appendChild(ltStyle);
// Run after full load with a tiny delay to avoid clobbering other LaTeX/math renderers
window.addEventListener('load', () => setTimeout(() => LaTeXTable.renderAll(), 80));