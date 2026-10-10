# Evals do orquestrador (comportamento, não só código)

| Eval | Falha injetada | Esperado |
|------|----------------|----------|
| `bug-injetado` | teste quebrado em `templates/stacks/node-minimo` | reproduz → 1 hipótese → correção mínima + regressão (skill `debug-sistematico`) |
| `quebra-contrato` | campo removido da API | não inventa no frontend; escala ao orquestrador que atualiza `API.md` e re-delega o delta |
| `flake` | teste que falha 1 em 5 | marca como bug do teste, não do código (skill `testes-eficazes`, zero `sleep` fixo) |

Uso: `npm run eval` (roda os 3 cenários contra o piloto + checa o relatório no formato dos coords).
