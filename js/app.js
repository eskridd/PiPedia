(function () {
  "use strict";

  const CFG = window.PI_CONFIG;
  const $ = (id) => document.getElementById(id);

  const els = {
    article: $("article"),
    sourceView: $("sourceView"),
    toc: $("toc"),
    tocCard: document.querySelector(".toc-card"),
    crumb: $("crumb"),
    editLink: $("editLink"),
    historyLink: $("historyLink"),
    sourceBtn: $("sourceBtn"),
    foot: $("foot"),
    countBadge: $("countBadge"),
    searchInput: $("searchInput"),
    searchResults: $("searchResults"),
    randomBtn: $("randomBtn"),
    randomLink: $("randomLink"),
    newBtn: $("newBtn"),
    themeBtn: $("themeBtn"),
    ghLink: $("ghLink"),
    cfgBanner: $("cfgBanner"),
    brandName: $("brandName"),
    brandTag: $("brandTag"),
    hljsCss: $("hljsCss")
  };

  const state = {
    pages: [],
    cache: new Map(),
    index: null,
    tocObserver: null,
    selIdx: -1
  };

  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const gh = {
    repo: `https://github.com/${CFG.owner}/${CFG.repo}`,
    file: (n) => `${CFG.wikiDir}/${encodeURIComponent(n)}.md`,
    edit: (n) => `${gh.repo}/edit/${CFG.branch}/${gh.file(n)}`,
    history: (n) => `${gh.repo}/commits/${CFG.branch}/${gh.file(n)}`,
    blob: (n) => `${gh.repo}/blob/${CFG.branch}/${gh.file(n)}`,
    newPage: (n) => `${gh.repo}/new/${CFG.branch}?filename=${CFG.wikiDir}/${encodeURIComponent((n || "") )}.md`
  };

  const variantsOf = (name) => {
    const seen = new Set();
    const list = [name, name.replace(/_/g, " "), name.replace(/-/g, " "), name.replace(/ /g, "-")];
    return list.filter((v) => v && !seen.has(v) && seen.add(v));
  };

  async function fetchText(url) {
    try {
      const r = await fetch(url);
      if (!r.ok) return null;
      return await r.text();
    } catch {
      return null;
    }
  }

  async function getMarkdown(name) {
    if (state.cache.has(name)) return state.cache.get(name);
    const txt = await fetchText(`${CFG.wikiDir}/${encodeURIComponent(name)}.md`);
    if (txt !== null) state.cache.set(name, txt);
    return txt;
  }

  async function loadManifest() {
    let pages = null;
    try {
      const r = await fetch(`${CFG.wikiDir}/pages.json`);
      if (r.ok) pages = await r.json();
    } catch {}
    state.pages = Array.isArray(pages) && pages.length ? pages : ["Home"];
    if (!state.pages.includes("Home")) state.pages.unshift("Home");
    els.countBadge.textContent = state.pages.length;
    renderFoot();
  }

  function prepareMarkdown(src) {
    const codeStore = [];
    src = src.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~|`[^`\n]+`/g, (m) => {
      codeStore.push(m);
      return `%%PIPCODE${codeStore.length - 1}%%`;
    });

    const mathStore = [];
    const grabMath = (m) => {
      mathStore.push(m);
      return `%%PIPIMATH${mathStore.length - 1}%%`;
    };
    src = src.replace(/\$\$[\s\S]+?\$\$/g, grabMath);
    src = src.replace(/\$(?!\s)(?:\\.|[^$\\\n])+(?<!\s)\$/g, grabMath);

    src = src.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, target, label) =>
      `[${label.trim()}](#/${encodeURIComponent(target.trim())})`
    );
    src = src.replace(/\[\[([^\]]+)\]\]/g, (_, target) =>
      `[${target.trim()}](#/${encodeURIComponent(target.trim())})`
    );

    src = src.replace(/%%PIPCODE(\d+)%%/g, (_, i) => codeStore[i]);

    return { src, mathStore };
  }

  const escapeHtmlForMath = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

  function renderHtml(md) {
    try {
      const { src, mathStore } = prepareMarkdown(md);
      let html = marked.parse(src, { gfm: true, breaks: true });
      html = html.replace(/%%PIPIMATH(\d+)%%/g, (_, i) => escapeHtmlForMath(mathStore[i]));
      return DOMPurify.sanitize(html);
    } catch {
      return '<pre class="raw-fallback">' + escapeHtmlForMath(md) + "</pre>";
    }
  }

  function slugify(text, used) {
    let base = text.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/\s+/g, "-");
    if (!base) base = "section";
    let id = base;
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  }

  function postProcess(root) {
    root.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (/^https?:/i.test(href)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      } else if (!href.startsWith("#")) {
        a.setAttribute("href", "#/" + href.replace(/\.md$/i, ""));
      }
    });
    root.querySelectorAll("img[src]").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!/^(https?:|data:|\/\/)/i.test(src)) img.setAttribute("src", `${CFG.wikiDir}/${src}`);
      img.setAttribute("loading", "lazy");
    });
    root.querySelectorAll("table").forEach((t) => {
      if (t.parentElement && t.parentElement.classList.contains("table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
  }

  function highlightCode(root) {
    if (!window.hljs) return;
    root.querySelectorAll("pre code").forEach((block) => {
      if (block.dataset.hl) return;
      block.dataset.hl = "1";
      try {
        window.hljs.highlightElement(block);
      } catch {}
    });
  }

  function renderMath(root) {
    if (typeof renderMathInElement !== "function") return;
    try {
      renderMathInElement(root, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    } catch {}
  }

  function buildToc(root) {
    const used = new Set();
    const headings = Array.from(root.querySelectorAll("h2, h3, h4"));
    headings.forEach((h) => {
      h.id = slugify(h.textContent, used);
    });
    if (state.tocObserver) state.tocObserver.disconnect();

    els.toc.innerHTML = "";
    if (!headings.length) {
      els.tocCard.classList.add("hidden-card");
      return;
    }
    els.tocCard.classList.remove("hidden-card");

    headings.forEach((h) => {
      const li = document.createElement("li");
      li.className = h.tagName === "H3" ? "lv3" : h.tagName === "H4" ? "lv4" : "";
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      a.addEventListener("click", (e) => {
        e.preventDefault();
        h.scrollIntoView();
        setActiveTocLink(a);
      });
      li.appendChild(a);
      els.toc.appendChild(li);
    });

    if ("IntersectionObserver" in window) {
      const links = Array.from(els.toc.querySelectorAll("a"));
      state.tocObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const idx = headings.indexOf(en.target);
            if (idx >= 0) setActiveTocLink(links[idx]);
          });
        },
        { rootMargin: "0px 0px -72% 0px", threshold: 0 }
      );
      headings.forEach((h) => state.tocObserver.observe(h));
    }
  }

  function setActiveTocLink(link) {
    els.toc.querySelectorAll("a.active").forEach((el) => el.classList.remove("active"));
    if (link) link.classList.add("active");
  }

  async function loadLastEdit(name, metaEl) {
    try {
      const r = await fetch(
        `https://api.github.com/repos/${CFG.owner}/${CFG.repo}/commits?path=${gh.file(name)}&per_page=1`
      );
      if (!r.ok) return;
      const data = await r.json();
      if (!Array.isArray(data) || !data.length) return;
      const c = data[0];
      const date = new Date(c.commit.committer.date);
      const when = date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
      const author = c.author ? c.author.login : c.commit.author.name;
      const avatar = c.author && c.author.avatar_url ? `<img class="avatar" src="${esc(c.author.avatar_url)}&s=40" alt="">` : "";
      const who = c.author
        ? `<a href="${esc(c.author.html_url)}" target="_blank" rel="noopener">${avatar}${esc(author)}</a>`
        : `${avatar}${esc(author)}`;
      const sha = `<a href="${esc(c.html_url)}" target="_blank" rel="noopener">${when}</a>`;
      metaEl.innerHTML = `<span>Last edited ${sha} by ${who}</span>`;
      addDot(metaEl);
    } catch {}
  }

  function addDot(metaEl) {
    const dot = document.createElement("span");
    dot.className = "dot";
    metaEl.insertBefore(dot, metaEl.firstChild);
  }

  function wordCount(md) {
    return md.split(/\s+/).filter(Boolean).length;
  }

  function showPage(rawName) {
    const attempts = variantsOf(rawName);
    (async () => {
      for (const name of attempts) {
        const md = await getMarkdown(name);
        if (md === null) continue;
        renderArticle(name, md);
        return;
      }
      renderNotFound(attempts[0]);
    })();
  }

  function clearMetaBar() {
    document.querySelectorAll(".meta-line").forEach((el) => el.remove());
  }

  function renderArticle(name, md) {
    closeSearch();
    hideSource();
    clearMetaBar();
    document.title = `${name} · ${CFG.title}`;
    els.crumb.innerHTML = `wiki / <b>${esc(name)}</b>`;
    els.article.className = "";
    els.article.innerHTML = renderHtml(md);
    postProcess(els.article);
    highlightCode(els.article);
    renderMath(els.article);
    buildToc(els.article);
    els.sourceView.textContent = md;

    els.editLink.href = gh.edit(name);
    els.historyLink.href = gh.history(name);

    const bar = document.createElement("div");
    bar.className = "meta-line";
    bar.innerHTML =
      `<span>${wordCount(md).toLocaleString()} words</span>` +
      `<span>· <a href="${esc(gh.blob(name))}" target="_blank" rel="noopener">view on GitHub</a></span>`;
    els.article.parentNode.insertBefore(bar, els.article);

    loadLastEdit(name, bar);
    window.scrollTo({ top: 0 });
  }
  function renderNotFound(name) {
    closeSearch();
    hideSource();
    clearMetaBar();
    document.title = `Not found · ${CFG.title}`;
    els.crumb.innerHTML = `wiki / <b>${esc(name)}</b>`;
    els.article.className = "";
    buildToc(els.article);
    const suggestions = suggestPages(name);
    els.article.innerHTML = `
      <div class="notfound">
        <div class="pi-big">π</div>
        <h2>Nobody has written "${esc(name)}" yet</h2>
        <p>You could be the first. It takes about two minutes, and there is nothing to install.</p>
        <div class="row">
          <a class="btn primary" href="${esc(gh.newPage(name))}" target="_blank" rel="noopener">Create "${esc(name)}"</a>
          <button class="btn ghost" id="nfSearch">Search similar pages</button>
        </div>
      </div>`;
    const btn = els.article.querySelector("#nfSearch");
    if (btn)
      btn.addEventListener("click", () => {
        els.searchInput.value = name;
        runSearch(name);
        window.scrollTo({ top: 0 });
        els.searchInput.focus();
      });
    if (suggestions.length) {
      const div = document.createElement("div");
      div.className = "nf-suggest";
      div.innerHTML =
        `<h4>Did you mean…</h4>` +
        `<ul class="page-list">` +
        suggestions.map((p) => `<li><a href="#/${encodeURIComponent(p)}">${esc(p)}</a></li>`).join("") +
        `</ul>`;
      els.article.querySelector(".notfound").appendChild(div);
    }
    els.editLink.removeAttribute("href");
    els.historyLink.removeAttribute("href");
    window.scrollTo({ top: 0 });
  }

  function suggestPages(name) {
    const q = name.toLowerCase();
    const words = q.split(/[\s-_]+/).filter((w) => w.length > 2);
    return state.pages
      .filter((p) => {
        const lp = p.toLowerCase();
        return p !== name && (words.some((w) => lp.includes(w)) || lp.includes(q));
      })
      .slice(0, 8);
  }

  function renderAll() {
    closeSearch();
    hideSource();
    clearMetaBar();
    document.title = `All articles · ${CFG.title}`;
    els.crumb.innerHTML = `wiki / <b>All articles</b>`;
    buildToc(els.article);
    const groups = {};
    state.pages.forEach((p) => {
      const letter = (p[0] || "?").toUpperCase();
      (groups[letter] = groups[letter] || []).push(p);
    });
    const letters = Object.keys(groups).sort();
    els.article.className = "allpages";
    els.article.innerHTML =
      `<h1>All articles</h1><p class="ap-count">${state.pages.length} articles and growing. Add yours in two minutes.</p>` +
      letters
        .map(
          (l) =>
            `<h2>${esc(l)}</h2><ul class="page-list">` +
            groups[l].map((p) => `<li><a href="#/${encodeURIComponent(p)}">${esc(p)}</a></li>`).join("") +
            `</ul>`
        )
        .join("");
    const create = document.createElement("p");
    create.style.marginTop = "2em";
    create.innerHTML = `<a class="btn primary" href="${esc(gh.newPage(""))}" target="_blank" rel="noopener">+ Create a new article</a>`;
    els.article.appendChild(create);
    els.editLink.removeAttribute("href");
    els.historyLink.removeAttribute("href");
    window.scrollTo({ top: 0 });
  }

  function hideSource() {
    els.sourceView.hidden = true;
    els.sourceBtn.textContent = "Source";
  }

  function toggleSource() {
    const showing = !els.sourceView.hidden;
    els.sourceView.hidden = showing;
    els.sourceBtn.textContent = showing ? "Source" : "Rendered";
  }

  async function ensureIndex() {
    if (state.index) return state.index;
    const entries = await Promise.all(
      state.pages.map(async (p) => {
        let raw = state.cache.get(p);
        if (raw == null) raw = (await getMarkdown(p)) || "";
        return { title: p, lowerTitle: p.toLowerCase(), text: raw.toLowerCase(), raw };
      })
    );
    state.index = entries;
    return entries;
  }

  function snippet(text, pos, len) {
    const start = Math.max(0, pos - 42);
    const end = Math.min(text.length, pos + len + 60);
    return (start > 0 ? "…" : "") + text.slice(start, end).replace(/\s+/g, " ").trim() + (end < text.length ? "…" : "");
  }

  function markSnippet(snip, query) {
    const safe = esc(snip);
    const q = esc(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return safe.replace(new RegExp(q, "gi"), (m) => `<mark>${m}</mark>`);
  }

  async function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) {
      closeSearch();
      return;
    }
    const index = await ensureIndex();
    const results = [];
    for (const e of index) {
      let score = 0;
      let pos = -1;
      if (e.lowerTitle.startsWith(q)) score += 120;
      else if (e.lowerTitle.includes(q)) score += 70;
      pos = e.text.indexOf(q);
      if (pos >= 0) score += 20;
      else if (score === 0) continue;
      results.push({ title: e.title, score, snip: pos >= 0 ? snippet(e.text, pos, q.length) : "" });
    }
    results.sort((a, b) => b.score - a.score);
    showResults(results.slice(0, 12), query);
  }

  function showResults(results, query) {
    state.selIdx = -1;
    if (!results.length) {
      els.searchResults.innerHTML =
        `<div class="sr-empty">Nothing found for "<b>${esc(query)}</b>" yet.<br>` +
        `<a class="btn small primary" href="${esc(gh.newPage(query))}" target="_blank" rel="noopener">Create "${esc(query)}"</a></div>`;
    } else {
      els.searchResults.innerHTML = results
        .map(
          (r, i) =>
            `<a class="sr-item" data-page="${esc(r.title)}" href="#/${encodeURIComponent(r.title)}">` +
            `<span class="t">${markSnippet(r.title, query)}</span>` +
            (r.snip ? `<span class="s">${markSnippet(r.snip, query)}</span>` : "") +
            `</a>`
        )
        .join("");
    }
    els.searchResults.hidden = false;
  }

  function closeSearch() {
    els.searchResults.hidden = true;
    state.selIdx = -1;
  }

  function moveSel(dir) {
    const items = Array.from(els.searchResults.querySelectorAll(".sr-item"));
    if (!items.length) return;
    items.forEach((i) => i.classList.remove("sel"));
    state.selIdx = (state.selIdx + dir + items.length) % items.length;
    items[state.selIdx].classList.add("sel");
    items[state.selIdx].scrollIntoView({ block: "nearest" });
  }

  function goRandom() {
    if (!state.pages.length) return;
    const pick = state.pages[Math.floor(Math.random() * state.pages.length)];
    location.hash = "#/" + encodeURIComponent(pick);
  }

  function promptNewPage(prefill) {
    const title = (window.prompt("New article title:", prefill || "") || "").trim().replace(/\//g, "");
    if (!title) return;
    window.open(gh.newPage(title), "_blank", "noopener");
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("pipedia-theme", theme);
    if (els.hljsCss) {
      els.hljsCss.href =
        `https://cdn.jsdelivr.net/npm/@highlightjs/cdn-assets@11.9.0/styles/` +
        (theme === "dark" ? "github-dark.min.css" : "github.min.css");
    }
  }

  function route() {
    const hash = location.hash;
    if (hash && !hash.startsWith("#/")) return;
    let page = decodeURIComponent(hash.replace(/^#\//, "")).trim();
    if (!page) page = "Home";
    document.querySelectorAll(".navlist a").forEach((a) => a.classList.toggle("active-link", false));
    if (page === "all") renderAll();
    else showPage(page);
  }

  function renderFoot() {
    els.foot.innerHTML =
      `Powered by <span class="pi-foot">π</span> · ${state.pages.length} article${state.pages.length === 1 ? "" : "s"} · ` +
      `Hosted on GitHub Pages · <a href="${esc(gh.repo)}" target="_blank" rel="noopener">Contribute on GitHub</a>`;
  }

  function bindEvents() {
    window.addEventListener("hashchange", route);

    els.themeBtn.addEventListener("click", () => {
      applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
    });

    els.randomBtn.addEventListener("click", goRandom);
    els.randomLink.addEventListener("click", (e) => {
      e.preventDefault();
      goRandom();
    });

    els.newBtn.addEventListener("click", () => promptNewPage());

    els.sourceBtn.addEventListener("click", toggleSource);

    let debounceTimer;
    els.searchInput.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => runSearch(els.searchInput.value), 130);
    });
    els.searchInput.addEventListener("focus", () => runSearch(els.searchInput.value));
    els.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveSel(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveSel(-1);
      } else if (e.key === "Enter") {
        const items = els.searchResults.querySelectorAll(".sr-item");
        const target = items[state.selIdx >= 0 ? state.selIdx : 0];
        if (target) {
          location.hash = target.getAttribute("href");
          closeSearch();
          els.searchInput.blur();
        }
      } else if (e.key === "Escape") {
        closeSearch();
        els.searchInput.blur();
      }
    });
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".searchwrap")) closeSearch();
    });
    els.searchResults.addEventListener("click", () => setTimeout(closeSearch, 50));

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        els.searchInput.focus();
      }
    });

    if (/YOUR_USERNAME/.test(CFG.owner)) els.cfgBanner.hidden = false;
  }

  function init() {
    document.title = `${CFG.title} · ${CFG.tagline}`;
    els.brandName.textContent = CFG.title;
    els.brandTag.textContent = CFG.tagline;
    els.ghLink.href = gh.repo;
    applyTheme(localStorage.getItem("pipedia-theme") || "dark");
    bindEvents();
    loadManifest().then(route);
  }

  if (window.marked) marked.use({ gfm: true, breaks: true });
  init();
})();
