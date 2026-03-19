const languageConfig = [
    {
        group: "System & Compiled",
        languages: [
            { name: "C", id: "c", topics: [{ id: "c1", title: "output" }, { id: "c2", title: "input" }, { id: "c3", title: "별찍기" }], prism: "c" },
            { name: "C++", id: "cp", topics: [{ id: "cp1", title: "output" }, { id: "cp2", title: "input" }, { id: "cp3", title: "별찍기" }], prism: "cpp" },
            { name: "C#", id: "cs", topics: [{ id: "cs1", title: "output" }, { id: "cs2", title: "input" }, { id: "cs3", title: "별찍기" }], prism: "csharp" },
            { name: "Java", id: "j", topics: [{ id: "j1", title: "output" }, { id: "j2", title: "input" }, { id: "j3", title: "별찍기" }], prism: "java" },
            { name: "Rust", id: "rs", topics: [{ id: "rs1", title: "output" }, { id: "rs2", title: "input" }, { id: "rs3", title: "별찍기" }], prism: "rust" },
            { name: "Go", id: "g", topics: [{ id: "g1", title: "output" }, { id: "g2", title: "input" }, { id: "g3", title: "별찍기" }], prism: "go" },
            { name: "Haskell", id: "hs", topics: [{ id: "hs1", title: "output" }, { id: "hs2", title: "input" }, { id: "hs3", title: "별찍기" }], prism: "haskell" }
        ]
    },
    {
        group: "Scripting & Modern",
        languages: [
            { name: "Python", id: "py", topics: [{ id: "py1", title: "output" }, { id: "py2", title: "input" }, { id: "py3", title: "별찍기" }], prism: "python" },
            { name: "Kotlin", id: "k", topics: [{ id: "k1", title: "output" }, { id: "k2", title: "input" }, { id: "k3", title: "별찍기" }], prism: "kotlin" },
            { name: "Scala", id: "s", topics: [{ id: "s1", title: "output" }, { id: "s2", title: "input" }, { id: "s3", title: "별찍기" }], prism: "scala" },
            { name: "Ruby", id: "r", topics: [{ id: "r1", title: "output" }, { id: "r2", title: "input" }, { id: "r3", title: "별찍기" }], prism: "ruby" },
            { name: "Perl", id: "pl", topics: [{ id: "pl1", title: "output" }, { id: "pl2", title: "input" }, { id: "pl3", title: "별찍기" }], prism: "perl" },
            { name: "Lua", id: "l", topics: [{ id: "l1", title: "output" }, { id: "l2", title: "input" }, { id: "l3", title: "별찍기" }], prism: "lua" }
        ]
    },
    {
        group: "Web & Functional",
        languages: [
            { name: "JavaScript", id: "js", topics: [{ id: "js1", title: "output" }, { id: "js2", title: "input" }, { id: "js3", title: "별찍기" }], prism: "javascript" },
            { name: "jQuery", id: "jq", topics: [{ id: "jq1", title: "output" }, { id: "jq2", title: "input" }, { id: "jq3", title: "별찍기" }], prism: "javascript" },
            { name: "node.js", id: "ns", topics: [{ id: "ns1", title: "Basic Server" }], prism: "javascript" },
            { name: "PHP", id: "ph", topics: [{ id: "ph1", title: "output" }, { id: "ph2", title: "input" }, { id: "ph3", title: "별찍기" }], prism: "php" },
            { name: "HTML", id: "h", topics: [{ id: "h1", title: "output" }, { id: "h2", title: "input" }, { url: "star.html", title: "별찍기 알고리듬" }], prism: "html" },
            { name: "Clojure", id: "cl", topics: [{ id: "cl1", title: "output" }, { id: "cl2", title: "input" }, { id: "cl3", title: "별찍기" }], prism: "clojure" },
            { name: "Elixir", id: "ex", topics: [{ id: "ex1", title: "output" }, { id: "ex2", title: "input" }, { id: "ex3", title: "별찍기" }], prism: "elixir" }
        ]
    },
    {
        group: "Science & Documentation",
        languages: [
            { name: "R", id: "str", topics: [{ id: "str1", title: "output" }, { id: "str2", title: "input" }, { id: "str3", title: "별찍기" }], prism: "r" },
            { name: "Julia", id: "jl", topics: [{ id: "jl1", title: "output" }, { id: "jl2", title: "input" }, { id: "jl3", title: "별찍기" }], prism: "julia" },
            { name: "Matlab", id: "mt", topics: [{ id: "mt1", title: "output" }, { id: "mt2", title: "input" }, { id: "mt3", title: "별찍기" }], prism: "matlab" },
            { name: "Shell", id: "sh", topics: [{ id: "sh1", title: "output" }, { id: "sh2", title: "input" }, { id: "sh3", title: "별찍기" }], prism: "bash" },
            { name: "LaTeX", id: "lx", topics: [{ id: "lx1", title: "Syntax" }, { url: "html-latex.html", title: "LaTeX in Web" }], prism: "latex" },
            { name: "Markdown", id: "md", topics: [{ id: "md1", title: "Syntax" }], prism: "markdown" }
        ]
    }
];

$(function () {
    const $nav = $('#dynamic-nav');
    const $display = $('#content-display');

    // 1. Generate Navigation Menu
    languageConfig.forEach(group => {
        const $groupDiv = $('<div class="nav-group"></div>');
        $groupDiv.append(`<div class="nav-group-title">${group.group}</div>`);

        group.languages.forEach(lang => {
            const $langDiv = $(`
                <div class="lang-item" data-lang="${lang.id}">
                    <div class="lang-header">
                        <span class="lang-name">${lang.name}</span>
                        <span class="lang-chevron">▶</span>
                    </div>
                    <div class="topic-list"></div>
                </div>
            `);

            const $topicList = $langDiv.find('.topic-list');
            lang.topics.forEach(topic => {
                const topicData = topic.url ? `data-url="${topic.url}"` : `data-id="${topic.id}"`;
                $topicList.append(`
                    <div class="topic-item" ${topicData} data-lang-name="${lang.name}" data-prism="${lang.prism}">
                        ${topic.title}
                    </div>
                `);
            });

            $groupDiv.append($langDiv);
        });

        $nav.append($groupDiv);
    });

    // 2. Handle Navigation Clicks
    // Toggle Language
    $(document).on('click', '.lang-header', function () {
        const $item = $(this).closest('.lang-item');
        const isActive = $item.hasClass('active');

        $('.lang-item').removeClass('active');
        if (!isActive) {
            $item.addClass('active');
        }
    });

    // Select Topic
    $(document).on('click', '.topic-item', function (e) {
        e.stopPropagation();
        const id = $(this).data('id');
        const url = $(this).data('url');
        const langName = $(this).data('lang-name');
        const prismLang = $(this).data('prism');
        const topicTitle = $(this).text().trim();

        $('.topic-item').removeClass('active');
        $(this).addClass('active');

        if (url) {
            // Navigate directly to the page as requested
            window.location.href = url;
        } else {
            loadCode(id, langName, topicTitle, prismLang);
        }

        // Close sidebar on mobile after selection
        if ($(window).width() <= 900) {
            $('.code-sidebar').removeClass('open');
        }
    });

    // 3. Load and Render Code
    function loadCode(id, lang, topic, prism) {
        if (typeof codeData !== 'undefined' && codeData[id]) {
            const rawCode = codeData[id];

            const html = `
                <div class="code-display-header">
                    <div class="display-meta">
                        <span class="badge-lang">${lang}</span>
                        <span class="badge-topic">${topic}</span>
                    </div>
                    <button class="copy-btn" id="copy-btn">Copy Code</button>
                </div>
                <div class="code-container">
                    <pre class="line-numbers language-${prism}"><code class="language-${prism}">${escapeHtml(rawCode)}</code></pre>
                </div>
            `;

            $display.hide().html(html).fadeIn(300);

            // Re-highlight code
            Prism.highlightAllUnder($display[0]);

            // Handle Copy
            $('#copy-btn').click(function () {
                copyToClipboard(rawCode, $(this));
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // 4. Utility Functions (loadUrl removed as per request for direct navigation)
    function escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function copyToClipboard(text, $btn) {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        const originalText = $btn.text();
        $btn.text('Copied!').css('color', '#10b981');
        setTimeout(() => {
            $btn.text(originalText).css('color', '');
        }, 2000);
    }

    // 6. Search Logic
    $('#lang-search').on('input', function () {
        const term = $(this).val().toLowerCase();
        $('.lang-item').each(function () {
            const name = $(this).find('.lang-name').text().toLowerCase();
            if (name.includes(term)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // 7. Mobile Toggle
    $('#mobile-toggle').click(function () {
        $('.code-sidebar').toggleClass('open');
    });
});
