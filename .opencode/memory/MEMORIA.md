# MEMORIA.md — memória de longo prazo do orquestrador

> Teto 60 itens. Recentes em FIFO (máx 30). Lição vista 3x vira `Regra permanente`.
> NUNCA grave segredo, token ou dado pessoal.
> Inbox: `.opencode/memory/inbox/<agente>.md` — o orquestrador promove o útil para cá e esvazia o inbox via edit.

## Regras permanentes
- [ ] (ex: `API.md` é single-writer do orquestrador)

## Aprendizados (recentes primeiro)
- [2026-10-10] contexto: fato -> ação

## Falsos-positivos / flakes conhecidos (para o QA não reabrir)
- (ex: teste X falha 1 em 5 em Windows — bug do teste, não do código)

## Decisões que economizaram retrabalho
- (ex: `fe-state` + `fe-components` antes de `fe-pages`)
