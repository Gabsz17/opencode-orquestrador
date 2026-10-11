# MEMORIA.md — memória de longo prazo do orquestrador

> Teto 60 itens. Recentes em FIFO (máx 30). Lição vista 3x vira `Regra permanente`.
> NUNCA grave segredo, token ou dado pessoal.
> Inbox: `.opencode/memory/inbox/<agente>.md` — o orquestrador promove o útil para cá e esvazia o inbox via edit.

## Regras permanentes
- `API.md` é single-writer do orquestrador; `be-api` só propõe diff no relatório
- `service.json`/`auth.json`/`.env` nunca entram no git (validate barra)
- Token para CI precisa de escopo `workflow` (classic: `repo` + `workflow`)

## Aprendizados (recentes primeiro)
- [2026-10-11] modo-estudos V1: docs V2 usam `permissions/shell/subagent` mas repo + `scripts/validate.mjs` usam V1 `permission/bash/task` -> ação: criar agents novos em V1 e registrar ADR antes de migrar
- [2026-10-11] `hidden: true` não é segurança (só tira do autocomplete `@`) -> ação: segurança real via `task deny` + `edit` escopado + validate
- [2026-10-11] não existe `opencode validate` oficial (só `debug agents/config`, `agent list`, `reload`) -> ação: `npm run validate` é o validador do repo
- [2026-10-11] validate temps por papel: coords/qa 0.1, demais 0.1-0.3 -> ação: fixar temperature na criação, antes de validar
- [2026-10-11] validate só checa `task allow` com prefixos conhecidos; prefixos novos (`teoria-/pratica-/aval-`) exigem conferência manual de existência -> ação: conferir 1-a-1 no gate de contrato
- [2026-10-11] grep de segredos: `task-permissions` dispara `sk-` (substring) -> ação: excluir matches dentro de palavras antes de reportar
- [2026-10-11] QA sem shell delegável (depth limit 1): `coord-qualidade` executa gates read-only direto e declara `npm run validate` da fase plataforma como evidência -> ação: orquestrador re-roda validate antes do commit final
- [2026-10-10] push workflow: PAT sem escopo `workflow` recusa `.github/workflows/*.yml` -> ação: gerar classic com `repo` + `workflow` e atualizar cofre do Windows
- [2026-10-10] gitignore: `.env.*` ignora `.env.example` junto -> ação: adicionar `!.env.example` para versionar o exemplo sem segredos
- [2026-10-10] validate: strip de `//` quebra URLs `https://` no jsonc -> ação: remover só linhas `^\s*//` e corrigir regex `task:` sem aspas

## Falsos-positivos / flakes conhecidos (para o QA não reabrir)
- [2026-10-11] `task-permissions`/`max-steps` em texto disparam grep `sk-`/`steps` — substring, não segredo (visto em `docs/pesquisa/estudos-modo.md`)

## Decisões que economizaram retrabalho
- (ex: `fe-state` + `fe-components` antes de `fe-pages`)
