# ADR 0003 — PAT com escopo workflow para CI

- Data: 2026-10-10
- Contexto: push de `.github/workflows/*.yml` recusado (`refusing to allow PAT without workflow scope`).
- Decisão: PAT classic com `repo` + `workflow` no cofre do Windows; workflow versionado normalmente após isso.
- Consequência: CI roda `npm run validate`; token com expiração curta e revogação do antigo.
