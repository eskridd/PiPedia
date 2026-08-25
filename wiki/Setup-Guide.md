# Setup Guide

You can have your own PiPedia running in about five minutes. All you need is a free GitHub account.

## 1. Create the repository

Fork or [use this template](https://github.com/eskridd/PiPedia) to make your own copy of PiPedia on GitHub. Keep the name `PiPedia` or pick whatever you like.

## 2. Point the site at your repository

Open `js/config.js` and fill in your details:

```js
window.PI_CONFIG = {
  title: "PiPedia",
  tagline: "The Free π Encyclopedia",
  owner: "YOUR_USERNAME",
  repo: "PiPedia",
  branch: "main",
  wikiDir: "wiki"
};
```

Change `owner` to your GitHub username and `repo` to your repository name. This one change wires up every Edit, History, New page, and GitHub button on the site.

## 3. Enable GitHub Pages

1. In your repository, open **Settings → Pages**
2. Under *Build and deployment*, set **Source: Deploy from a branch**
3. Choose branch `main`, folder `/ (root)`, then save

Your wiki goes live at:

```
https://YOUR_USERNAME.github.io/PiPedia/
```

The first deployment takes a minute or two. The `.nojekyll` file in the project root makes sure GitHub serves your raw `.md` files untouched.

## 4. Start writing

- Click **+ New page** on your live site to add articles
- The included GitHub Action (*Build wiki index*) keeps `wiki/pages.json` fresh automatically whenever articles come and go
- If you ever rename your default branch, update `branch` in `config.js` to match

## Local preview (optional)

Any static file server will do. From the project root:

```bash
python3 -m http.server 8080
```

Then open <http://localhost:8080>. One note: search and the article count read from `wiki/pages.json`, so if you add pages locally without committing, run `node scripts/build-index.js` to refresh it yourself.

## Troubleshooting

| Problem | Fix |
|---|---|
| Pages show 404 but files exist | Confirm `.nojekyll` exists at the repo root |
| Article count or search looks stale | Check the **Actions** tab and rerun *Build wiki index* |
| Edit buttons go nowhere | Make sure `owner`, `repo`, and `branch` in `js/config.js` match your repo |
| Math not rendering | KaTeX loads from a CDN; check your network or adblocker |

## See also

- [[How-to-Contribute]]
- [[Home]]
