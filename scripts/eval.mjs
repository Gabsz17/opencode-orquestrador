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
// 5. modo estudos: 13+2 evals presentes como regra verificável?
{
  const t = readFileSync(join(root, "evals/estudos.md"), "utf8");
  for (const e of ["questao-falsa", "quiz-sem-gabarito", "lista-bloco-puro", "slide-sem-marp", "banco-pago", "nota-tri", "releitura", "nivel-falso", "score-baixo-avanca", "resposta-sem-contrato", "retorno-30-dias", "redacao-com-nota", "sessao-gigante", "reteste-identico", "simulado-bloco-puro"]) {
    t.includes(`\`${e}\``) ? ok(`eval estudos: ${e}`) : fail(`evals/estudos.md sem cenário ${e}`);
  }
  const q = readFileSync(join(root, "agents/enem-questoes.md"), "utf8");
  /NUNCA invente/.test(q) ? ok("eval questao-falsa: worker proíbe questão oficial inventada") : fail("enem-questoes sem trava anti-questão-falsa");
  const a = readFileSync(join(root, "agents/coord-avaliacao.md"), "utf8");
  /BLOQUEADO \+ plano de reaprendizagem/.test(a) ? ok("eval score-baixo-avanca: gate BLOQUEADO existe") : fail("coord-avaliacao sem gate de score");
  const f = readFileSync(join(root, "agents/aval-feedback.md"), "utf8");
  /2ª correção só do que mudou/.test(f) ? ok("eval redacao: reescrita com 2ª correção") : fail("aval-feedback sem reescrita");
}
// 6. judge piloto (rubrica estática 0-3 por eixo; LLM-judge real = H2 — sem runner de modelo neste repo)
{
  const rub = (nome, crits) => {
    let s = 0;
    for (const [label, re, file] of crits) {
      const t = readFileSync(join(root, file), "utf8");
      re.test(t) ? (s++, ok(`judge ${nome}: ${label}`)) : fail(`judge ${nome}: falta ${label} em ${file}`);
    }
    console.log(`judge ${nome}: score ${s}/${crits.length}`);
  };
  rub("redacao", [["c1-c5", /C1.C5/, "agents/aval-feedback.md"], ["reescrita", /reescrita/i, "agents/aval-feedback.md"], ["modo-rapido", /modo.rápido/i, "agents/aval-feedback.md"]]);
  rub("quiz", [["gabarito-separado", /gabarito separado/i, "agents/aval-quiz.md"], ["variacao-reteste", /enunciado NOVO/i, "agents/aval-quiz.md"], ["contrato-resposta", /respostas-<modulo>/, "agents/aval-quiz.md"]]);
  rub("anti-alucinacao", [["nunca-invente", /NUNCA invente/i, "agents/enem-questoes.md"], ["autoral", /autoral/i, "agents/enem-questoes.md"], ["citacao-completa", /caderno\/cor/i, "agents/enem-questoes.md"]]);
}

if (fails) { console.error(`\neval: ${fails} falha(s)`); process.exit(1); }
console.log("\neval: comportamentos + piloto verdes");
