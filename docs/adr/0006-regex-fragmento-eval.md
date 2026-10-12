# ADR 0006 — Regex-fragmento nos checks de eval (nunca literal de frase)

- Data: 2026-10-12
- Contexto: o endurecimento do judge com literais de frase-canônica (`respostas-<modulo>\.md` com escape) quebrou o `eval` no ciclo-4; qualquer rewording futuro repetiria a quebra (alerta do QA).
- Decisão: checks de `eval.mjs` usam fragmentos tolerantes (`/respostas-<modulo>/`, `/C1.C5/` com `.` curinga, flags `i`), nunca a frase inteira; a frase-canônica vive nos agents, o fragmento no eval.
- Consequência: rewording cosmético não quebra o CI; mudança semântica real (remover a regra) quebra — que é o comportamento desejado.
