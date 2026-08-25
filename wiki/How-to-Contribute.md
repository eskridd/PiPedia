# How to Contribute

Anyone can add or improve an article here. Everything on the site is a Markdown file in the `wiki/` folder, and you edit those files right in your browser through GitHub. No coding, no tools to install, nothing to configure.

## Add a brand new article (about two minutes)

1. Click the **+ New page** button at the top of any PiPedia page
2. Sign in to GitHub (a free account is all you need)
3. GitHub opens its editor with your file already named, for example `wiki/My-Article.md`
4. Write your article in Markdown (cheat sheet below)
5. Click **Commit changes**, add a short message like *Add article about circles*, and save it to `main`

That's genuinely all there is to it. A minute or two later the [automatic index](https://github.com/eskridd/PiPedia/actions) rebuilds itself, and your article shows up in search, listings, and the article count.

## Edit an existing article (about a minute)

1. Open the article you want to improve
2. Click the **Edit** button in the toolbar above it
3. Make your changes and preview them right there in the GitHub editor
4. Hit **Commit changes**, and you're done

## Formatting cheat sheet

| You type | You get |
|---|---|
| `# Title` / `## Section` | Headings |
| `**bold**` and `*italic*` | **bold** and *italic* |
| `[[Page-Name]]` | Wiki link to another article |
| `[GitHub](https://github.com)` | External link |
| `$E = mc^2$` | Inline math: $E = mc^2$ |
| `$$\int_0^1 x\,dx = \tfrac12$$` | Display math |
| ``` `code` ``` | Inline code |
| ```` ```python … ``` ```` | Syntax-highlighted code block |
| `\| a \| b \|` rows | Table |
| `- item` | Bullet list |
| `> quote` | Blockquote |

## A few friendly guidelines

- Name your files in Title-Case-With-Hyphens, like `Famous-Circles.md`. Spaces work too, but hyphens keep URLs tidy
- Link generously. If you mention another article, wrap its title in `[[double brackets]]`
- Keep one topic per article, and split big subjects into smaller pages
- Be accurate and kind. This is a shared encyclopedia, not a battleground
- Want to experiment first? The [[Sandbox]] is there exactly for that

## What happens after I commit?

PiPedia is fully static. There is no database and no server doing the work, just files. Whenever someone adds or removes a `.md` file, a small GitHub Action regenerates `wiki/pages.json`, which is simply the list of articles. The site reads that list to power search and navigation.

If your change doesn't show up within a few minutes, peek at the repository's **Actions** tab and check whether the index job ran cleanly.

## See also

- [[Setup-Guide]]: run your own PiPedia
- [[Sandbox]]: try formatting here first
- [[Home]]
