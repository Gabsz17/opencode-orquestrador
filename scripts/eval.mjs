// Eval mínimo do comportamento (sem dependências). Uso: npm run eval
// Checa os 3 cenários de forma estática + 1 rodada real no piloto node-minimo.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let fails = 0;
const ok = (m) => console.log(`ok - ${m}`);
const fail = (m) => { fails++; console.error(`FAIL - ${m}`); };

// 1. debug-sistematico exige reprodução antes de hipótese?
{
  const t = readFileSync(join(root, "skills/debug-sistematico/SKILL.md"), "utf8");
  /Reproduza primeiro/.test(t) ? ok("eval bug-injetado: protocolo exige reprodução") : fail("debug-sistematico sem passo de reprodução");
  /3 tentativas/.test(t) ? ok("eval bug-injetado: limite 3 tentativas") : fail("debug sem limite anti-loop");
}
// 2. quebra-contrato: frontend não inventa, escala?
{
  const t = readFileSync(join(root, "agents/coord-frontend.md"), "utf8");
  /NÃO invente — escale ao orquestrador/.test(t) ? ok("eval quebra-contrato: frontend escala em vez de inventar") : fail("coord-frontend sem regra de escalação");
  const b = readFileSync(join(root, "agents/coord-backend.md"), "utf8");
  /não quebre contrato sozinho/.test(b) ? ok("eval quebra-contrato: backend não quebra contrato sozinho") : fail("coord-backend sem trava de contrato");
}
// 3. flake: zero sleep fixo?
{
  const t = readFileSync(join(root, "skills/testes-eficazes/SKILL.md"), "utf8");
  /nenhum `sleep` fixo/.test(t) ? ok("eval flake: zero sleep fixo") : fail("testes sem regra anti-flake");
}
// 4. rodada real: piloto node-minimo passa?
try {
  execSync("node --test test.mjs", { cwd: join(root, "templates/stacks/node-minimo"), stdio: "pipe" });
  ok("eval piloto: node-minimo verde");
} catch { fail("eval piloto: node-minimo quebrou"); }

if (fails) { console.error(`\neval: ${fails} falha(s)`); process.exit(1); }
console.log("\neval: 3/3 comportamentos + piloto verdes");
