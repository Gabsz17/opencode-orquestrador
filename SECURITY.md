# Segurança

## Reportar vulnerabilidade
Abra uma issue privada ou contate o dono do repo. Não abra PR com PoC de exploit.
Prazo-alvo de resposta: 7 dias.

## O que nunca vai ao git
`service.json`, `auth.json`, `credentials.json`, `.env` — barrados pelo `npm run validate` e pelo hook `scripts/pre-push-check.mjs`.

## Pre-push obrigatório (orquestrador)
`git status` + `git diff --stat` + grep de `ghp_ github_pat_ sk- AKIA BEGIN.*PRIVATE password` + `.env` fora do git + sem `--force`.

## Tokens
- Push/CI com workflow exige PAT classic com `repo` + `workflow` (ou fine-grained com `Contents: RW` + `Workflows: RW`).
- Expiração curta (7–30 dias). Token vazado? Revogue em `Settings > Developer settings` e gere outro.
- Remote sempre limpo (`https://github.com/<dono>/<repo>.git`, sem token na URL).
