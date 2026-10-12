# ADR 0005 — Adiar migração V1→V2 dos agents (reavaliar no ciclo-2)

- Data: 2026-10-12
- Contexto: doc oficial V2 troca `permission/bash/task` por `permissions/shell/subagent` (+ `prompt→system`, `maxSteps→steps` etc.). Benchmark do ciclo-1 confirma as chaves, mas nenhum changelog V2 posterior a `v1.19.0` foi localizado; o `scripts/validate.mjs` valida o schema V1 e 37 agents usam V1.
- Decisão: manter V1 em todos os agents até o ciclo-2. Skills novas seguem frontmatter completo (portável nos dois).
- Gatilhos de reavaliação: changelog V2 com quebra, warning em runtime, ou `validate` oficial cobrindo V2.
- Recheck 2026-10-12 (ciclo-2): changelog segue em `v1.19.0` (11/10), sem trigger; `v1.18.20` confirma `task_id` resumable em subagent-falha (base do protocolo de resume na skill `delegacao-verificada`); `v1.18.24` lê campos V2 em setup misto (tolera, não exige migração).
- Recheck 2026-10-12 (ciclo-3): changelog segue em `v1.19.0`, sem trigger. PDFs gov.br (matriz v1 + MEC) com transport error neste runner — Hn reais seguem `não confirmado`.
- Recheck 2026-10-12 (ciclo-4): changelog segue em `v1.19.0`, sem trigger.
- Rotina (ciclo-5): recheck de changelog a cada 2 ciclos (2 ciclos seguidos sem mudança); matriz PDF segue bloqueada (6 rotas falhas no total).
- Rotina (ciclo-9): changelog passa a cada 3 ciclos (4 fetches seguidos em `v1.19.0`; custo do fetch integral não compensa); próximo devido no ciclo-10.
- Recheck 2026-10-12 (ciclo-7): changelog segue em `v1.19.0`, sem trigger; matriz PDF segue bloqueada (7 rotas).
- Recheck 2026-10-12 (ciclo-10): changelog segue em `v1.19.0`, sem trigger.
- Recheck 2026-10-12 (ciclo-13): changelog segue em `v1.19.0`, sem trigger.
- Recheck 2026-10-12 (ciclo-19): changelog segue em `v1.19.0`, sem trigger.
- Consequência: zero churn agora; migração mecânica depois (1 script + gate).
