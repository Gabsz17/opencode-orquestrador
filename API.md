# API.md — contrato do Modo Estudos + foco ENEM (single-writer: orquestrador)

> Adaptado de `templates/API.md`. Este repo NÃO expõe API HTTP: o "contrato" aqui é a interface entre os agentes do modo estudos, os comandos `/estudar` e `/estudar-enem` e a memória. Workers NÃO editam este arquivo — mudança necessária? Propor diff no relatório + justificativa de compatibilidade.

## Base

- BaseURL (via env): N/A — modo estudos não tem HTTP.
- Auth: N/A — sem login; credenciais `BROWSER_*` só via env se `coord-pesquisa` for acionado (nunca no repo).
- Erros padronizados: N/A (HTTP). Erro pedagógico padronizado em texto: `BLOQUEADO: <motivo> + <o que falta> + <próximo passo>`.
- Versão/data: v2026-10-12-enem-skills / 2026-10-12 (antecessoras: v2026-10-11-estudos, v2026-10-12-enem).

## Agentes (contrato de interfaces)

| Agente | Modo | Fala com | Escreve em | Status |
|--------|------|----------|------------|--------|
| `mentor` | primary | `coord-teoria`, `coord-pratica`, `coord-avaliacao`, `coord-pesquisa` (NUNCA workers direto) | `docs/estudos/<tema>/PLANO-ESTUDOS.md` ou `docs/estudos/enem/<area>/<tema>/PLANO-ESTUDOS.md` | existe, atualizar (fluxo ENEM) |
| `coord-teoria` | subagent, hidden | `teoria-conceito`, `teoria-exemplos`, `enem-slides` | nada (read-only, delega) | existe, atualizar (time + task) |
| `coord-pratica` | subagent, hidden | `pratica-exercicios`, `pratica-projetos`, `enem-questoes` | nada (read-only, delega) | existe, atualizar (time + task) |
| `coord-avaliacao` | subagent, hidden | `aval-quiz`, `aval-feedback` | nada (read-only, delega) | existe (inalterado) |
| `teoria-conceito` | subagent, hidden | — (recebe do coord) | `docs/estudos/<tema>/*.md` + inbox próprio | existe (inalterado) |
| `teoria-exemplos` | subagent, hidden | — | `docs/estudos/<tema>/*.md` + inbox próprio | existe (inalterado) |
| `pratica-exercicios` | subagent, hidden | — | `docs/estudos/<tema>/*.md` + inbox próprio | existe (inalterado) |
| `pratica-projetos` | subagent, hidden | — | `docs/estudos/<tema>/*.md` + inbox próprio | existe (inalterado) |
| `aval-quiz` | subagent, hidden | — | `docs/estudos/<tema>/quiz*.md` + inbox próprio | existe (inalterado) |
| `aval-feedback` | subagent, hidden | — | `docs/estudos/<tema>/feedback*.md` + inbox próprio | existe (inalterado) |
| `enem-questoes` | subagent, hidden | — (recebe de `coord-pratica`) | `docs/estudos/enem/<area>/<tema>/questoes.md` + `simulados.md` (dono único) + inbox próprio | existe |
| `enem-slides` | subagent, hidden | — (recebe de `coord-teoria`) | `docs/estudos/enem/<area>/<tema>/slides.md` + inbox próprio | existe |

## Regras ENEM de conteúdo (inegociáveis)

- Questões **oficiais**: só de provas do INEP (públicas para estudo), sempre citadas com `ano + caderno/cor + nº da questão` + fonte (link). NUNCA copiar questões de bancos comerciais pagos (SAS, Bernoulli etc.).
- Questões **autorais**: marcadas `autoral — padrão ENEM` (área, texto-base, enunciado, 5 alternativas A–E, gabarito separado com resolução comentada + habilidade da matriz).
- NUNCA inventar `questão do ENEM 20XX nº Y` sem conferência na prova oficial — questão falsa é falha CRÍTICA de conteúdo.
- Dono de `simulados.md`: `enem-questoes` (integralmente; `coord-avaliacao` monta quizzes a partir dele, não o edita).
- Teoria ENEM alinhada à matriz de referência vigente (competências/habilidades por área, conforme briefing `docs/pesquisa/enem-fontes.md`).
- Redação: guia por competências (sem prometer correção oficial; feedback indica o que melhorar por competência).
- TRI: explicar como conceito (proficiência, coerência pedagógica); sem prometer cálculo de nota oficial.

## Slides (contrato de formato)

- Arquivo `slides.md` em markdown compatível Marp: frontmatter com `marp: true` (`theme: default` recomendado), um slide por seção separada por `---`, uma ideia por slide, sem dependência nova no repo.
- Render/export (Marp CLI, PDF) é débito técnico, não desta missão.

## Comandos

| Comando | Arquivo | Uso | Saída |
|---------|---------|-----|-------|
| `/estudar <tema> [nível]` | `commands/estudar.md` | Invoca `mentor` com tema + nível (`iniciante\|intermediario\|avancado`, default `iniciante`) | Trilha em `docs/estudos/<tema>/` + plano + primeira lição |
| `/estudar-enem <area> <tema>` | `commands/estudar-enem.md` | Invoca `mentor` com foco ENEM (área: `linguagens\|humanas\|natureza\|matematica\|redacao`) | Trilha em `docs/estudos/enem/<area>/<tema>/` (plano + teoria + `questoes.md` + `simulados.md` + `slides.md` + quiz + `progresso.md`) |

## Memória (contrato)

- Global: `.opencode/memory/MEMORIA.md` (teto 60, FIFO 30) + inbox `.opencode/memory/inbox/<agente>.md` (até 3 lições por rodada, formato `- [AAAA-MM-DD] contexto: fato -> ação`, sem segredo/PII).
- Por trilha: `docs/estudos/<tema>/progresso.md` ou `docs/estudos/enem/<area>/<tema>/progresso.md` (o que o aluno já viu, onde parou, scores por área, próximas revisões). Mentor atualiza a cada sessão.
- Regra anti-alucinação: afirmação técnica sem fonte oficial ou briefing do `web-researcher` deve ser marcada `não confirmado`. Questão sem fonte verificada deve ser marcada `autoral`.

## Permissões (padrão, espelha orquestrador)

- `mentor`: `task` allow só `coord-teoria`, `coord-pratica`, `coord-avaliacao`, `coord-pesquisa`; `question: deny` (perguntas pedagógicas via texto); `external_directory: deny`; nunca edita `agents/*` alheios em uso normal.
- coords de estudos: `edit: deny`; `task` allow só seus workers; `bash` só `git diff/log/status`.
- workers de estudos (incluindo `enem-questoes`, `enem-slides`): `edit` allow só em `docs/estudos/**` + inbox próprio; `bash` sem `git push`/`rm -rf`; `question: deny`; `temperature: 0.2`.
- `plat-docs` continua dono de `README.md`; mentor NÃO edita `README.md` raiz — só `docs/estudos/**`.

## Arquivos desta missão ENEM (ownership)

| Arquivo | Dono (cria/atualiza) | Aprovador |
|---------|----------------------|-----------|
| `agents/enem-questoes.md`, `agents/enem-slides.md` | coord-plataforma | orquestrador |
| `agents/coord-teoria.md`, `agents/coord-pratica.md`, `agents/mentor.md` (atualizar time/task/fluxo ENEM) | coord-plataforma | orquestrador |
| `commands/estudar-enem.md` | coord-plataforma | orquestrador |
| `templates/PLANO-ESTUDOS.md` (adicionar seção ENEM opcional) | coord-plataforma | orquestrador |
| `docs/estudos/enem/README.md` + exemplo-esqueleto `docs/estudos/enem/exemplo/` (sem conteúdo inventado) | coord-plataforma | orquestrador |
| `docs/estudos/README.md` (adicionar seção ENEM) | coord-plataforma | orquestrador |
| `docs/pesquisa/enem-fontes.md` (matriz, edital, provas oficiais, Marp, regras de citação) | coord-pesquisa via `web-researcher` | orquestrador |

## Skills (contrato de anexação)

> Skills vivem em `skills/<nome>/SKILL.md` (padrão do repo — ver ADR 0004). Orquestrador/coords anexam a skill na Task; workers seguem o protocolo. Base de evidência pedagógica: Dunlosky et al. 2013 (ver `docs/pesquisa/skills-orquestrador-estudos.md`).

| Skill | Anexada por | Gatilho |
|---|---|---|
| `recall-ativo` | `mentor`, `coord-teoria`, `coord-pratica`, `coord-avaliacao` | quiz, exercício, questão, revisão, fechar módulo |
| `repeticao-espacada` | `mentor`, `coord-teoria` (só `enem-slides`), `coord-avaliacao` | plano, `progresso.md`, quiz de revisão |
| `pratica-intercalada` | `coord-pratica` | listas, projetos, `questoes.md`, `simulados.md` |
| `explicar-para-aprender` | `coord-teoria`, `coord-avaliacao` (feedback) | conceito, exemplo, `slides.md`, correção |
| `delegacao-verificada` | `orquestrador` + todos os coords (dev e estudos) | toda Task (escopo fechado + evidência) |
| `debug-sistematico` / `testes-eficazes` / `revisao-segura` | coords dev (inalterado) | bugs / QA / auth-segredos |

## Quebras de compatibilidade
| Data | Mudança | Justificativa | Impacto (frontend/integrações) |
|------|---------|---------------|---------------------------------|
| 2026-10-12 | `coord-teoria`/`coord-pratica` ganham 1 worker cada; `mentor` ganha fluxo ENEM | Foco ENEM sem novo coord; workers antigos inalterados | Nenhum: times antigos continuam resolvendo |
| 2026-10-12 | Novo comando `/estudar-enem`; `/estudar` inalterado | ENEM tem entrada própria (área + tema) | Nenhum |
