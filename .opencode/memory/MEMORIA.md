# MEMORIA.md — memória de longo prazo do orquestrador

> Teto 60 itens. Recentes em FIFO (máx 30). Lição vista 3x vira `Regra permanente`.
> NUNCA grave segredo, token ou dado pessoal.
> Inbox: `.opencode/memory/inbox/<agente>.md` — o orquestrador promove o útil para cá e esvazia o inbox via edit.

## Regras permanentes
- `API.md` é single-writer do orquestrador; `be-api` só propõe diff no relatório
- `service.json`/`auth.json`/`.env` nunca entram no git (validate barra)
- Token para CI precisa de escopo `workflow` (classic: `repo` + `workflow`)

## Aprendizados (recentes primeiro)
- [2026-10-12] ciclos-7+8 LIBERADO (redação-modelo, MCP path relativo, install .sh, validate sem falso-verde, contagens, comando explícito) -> ação: manter standing order 2 ciclos + consolidado
- [2026-10-12] STANDING ORDER do dono: "segue sempre 2 ciclos + consolidado" (2 ciclos por resposta, para só em "para") -> ação: cada resposta = 2 ciclos + resumo curto + próxima lista
- [2026-10-12] ciclos-5+6 LIBERADO (Hn 6 rotas, 40/40 gabaritos, ADR-0006, banco-regressão, V1-check, READMEs íntegros) -> ação: recheck changelog a cada 2 ciclos; Hn só com PDF oficial
- [2026-10-12] ciclo-4 LIBERADO (judge tolerante, backup restore real, Hn 5 rotas falhas, +5 gabaritos) + meu próprio endurecimento quebrou o eval (pego antes do push) -> ação: toda mudança em `eval.mjs`/`validate.mjs` roda os dois antes de commitar, sem exceção
- [2026-10-12] ciclo-3 LIBERADO + check novo achou gap real (proteção redação só no template, worker sem frase) -> ação: todo endurecimento no validate nasce com frase-canônica presente nos 2 lados antes do commit
- [2026-10-12] ciclo-2 LIBERADO (judge piloto, resume task_id, redação rápida, multitrilhas, links vivos, V2 sem trigger) -> ação: ciclo-3 = Hn real + redação-foto + streak + install-teste + links
- [2026-10-12] ciclo-1: benchmark + 6 melhorias LIBERADO (skills anti-shadow, ADR-V2, FSRS-like, gaps primeiro, streak) -> ação: ciclo-2 = H2 (judge, V2, redação-foto, multitrilhas) após confirmação do dono
- [2026-10-12] lista-residual-11: banco 40 autorais + regras + eval runner + sync, tudo LIBERADO -> ação: próxima missão = H2 (MEL-016…020) com dono
- [2026-10-12] avaliação-final: 14 residuais (11 MELs futuras + 3 baixos, 2 corrigidos na hora) -> ação: lista residual com dono no resumo; proposta sem implementação entra na lista com dono explícito
- [2026-10-12] auditoria-mentor: 15 achados viraram 15 correções + LIBERADO (diagnóstico, gate score, respostas, C1–C5, 1ª sessão, carga, reentrada, progresso único, skills, níveis, 6 evals, a11y) -> ação: repetir checklist 1-a-1 em futuras auditorias
- [2026-10-12] `gh auth login` colando PAT fine-grained sem escopo de criação falha (`createRepository` negado) -> ação: refazer via navegador (OAuth) ou criar repo no github.com/new e só dar push
- [2026-10-12] gh CLI 2.102.0 instalado em `C:\Program Files\GitHub CLI` (fora do PATH; corrigido no PATH do usuário) mas SEM login (`gh auth status` = not logged in) -> ação: dono roda `gh auth login` (GitHub.com + HTTPS + browser, 1 clique); depois orquestrador cria repos sozinho via `gh repo create`
- [2026-10-12] auth github perene OK via GCM (vault `git:https://github.com`, fetch + push dry-run EXIT=0, sem aba porque credencial válida já existe) -> ação: `git push origin main` direto, sem token em env
- [2026-10-12] repo sem gh/token: `gh` ausente + sem `GITHUB_TOKEN` -> ação: criar repo local + commit e registrar push pendente (não improvisar auth)
- [2026-10-12] skills teto 5: diff/ADR/contexto não viram skill (proliferation dilui descoberta) -> ação: gatilho raro = template/comando, não skill
- [2026-10-12] ENEM-esqueleto com ZERO questões elimina risco de questão falsa no exemplo -> ação: repetir padrão em exemplos pedagógicos
- [2026-10-12] wiring mínimo de skills (1 linha por coord + mapeamento no `API.md`) passa no gate sem edição em massa -> ação: repetir
- [2026-10-11] modo-estudos V1: docs V2 usam `permissions/shell/subagent` mas repo + `scripts/validate.mjs` usam V1 `permission/bash/task` -> ação: criar agents novos em V1 e registrar ADR antes de migrar
- [2026-10-11] `hidden: true` não é segurança (só tira do autocomplete `@`) -> ação: segurança real via `task deny` + `edit` escopado + validate
- [2026-10-11] não existe `opencode validate` oficial (só `debug agents/config`, `agent list`, `reload`) -> ação: `npm run validate` é o validador do repo
- [2026-10-11] validate temps por papel: coords/qa 0.1, demais 0.1-0.3 -> ação: fixar temperature na criação, antes de validar
- [2026-10-11] validate só checa `task allow` com prefixos conhecidos; prefixos novos (`teoria-/pratica-/aval-`) exigem conferência manual de existência -> ação: conferir 1-a-1 no gate de contrato
- [2026-10-11] grep de segredos: `task-permissions` dispara `sk-` (substring) -> ação: excluir matches dentro de palavras antes de reportar
- [2026-10-11] QA sem shell delegável (depth limit 1): `coord-qualidade` executa gates read-only direto e declara `npm run validate` da fase plataforma como evidência -> ação: orquestrador re-roda validate antes do commit final- [2026-10-10] push workflow: PAT sem escopo `workflow` recusa `.github/workflows/*.yml` -> ação: gerar classic com `repo` + `workflow` e atualizar cofre do Windows
- [2026-10-10] gitignore: `.env.*` ignora `.env.example` junto -> ação: adicionar `!.env.example` para versionar o exemplo sem segredos
- [2026-10-10] validate: strip de `//` quebra URLs `https://` no jsonc -> ação: remover só linhas `^\s*//` e corrigir regex `task:` sem aspas

## Falsos-positivos / flakes conhecidos (para o QA não reabrir)
- [2026-10-11] `task-permissions`/`max-steps` em texto disparam grep `sk-`/`steps` — substring, não segredo (visto em `docs/pesquisa/estudos-modo.md`)

## Decisões que economizaram retrabalho
- (ex: `fe-state` + `fe-components` antes de `fe-pages`)
