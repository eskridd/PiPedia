# Git

**Git** is the distributed version control system that records every change to a project and lets any number of people work on it without stepping on each other. It was written in about ten weeks in 2005 by Linus Torvalds, who needed a replacement for a version control system he could no longer use, and who did not like any of the alternatives.

## Snapshots, not differences

Most systems store files as lists of changes. Git instead takes a snapshot of your whole project at each commit. If files have not changed between commits, Git does not store them again; it links back to the previous copy. This one design decision makes branching nearly free, which is why Git workflows branch constantly while older systems treated branches as expensive events.

Everything is checksummed with SHA hashes, so a commit cannot be altered or corrupted without Git noticing.

## The mental model

- **Working directory**: your actual files, mid-edit
- **Staging area**: what you have chosen to include in the next commit (git add)
- **Repository**: the permanent history (.git folder)
- **Remote**: someone else's copy of the repository to sync with (git push, git pull)

```bash
git init
git add README.md
git commit -m "Start the project"
git checkout -b fix-typo
git push origin fix-typo
```

## By the numbers

| Measurement | Value |
|---|---|
| Born | April 2005 |
| First self-hosted merge | days after creation |
| Objects stored as | blobs, trees, commits, tags |
| Largest known repositories | millions of commits |

## Why it won

Git is distributed: every clone contains the full history, so you can commit on a plane with no internet and merge later. Combined with free hosting platforms and cheap branching, it became the default for everything from homework assignments to the [[Linux]] kernel itself.

## See also

- [[Linux]], the project Git was built for
- [[Open-Source]]: the culture Git made easy to join
- [[Tech]] for more articles like this
- [[Home]]
