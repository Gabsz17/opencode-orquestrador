# ADR 0004 — Skills em `skills/` na raiz (divergência do layout oficial)

- Data: 2026-10-12
- Contexto: o doc oficial do OpenCode varre skills em `.opencode/skills/`, `~/.config/opencode/skills/` e pastas compatíveis; este repo guarda skills em `skills/` na raiz (com as 3 originais) e o `scripts/validate.mjs` checa `skills/<nome>/SKILL.md`.
- Decisão: novas skills (`recall-ativo`, `repeticao-espacada`, `pratica-intercalada`, `explicar-para-aprender`, `delegacao-verificada`) seguem o padrão do repo (`skills/<nome>/SKILL.md` com frontmatter V1 completo), não o layout oficial.
- Consequência: validate continua verde sem mudar o script de descoberta; se o OpenCode um dia exigir o layout oficial, migrar as 8 pastas (mudança mecânica) — sem impacto nos agents, que referenciam skills por nome.
