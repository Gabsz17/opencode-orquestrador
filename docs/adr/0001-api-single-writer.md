# ADR 0001 — API.md com single-writer (orquestrador)

- Data: 2026-10-10
- Contexto: frontend e backend divergiam em rotas/campos quando cada worker editava o contrato.
- Decisão: só o orquestrador escreve `API.md`; `be-api` propõe diff no relatório com justificativa de compatibilidade.
- Consequência: zero divergência silenciosa; custo é 1 rodada extra de arbitragem quando há quebra.
