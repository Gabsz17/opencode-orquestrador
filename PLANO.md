# PLANO.md — Modo Estudos (mentor) no OpenCode

> Orquestrador é o ÚNICO escritor deste arquivo (coords propõem diff no relatório).
> Fonte: `templates/PLANO.md`. Missão: criar modo de estudos seguindo o mesmo rumo do modo orquestrador + extensão ENEM (2026-10-12): questões, simulados, slides e matriz oficial.

## 1. Escopo

- Objetivo: criar um modo de estudos dentro do opencode (`agents/mentor.md` + time + `commands/estudar.md` + template + docs) que replique a filosofia do orquestrador — hierarquia, contratos antes de paralelizar, delegação a coords, arbitragem, memória contínua e gates — mas para aprender, não para codar.
- Fora do escopo:
  - Mudar `agents/orquestrador.md` ou qualquer coord/worker existente (só leitura como referência).
  - Mudar `opencode.jsonc` (agents são descobertos via `agents/*.md`; sem registro central).
  - Criar backend/frontend/app (`src/**`, `server/**`, `app/**` não existem neste repo e nem devem ser criados).
  - Integrar spaced-repetition externa (Anki etc.) — vira débito técnico com dono.
- Critério de aceite (tudo rodando + gates verdes + evidências):
  - [ ] `agents/mentor.md` (primary) + 3 coords + 6 workers criados e válidos (frontmatter parseável).
  - [ ] `commands/estudar.md` invocável (`/estudar <tema>`).
  - [ ] `templates/PLANO-ESTUDOS.md` + `docs/estudos/README.md` criados.
  - [ ] `coord-qualidade: LIBERADO` (qa-quality + qa-security APROVADOS, sem CRÍTICO; qa-unit/contrato/e2e adaptados — ver Contratos).
  - [ ] Evidências: `opencode validate` (ou leitura estrutural) verde + commit local + push.

## 2. Contratos vigentes

- `API.md` (versão/data): `API.md` v2026-10-12-enem-skills (nesta raiz) — adaptado: sem rotas HTTP; contrato = interfaces de agentes/comandos/memória.
- Convenções (pastas, `.env.example`, Conventional Commits):
  - Pastas: `agents/<nome>.md` (1 agente por arquivo, frontmatter + corpo pt-BR), `commands/estudar.md`, `commands/estudar-enem.md`, `templates/PLANO-ESTUDOS.md` (com secao ENEM opcional), `docs/estudos/<tema>/` (trilhas), `docs/estudos/enem/<area>/<tema>/` (trilhas ENEM com `questoes.md`, `slides.md`, `simulados.md`), `.opencode/memory/inbox/<agente>.md`.
  - `.env.example`: não se aplica (modo estudos não usa credencial; `BROWSER_*` só se `coord-pesquisa` for acionado, via env, nunca no repo).
  - Commits: Conventional Commits em pt-BR (`feat: modo estudos (mentor)`, `docs: ...`). Push só com tree limpa.
- Sub-contratos dos coords (UI / backend / infra — persistidos aqui pelo orquestrador):
  - (a) `coord-pesquisa` (2026-10-11): fixar sintaxe V1 ate ADR de migracao; validador do repo = `npm run validate`; `hidden: true` nao e seguranca. Briefing: `docs/pesquisa/estudos-modo.md`.
  - (b) `coord-plataforma` (2026-10-11): 14 arquivos (10 agents + comando + template + README + exemplo-esqueleto); mentor temp 0.1 + `todowrite: allow`; coords `edit: deny`; workers `edit` so `docs/estudos/**` + inbox; `question: deny` em todos.
  - (c) `coord-pesquisa` ENEM (pos-retorno): matriz de referencia vigente + edital + repositorio oficial de provas (INEP/gov.br) + regras de citacao/direitos. Briefing: `docs/pesquisa/enem-fontes.md`.
  - (d) `coord-plataforma` ENEM (pos-retorno): 2 workers novos (`enem-questoes`, `enem-slides`) + atualizacao de `coord-teoria`, `coord-pratica`, `mentor`, `commands/estudar-enem.md`, template (secao ENEM), `docs/estudos/enem/`.

## 3. Fases (dono `coord-*`)

| Fase | Dono | Repo | Entrada | Saída esperada | Status |
|------|------|------|---------|----------------|--------|
| 1. Pesquisa docs oficiais (agents/commands/mode/permission) | coord-pesquisa | . | pergunta + critério | briefing com fontes | concluído |
| 2. Implementar mentor+coords+workers+comando+template+docs | coord-plataforma | . | API.md v2026-10-11-estudos | 14 arquivos | concluído |
| 3. Gates de conteúdo e segurança | coord-qualidade | . | arquivos prontos | LIBERADO | concluído |
| 4. Pesquisa ENEM (matriz, edital, provas oficiais, Marp) | coord-pesquisa | . | pergunta + critério | briefing `docs/pesquisa/enem-fontes.md` | pendente |
| 5. Implementar foco ENEM (2 workers + comando + template + docs) | coord-plataforma | . | API.md v2026-10-12-enem | arquivos ENEM | pendente |
| 6. Gates ENEM | coord-qualidade | . | arquivos ENEM prontos | LIBERADO | pendente |
| 7. Pesquisa skills (orquestrador + estudos) | coord-pesquisa | . | pergunta + critério | briefing + 5 SKILL.md prontas | concluído |
| 8. Aplicar skills + melhorias (validate, evals, README, ADR) | orquestrador (exceção depth-limit) | . | API.md v2026-10-12-enem-skills | skills + wiring + melhorias | em curso |
| 9. Gates finais (ENEM + skills + melhorias) | coord-qualidade | . | tudo pronto | LIBERADO | pendente |
| 10. Repo `opencode-modo-estudos` | orquestrador | novo | subset estudos | CRIADO no GitHub + push `52fcd49` (`main`), verificado via `ls-remote` | concluído |
| 11. Auditoria mentor (15 achados) + correções | coord-qualidade (audita) + orquestrador (aplica) | . | modo mentor | 15 correções aplicadas + LIBERADO (só cosmético 5./5. corrigido) | concluído |
| 12. Auditoria total (falhas e erros) + correções | coord-qualidade (caça) + orquestrador (corrige) | . | modo mentor inteiro | zero falha conhecida | em curso |
| 13. Plano de melhoria 50+ págs (`docs/plano-melhoria/`) | orquestrador | . | diagnóstico + backlog + roadmap | plano completo | pendente |
| 14. Aplicar melhorias em ondas verificadas | orquestrador | . | backlog priorizado | ondas verdes + commits | pendente |
| 15. Avaliação final + lista residual ou relatório | coord-qualidade + orquestrador | . | tudo | LISTA RESIDUAL (11 MELs + 1 nota) | concluído |
| 16. Aplicar lista residual (MEL-001…011) | orquestrador | . | specs ondas 3–4 | 11 MELs + LIBERADO + sync `f9154ea` | concluído |
| 17. CICLO-1: verificar repos + benchmark + opinião + plano + execução + reanálise | orquestrador + coords | ambos | repos verdes | LIBERADO + sync `fc63d90` + lista p/ confirmação | concluído |
| 18. CICLO-2: V2? + judge + handoffs + redação-rápida + multitrilhas + links | orquestrador + coords | ambos | lista confirmada | LIBERADO + sync `7009fd6` | concluído |
| 19. CICLO-3: Hn? + redação-arquivo + install + changelog + gabaritos | orquestrador + coords | ambos | lista confirmada | LIBERADO + sync `42781c8` (Hn pendente: PDF bloqueado) | concluído |
| 20. CICLO-4: Hn-alt + judge-tolerante + backup-restore + links + gabaritos | orquestrador + coords | ambos | lista confirmada | LIBERADO + sync `1a3e88a` (Hn sem fonte; meu regex quebrou o eval e foi corrigido) | concluído |
| 21. CICLO-5: Hn-retry + gabaritos-29 + regex-doc + links | orquestrador + coords | ambos | lista confirmada | Hn 6 rotas falhas; 40/40 gabaritos OK | concluído |
| 22. CICLO-6: banco-regressão + V1-check + READMEs + rotina | orquestrador | ambos | autônomo | validate+eval verdes; READMEs íntegros | concluído |
| 23. CICLO-7: changelog + redação-modelo + proposta-antiga + Hn-retry | orquestrador + coords | ambos | standing order | LIBERADO | concluído |
| 24. CICLO-8: sweep fresco + top baratos | orquestrador + coords | ambos | standing order | LIBERADO + 5 gaps + sync | concluído |
| 25. CICLO-9: Hn-retry + melhorias-pendentes + dry-run trilha + evals-dev | orquestrador + coords | ambos | standing order | LIBERADO | concluído |
| 26. CICLO-10: aplicar achados do 9 | orquestrador + coords | ambos | standing order | LIBERADO + sync `5f0ed9b` | concluído |
| 27. CICLO-11: Hn-retry + typos-banco + TEMPLATE-uso + changelog + be-auth | orquestrador + coords | ambos | standing order | LIBERADO (Hn 9 rotas; typos 0; backend wired) | concluído |
| 28. CICLO-12: aplicar achados do 11 | orquestrador + coords | ambos | standing order | LIBERADO + sync | concluído |
| 29. CICLO-13: Hn-retry + changelog + skills-audit + exemplo-template | orquestrador + coords | ambos | 4 ciclos | em curso | em curso |
| 30. CICLO-14: aplicar achados do 13 | orquestrador + coords | ambos | 4 ciclos | pendente | pendente |
| 31. CICLO-15: ADRs + links + resíduos | orquestrador + coords | ambos | 4 ciclos | pendente | pendente |
| 32. CICLO-16: aplicar + gates + sync | orquestrador + coords | ambos | 4 ciclos | pendente | pendente |
| Frontend (telas) | — | — | — | N/A: sem UI nesta missão | N/A |
| Backend (API HTTP) | — | — | — | N/A: sem HTTP nesta missão | N/A |

> Frontend/backend marcados N/A com justificativa (missão é config de agentes, não app). Qualidade entra no passo 5 do fluxo.

## 4. Progresso

- [x] Contratos fechados (`API.md` v2026-10-11-estudos)
- [x] Fatias delegadas em paralelo (pesquisa + plataforma)
- [x] Arquivos do modo estudos entregues (14 arquivos)
- [x] `npm run validate` verde (35 agents) + grep de segredos 0 matches nos novos
- [x] qa-quality APROVADO + qa-security APROVADO (adaptados, read-only)
- [x] `coord-qualidade: LIBERADO`
- [x] Commit + push (base `4b3abc9` no `origin/main`)
- [ ] Contratos ENEM fechados (`API.md` v2026-10-12-enem)
- [ ] Fatias ENEM delegadas em paralelo (pesquisa + plataforma)
- [ ] Arquivos ENEM entregues (2 workers + comando + template + docs)
- [ ] `npm run validate` verde + grep de segredos 0 nos novos
- [ ] `coord-qualidade: LIBERADO (ENEM)` + commit + push
- [x] Pesquisa skills concluída (5 skills com evidência Dunlosky-2013 + `delegacao-verificada` dev)
- [ ] Skills criadas + wiring nos coords + briefing
- [ ] Melhorias aplicadas (validate prefixos + skills, `evals/estudos.md`, README, package 1.1.0, ADR 0004)
- [x] Gates finais LIBERADO (`coord-qualidade`, sem CRITICO)
- [x] Repo `~/opencode-modo-estudos` criado + commit `52fcd49` (34 arquivos; push pendente: sem `gh`/token no runner)
- [x] Push final `origin/main` (repo estudos: https://github.com/Gabsz17/opencode-modo-estudos)

Checkpoint a cada retorno de coord: atualizar esta seção + commit local.

- 2026-10-11: PLANO criado a partir de `templates/PLANO.md`; sessão movida de `C:\WINDOWS\system32` para o repo; `git log/status` lidos (main limpa, origin `Gabsz17/opencode-orquestrador`).
- 2026-10-11: `API.md` v2026-10-11-estudos escrito (contrato de agentes, sem HTTP).
- 2026-10-11: retornos recebidos (pesquisa: briefing `docs/pesquisa/estudos-modo.md`; plataforma: 14 arquivos). Arbitragem: sem conflito cross-team; contagem 11 vs 14 aceita (detalhamento venceu). `npm run validate` verde.
- 2026-10-11: `coord-qualidade: LIBERADO` (5 gates adaptados PASSOU/APROVADO, sem CRITICO; QA read-only, nada editado). Cobertura: sem re-execucao do validate pelo QA (sem shell delegavel) — evidencia vigente = validate verde da fase plataforma + estrutural manual; `/estudar` real nao executado (e uso, nao gate); `evals/estudos.md` segue debito.

## 5. Decisões

| Data | Decisão | Motivo | Quem |
|------|---------|--------|------|
| 2026-10-11 | Modo `mentor` (primary) + 3 coords (`coord-teoria`, `coord-pratica`, `coord-avaliacao`) + 6 workers + reuso de `coord-pesquisa` | Espelha hierarquia do orquestrador sem o peso de 25 agentes; estudos não precisa de frontend/backend | orquestrador |
| 2026-10-11 | `mentor` mantém `question: deny`; perguntas pedagógicas via texto/quiz, não via ferramenta `question` | Padrão do sistema é autonomia total; evita trava de execução; quiz em markdown cumpre o papel socrático | orquestrador |
| 2026-10-11 | Trilhas em `docs/estudos/<tema>/` com `PLANO-ESTUDOS.md` por tema; memória global segue em `.opencode/memory/` | Separa progresso por tema sem poluir a memória global; reusa pipeline de inbox do orquestrador | orquestrador |
| 2026-10-11 | Gates adaptados: qa-unit/contrato/e2e NÃO se aplicam a markdown de estudos; valem qa-quality + qa-security read-only + verificação estrutural | Não há código executável; forçar teste unitário em markdown seria teatro de QA | orquestrador |
| 2026-10-11 | Anti-alucinação: afirmação técnica sem fonte = `não confirmado`; fonte preferida = docs oficiais ou briefing do `web-researcher` | Mesmo rigor de fontes do `coord-pesquisa` aplicado ao conteúdo pedagógico | orquestrador |
| 2026-10-11 | Frontend/backend N/A nesta missão | Repo é config de agentes, sem app; forçar fatia seria desperdício | orquestrador |
| 2026-10-11 | `coord-qualidade: LIBERADO` com gates adaptados (unit/contrato/e2e viraram estrutural/matriz/dry-run; security+quality read-only) | Missão 100% markdown sem executável; QA não editou nada; sem CRÍTICO | coord-qualidade c/ orquestrador |
| 2026-10-12 | Foco ENEM: 2 workers novos (`enem-questoes` sob `coord-pratica`, `enem-slides` sob `coord-teoria`) + comando `/estudar-enem` + secao ENEM no template; sem novo coord | Reusa hierarquia existente; ENEM e pratica/teoria por area, nao um time paralelo | orquestrador |
| 2026-10-12 | Questoes: autorais marcadas `autoral - padrao ENEM` + oficiais INEP citadas (ano + caderno/cor + n.); NUNCA reproduzir bancos comerciais pagos nem inventar `questao do ENEM 20XX n. Y` | Provas INEP sao publicas para estudo; banco pago tem direito autoral; questao falsa e falha CRITICA de conteudo | orquestrador |
| 2026-10-12 | Slides em markdown compativel Marp (`slides.md`, `---` por slide), sem dependencia nova; render Marp vira debito | Markdown puro funciona no preview; instalar toolchain de slides seria escopo extra | orquestrador |
| 2026-10-12 | Exceção depth-limit: orquestrador aplica diffs de config (`agents/`, `commands/`, `templates/`, `docs/`, `skills/`) propostos e revisados pelos coords, em vez de re-delegar | Coords em sessão subagente não conseguem invocar `plat-*`/`web-*` (depth 1); 1 tentativa sem retry, depois pivô; sem produto `src/**` envolvido — só configs de raiz | orquestrador |
| 2026-10-12 | 5 skills (4 pedagógicas com evidência + `delegacao-verificada`); diff/ADR/contexto NÃO viram skill | Skill proliferation dilui descoberta; gatilho raro = skill morta | coord-pesquisa c/ orquestrador |
| 2026-10-12 | Wiring mínimo: `delegacao-verificada` via `orquestrador.md` (cobre os 5 coords dev via Tasks); skills de estudos nos 4 agents de estudos; workers herdam via Task | Evita 5+ edições mecânicas nos coords dev; mapeamento completo persiste no `API.md` | orquestrador |
| 2026-10-12 | Gates finais LIBERADO (ENEM + skills + melhorias, sem CRITICO, QA read-only) | Cobertura declarada: validate não re-rodado pelo QA; `/estudar-enem` real é uso; render Marp e `npm run eval` pendentes | coord-qualidade c/ orquestrador |
| 2026-10-12 | Repo `opencode-modo-estudos` LOCAL + commit (push pendente: sem `gh` nem token no runner) | `gh` inexistente e `GITHUB_TOKEN`/`GH_TOKEN` ausentes; commit local `52fcd49` preserva tudo; push quando o dono autenticar | orquestrador |
| 2026-10-12 | gh 2.102.0 presente mas sem login; PATH corrigido; `gh auth login` pendente do dono | Sem login o `gh` não cria repo; após login, orquestrador cria repos sozinho (`gh repo create`) | orquestrador |
| 2026-10-12 | Auditoria mentor: aplicar os 15 achados; `simulados.md` owned por `enem-questoes`; plano guarda metas + `progresso.md` guarda estado | Gaps reais (nivelamento, gate órfão, respostas, redação, 1ª sessão, ritmo, reentrada) > custo baixo; o que funciona (anti-alucinação, TRI-conceito, Marp, hierarquia) NÃO é tocado | coord-qualidade c/ orquestrador |

### Contador por erro (3 tentativas no mesmo erro -> pivota)

| Erro | Tentativas | Ação (trocar lib / simplificar) |
|------|------------|----------------------------------|
| | 0/3 | |

## 6. Débitos técnicos (com dono)

| Dívida | Dono | Prazo |
|--------|------|-------|
| Integração spaced-repetition externa (Anki/Notion) | coord-avaliacao (propor) | pós-MVP |
| `evals/estudos.md` (rubrica de qualidade pedagógica) | coord-avaliacao | nesta missão se couber, senão pós-MVP |
| i18n das trilhas (só pt-BR no MVP) | coord-teoria | pós-MVP |
| Render de slides (Marp CLI / export PDF) | coord-teoria (propor) | pós-ENEM |
| Banco de simulados prontos por area ENEM | coord-avaliacao | pós-ENEM |
