# opencode-orquestrador

Sistema orquestrador para OpenCode: 1 orquestrador autônomo + 5 coordenadores + 19 workers + 3 skills.

## Como instalar

```powershell
# 1. Clonar como config global do OpenCode
git clone https://github.com/Gabsz17/opencode-orquestrador.git "$env:USERPROFILE\.config\opencode-tmp"
# 2. Copiar agents/skills/templates para a config ativa (faça backup antes)
# 3. Garantir que `opencode.jsonc` tem default_agent = orquestrador
```

Ou use como template por projeto: copie `agents/`, `skills/`, `templates/` para a raiz do projeto.

> Nunca commite `service.json`, `auth.json`, `.env` — já estão no `.gitignore`.

## Como invocar

No OpenCode, selecione o agent `orquestrador` (é o `default_agent`) e descreva a missão.
Ele vai criar `PLANO.md` + `API.md` (a partir de `templates/`) e delegar aos coords em paralelo.

## Estrutura

```
agents/
  orquestrador.md      # primary, único que commita/push e escreve API.md/PLANO.md
  coord-frontend.md    # fe-pages, fe-components, fe-state, fe-a11y
  coord-backend.md     # be-api, be-auth, be-domain, be-data, be-integrations
  coord-plataforma.md  # plat-infra, plat-docs, plat-observability
  coord-pesquisa.md    # web-researcher, web-operator
  coord-qualidade.md   # qa-unit, qa-contrato, qa-e2e, qa-security, qa-quality
skills/
  debug-sistematico/   # bug -> reproduz -> correção mínima + regressão
  revisao-segura/      # segredos, auth, injeção, input (veredito por gravidade)
  testes-eficazes/     # pirâmide, bordas, zero flake
templates/
  PLANO.md API.md
  stacks/node-minimo/  # node http puro, lint/build/test prontos
  stacks/next-fastapi/ # esqueleto de pastas + regra de precedência API->UI
.opencode/memory/
  MEMORIA.md inbox/
```

## Fluxo (resumo)

1. Orquestrador planeja (`PLANO.md`) e fecha contratos (`API.md`) antes de paralelizar.
2. Delega até 5 Tasks em paralelo aos coords com escopo + contratos + ownership.
3. Arbitra conflitos cross-team e re-delega só o delta.
4. Gates via `coord-qualidade`: unit → contrato → e2e → security + quality (paralelo).
5. Finaliza só com `LIBERADO`.

## Validação

```powershell
npm run validate   # checa frontmatter, task allow x arquivos, skills referenciadas e segredos trackeados
```

## Segurança

Pre-push obrigatório do orquestrador: `git status`, `git diff --stat`, grep de `ghp_ github_pat_ sk- AKIA BEGIN.*PRIVATE password`, `.env` fora do git, sem `--force`.
