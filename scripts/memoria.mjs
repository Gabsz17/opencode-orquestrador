// Busca local na memória. Uso: npm run memoria -- <termo>
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const q = (process.argv[2] ?? "").toLowerCase();
if (!q) { console.log("uso: npm run memoria -- <termo>"); process.exit(0); }
const files = [join(root, ".opencode/memory/MEMORIA.md")];
const inbox = join(root, ".opencode/memory/inbox");
if (existsSync(inbox)) for (const f of readdirSync(inbox).filter((f) => f.endsWith(".md"))) files.push(join(inbox, f));
let hits = 0;
for (const f of files) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((line, i) => {
    if (line.toLowerCase().includes(q)) { console.log(`${f.split("opencode")[1]}:${i + 1}: ${line.trim()}`); hits++; }
  });
}
console.log(hits ? `\n${hits} achado(s) para "${q}"` : `nada para "${q}"`);
