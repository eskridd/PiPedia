# PiPedia

A tiny wiki that anyone can edit. Every article is a plain Markdown file, the whole site is static, and hosting is free on GitHub Pages. No server, no database, no build step to babysit.

## How it works

The site is one HTML page plus a bit of JavaScript. When someone opens an article, the browser fetches `wiki/Article-Name.md`, renders the markdown, and handles wiki links, math (KaTeX), code highlighting, and search on the spot.

Editing happens three ways:

- **Edit** on any article opens that file in GitHub's editor
- **+ New page** opens GitHub's new-file editor with the filename filled in
- Anyone can open an issue with the **New article** template; a bot publishes it as a wiki page automatically, no fork or pull request needed

A small GitHub Action rebuilds the article index (`wiki/pages.json`) whenever someone adds or removes a `.md` file.

So contributing really is just: click, write markdown, submit.

## Put your own copy online

1. Fork or use this repository
2. Edit `js/config.js` and set `owner` and `repo` to yours
3. In the repo settings, open **Pages** and deploy from branch `main`, folder `/ (root)`

Your wiki appears at `https://YOUR_USERNAME.github.io/PiPedia/` in a minute or two, and that really is the whole setup.

## Writing articles

Create `wiki/Your-Article.md` however you prefer: the web editor, an issue template, or a git push. A few conventions worth following:

- Name files like `Famous-Circles.md` so URLs stay tidy
- Link between articles with `[[Double Brackets]]`
- Write math with `$inline$` or `$$display$$`
- New pages are indexed automatically after each push

## Local preview

Any static file server works:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. If you add pages without committing, run `node scripts/build-index.js` to refresh the index first.

## Project layout

```
index.html                        the whole app shell
css/style.css                     theme, light and dark
js/config.js                      site settings, set owner/repo here
js/app.js                         router, renderer, search, editor links
wiki/                             every article, as .md files
scripts/build-index.js            regenerates wiki/pages.json
scripts/publish-issue.js          turns article issues into wiki pages
.github/workflows/index.yml       keeps the index fresh on push
.github/workflows/publish-issue.yml  publishes article issues automatically
.github/ISSUE_TEMPLATE/           the no-fork submission form
.nojekyll                         tells Pages to serve raw files untouched
```

That's it. Open the site, hit Edit, and add something worth reading.
