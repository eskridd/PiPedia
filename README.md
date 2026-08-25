# PiPedia

A tiny wiki that anyone can edit. Every article is a plain Markdown file, the whole site is static, and hosting is free on GitHub Pages. No server, no database, no build step to babysit.

## How it works

The site is one HTML page plus a bit of JavaScript. When someone opens an article, the browser fetches `wiki/Article-Name.md`, renders the markdown, and handles wiki links, math (KaTeX), code highlighting, and search on the spot.

Editing happens through GitHub itself:

- **Edit** on any article opens that file in GitHub's editor
- **+ New page** opens GitHub's new-file editor with the filename filled in
- A small GitHub Action rebuilds the article index (`wiki/pages.json`) whenever someone adds or removes a `.md` file

So contributing really is just: click, write markdown, commit.