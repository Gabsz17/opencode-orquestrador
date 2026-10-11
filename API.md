# API.md — contrato do Modo Estudos (single-writer: orquestrador)

> Adaptado de `templates/API.md`. Este repo NÃO expõe API HTTP: o "contrato" aqui é a interface entre os agentes do modo estudos, o comando `/estudar` e a memória. Workers NÃO editam este arquivo — mudança necessária? Propor diff no relatório + justificativa de compatibilidade.

## Base

- BaseURL (via env): N/A — modo estudos não tem HTTP.
- Auth: N/A — sem login; credenciais `BROWSER_*` só via env se `coord-pesquisa` for acionado (nunca no repo).
- Erros padronizados: N/A (HTTP). Erro pedagógico padronizado em texto: `BLOQUEADO: <motivo> + <o que falta> + <próximo passo>`.
- Versão/data: v2026-10-11-estudos / 2026-10-11.

## Agentes (contrato de interfaces)

| Agente | Modo | Fala com | Escreve em | Status |
|--------|------|----------|------------|--------|
| `mentor` | primary | `coord-teoria`, `coord-pratica`, `coord-avaliacao`, `coord-pesquisa` (NUNCA workers direto) | `docs/estudos/<tema>/PLANO-ESTUDOS.md` (plano da trilha), `PLANO.md` raiz (só orquestrador escreve — mentor propõe diff ao orquestrador em missões de obra; em uso normal o mentor é o dono da trilha) | a criar |
| `coord-teoria` | subagent, hidden | `teoria-conceito`, `teoria-exemplos` | nada (read-only, delega) | a criar |
| `coord-pratica` | subagent, hidden | `pratica-exercicios`, `pratica-projetos` | nada (read-only, delega) | a criar |
| `coord-avaliacao` | subagent, hidden | `aval-quiz`, `aval-feedback` | nada (read-only, delega) | a criar |
| `teoria-conceito` | subagent, hidden | — (recebe do coord) | `docs/estudos/<tema>/*.md` (conceitos) + inbox próprio | a criar |
| `teoria-exemplos` | subagent, hidden | — | `docs/estudos/<tema>/*.md` (exemplos) + inbox próprio | a criar |
| `pratica-exercicios` | subagent, hidden | — | `docs/estudos/<tema>/*.md` (listas) + inbox próprio | a criar |
| `pratica-projetos` | subagent, hidden | — | `docs/estudos/<tema>/*.md` (projetos guiados) + inbox próprio | a criar |
| `aval-quiz` | subagent, hidden | — | `docs/estudos/<tema>/quiz*.md` + inbox próprio | a criar |
| `aval-feedback` | subagent, hidden | — | `docs/estudos/<tema>/feedback*.md` + inbox próprio | a criar |

## Comandos

| Comando | Arquivo | Uso | Saída |
|---------|---------|-----|-------|
| `/estudar <tema> [nível]` | `commands/estudar.md` | Invoca `mentor` com tema + nível (`iniciante\|intermediario\|avancado`, default `iniciante`) | Trilha em `docs/estudos/<tema>/` + plano + primeira lição |

## Memória (contrato)

- Global: `.opencode/memory/MEMORIA.md` (teto 60, FIFO 30) + inbox `.opencode/memory/inbox/<agente>.md` (até 3 lições por rodada, formato `- [AAAA-MM-DD] contexto: fato -> ação`, sem segredo/PII).
- Por trilha: `docs/estudos/<tema>/progresso.md` (o que o aluno já viu, onde parou, próximas revisões). Mentor atualiza a cada sessão.
- Regra anti-alucinação: afirmação técnica sem fonte oficial ou briefing do `web-researcher` deve ser marcada `não confirmado`.

## Permissões (padrão, espelha orquestrador)

- `mentor`: `task` allow só `coord-teoria`, `coord-pratica`, `coord-avaliacao`, `coord-pesquisa`; `question: deny` (perguntas pedagógicas via texto); `external_directory: deny`; nunca edita `agents/*` alheios em uso normal.
- coords de estudos: `edit: deny`; `task` allow só seus workers; `bash` só `git diff/log/status`.
- workers de estudos: `edit` allow só em `docs/estudos/**` + inbox próprio; `bash` sem `git push`/`rm -rf`; `question: deny`.
- `plat-docs` continua dono de `README.md`; mentor NÃO edita `README.md` raiz — só `docs/estudos/**`.

## Arquivos desta missão (ownership)

| Arquivo | Dono (cria) | Aprovador |
|---------|-------------|-----------|
| `agents/mentor.md` | coord-plataforma via `plat-infra`/`plat-docs` | orquestrador |
| `agents/coord-teoria.md`, `coord-pratica.md`, `coord-avaliacao.md` | coord-plataforma | orquestrador |
| `agents/teoria-conceito.md`, `teoria-exemplos.md`, `pratica-exercicios.md`, `pratica-projetos.md`, `aval-quiz.md`, `aval-feedback.md` | coord-plataforma | orquestrador |
| `commands/estudar.md` | coord-plataforma | orquestrador |
| `templates/PLANO-ESTUDOS.md` | coord-plataforma | orquestrador |
| `docs/estudos/README.md` (+ `docs/estudos/<tema-exemplo>/` mínimo, sem conteúdo inventado) | coord-plataforma | orquestrador |

## Quebras de compatibilidade

| Data | Mudança | Justificativa | Impacto (frontend/integrações) |
|------|---------|---------------|---------------------------------|
| — | — | — | — |
