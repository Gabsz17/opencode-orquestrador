// Validação do sistema orquestrador (sem dependências).
// Uso: npm run validate
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const ok = (msg) => console.log(`ok - ${msg}`);
const fail = (msg) => { errors.push(msg); console.error(`FAIL - ${msg}`); };

// 1. Arquivos obrigatórios
for (const f of ["opencode.jsonc", "README.md", ".env.example", "templates/PLANO.md", "templates/API.md", ".opencode/memory/MEMORIA.md"]) {
  existsSync(join(root, f)) ? ok(`existe ${f}`) : fail(`faltando ${f}`);
}

// 2. opencode.jsonc parseável (remove comentários //) e com base segura
try {
  const raw = readFileSync(join(root, "opencode.jsonc"), "utf8").replace(/^\s*\/\/.*$/gm, "");
  const cfg = JSON.parse(raw);
  cfg.default_agent === "orquestrador" ? ok("default_agent=orquestrador") : fail("opencode.jsonc sem default_agent=orquestrador");
  const bash = cfg?.permission?.bash ?? {};
  const denies = ["git push --force*", "rm -rf*"].every((k) => bash[k] === "deny");
  denies ? ok("base segura nega force-push/rm-rf") : fail("opencode.jsonc sem deny de force-push/rm-rf");
  cfg?.permission?.external_directory === "deny" ? ok("external_directory=deny") : fail("opencode.jsonc sem external_directory=deny");
} catch (e) { fail(`opencode.jsonc inválido: ${e.message}`); }

// 3. Frontmatter dos agents + task allow x arquivos reais
const agentsDir = join(root, "agents");
const agentFiles = new Set(readdirSync(agentsDir).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, "")));
for (const file of readdirSync(agentsDir).filter((f) => f.endsWith(".md"))) {
  const text = readFileSync(join(agentsDir, file), "utf8");
  if (!text.startsWith("---")) { fail(`${file} sem frontmatter`); continue; }
  const fm = text.split("---")[1] ?? "";
  if (!/description:/.test(fm)) fail(`${file} sem description`);
  if (!/mode:\s*(primary|subagent)/.test(fm)) fail(`${file} sem mode primary/subagent`);
  // task allow deve apontar para agent existente
  for (const m of fm.matchAll(/"([a-z0-9-]+)":\s*allow/g)) {
    const name = m[1];
    if (name === "*") continue;
    if (!agentFiles.has(name) && !["read", "edit", "glob", "grep", "list", "bash", "task", "todowrite", "webfetch", "websearch", "question", "external_directory", "doom_loop", "skill"].includes(name)) {
      // ignora permissões de ferramenta; só valida nomes com prefixo de agent
      if (/^(be-|fe-|plat-|qa-|web-|coord-|orquestrador|mentor|teoria-|pratica-|aval-|enem-)/.test(name) && !agentFiles.has(name)) fail(`${file} referencia agent inexistente: ${name}`);
    }
  }
}
ok(`agents verificados (${agentFiles.size})`);

// 4. Orquestrador só fala com coords
{
  const text = readFileSync(join(agentsDir, "orquestrador.md"), "utf8");
  const fm = text.split("---")[1] ?? "";
  for (const c of ["coord-frontend", "coord-backend", "coord-plataforma", "coord-pesquisa", "coord-qualidade"]) {
    fm.includes(`"${c}": allow`) ? ok(`orquestrador -> ${c}`) : fail(`orquestrador não autoriza ${c}`);
  }
  /task:\s*\n\s*"\*":\s*deny/.test(fm) ? ok("orquestrador nega task *") : fail("orquestrador sem task *: deny");
  if (/\b(be-api|fe-pages|qa-unit)\b/.test(fm.split("---").slice(2).join("---").replace(/coord-/g, ""))) {
    // corpo não deve autorizar workers direto (menção em texto é ok, mas task allow não)
    const taskBlock = (fm.match(/task:[\s\S]*?(?=\n  \w+:|\n---)/)?.[0] ?? "");
    /"(be-|fe-|plat-|qa-|web-)[a-z-]+":\s*allow/.test(taskBlock) && fail("orquestrador autoriza worker direto (só coords permitido)");
  }
}

// 5. Skills referenciadas existem
for (const s of ["debug-sistematico", "revisao-segura", "testes-eficazes", "recall-ativo", "repeticao-espacada", "pratica-intercalada", "explicar-para-aprender", "delegacao-verificada"]) {
  existsSync(join(root, "skills", s, "SKILL.md")) ? ok(`skill ${s}`) : fail(`skill faltando: ${s}`);
}

// 5b. Temperature por papel (frio para arbitrar, morno para criar)
{
  const criativos = new Set(["fe-components", "be-domain"]);
  for (const file of readdirSync(agentsDir).filter((f) => f.endsWith(".md"))) {
    const fm = (readFileSync(join(agentsDir, file), "utf8").split("---")[1] ?? "");
    const m = fm.match(/temperature:\s*([0-9.]+)/);
    if (!m) { fail(`${file} sem temperature`); continue; }
    const t = Number(m[1]);
    const name = file.replace(/\.md$/, "");
    if (name === "orquestrador" || name.startsWith("coord-") || name.startsWith("qa-")) {
      t === 0.1 ? ok(`${name} frio (0.1)`) : fail(`${name} deveria ser temperature 0.1 (está ${t})`);
    } else if (criativos.has(name)) {
      t === 0.3 ? ok(`${name} criativo (0.3)`) : fail(`${name} deveria ser temperature 0.3 (está ${t})`);
    } else if (t < 0.1 || t > 0.3) fail(`${name} temperature fora da faixa 0.1-0.3 (está ${t})`);
  }
}

// 5c. Contratos do modo estudos (Marp + respostas)
{
  const collect = (dir, out = []) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) collect(p, out);
      else if (e.isFile()) out.push(p);
    }
    return out;
  };
  const estudos = join(root, "docs", "estudos");
  if (existsSync(estudos)) {
    const slides = collect(estudos).filter((p) => p.endsWith("slides.md"));
    if (!slides.length) fail("nenhum slides.md em docs/estudos");
    for (const s of slides) {
      const t = readFileSync(s, "utf8");
      /marp:\s*true/.test(t) ? ok(`marp ok: ${s.split("docs")[1]}`) : fail(`slides sem marp:true: ${s.split("docs")[1]}`);
    }
  }
  for (const f of ["agents/aval-quiz.md", "agents/aval-feedback.md"]) {
    const t = readFileSync(join(root, f), "utf8");
    t.includes("respostas-<modulo>.md") ? ok(`${f} cita respostas-<modulo>.md`) : fail(`${f} sem convenção respostas-<modulo>.md`);
  }
  {
    const t = readFileSync(join(root, "agents/aval-feedback.md"), "utf8");
    (t.includes("redacao-<tema>.md") && /nunca .*editad[oa] pelo corretor/i.test(t)) ? ok("aval-feedback protege redacao-<tema>.md") : fail("aval-feedback sem proteção a redacao-<tema>.md");
  }
}

// 5d. Skills: IDs únicos (anti-shadowing) + description presente + sem padrões perigosos
{
  const ids = new Set();
  for (const d of readdirSync(join(root, "skills"), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name)) {
    /^[a-z0-9]+(-[a-z0-9]+)*$/.test(d) && d.length <= 64 ? ok(`skill id válido: ${d}`) : fail(`skill id inválido: ${d}`);
    ids.has(d) ? fail(`skill id duplicado: ${d}`) : ids.add(d);
    const f = join(root, "skills", d, "SKILL.md");
    if (!existsSync(f)) { fail(`skill sem SKILL.md: ${d}`); continue; }
    const t = readFileSync(f, "utf8");
    /description:\s*\S/.test(t) ? ok(`skill anunciada: ${d}`) : fail(`skill sem description (não anunciada): ${d}`);
    /(curl|wget)[\s\S]{0,40}\|\s*(bash|sh)|rm\s+-rf|BEGIN.*PRIVATE|github_pat_|ghp_[A-Za-z0-9]{20,}/.test(t) && fail(`skill com padrão perigoso/segredo: ${d}`);
  }
  ok(`skills verificadas (${ids.size}, sem shadowing nem segredo)`);
}

// 6. Segredos nunca trackeados
try {
  const tracked = execSync("git ls-files", { cwd: root, encoding: "utf8" }).split(/\r?\n/);
  for (const bad of ["service.json", "auth.json", "credentials.json", ".env"]) {
    tracked.includes(bad) ? fail(`segredo trackeado: ${bad}`) : ok(`sem ${bad} no git`);
  }
} catch { fail("não foi possível rodar git ls-files"); }

if (errors.length) { console.error(`\n${errors.length} falha(s)`); process.exit(1); }
console.log("\nvalidate: tudo verde");
