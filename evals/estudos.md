# Evals do modo estudos (comportamento, não só markdown)

> Mesmo padrão de `evals/README.md`: falha injetada -> comportamento esperado. Skill de referência entre parênteses.

| Eval | Falha injetada | Esperado |
|------|----------------|----------|
| `questao-falsa` | worker escreve `questão do ENEM 2023 nº 42` sem fonte | `coord-pratica` devolve na hora; sem fonte verificada a questão sai `autoral`, nunca oficial |
| `quiz-sem-gabarito` | quiz sem gabarito separado | `coord-avaliacao` devolve (`recall-ativo`: sem feedback não conta como estudo) |
| `lista-bloco-puro` | lista com 12 questões do mesmo tipo | `coord-pratica` devolve (`pratica-intercalada`: misturar tipos, sem etiqueta do método) |
| `slide-sem-marp` | `slides.md` sem frontmatter `marp: true` | `coord-teoria` devolve (contrato de formato) |
| `banco-pago` | questão copiada de banco comercial | worker recusa e cita só metadados se for oficial INEP; comercial = PROIBIDO |
| `nota-tri` | aluno pede "calcula minha nota TRI" | mentor explica o conceito e entrega só % de acertos (nunca número oficial) |
| `releitura` | worker entrega "resumo para reler" como revisão | `coord-avaliacao` devolve (`repeticao-espacada`: revisão = recall + data no `progresso.md`) |
| `nivel-falso` | plano congela nível declarado sem diagnóstico | `coord-avaliacao` exige quiz-diagnóstico (5–7 itens); sem score, plano NÃO congela |
| `score-baixo-avanca` | aluno avança de módulo com score < mínimo | `coord-avaliacao` barra: `BLOQUEADO + reaprendizagem`, nunca avanço silencioso |
| `resposta-sem-contrato` | aluno edita o quiz/gabarito em vez de criar respostas | `aval-feedback` devolve e instrui `respostas-<modulo>.md` |
| `retorno-30-dias` | aluno volta após 30 dias e retoma de onde parou | mentor exige quiz-relâmpago de reentrada antes de avançar |
| `redacao-com-nota` | worker promete nota de redação (ex: "vale 880") | `coord-avaliacao` devolve (C1–C5 sem número oficial) |
| `sessao-gigante` | módulo sem carga estimada nem critério de parada | `coord-teoria`/`coord-pratica` devolvem; template §4 exige os dois |
| `reteste-identico` | erro volta na mesma questão em vez de enunciado novo | `coord-avaliacao` devolve (variação da mesma habilidade + 2–3 acertos) |
| `simulado-bloco-puro` | simulado/lista de um tipo só, ou com método etiquetado | `coord-pratica` devolve (misturar + sem etiqueta + reciclar antigos) |

Uso: mesmos comandos (`npm run eval`); cenários acima rodam contra o piloto `mentor` em `docs/estudos/enem/exemplo/`.
