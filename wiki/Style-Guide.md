# Style Guide

These are the writing habits that make PiPedia articles feel like they belong to the same encyclopedia. Nothing here is enforced by software, but editors do lean on it when reviewing, so following it keeps everyone's job pleasant.

## Naming and files

- Name files in Title-Case-With-Hyphens: `Famous-Circles.md`, `Regular-Expressions.md`
- Make the first heading match the filename: `# Famous Circles`
- Keep one topic per article. If a page sprawls into three subjects, split it and link the pieces together

## Structure that works

Most strong articles here follow the same shape:

1. **Lead paragraph**: say what the thing is and why anyone should care, in two or three sentences, with no throat clearing
2. **Sections**: break the body into h2 sections that answer natural questions like how it works, where it came from, and what it is good for
3. **Tables** wherever facts come in pairs: values, dates, comparisons
4. **See also**: close with links to related pages

A reader who knows nothing should finish the lead paragraph already knowing something useful. A reader who wants depth should find it below without hunting for it.

## Voice and tone

- Write like a knowledgeable friend explaining things, not like a textbook and definitely not like a brochure
- Plain words beat jargon. When a technical term earns its place, define it casually on first use
- Dry humor is welcome. Inaccuracy is not
- Short sentences carry weight. Long ones carry nuance. Use both, just not at the same time
- Saying "we are not sure" is fine. Honest hedging reads better than false confidence every single time

## Accuracy

- Verify claims against sources you have actually opened, especially numbers, dates, and names
- Prefer "roughly" or "as of 2026" over precision you cannot back up
- Popular myths deserve correction rather than repetition, and several existing articles do exactly that. Steal the habit
- Code samples must run. Paste them into a terminal before submitting anything

## Linking

- Wrap article titles in double brackets: `[[Linux]]`, or `[[About-Pi|pi]]` when you want different link text
- Link the first mention of a topic that has its own article, then let it go
- External links are welcome for primary sources, papers, and tools

## Formatting quick rules

- Math goes inside `$inline$` or `$$display$$` delimiters
- Code blocks declare their language: ```` ```python ````, ```` ```js ````, ```` ```bash ````
- Prefer tables over comma lists when comparing things
- Checkboxes, blockquotes, and kbd tags all render. [[Markdown]] documents the full toolbox

## Categories

Add new articles to a category hub table, meaning [[Tech]], [[Birds]], [[Wild-Animals]], [[Sea-Life]], or [[Math]], along with a one sentence summary in the right column. Cross-listing in two categories is fine when an article genuinely belongs in both.

## What gets edited or reverted

- Misinformation gets corrected or removed no matter how nicely it was written
- Whole AI-generated articles get deleted. The reasoning lives in [CONTRIBUTING.md](https://github.com/eskridd/PiPedia/blob/main/CONTRIBUTING.md)
- Plagiarism gets removed, and repeat offenders get blocked

## Before you hit submit

Read the article out loud once and fix whatever makes you stumble. Preview the rendered page and click every link. That five minute pass catches most of what reviewers would otherwise fix for you.

## See also

- [[How-to-Contribute]]: the mechanics of publishing
- [[FAQ]]: answers to common questions
- [[Sandbox]]: a safe place to practice
- [[Markdown]]: formatting reference
