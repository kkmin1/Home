const topics = (...items) => items.map(([id, title]) => ({ id, title }));

const languageConfig = [
    {
        group: "Core Languages",
        languages: [
            {
                name: "C", id: "c", prism: "c",
                topics: [
                    ...topics(
                        ["c1", "Output"],
                        ["c2", "Input"],
                        ["ref_c_types", "Variables & Types"],
                        ["ref_c_condition", "Condition"],
                        ["ref_c_loop", "Loop"],
                        ["ref_c_array", "Array"],
                        ["ref_c_function", "Function"],
                        ["ref_c_pointer", "Pointer"],
                        ["ref_c_file", "File I/O"],
                        ["ref_c_build", "Build / Run"],
                        ["c3", "별찍기"]
                    )
                ]
            },
            {
                name: "C++", id: "cp", prism: "cpp",
                topics: [
                    ...topics(
                        ["cp1", "Output"],
                        ["cp2", "Input"],
                        ["ref_cpp_types", "Variables & Types"],
                        ["ref_cpp_condition", "Condition"],
                        ["ref_cpp_loop", "Loop"],
                        ["ref_cpp_vector", "Vector / Map"],
                        ["ref_cpp_function", "Function"],
                        ["ref_cpp_class", "Class"],
                        ["ref_cpp_file", "File I/O"],
                        ["ref_cpp_build", "Build / Run"],
                        ["cp3", "별찍기"]
                    )
                ]
            },
            {
                name: "Python", id: "py", prism: "python",
                topics: [
                    ...topics(
                        ["py1", "Output"],
                        ["py2", "Input"],
                        ["ref_py_types", "Variables & Types"],
                        ["ref_py_condition", "Condition"],
                        ["ref_py_loop", "Loop"],
                        ["ref_py_collection", "List / Dict / Set"],
                        ["ref_py_function", "Function"],
                        ["ref_py_class", "Class"],
                        ["ref_py_file", "File I/O"],
                        ["ref_py_json", "JSON"],
                        ["ref_py_http", "HTTP Request"],
                        ["ref_py_exception", "Exception"],
                        ["ref_py_cli", "Command-line Args"],
                        ["ref_py_module", "Module / Package"],
                        ["py3", "별찍기"]
                    )
                ]
            },
            {
                name: "JavaScript", id: "js", prism: "javascript",
                topics: [
                    ...topics(
                        ["js1", "Output"],
                        ["js2", "Input"],
                        ["ref_js_types", "Variables & Types"],
                        ["ref_js_condition", "Condition"],
                        ["ref_js_loop", "Loop"],
                        ["ref_js_array", "Array / Object"],
                        ["ref_js_function", "Function"],
                        ["ref_js_class", "Class"],
                        ["ref_js_json", "JSON"],
                        ["ref_js_fetch", "Fetch / HTTP"],
                        ["ref_js_async", "Promise / async"],
                        ["ref_js_dom", "DOM"],
                        ["ref_js_module", "Module"],
                        ["js3", "별찍기"]
                    )
                ]
            },
            {
                name: "TypeScript", id: "ts", prism: "typescript",
                topics: [
                    ...topics(
                        ["ref_ts_types", "Types"],
                        ["ref_ts_interface", "Interface"],
                        ["ref_ts_function", "Function"],
                        ["ref_ts_class", "Class"],
                        ["ref_ts_async", "Async"]
                    )
                ]
            },
            {
                name: "Java", id: "j", prism: "java",
                topics: topics(["j1", "Output"], ["j2", "Input"], ["j3", "별찍기"])
            },
            {
                name: "Go", id: "g", prism: "go",
                topics: topics(["g1", "Output"], ["g2", "Input"], ["g3", "별찍기"])
            },
            {
                name: "Rust", id: "rs", prism: "rust",
                topics: topics(["rs1", "Output"], ["rs2", "Input"], ["rs3", "별찍기"])
            },
            {
                name: "Shell", id: "sh", prism: "bash",
                topics: topics(["sh1", "Output"], ["sh2", "Input"], ["sh3", "별찍기"])
            }
        ]
    },
    {
        group: "Other Languages",
        languages: [
            { name: "C#", id: "cs", prism: "csharp", topics: topics(["cs1", "Output"], ["cs2", "Input"], ["cs3", "별찍기"]) },
            { name: "Kotlin", id: "k", prism: "kotlin", topics: topics(["k1", "Output"], ["k2", "Input"], ["k3", "별찍기"]) },
            { name: "Scala", id: "s", prism: "scala", topics: topics(["s1", "Output"], ["s2", "Input"], ["s3", "별찍기"]) },
            { name: "PHP", id: "ph", prism: "php", topics: topics(["ph1", "Output"], ["ph2", "Input"], ["ph3", "별찍기"]) },
            { name: "Ruby", id: "r", prism: "ruby", topics: topics(["r1", "Output"], ["r2", "Input"], ["r3", "별찍기"]) },
            { name: "Perl", id: "pl", prism: "perl", topics: topics(["pl1", "Output"], ["pl2", "Input"], ["pl3", "별찍기"]) },
            { name: "Lua", id: "l", prism: "lua", topics: topics(["l1", "Output"], ["l2", "Input"], ["l3", "별찍기"]) },
            { name: "Haskell", id: "hs", prism: "haskell", topics: topics(["hs1", "Output"], ["hs2", "Input"], ["hs3", "별찍기"]) },
            { name: "Clojure", id: "cl", prism: "clojure", topics: topics(["cl1", "Output"], ["cl2", "Input"], ["cl3", "별찍기"]) },
            { name: "Elixir", id: "ex", prism: "elixir", topics: topics(["ex1", "Output"], ["ex2", "Input"], ["ex3", "별찍기"]) }
        ]
    },
    {
        group: "Scientific Computing",
        languages: [
            { name: "R", id: "str", prism: "r", topics: topics(["str1", "Output"], ["str2", "Input"], ["str3", "별찍기"]) },
            { name: "Julia", id: "jl", prism: "julia", topics: topics(["jl1", "Output"], ["jl2", "Input"], ["jl3", "별찍기"]) },
            { name: "Matlab", id: "mt", prism: "matlab", topics: topics(["mt1", "Output"], ["mt2", "Input"], ["mt3", "별찍기"]) }
        ]
    },
    {
        group: "Runtime / Library / Markup",
        languages: [
            { name: "Node.js", id: "ns", prism: "javascript", topics: topics(["ns1", "Basic Server"]) },
            { name: "jQuery", id: "jq", prism: "javascript", topics: topics(["jq1", "Output"], ["jq2", "Input"], ["jq3", "별찍기"]) },
            {
                name: "HTML", id: "h", prism: "markup",
                topics: [{ id: "h1", title: "Output" }, { id: "h2", title: "Input" }, { url: "star.html", title: "별찍기 알고리듬" }]
            },
            {
                name: "LaTeX", id: "lx", prism: "latex",
                topics: [{ id: "lx1", title: "Syntax" }, { url: "html-latex.html", title: "LaTeX in Web" }]
            },
            { name: "Markdown", id: "md", prism: "markdown", topics: topics(["md1", "Syntax"]) }
        ]
    }
];

$(function () {
    const $nav = $('#dynamic-nav');
    const $display = $('#content-display');

    languageConfig.forEach(group => {
        const $groupDiv = $('<div class="nav-group"></div>');
        $groupDiv.append($('<div class="nav-group-title"></div>').text(group.group));

        group.languages.forEach(lang => {
            const $langDiv = $('<div class="lang-item"></div>').attr('data-lang', lang.id);
            const $header = $('<div class="lang-header" role="button" tabindex="0"></div>')
                .append($('<span class="lang-name"></span>').text(lang.name))
                .append('<span class="lang-chevron" aria-hidden="true">▶</span>');
            const $topicList = $('<div class="topic-list"></div>');

            lang.topics.forEach(topic => {
                const $topic = $('<div class="topic-item" role="button" tabindex="0"></div>')
                    .text(topic.title)
                    .attr('data-lang-name', lang.name)
                    .attr('data-prism', lang.prism);

                if (topic.url) $topic.attr('data-url', topic.url);
                else $topic.attr('data-id', topic.id);

                $topicList.append($topic);
            });

            $langDiv.append($header, $topicList);
            $groupDiv.append($langDiv);
        });

        $nav.append($groupDiv);
    });

    function toggleLanguage($item) {
        $item.toggleClass('active');
    }

    $(document).on('click', '.lang-header', function () {
        toggleLanguage($(this).closest('.lang-item'));
    });

    $(document).on('keydown', '.lang-header', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleLanguage($(this).closest('.lang-item'));
        }
    });

    function activateTopic($topic) {
        const id = $topic.attr('data-id');
        const url = $topic.attr('data-url');
        const langName = $topic.attr('data-lang-name');
        const prismLang = $topic.attr('data-prism');
        const topicTitle = $topic.text().trim();

        $('.topic-item').removeClass('active');
        $topic.addClass('active');

        if (url) {
            window.location.href = url;
        } else {
            loadCode(id, langName, topicTitle, prismLang);
        }

        if ($(window).width() <= 900) {
            $('.code-sidebar').removeClass('open');
            $('#mobile-toggle').attr('aria-expanded', 'false');
        }
    }

    $(document).on('click', '.topic-item', function (e) {
        e.stopPropagation();
        activateTopic($(this));
    });

    $(document).on('keydown', '.topic-item', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activateTopic($(this));
        }
    });

    function normalizeLegacyCode(text, prism) {
        if (prism === 'markup' || prism === 'html') return text;

        return text
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#0?39;/g, "'")
            .replace(/&amp;/g, '&');
    }

    function loadCode(id, lang, topic, prism) {
        if (typeof codeData === 'undefined' || !codeData[id]) {
            $display.html('<div class="empty-message">아직 등록된 코드가 없습니다.</div>');
            return;
        }

        const rawCode = normalizeLegacyCode(codeData[id], prism);
        const html = `
            <div class="code-display-header">
                <div class="display-meta">
                    <span class="badge-lang">${escapeHtml(lang)}</span>
                    <span class="badge-topic">${escapeHtml(topic)}</span>
                </div>
                <button class="copy-btn" id="copy-btn" type="button">Copy Code</button>
            </div>
            <div class="code-container">
                <pre class="language-${prism}"><code class="language-${prism}">${escapeHtml(rawCode)}</code></pre>
            </div>
        `;

        $display.hide().html(html).fadeIn(180);

        if (window.Prism) {
            Prism.highlightAllUnder($display[0]);
        }

        $('#copy-btn').on('click', function () {
            copyToClipboard(rawCode, $(this));
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function escapeHtml(text) {
        return String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    async function copyToClipboard(text, $btn) {
        const originalText = $btn.text();

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                fallbackCopy(text);
            }
            $btn.text('Copied!').addClass('copied');
        } catch (error) {
            fallbackCopy(text);
            $btn.text('Copied!').addClass('copied');
        }

        setTimeout(() => {
            $btn.text(originalText).removeClass('copied');
        }, 1600);
    }

    function fallbackCopy(text) {
        const el = document.createElement('textarea');
        el.value = text;
        el.setAttribute('readonly', '');
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    $('#lang-search').on('input', function () {
        const term = $(this).val().trim().toLowerCase();

        $('.nav-group').each(function () {
            let visibleInGroup = 0;

            $(this).find('.lang-item').each(function () {
                const $item = $(this);
                const langName = $item.find('.lang-name').text().toLowerCase();
                const topicText = $item.find('.topic-item').map(function () {
                    return $(this).text();
                }).get().join(' ').toLowerCase();

                const matches = !term || langName.includes(term) || topicText.includes(term);
                $item.toggle(matches);

                if (matches) {
                    visibleInGroup++;
                    if (term && topicText.includes(term)) $item.addClass('active');
                }
            });

            $(this).toggle(visibleInGroup > 0);
        });
    });

    $('#mobile-toggle').on('click', function () {
        const $sidebar = $('.code-sidebar');
        const willOpen = !$sidebar.hasClass('open');

        $sidebar.toggleClass('open');
        $(this).attr('aria-expanded', String(willOpen));
    });
});
