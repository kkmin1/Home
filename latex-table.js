/**
 * LaTeX Table Mini Library
 * 기능: 지정된 태그 내의 LaTeX tabular 문법을 HTML 표로 변환
 */
const LaTeXTable = {
    renderAll: function() {
        // 'latex-table' 클래스를 가진 요소를 모두 찾아 렌더링
        const elements = document.querySelectorAll('.latex-table-code');
        elements.forEach(el => {
            const rawCode = el.textContent || el.innerText;
            el.innerHTML = this.parse(rawCode);
            el.style.display = 'block'; // 렌더링 후 표시
        });
    },

    parse: function(code) {
        const bodyMatch = code.match(/\\begin{tabular}{(.+?)}([\s\S]+?)\\end{tabular}/);
        if (!bodyMatch) return "<p style='color:red;'>Invalid LaTeX Format</p>";

        const rows = bodyMatch[2].trim().split('\\\\');
        let html = '<div class="lt-container">';

        rows.forEach((row, rIdx) => {
            const cleanRow = row.replace(/\\hline/g, '').trim();
            if (!cleanRow) return;

            html += '<div class="lt-row">';
            const cells = cleanRow.split('&');

            cells.forEach((cell, cIdx) => {
                let content = cell.trim();
                let isHeader = (rIdx === 0 || cIdx === 0);
                let className = isHeader ? 'lt-cell lt-bg-header' : 'lt-cell';
                
                // \diagbox 처리
                if (content.includes('\\diagbox')) {
                    const match = content.match(/\\diagbox{(.+?)}{(.+?)}/);
                    if (match) {
                        html += `
                        <div class="${className}" style="padding:0;">
                            <div class="lt-diag-wrapper">
                                <svg class="lt-diag-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <line x1="0" y1="0" x2="100" y2="100" stroke="black" stroke-width="0.8"/>
                                </svg>
                                <span class="lt-diag-text lt-top-right">${match[2]}</span>
                                <span class="lt-diag-text lt-bottom-left">${match[1]}</span>
                            </div>
                        </div>`;
                        return;
                    }
                }

                // 괄호 줄바꿈 처리
                const formattedContent = content.replace('(', '<br>(');
                html += `<div class="${className}">${formattedContent}</div>`;
            });
            html += '</div>';
        });

        html += '</div>';
        return html;
    }
};

// 라이브러리 전용 CSS 자동 주입
const ltStyle = document.createElement('style');
ltStyle.innerHTML = `
    .lt-container { display: table; width: 100%; table-layout: fixed; border-spacing: 0; border-top: 1px solid #000; border-left: 1px solid #000; box-sizing: border-box; font-family: sans-serif; }
    .lt-row { display: table-row; height: 75px; }
    .lt-cell { display: table-cell; position: relative; height: 75px; border-right: 1px solid #000; border-bottom: 1px solid #000; vertical-align: middle; text-align: center; box-sizing: border-box; word-break: keep-all; line-height: 1.2; font-size: 15px; padding: 0 5px; background-clip: padding-box; }
    .lt-bg-header { background-color: #e8effa; }
    .lt-diag-wrapper { width: 100%; height: 100%; position: relative; overflow: hidden; }
    .lt-diag-svg { position: absolute; top: -0.5px; left: -0.5px; width: calc(100% + 1px); height: calc(100% + 1px); z-index: 1; }
    .lt-diag-text { position: absolute; z-index: 2; font-size: 14px; white-space: nowrap; }
    .lt-top-right { top: 8px; right: 10px; }
    .lt-bottom-left { bottom: 8px; left: 10px; }
    .latex-table-code { display: none; } /* 렌더링 전 코드 숨김 */
`;
document.head.appendChild(ltStyle);

// 페이지 로드 시 자동 실행
window.addEventListener('DOMContentLoaded', () => LaTeXTable.renderAll());
