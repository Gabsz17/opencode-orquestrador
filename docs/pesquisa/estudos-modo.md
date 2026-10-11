# Briefing: como criar um "modo" novo no OpenCode (primary + subagents + comando) — rumo do `orquestrador`

> Data da pesquisa: 2026-10-11. Método: `mcp.docs` (Context7, espelha V2) + `webfetch` nas docs oficiais V1 e V2. Regra do briefing: só campo/sintaxe com fonte oficial é proposto; sem fonte = `não confirmado`. Afirmação técnica exige 2 fontes independentes.
> Memória aplicada: `API.md` é single-writer do orquestrador; nunca gravar segredo/token; preferir docs oficiais.

## 1. Resumo executivo (5 linhas)

- Modo = 1 agent `mode: primary` (ex: `mentor`) + N agents `mode: subagent` (coords + workers, com `hidden: true`) + 1+ arquivos em `commands/*.md` com `agent:` apontando para o primary. Padrão confirmado nas docs V1 e V2 de Agents + Commands.
- Restrição de quem chama quem é via permissão de invocação: V1 = `permission.task: {"*": deny, "<nome>": allow}`; V2 = `permissions: [{action: subagent, resource: "*", effect: deny}, {action: subagent, resource: "<nome>", effect: allow}]`. Última regra matching vence.
- Comando em Markdown: frontmatter (`description/agent/model/subagent`) + corpo = template com `$ARGUMENTS`/`$1`/`$2` e blocos shell `!\`cmd\``. Não colocar `template` no frontmatter Markdown.
- Para agents de conteúdo (só markdown em `docs/**`): `edit: {"*": deny, "docs/estudos/**": allow, inbox: allow}` + `bash` mínimo + `question: deny` (V1, sintaxe que o repo atual usa). Armadilha: ordem das regras e diferença de nomes V1↔V2.
- Não existe `opencode validate` oficial (não confirmado nas docs CLI V1+V2). Validação oficial = `opencode agent list` + `opencode debug agents` + `opencode debug config` + `opencode reload`; validação do repo = `npm run validate` (`node scripts/validate.mjs`).

## 2. Pergunta 1 — frontmatter de agent: campos e o que cada `mode` permite

### 2.1 Campos confirmados (com 2 fontes cada)

| Campo | Obrigatório? | Efeito confirmado | Fontes (2+) |
|---|---|---|---|
| `description` | Sim ("required config option" na V1; "Add it to subagents because OpenCode shows it to the model" na V2) | Texto exibido ao modelo na hora de escolher qual subagent lançar; aparece em listas/descoberta | (a) https://opencode.ai/docs/agents/ §Description — "This is a required config option." (b) https://opencode.ai/v2/docs/agents/ §Description — "explains the agent's purpose… shows it to the model choosing which agent to launch" + Context7 query `mode primary subagent hidden permission` que retornou o mesmo exemplo reviewer |
| `mode` | Não (tem default) | `primary` = roda como agente principal da sessão (alternável via Tab/`switch_agent`); `subagent` = roda só em child session via tool `task` (V1) / `subagent` (V2); `all` = ambos. V1: "If no mode is specified, it defaults to all." V2-Context7: "defaults to primary if omitted on a new custom agent." **Divergência V1↔V2 documentada abaixo — seguir V1 enquanto o repo usar `permission.task/bash`.** | (a) https://opencode.ai/docs/agents/ §Mode (b) https://opencode.ai/v2/docs/agents/ §Modes + Context7 `mode primary subagent` |
| `hidden` | Não | `hidden: true` remove o agent do autocomplete `@`/listagens/descoberta; "controls visibility, not security. Use permissions to restrict behavior." Só se aplica a `mode: subagent`. | (a) https://opencode.ai/docs/agents/ §Hidden (b) https://opencode.ai/v2/docs/agents/ §Hidden + Context7 Agent Visibility |
| `permission` (V1) / `permissions` (V2) | Não (mas na prática obrigatório para modo seguro) | Controla o que o agent pode fazer. Ver §4. Nomes mudam entre versões (detalhe crítico na §2.3). | (a) https://opencode.ai/docs/agents/ §Permissions (b) https://opencode.ai/docs/permissions/ (c) https://opencode.ai/v2/docs/agents/ §Permissions + https://opencode.ai/v2/docs/permissions/ |
| `model` | Não | Override `provider/model` ou `provider/model#variant`. Se omitido: primary usa modelo global; subagent herda modelo do parent. | (a) https://opencode.ai/docs/agents/ §Model (b) https://opencode.ai/v2/docs/agents/ §Model |
| `temperature` | Não (V1) / **não usar no top-level em V2** | V1: 0.0–1.0 (0.0–0.2 focado; 0.3–0.5 equilibrado; 0.6–1.0 criativo). V2: mover para `request.body`; "Do not use legacy top-level fields such as temperature, top_p, prompt, permission, tools, disable, or maxSteps in new V2 agent configuration." | (a) https://opencode.ai/docs/agents/ §Temperature (b) https://opencode.ai/v2/docs/agents/ §Request + aviso "Do not use legacy…" |
| `steps` (V1: também `maxSteps` legado) | Não | Máximo de iterações agênticas antes de responder só texto. Legado `maxSteps` depreciado → usar `steps`. | (a) https://opencode.ai/docs/agents/ §Max steps (b) Context7 "Agent Steps Limit" |
| `color` | Não | Cor UI em hex (`"#ff6b6b"`) ou nome de tema (V1 cita `primary/secondary/accent/…`). | (a) https://opencode.ai/docs/agents/ §Color (b) https://opencode.ai/v2/docs/agents/ §Color + Context7 Agent UI Color |
| `prompt` (V1) / `system` (V2) + corpo Markdown | V1: corpo do .md vira prompt; V2: corpo vira `system` | Em Markdown, o corpo do arquivo é o system prompt ("The markdown file name becomes the agent name"; "The Markdown body becomes the agent's system prompt"). Em JSON V1 o campo é `prompt`; em V2 é `system`. | (a) https://opencode.ai/docs/agents/ §Markdown + §Prompt (b) https://opencode.ai/v2/docs/agents/ §Formats + §System |
| `disable` (V1) / `disabled` (V2) | Não | Desliga o agent. | (a) https://opencode.ai/docs/agents/ §Disable (b) https://opencode.ai/v2/docs/agents/ §Disabled |
| Localidade do arquivo | — | Global: `~/.config/opencode/agents/<nome>.md`; projeto: `.opencode/agents/<nome>.md`. Nome do arquivo vira nome do agent; subpasta vira prefixo (`team/reviewer`). Criação interativa: `opencode agent create`. | (a) https://opencode.ai/docs/agents/ §Markdown (b) https://opencode.ai/v2/docs/agents/ §Locations + (c) https://opencode.ai/docs/cli/ §agent create |

### 2.2 O que cada `mode` permite (confirmado)

| `mode` | Onde roda | Como é invocado | Fontes |
|---|---|---|---|
| `primary` | Sessão principal; alternável via Tab/`switch_agent`; pode ser `default_agent` em config; pode invocar subagents via tool `task`/`subagent` (se permissão permitir) | Direto pelo usuário ou via comando `agent: <primary>` | https://opencode.ai/docs/agents/ §Primary agents + https://opencode.ai/v2/docs/agents/ §Modes |
| `subagent` | Só em child session (foreground/background) com contexto fresco; usa **suas próprias** permissões (não subconjunto do parent) | Automaticamente pelo primary (via descrição) ou manual via menção `@nome`; comando com `agent: <subagent>` invoca como subagent por padrão | https://opencode.ai/docs/agents/ §Subagents + §Usage + https://opencode.ai/v2/docs/agents/ §Modes ("The parent agent's subagent permissions control which agents it may launch; the child uses its own configured permissions.") |
| `all` | Ambos | Ambos | https://opencode.ai/docs/agents/ §Mode + https://opencode.ai/v2/docs/agents/ §Mode |

### 2.3 Divergência V1↔V2 que o `coord-plataforma` precisa conhecer (confirmada, 2 fontes)

- V1 usa singular + nomes antigos: `permission`, `bash`, `task`, `agent: {…} + prompt + disable + maxSteps + tools`. Prova: https://opencode.ai/docs/agents/ (exemplos com `permission: {edit, bash, task}`) + https://opencode.ai/docs/permissions/ ("As of v1.1.1, the legacy tools boolean config is deprecated and has been merged into permission").
- V2 usa plural + nomes novos: `permissions` (array de `{action, resource, effect}`), `shell` (não `bash`), `subagent` (não `task`), `agents: {…} + system + disabled + steps`. Aviso explícito: "V1 uses different field and action names. In V2, use permissions, shell, and subagent instead of permission, bash, and task." (https://opencode.ai/v2/docs/permissions/ §Configure) + "Do not use legacy top-level fields such as temperature, top_p, prompt, permission, tools, disable, or maxSteps in new V2 agent configuration." (https://opencode.ai/v2/docs/agents/ §Request).
- **Decisão para o repo atual:** o repo usa sintaxe V1 em `opencode.jsonc` (`permission.bash/task/external_directory`) e em todos os `agents/*.md` (`permission: read/edit/glob/grep/list/bash/task/…`, `temperature/steps/color`), e o validador local (`scripts/validate.mjs`) checa exatamente `mode: primary|subagent` + `task: {"*": deny,…}`. Portanto o modo Estudos deve seguir **V1** até migração formal. Escrever em sintaxe V2 agora quebra `npm run validate` e diverge do `orquestrador`.

Exemplo V1 real do repo (prática local, não fonte oficial — incluído só como espelho do padrão vigente):

```yaml
# agents/orquestrador.md (V1, padrão vigente no repo)
description: Orquestra o projeto inteiro sozinho via 5 coordenadores, sem intervencao humana
mode: primary
color: "#ff6b6b"
temperature: 0.1
steps: 150
permission:
  task:
    "*": deny
    "coord-frontend": allow
    "coord-backend": allow
    "coord-plataforma": allow
    "coord-pesquisa": allow
    "coord-qualidade": allow
  question: deny
  external_directory: deny
```

Equivalente V2 oficial (para referência futura, NÃO usar agora):

```jsonc
// https://opencode.ai/v2/docs/agents/ §Modes
{
  "agents": {
    "orchestrator": {
      "permissions": [
        { "action": "subagent", "resource": "*", "effect": "deny" },
        { "action": "subagent", "resource": "reviewer", "effect": "allow" }
      ]
    }
  }
}
```

## 3. Pergunta 2 — como um `primary` invoca subagents e como restringir

- **Invocação (V1, sintaxe do repo):** via tool `task`. Docs V1: "task — launching subagents (matches the subagent type)" (https://opencode.ai/docs/permissions/ §Available Permissions) + "Control which subagents an agent can invoke via the Task tool with permission.task. Uses glob patterns" (https://opencode.ai/docs/agents/ §Task permissions). Docs V2/Context7 confirmam a semântica com o nome novo: "The parent agent's subagent permissions control which agents it may launch" (https://opencode.ai/v2/docs/agents/ §Modes + Context7 "Define Subagent Permissions").
- **Restrição (V1 — usar esta):**

```yaml
permission:
  task:
    "*": deny
    "coord-teoria": allow
    "coord-pratica": allow
    "coord-avaliacao": allow
    "coord-pesquisa": allow
```

Regras: (1) colocar `" * ": deny` primeiro e os allows específicos depois — "last matching rule wins" (https://opencode.ai/docs/permissions/ §Granular Rules + https://opencode.ai/docs/agents/ §Task permissions com exemplo `"*": deny` → `"orchestrator-*": allow`); (2) quando `deny`, o subagent é removido da descrição da tool Task ("When set to deny, the subagent is removed from the Task tool description entirely, so the model won't attempt to invoke it." — https://opencode.ai/docs/agents/ §Task permissions); (3) usuário sempre pode invocar qualquer subagent via `@` mesmo com deny ("Users can always invoke any subagent directly via the @ autocomplete menu, even if the agent's task permissions would deny it." — mesma seção). Por isso `hidden: true` + deny não é barreira de segurança, só organização.
- **Padrão do repo a espelhar:** `orquestrador` (`task: *: deny + 5 coords allow`) → cada `coord-*` (`edit: deny`, `task: *: deny + só seus workers allow`, `bash` só `git diff/log/status`) → cada worker (`task: *: deny` puro). Ver `agents/orquestrador.md`, `agents/coord-frontend.md`, `agents/coord-pesquisa.md` (prática local).
- **Para o `mentor` (proposta V1):** `mode: primary`, `task: {"*": deny, "coord-teoria": allow, "coord-pratica": allow, "coord-avaliacao": allow, "coord-pesquisa": allow}`, `question: deny`, `external_directory: deny`; nunca `task allow` para workers diretos (validador local falha se houver `"(be-|fe-|plat-|qa-|web-)…": allow` no bloco task do primary — ver `scripts/validate.mjs` §4).

## 4. Pergunta 3 — como criar um comando em `commands/*.md` que invoca um agent

Confirmado em 2 fontes V1+V2 + Context7:

| Aspecto | Comportamento oficial | Fontes |
|---|---|---|
| Local e descoberta | Global `~/.config/opencode/commands/<nome>.md`, projeto `.opencode/commands/<nome>.md`; só `.md` é descoberto; subpasta vira `/` (`team/review.md` → `/team/review`); legado singular `command/` ainda descoberto mas usar `commands/`; reload automático sem restart; projeto sobrescreve global | (a) https://opencode.ai/docs/commands/ §Create command files + §Markdown (b) https://opencode.ai/v2/docs/commands/ §Markdown + §Loading + Context7 "Global and project command directories" |
| Frontmatter vs corpo | Frontmatter = metadados (`description/agent/model/subagent/subtask`); **corpo trimado = template** (prompt). Em Markdown NÃO colocar `template` no frontmatter ("Do not put template in Markdown frontmatter; the body supplies it."). Em JSON a chave é `command` (V1) / `commands` (V2), cada entrada exige `template` | (a) https://opencode.ai/docs/commands/ §Markdown + §Options/Template (b) https://opencode.ai/v2/docs/commands/ §Fields + §Markdown |
| Campos | `description` (texto na lista de comandos), `agent` (qual agent executa; se for subagent, o comando invoca subagent por padrão), `model` (`provider/model#variant`), `subagent: true/false` (força background child / força sessão atual; omitido = child só se agent for subagent), `subtask` = alias depreciado de `subagent` (se ambos presentes, `subagent` vence) | (a) https://opencode.ai/docs/commands/ §Options/Agent/Subtask/Model (b) https://opencode.ai/v2/docs/commands/ §Fields + §Execution + §Background + Context7 "Define command fields in opencode.jsonc" |
| Argumentos | `$ARGUMENTS` = string completa; `$1 $2…` = posicionais (aspas agrupam; maior número consome resto; faltante vira string vazia); sem placeholder, args são anexados após linha em branco | (a) https://opencode.ai/docs/commands/ §Prompt config/Arguments (b) https://opencode.ai/v2/docs/commands/ §Arguments + §Positions + §Fallback |
| Shell e arquivos | `!\`cmd\`` injeta stdout no prompt (roda no root do projeto na avaliação do comando, **fora** do fluxo de permissão do agent — "only use commands from sources you trust"); `@path` em template armazenado NÃO expande (vai como texto); anexar arquivo pelo composer na hora de invocar | (a) https://opencode.ai/docs/commands/ §Prompt config/Shell output + File references (b) https://opencode.ai/v2/docs/commands/ §Shell + §Attachments |
| Seleção de modelo | Precedência: `model` do comando > modelo do agent do comando > modelo da sessão atual | https://opencode.ai/v2/docs/commands/ §Execution (V2) — **em V1 o mesmo comportamento é descrito de forma mais curta; marcar nuance como confirmada só na V2, não confirmada diferença na V1** |

Modelo para `/estudar` (V1, pronto para o repo — cada campo acima tem fonte):

```markdown
---
description: Inicia trilha de estudos com o mentor (tema + nível)
agent: mentor
---

Invoque o agent `mentor` com o tema e nível abaixo. O mentor cria `docs/estudos/<tema>/` + plano + primeira lição.

Tema/nível: $ARGUMENTS
```

Notas: (1) se `mentor` for `mode: primary`, o comando roda na sessão atual por padrão (sem `subagent: true`); (2) espelho local: `commands/orquestrar.md` ("Invoque o agent `orquestrador`…"), `commands/revisar.md`, `commands/pivotar.md` — prática local, comandos atuais do repo não usam frontmatter `agent:`, então adicionar `agent: mentor` é a novidade com fonte oficial; (3) `subagent: true` só se quiser forçar child em background mesmo com primary.

## 5. Pergunta 4 — permissões recomendadas para agents de conteúdo + armadilhas

### 5.1 Recomendado (sintaxe V1 — a que o repo e o validador entendem)

Fontes da sintaxe: https://opencode.ai/docs/agents/ §Permissions (shorthand + objeto por padrão, wildcard, "last matching rule wins", exemplo `bash: {"*": ask, "git diff": allow}`) + https://opencode.ai/docs/permissions/ §Granular Rules + §Available Permissions + §Defaults.

**Coords de estudos** (espelhar `coord-frontend`/`coord-pesquisa` — read-only que delega):

```yaml
permission:
  read: allow
  edit: deny
  glob: allow
  grep: allow
  list: allow
  bash:
    "*": deny
    "git diff*": allow
    "git log*": allow
    "git status*": allow
  task:
    "*": deny
    "teoria-conceito": allow   # só os workers do próprio time
    "teoria-exemplos": allow
  todowrite: deny
  webfetch: allow
  websearch: allow
  question: deny
  external_directory: deny
  doom_loop: allow
  skill: allow
```

**Workers de conteúdo** (espelhar `plat-docs.md` com escopo trocado para estudos):

```yaml
permission:
  read: allow
  edit:
    "*": deny
    "docs/estudos/**": allow
    ".opencode/memory/inbox/<este-agente>.md": allow
  glob: allow
  grep: allow
  list: allow
  bash:
    "*": deny        # ou "*": allow + "git push*": deny + "rm -rf*": deny se precisar de shell amplo como plat-docs; para conteúdo puro, deny-total é mais seguro
    "git status*": allow
  task:
    "*": deny
  todowrite: deny
  webfetch: allow    # só se o worker precisar checar fonte; senão deny como plat-docs
  websearch: allow
  question: deny
  external_directory: deny
  doom_loop: allow
  skill: allow
```

**Primary `mentor`:**

```yaml
mode: primary
permission:
  read: allow
  edit: allow            # mentor escreve plano em docs/estudos/<tema>/PLANO-ESTUDOS.md; se quiser endurecer, trocar por objeto só com docs/estudos/** + PLANO.md conforme API.md decidir
  glob: allow
  grep: allow
  list: allow
  bash:
    "*": allow
    "git push --force*": deny
    "git push * --force*": deny
    "git push * -f*": deny
    "git push * --delete*": deny
    "rm -rf*": deny
  task:
    "*": deny
    "coord-teoria": allow
    "coord-pratica": allow
    "coord-avaliacao": allow
    "coord-pesquisa": allow
  todowrite: allow
  webfetch: allow
  websearch: allow
  question: deny
  external_directory: deny
  doom_loop: allow
  skill: allow
```

Por que `question: deny` no mentor mesmo sendo pedagógico: docs oficiais definem `question` como "asking the user questions during execution" (https://opencode.ai/docs/permissions/ §Available Permissions); o padrão do `orquestrador` é `question: deny` ("NUNCA pergunte. Decida sozinho e siga."). Para o modo Estudos, perguntas pedagógicas devem ir como texto/quiz em markdown, não via tool `question` — mesma orientação já registrada no `API.md` do modo Estudos (prática local).

### 5.2 Armadilhas (todas com fonte)

1. **`edit: deny` sozinho ≠ "só docs".** Shorthand `deny` bloqueia tudo; para "só markdown em docs/**" é preciso objeto com `" * ": deny` primeiro e allows depois. Fonte: https://opencode.ai/docs/permissions/ §Granular Rules (exemplo `edit: {"*": deny, "packages/web/src/content/docs/*.mdx": allow}`) + https://opencode.ai/docs/agents/ §Permissions. Prática local prova o padrão: `plat-docs.md` usa `edit: {"*": deny, "README.md": allow, "docs/**": allow, inbox: allow}`; `be-api.md` usa o inverso `edit: {"*": allow, "API.md": deny, …}`.
2. **Ordem importa: última regra matching vence.** Colocar `" * "` por último anula as exceções. Fonte: https://opencode.ai/docs/permissions/ §Granular Rules ("Rules are evaluated by pattern match, with the last matching rule winning. A common pattern is to put the catch-all \"*\" rule first") + https://opencode.ai/v2/docs/permissions/ §Matching + Context7 "Agent Permissions Rules".
3. **`edit` cobre `write+edit+apply_patch`; `read/glob/grep/list/bash/task` aceitam objeto granular, o resto só shorthand (V1).** Fonte: https://opencode.ai/docs/agents/ §Permissions ("read, edit, glob, grep, list, bash, task, external_directory, lsp, and skill accept either a shorthand action or an object… The remaining keys accept the shorthand action only.") + tabela Key→Tools.
4. **`bash` com args exige padrão com ` *`.** `"grep"` sozinho bloqueia `grep pattern file`; precisa `"grep *"`. Comandos como `git status` sem args funcionam no default mas com args exigem permissão explícita. Fonte: https://opencode.ai/docs/permissions/ §Agents (último parágrafo).
5. **`external_directory: deny` não impede escrita fora via `bash`.** Shell roda com autoridade do usuário host; inferência de diretório é best-effort — "prefer a narrow shell allowlist instead of patterns intended to recognize every dangerous command." Fonte: https://opencode.ai/docs/permissions/ §External Directories + https://opencode.ai/v2/docs/permissions/ §Directories.
6. **`hidden: true` não é segurança.** Só tira do autocomplete; invocação via Task continua possível se permissão permitir. Fonte: https://opencode.ai/docs/agents/ §Hidden + §Task permissions ("This only affects user visibility… Hidden agents can still be invoked by the model via the Task tool if permissions allow.").
7. **Defaults permissivos.** "Most permissions default to allow; doom_loop and external_directory default to ask; read nega .env por padrão." Fonte: https://opencode.ai/docs/permissions/ §Defaults (+ V2 base policy em https://opencode.ai/v2/docs/permissions/ §Defaults). Ou seja: omitir chave = permitir na maioria — sempre declarar `deny` explícito.
8. **Migrar para V2 sem converter nomes quebra tudo silenciosamente.** `permission→permissions`, `bash→shell`, `task→subagent`, `prompt→system`, `disable→disabled`, `maxSteps→steps`, `temperature/top_p` para `request.body`. Fontes: https://opencode.ai/v2/docs/permissions/ §Configure (callout) + https://opencode.ai/v2/docs/agents/ §Request + https://opencode.ai/docs/config equivalente via Context7 migrate-v1. **Não confirmado:** se o binário que o repo usa já aceita sintaxe V2 em frontmatter Markdown — nenhuma doc oficial afirma fallback automático; até confirmação, tratar como incompatível.

## 6. Pergunta 5 — há validador oficial (`opencode validate`?) e como rodar

- **`opencode validate` = não confirmado / inexistente nas docs oficiais.** Varredura em 2 fontes independentes: (a) https://opencode.ai/docs/cli/ — comandos listados: agent/attach/auth/github/mcp/models/run/serve/session/stats/export/import/web/acp/plugin/pr/db/debug/uninstall/upgrade; nenhum `validate`. (b) https://opencode.ai/v2/docs/cli/commands/ — comandos: run/mini/session/auth/models/mcp/plugin/stats/serve/pair/service/reload/api/acp/debug/upgrade/uninstall; nenhum `validate`. Context7 `CLI validate check debug config agents commands list` também só retornou `debug agents / debug config`, sem `validate`. **Portanto: não propor `opencode validate` como comando oficial.**
- **Validação oficial confirmada (2 fontes cada):**
  - `opencode agent list` — lista agents disponíveis (https://opencode.ai/docs/cli/ §agent/list + Context7 CLI).
  - `opencode agent create` — assistente interativo (pergunta onde salvar, descrição, gera prompt+frontmatter; "Anything you don't allow is denied") (https://opencode.ai/docs/cli/ §agent/create + https://opencode.ai/docs/agents/ §Create agents).
  - `opencode debug agents` — inspeciona agents (https://opencode.ai/v2/docs/cli/commands/ §debug + Context7 debug).
  - `opencode debug config` — lista fontes de config ativas (mesma fonte).
  - `opencode reload` — recarrega config sem restart (https://opencode.ai/v2/docs/cli/commands/ §reload).
- **Validador do repo (prática local, não oficial):** `npm run validate` → `node scripts/validate.mjs`. Checa: arquivos obrigatórios; `opencode.jsonc` parseável + `default_agent=orquestrador` + deny de force-push/rm-rf + `external_directory=deny`; frontmatter de todo `agents/*.md` (`description` + `mode: primary|subagent`); `task allow` aponta para agent existente; orquestrador só autoriza os 5 coords + `task *: deny`; skills existem; `temperature` por papel (orquestrador/coords/QA=0.1, criativos=0.3, resto 0.1–0.3); nenhum segredo trackeado (`service.json/auth.json/credentials.json/.env`). Como rodar: `npm run validate` (ou `node scripts/validate.mjs`) na raiz do repo. **Atenção:** o regex de strip de `//` já teve bug com URLs `https://` (ver MEMORIA 2026-10-10) — corrigido para remover só linhas `^\\s*//`.
- **Recomendação para o modo Estudos:** estender `scripts/validate.mjs` (novo dono: coord-plataforma, aprovador: orquestrador) com: (1) `mentor.md` existe + `mode: primary` + task allow só coords de estudos + deny worker direto; (2) cada `coord-*` tem `hidden: true` + `edit: deny` + task só seus workers; (3) cada worker tem `hidden: true` + `edit` objeto com `" * ": deny` + `docs/estudos/**` allow + inbox allow, sem `src/**`; (4) `commands/estudar.md` existe com `agent: mentor`; (5) `temperature` nos novos agents dentro de 0.1–0.3. **Não confirmado:** formato exato de saída do futuro validate estendido — definir na implementação e documentar.

## 7. Recomendação (o que o `coord-plataforma` deve seguir)

1. Seguir **sintaxe V1** (a do `orquestrador`): frontmatter com `description/mode:hidden/color/temperature/steps/permission:{read/edit/glob/grep/list/bash/task/todowrite/webfetch/websearch/question/external_directory/doom_loop/skill}`. Não usar sintaxe V2 (`permissions/shell/subagent/request`) até migração formal — quebra `npm run validate`.
2. Criar nesta ordem: `agents/mentor.md` (primary, task só 4 coords de estudos) → `agents/coord-teoria.md`, `coord-pratica.md`, `coord-avaliacao.md` (subagent+hidden, edit deny, task só seus workers, bash só git diff/log/status) → 6 workers (subagent+hidden, edit objeto só `docs/estudos/**`+inbox, task deny total, bash mínimo) → `commands/estudar.md` (frontmatter `description + agent: mentor`, corpo com `$ARGUMENTS`) → `templates/PLANO-ESTUDOS.md` + `docs/estudos/README.md`.
3. Todo agent novo: `description` (obrigatória) + `mode` explícito + `hidden: true` nos subagents + `question: deny` + `external_directory: deny` + `temperature` 0.1 (coords/arbitragem) ou 0.2 (workers de conteúdo; 0.3 só se justificado como criativo) + `steps` 40–60 (coords 60, workers 40, mentor 100–150).
4. Rodar `npm run validate` a cada arquivo novo + `opencode agent list` / `opencode debug agents` / `opencode debug config` como checagem oficial; registrar tudo no relatório ao orquestrador.
5. Não tocar em `API.md` (single-writer orquestrador — propor diff no relatório), não versionar segredos, não editar `agents/*` alheios em uso normal.

## 8. Riscos

| Risco | Severidade | Mitigação |
|---|---|---|
| Migração V1→V2 silenciosa (nomes `permission/bash/task` vs `permissions/shell/subagent`) tornar os novos agents inválidos no futuro | Alta | Fixar decisão "V1 até migração formal" no PLANO.md; abrir ADR; monitorar changelog oficial |
| Default permissivo (omitir = allow) deixar worker escrever em `src/**` | Alta | Sempre objeto `edit: {"*": deny, …allow}`; validate estendido barra `src/**` em workers de estudos |
| `hidden` confundido com segurança; usuário invoca worker via `@` e polui escopo | Média | Documentar que hidden é só visibilidade; segurança real está em `task deny` + `edit` escopado |
| Bloco shell `!\`cmd\`` em comando roda fora do fluxo de permissão | Média | Usar shell em comando só com comandos confiáveis/versionados; nunca interpolar `$ARGUMENTS` não confiável dentro de shell block |
| Divergência de default de `mode` (V1=all vs V2-CTX7=primary) | Baixa | Sempre declarar `mode` explícito em todo agent novo; validate já exige |
| `opencode validate` não existe — time tentar rodar e concluir que "está quebrado" | Baixa | Documentar no README: oficial = `debug agents/config`; repo = `npm run validate` |

## 9. Fontes (URL + data de acesso)

**Oficiais V1 (https://opencode.ai/docs/... — acesso 2026-10-11):**
- https://opencode.ai/docs/agents/ — tipos, configure JSON/Markdown, options (description/temperature/max-steps/disable/prompt/model/tools/permissions/mode/hidden/task-permissions/color/top-p), create agents, exemplos docs-writer/security-auditor
- https://opencode.ai/docs/commands/ — create command files, configure JSON/Markdown, prompt config (arguments/shell/file-refs), options (template/description/agent/subtask/model)
- https://opencode.ai/docs/permissions/ — actions, auto-mode, configuration, granular rules/wildcards/home-expansion/external-directories, available permissions, defaults, ask, agents-override
- https://opencode.ai/docs/cli/ — agent create/list, demais comandos; ausência de `validate`

**Oficiais V2 (https://opencode.ai/v2/docs/... — acesso 2026-10-11):**
- https://opencode.ai/v2/docs/agents/ — Markdown/JSONC formats, locations, modes, builtins, merging, options (description/mode/model/system/permissions/steps/hidden/color/disabled/request + aviso anti-legado)
- https://opencode.ai/v2/docs/commands/ — Markdown/JSON, fields, arguments/positions/fallback, shell, attachments, execution, background, loading
- https://opencode.ai/v2/docs/permissions/ — configure/rules/matching/actions/directories/scanner/defaults/agents/approvals/policies + callout V1↔V2
- https://opencode.ai/v2/docs/cli/commands/ — run/mini/session/auth/models/mcp/plugin/stats/serve/pair/service/reload/api/acp/debug/upgrade/uninstall; ausência de `validate`; presença de `debug agents/config/paths`

**Via mcp.docs/Context7 (acesso 2026-10-11, espelha V2 — 2ª fonte independente para cada afirmação):**
- resolve `opencode agent configuration` → `/websites/opencode_ai_v2` (+ `/anomalyco/opencode`, `/websites/opencode_ai`, `/opencode-ai/opencode`)
- query "how to create custom agent with frontmatter mode primary subagent hidden permission" / "agent permission task allow deny invoke subagent" / "how to create custom command slash command commands directory" / "opencode validate configuration command" / "agent frontmatter all fields…" / "permissions actions list…" / "command frontmatter agent model subagent…" / "CLI validate check debug config agents commands list" (+ "debug validate config check agents commands list")

**Prática local (não oficial — só espelho do padrão vigente, sem valor de fonte para sintaxe):**
- `agents/orquestrador.md`, `agents/coord-frontend.md`, `agents/coord-pesquisa.md`, `agents/coord-plataforma.md`, `agents/plat-docs.md`, `agents/be-api.md`, `agents/web-researcher.md`, `commands/orquestrar.md`, `commands/revisar.md`, `commands/pivotar.md`, `opencode.jsonc`, `scripts/validate.mjs`, `docs/mcp.md`, `.opencode/memory/MEMORIA.md`, `API.md` (contrato do Modo Estudos v2026-10-11)

## 10. O que ficou `não confirmado`

- Existência de `opencode validate` oficial — **não confirmado (ausente nas docs CLI V1 e V2 + Context7); tratar como inexistente.**
- Aceitação de sintaxe V2 (`permissions/shell/subagent`) no frontmatter Markdown pelo binário em uso no repo — **não confirmado**; nenhuma doc oficial afirma fallback automático.
- Formato/saída do validate estendido para o modo Estudos — **não confirmado** (a definir na implementação).
- Diferença comportamental V1↔V2 na precedência de modelo em comandos além do documentado na V2 — **não confirmado** na V1.

## 11. Aprendizados para a MEMORIA (proposta ao orquestrador — até 3, sem segredo)

- [2026-10-11] modo-estudos-sintaxe: docs V2 usam `permissions/shell/subagent` mas repo+validate usam V1 `permission/bash/task` -> ação: criar modo Estudos em V1 e registrar ADR de migração futura
- [2026-10-11] opencode-validate: não existe `opencode validate` oficial (só `debug agents/config` + `agent list` + `reload`) -> ação: documentar `npm run validate` como validador do repo no README
- [2026-10-11] hidden-nao-e-seguranca: `hidden: true` só tira do autocomplete `@`, invocação via Task continua se permissão permitir -> ação: segurança real via `task deny` + `edit` escopado + validate estendido
