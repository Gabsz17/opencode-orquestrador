# Plano de Melhoria do Modo Mentor — Índice e Resumo Executivo

> Dono: orquestrador (single-writer deste plano; coords propõem diff via relatório). Versão 1.0 — 2026-10-12. Escopo: modo mentor (`mentor` + 3 coords + 8 workers + reuso de `coord-pesquisa`), comandos `/estudar` e `/estudar-enem`, template `PLANO-ESTUDOS.md`, trilhas `docs/estudos/`, 5 skills, `evals/estudos.md`. Fora do escopo: modo dev (orquestrador + 5 coords + workers de código) — citado só onde há interface.

## Resumo executivo (1 página)

O modo mentor funciona e é seguro (2 LIBERADOs + 1 bug hunt com 0 críticas), mas tinha 23 problemas reais: 15 de experiência pedagógica (nivelamento, gate órfão, respostas, redação, ritmo, reentrada) e 8 de consistência (dono de simulados, escopo ENEM, skills, progresso duplo). Todos foram corrigidos nas ondas 1–2 (commits `5e30ec9`, `12707b5`, `aff83c4`). Este plano registra o diagnóstico, consolida o backlog restante (~30 itens em 4 ondas), define métricas, riscos e governança. Meta: modo mentor pronto para uso diário real por estudantes ENEM, sem alucinação de conteúdo e com trilhas que retêm o aluno.

## Como ler (ordem sugerida)

| Cap. | Arquivo | Conteúdo | Público |
|---|---|---|---|
| 0 | `00-indice.md` (este) | resumo + mapa | todos |
| 1 | `01-diagnostico.md` | inventário, método, 23 falhas, causas-raiz | orquestrador, qualidade |
| 2 | `02-visao-principios.md` | visão 3 horizontes, 10 princípios, não-metas, personas | todos |
| 3 | `03-backlog.md` | backlog completo priorizado (IDs MEL-001…) | orquestrador, plataforma |
| 4 | `04-onda1-fundacoes.md` | specs + evidências do aplicado (fundações pedagógicas) | avaliação, teoria, prática |
| 5 | `05-onda2-experiencia.md` | specs + evidências do aplicado (experiência e ritmo) | mentor, docs |
| 6 | `06-onda3-conteudo.md` | specs futuras (banco, redação, slides, matriz) | prática, teoria |
| 7 | `07-onda4-plataforma.md` | specs futuras (validate, evals runner, progresso, plugin) | plataforma, qualidade |
| 8 | `08-metricas-riscos.md` | métricas, metas, riscos e mitigações | orquestrador |
| 9 | `09-governanca-historico.md` | ownership, gates, changelog, como atualizar | todos |

## Convenções deste plano

- IDs `MEL-###` para melhorias, `FAL-##` para as 8 falhas do bug hunt, `AUD-##` para os 15 da auditoria.
- Status: `feito` (com commit), `próxima onda`, `backlog`, `débito pós-melhoria`, `não-meta`.
- Verificação: cada item aplicado cita evidência (`arquivo:linha` + `npm run validate` + gate). Nada é "feito" sem evidência.
- Regra de ouro herdada: sem fonte oficial = `não confirmado`; questão sem fonte = `autoral`; TRI só conceito; sem nota oficial de redação.

## Estado em 2026-10-12 (fotografia)

- Agents: 12 do modo (mentor + 3 coords + 8 workers) + `coord-pesquisa` compartilhado; 37 no repo.
- Comandos: `/estudar`, `/estudar-enem`. Skills: 5 (4 pedagógicas + `delegacao-verificada`).
- Gates: 3 LIBERADOs (base, ENEM+skills, 15 correções). Validate verde. `origin/main` sincronizado.
- Repo público do modo: https://github.com/Gabsz17/opencode-modo-estudos (`main = 52fcd49`; sincronizar após esta missão).
