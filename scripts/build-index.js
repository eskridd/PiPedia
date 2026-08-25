const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "wiki");
const pages = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.slice(0, -3))
  .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

const out = "wiki/pages.json";
fs.writeFileSync(path.join(dir, "pages.json"), JSON.stringify(pages, null, 2) + "\n");
console.log(`Wrote ${out} with ${pages.length} pages.`);
