const fs = require("fs");

const API = "https://api.github.com";

function headers(token) {
  return {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "User-Agent": "pipedia-issue-publisher"
  };
}

async function api(env, path, method = "GET", body = null) {
  const res = await fetch(API + path, {
    method,
    headers: headers(env.TOKEN),
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text.slice(0, 400)}`);
  }
  return res.status === 204 ? null : res.json();
}

async function comment(env, message) {
  await api(env, `/repos/${env.REPO}/issues/${env.ISSUE_NUMBER}/comments`, "POST", { body: message });
}

function parseSections(body) {
  const out = {};
  const re = /^###\s+(.+?)\s*\r?\n([\s\S]*?)(?=\r?\n###\s|\s*$)/gm;
  let m;
  while ((m = re.exec(body)) !== null) {
    out[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return out;
}

function safeFileName(title) {
  return title
    .replace(/[\\/:*?"<>|#%{}\[\]]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
}

(async () => {
  const env = {
    TOKEN: process.env.TOKEN,
    REPO: process.env.REPO,
    ISSUE_NUMBER: process.env.ISSUE_NUMBER,
    ISSUE_TITLE: process.env.ISSUE_TITLE,
    ISSUE_BODY: process.env.ISSUE_BODY,
    ISSUE_AUTHOR: process.env.ISSUE_AUTHOR
  };

  try {
    const sections = parseSections(env.ISSUE_BODY || "");
    const wanted =
      (sections["article title"] || env.ISSUE_TITLE.replace(/^new article[:\s]*/i, "")).trim();
    const md = sections["your article"] || sections["article"] || "";

    const name = safeFileName(wanted);
    if (!name || !md.trim()) {
      await comment(
        env,
        `I could not publish this one. Please make sure both fields are filled in:\n\n` +
          `- **Article title**: a short page name\n- **Your article**: the Markdown content starting with a \`#\` heading`
      );
      return;
    }

    const path = `wiki/${encodeURIComponent(name)}.md`;
    const existing = await fetch(`${API}/repos/${env.REPO}/contents/${path}`, {
      headers: headers(env.TOKEN)
    });
    if (existing.ok) {
      await comment(
        env,
        `An article named **${name}** already exists, so I did not overwrite it. Edit the existing page instead, or submit again with a different title.`
      );
      return;
    }

    const content =
      md.replace(/\r\n/g, "\n").replace(/\n+$/, "") +
      `\n\n---\n\n*Contributed by [@${env.ISSUE_AUTHOR}](https://github.com/${env.ISSUE_AUTHOR}) via issue #${env.ISSUE_NUMBER}.*\n`;

    await api(env, `/repos/${env.REPO}/contents/${path}`, "PUT", {
      message: `Publish "${name}" by @${env.ISSUE_AUTHOR} (issue #${env.ISSUE_NUMBER})`,
      content: Buffer.from(content).toString("base64")
    });

    await comment(
      env,
      `Published as **${name}**. Thank you! It will appear on the site and in search within a minute or two.`
    );
    await api(env, `/repos/${env.REPO}/issues/${env.ISSUE_NUMBER}`, "PATCH", { state: "closed" });
    console.log(`Published wiki/${name}.md from issue #${env.ISSUE_NUMBER}.`);
  } catch (err) {
    console.error(err.message);
    try {
      await comment(
        process.env,
        `Something went wrong while publishing this issue:\n\n\`\`\`\n${String(err.message).slice(0, 600)}\n\`\`\`\nA maintainer can take a look, or you can try submitting again.`
      );
    } catch {}
    process.exitCode = 1;
  }
})();
