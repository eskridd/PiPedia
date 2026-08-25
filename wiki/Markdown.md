# Markdown

**Markdown** is a plain-text formatting language invented by John Gruber, with help from Aaron Swartz, and released in 2004. The idea: writing should look readable as raw text, and convert cleanly into HTML when needed. Asterisks become *emphasis*, hashes become headings, and dashes become lists.

## Why it took over

Markdown is what you are reading right now: every PiPedia article, including this one, is a Markdown file rendered in your browser. The same syntax powers GitHub READMEs, Reddit posts, Discord messages, Notion pages, Stack Overflow answers, and most static site generators. Learning it once pays off nearly everywhere text can be written.

Its superpower is that it has almost no opinions about appearance. Markdown separates what things are (a heading, a list, a quote) from how they look, which happens to be exactly the separation wikis need.

## The essentials

| You type | Meaning |
|---|---|
| `# Heading one` | Top-level heading |
| `**bold**`, `*italic*` | Emphasis |
| `- item` | Unordered list |
| `1. item` | Ordered list |
| `[PiPedia](https://eskridd.github.io/PiPedia)` | Link |
| `![alt](image.png)` | Image |
| `` `code` `` | Inline code |

Block-level extras used on this site: fenced code blocks with triple backticks, tables built from pipes, blockquotes with `>`, and task lists like `- [x] done`.

## Dialects

The core spec (CommonMark, 2014) settled the ambiguities of the original implementation, while platforms add flavors on top. This site uses GitHub-Flavored Markdown plus two extensions: `[[wiki links]]` between articles, and LaTeX math through KaTeX with `$` and `$$`.

## By the numbers

| Measurement | Value |
|---|---|
| First release | March 2004 |
| Core punctuation characters used | fewer than 10 |
| Time to learn basics | about 5 minutes |

## See also

- [[How-to-Contribute]]: put Markdown skills to work here
- [[Open-Source]]: the ecosystem Markdown grew up in
- [[Tech]] for more articles like this
- [[Home]]
