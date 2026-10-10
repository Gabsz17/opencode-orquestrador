// Pre-push check do orquestrador (manual ou via hook). Uso: npm run pre-push
import { execSync } from "node:child_process";
const patterns = ["ghp_", "github_pat_", "sk-", "AKIA", "BEGIN.*PRIVATE", "password"];
try {
  const diff = execSync("git diff --cached --stat", { encoding: "utf8" });
  console.log(diff || "(nada staged)");
  const staged = execSync("git diff --cached", { encoding: "utf8" });
  const hits = patterns.filter((p) => staged.includes(p));
  if (hits.length) { console.error(`BLOQUEADO: possível segredo no staged: ${hits.join(", ")}`); process.exit(1); }
  const status = execSync("git status --porcelain", { encoding: "utf8" });
  if (/^.. \.env$/m.test(status) || status.split("\n").some((l) => l.endsWith(" service.json"))) {
    console.error("BLOQUEADO: .env/service.json no stage"); process.exit(1);
  }
  console.log("pre-push: limpo");
} catch (e) { console.error(e.message); process.exit(1); }
