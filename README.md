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

## AI policy

AI tools are welcome for research and for extending drafts you personally review, but whole AI-generated articles and AI passages with misleading or false information will be deleted. See [CONTRIBUTING.md](CONTRIBUTING.md) for the details.

## Writing articles

Create `wiki/Your-Article.md` however you prefer: the web editor, an issue template, or a git push. A few conventions worth following:

- Name files like `Famous-Circles.md` so URLs stay tidy
- Link between articles with `[[Double Brackets]]`
- Write math with `$inline$` or `$$display$$`
- New pages are indexed automatically after each push