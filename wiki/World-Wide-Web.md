# World Wide Web

The **World Wide Web** is the system of interlinked documents you are using right now. It was proposed in 1989 by Tim Berners-Lee at CERN so physicists could share papers easily, and it runs on three inventions working together: URLs to name things, HTTP to fetch them, and HTML to display them.

One clarification people trip over forever: the web and the internet are not the same thing. The internet is the plumbing (networks carrying packets); the web is one popular application riding on that plumbing, alongside email, games, and video calls.

## What happens when you open a page

1. Your browser asks a DNS resolver where `eskridd.github.io` lives
2. It opens a connection and negotiates encryption with the server
3. It sends an HTTP request like `GET /PiPedia/ HTTP/1.1`
4. The server responds with bytes describing the page (status, type, content)
5. The browser parses HTML, fetches CSS and JavaScript, and paints the result

All of that typically finishes in well under a second.

## By the numbers

| Measurement | Value |
|---|---|
| Proposal written at CERN | 1989 |
| First website | info.cern.ch, 1991 |
| Mosaic, the first popular browser | 1993 |
| Websites alive today | on the order of a billion |

## See also

- [[Encryption]]: the padlock icon your browser shows during step 2
- [[Markdown]]: a simpler cousin of the HTML this page renders
- [[Tech]] for more articles like this
- [[Home]]
