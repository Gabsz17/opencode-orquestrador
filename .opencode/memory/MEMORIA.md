# MEMORIA.md — memória de longo prazo do orquestrador

> Teto 60 itens. Recentes em FIFO (máx 30). Lição vista 3x vira `Regra permanente`.
> NUNCA grave segredo, token ou dado pessoal.
> Inbox: `.opencode/memory/inbox/<agente>.md` — o orquestrador promove o útil para cá e esvazia o inbox via edit.

## Regras permanentes
- `API.md` é single-writer do orquestrador; `be-api` só propõe diff no relatório
- `service.json`/`auth.json`/`.env` nunca entram no git (validate barra)
- Token para CI precisa de escopo `workflow` (classic: `repo` + `workflow`)

## Aprendizados (recentes primeiro)
- [2026-10-10] push workflow: PAT sem escopo `workflow` recusa `.github/workflows/*.yml` -> ação: gerar classic com `repo` + `workflow` e atualizar cofre do Windows
- [2026-10-10] gitignore: `.env.*` ignora `.env.example` junto -> ação: adicionar `!.env.example` para versionar o exemplo sem segredos
- [2026-10-10] validate: strip de `//` quebra URLs `https://` no jsonc -> ação: remover só linhas `^\s*//` e corrigir regex `task:` sem aspas

## Falsos-positivos / flakes conhecidos (para o QA não reabrir)
- (ex: teste X falha 1 em 5 em Windows — bug do teste, não do código)

## Decisões que economizaram retrabalho
- (ex: `fe-state` + `fe-components` antes de `fe-pages`)
