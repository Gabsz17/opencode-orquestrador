# Contribuir

## Como propor um agent
1. Crie `agents/<nome>.md` com frontmatter obrigatório: `description`, `mode: primary|subagent`, bloco `permission` (com `task: "*": deny` + allows explícitos).
2. Regra: 1 arquivo = 1 dono por rodada. Worker implementa, coord só delega (`edit: deny`), orquestrador só planeja/arbitra.
3. Rode `npm run validate` — ele checa frontmatter, `task allow` x arquivos reais e skills referenciadas.

## Como propor uma skill
1. Crie `skills/<nome>/SKILL.md` com `name`, `description`, protocolo numerado e seção `Proibido`.
2. Amarre no coord dono (ex: `be-auth` sempre com `revisao-segura`) em vez de deixar solta.
3. Valide com `npm run validate` + 1 caso real no piloto.

## Relatórios (obrigatório)
Todo coord reporta: entregue + arquivos tocados + comandos verdes + bloqueios/decisões + aprendizados para a MEMORIA. Sem relatório, o orquestrador pede 1x e re-delega.

## Commits
Conventional Commits em pt-BR (`feat:`, `fix:`, `docs:`, `ci:`). Sem `--force`, sem segredo no diff.
