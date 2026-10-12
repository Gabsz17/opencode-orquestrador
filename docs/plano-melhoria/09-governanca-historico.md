# 9. Governança, Changelog e Como Atualizar

## 9.1 Ownership (1 arquivo = 1 dono por mudança)

| Parte do modo | Dono runtime | Dono criação/estrutura | Aprova |
|---|---|---|---|
| Trilhas ENEM (`questoes.md`, `simulados.md`) | `enem-questoes` | `coord-pratica` propõe, orquestrador aprova | mentor |
| Slides | `enem-slides` | `coord-teoria` | mentor |
| Quizzes/feedback/diagnóstico/gate | `aval-quiz`/`aval-feedback` | `coord-avaliacao` | mentor |
| Plano da trilha | `mentor` | — | orquestrador (se mudar contrato) |
| Template/exemplos/comandos | — | `coord-plataforma` (docs) | orquestrador |
| Briefings de fontes | `web-researcher` | `coord-pesquisa` | orquestrador |
| Contrato (`API.md`) e plano (`PLANO.md`) raiz | — | orquestrador (single-writer) | — |
| Este plano (`docs/plano-melhoria/`) | orquestrador | orquestrador | — |

## 9.2 Gates (quando aplicar e quando liberar)

- Toda MEL entra por Task com escopo + skill + aceite; sai com evidência + gate do `coord-qualidade`.
- LIBERADO = validate verde + grep 0 segredos + matriz contrato confere + zero CRÍTICO.
- 3 tentativas no mesmo erro → pivô (trocar abordagem, simplificar, registrar).

## 9.3 Changelog deste plano

| Data | Versão | O que mudou |
|---|---|---|
| 2026-10-12 | 1.0 | criação: diagnóstico (23 falhas), visão, backlog (20 MELs + rejeitadas), ondas 1–2 aplicadas, ondas 3–4 especadas, métricas, riscos, governança |

## 9.4 Como atualizar (sem reescrever tudo)

1. Nova melhoria? Adicione linha em `03-backlog.md` com ID novo (MEL-021…) + aceite verificável.
2. Mudou template? Regenere os 2 exemplos + rode validate + gate.
3. Nova onda aplicada? Mova a spec para `04/05` (aplicadas) com commit + evidência.
4. Gap visto 3x em uso real? Vira MEL prioritária (fura fila) + eval correspondente.
5. Fato novo (edital, matriz, V2)? Revise o capítulo afetado + briefing + changelog.

## 9.5 Definição de pronto deste plano (aceite da missão)

- [x] 10 capítulos em `docs/plano-melhoria/` cobrindo diagnóstico → backlog → specs → métricas → governança
- [x] 23 falhas diagnosticadas e corrigidas com commit + gate
- [x] Backlog futuro especado (ondas 3–4) com aceite verificável por item
- [x] MEL-010/011 (validate Marp + respostas, com teste negativo), MEL-015 (template + proposta-exemplo), MEL-013 (sync `opencode-modo-estudos` = `9659894`, espelhos idênticos)
- [ ] Ondas 3–4 restantes (MEL-001/002/003/004/005/006/007/008/009/012/014) — lista residual na avaliação final
