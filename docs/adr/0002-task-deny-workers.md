# ADR 0002 — Coords não implementam; workers nunca dão push

- Data: 2026-10-10
- Contexto: sem ownership claro, dois agents editavam o mesmo arquivo e push parcial quebrava a main.
- Decisão: coords com `edit: deny` (só delegam), workers sem `git push`, orquestrador único que commita/push com tree limpa.
- Consequência: 1 arquivo = 1 dono por rodada; push só em marco (LIBERADO, marco PLANO ou checkpoint seguro).
