# 5. Onda 2 — Experiência e Ritmo (APLICADA, commits `5e30ec9`/`12707b5`)

## 5.1 MEL-B1 — Primeira sessão (AUD-06)

- **Spec**: README com seção "Sua primeira sessão" (diagnóstico → duração → respostas → progresso → reentrada) + parágrafo de boas-vindas obrigatório no plano (§1).
- **Por que funciona**: com `question: deny`, a recepção tem que estar escrita; o mentor lê o parágrafo, não improvisa.
- **Evidência**: gate item 9; README `docs/estudos/README.md:38-44`.

## 5.2 MEL-B2 — Carga e parada (AUD-07)

- **Spec**: módulos com `Carga estimada` + `Critério de parada`; sessão termina no critério, resto vai para a próxima.
- **Efeito colateral bom**: alimenta a regra de abandono (ausência = sessões perdidas mensuráveis) e o eval `sessao-gigante`.
- **Evidência**: template §4; gate item 8.

## 5.3 MEL-B3 — Reentrada (AUD-08)

- **Spec**: campo `Última sessão` obrigatório; >7 dias = quiz-relâmpago antes de avançar; texto sem culpa ("revisão de reentrada", nunca "você atrasou").
- **Casos**: 7–30 dias = relâmpago do módulo corrente; >30 dias = relâmpago + revisão do módulo anterior (eval `retorno-30-dias`).
- **Evidência**: `mentor.md:51`, exemplos com o campo, gate item 9.

## 5.4 MEL-B4 — Progresso único (AUD-09 → FAL-05)

- **Spec**: plano = metas; `progresso.md` = estado; §8 do template virou ponteiro ("ver `progresso.md`, não duplicar").
- **Por que duas correções**: a primeira deixou os bullets editáveis no plano (FAL-05); a segunda removeu. Lição: fechar com teste literal.
- **Evidência**: template §8; gate item 8.

## 5.5 MEL-B5 — Skills plugadas (AUD-10 → FAL-04)

- **Spec**: `coord-pratica` += `recall-ativo`; `coord-teoria` += `repeticao-espacada` (só `enem-slides`); `API.md` reflete os dois.
- **Evidência**: coords `:42`, `API.md` skills table; gate itens 5–6.

## 5.6 MEL-B6 — Níveis, evals, a11y, exemplo, API (AUD-11…15)

- Níveis espelhados em `coord-pratica` (2 linhas, custo mínimo).
- +6 evals (total 13): `nivel-falso`, `score-baixo-avanca`, `resposta-sem-contrato`, `retorno-30-dias`, `redacao-com-nota`, `sessao-gigante`.
- A11y: linguagem simples/títulos/alt-text nos 3 workers de entrega.
- Exemplo ENEM regenerado do template completo, ZERO questões (padrão consagrado).
- `API.md`: status "existe" + dono simulados + skills + typo.

## 5.7 O que a onda 2 NÃO resolveu (vai para ondas 3–4)

- Motivação contínua além da 2ª semana (streak manual ajuda, mas não há ritual de retorno — MEL-012 cobre parcial).
- Banco pronto de simulados (MEL-001) e workflow de redação com reescrita (MEL-002).
- `npm run eval` executável (MEL-009): evals existem como tabela, não como runner.
