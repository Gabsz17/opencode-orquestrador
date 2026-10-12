# 1. Diagnóstico — Inventário, Método, Falhas e Causas-Raiz

## 1.1 Inventário do modo mentor (2026-10-12)

| Camada | Arquivos | Linhas aprox. |
|---|---|---|
| Primary | `agents/mentor.md` | ~75 |
| Coords | `coord-teoria.md`, `coord-pratica.md`, `coord-avaliacao.md` (+ `coord-pesquisa.md` compartilhado) | ~50 cada |
| Workers teoria | `teoria-conceito.md`, `teoria-exemplos.md`, `enem-slides.md` | ~50 cada |
| Workers prática | `pratica-exercicios.md`, `pratica-projetos.md`, `enem-questoes.md` | ~50 cada |
| Workers avaliação | `aval-quiz.md`, `aval-feedback.md` | ~50 cada |
| Comandos | `commands/estudar.md`, `commands/estudar-enem.md` | ~8 cada |
| Template | `templates/PLANO-ESTUDOS.md` (9 seções) | ~60 |
| Trilhas/docs | `docs/estudos/README.md`, `docs/estudos/enem/README.md`, 2 exemplos-esqueleto | — |
| Skills | `recall-ativo`, `repeticao-espacada`, `pratica-intercalada`, `explicar-para-aprender`, `delegacao-verificada` | ~30 cada |
| Evals | `evals/estudos.md` (13 cenários) | ~20 |
| Contrato | `API.md` v2026-10-12-enem-skills | ~90 |

## 1.2 Método das auditorias

- Auditoria pedagógica (15 achados AUD-01…15): foco em experiência do aluno, completude de fluxo, aderência a Dunlosky-2013.
- Bug hunt sistemático (8 falhas FAL-01…08, 0 críticas): checklist de 10 categorias (links, agents, contradições, permissões, TODOs, instruções impossíveis, buracos, segredos, typos, nomenclatura).
- Ambas read-only, verificação 1-a-1 `arquivo:linha`, anti-regressão do que funciona.

## 1.3 As 23 falhas (resumo com causa-raiz)

### Críticas de experiência (AUD, já corrigidas)
| ID | Falha | Causa-raiz | Correção (commit) |
|---|---|---|---|
| AUD-01 | Nivelamento só declarado | MVP sem diagnóstico; campo livre sem evidência | quiz-diagnóstico `coord-avaliacao` + nível verificado (`5e30ec9`) |
| AUD-02 | Score mínimo órfão | template pedia número, ninguém barrava avanço | gate BLOQUEADO + reaprendizagem (`5e30ec9`) |
| AUD-03 | Sem contrato de resposta | ninguém definiu onde o aluno responde | `respostas-<modulo>.md` (`5e30ec9`) |
| AUD-04 | `simulados.md` sem dono | criado no exemplo, ownership em nenhum contrato | dono `enem-questoes` (`5e30ec9` + `12707b5`) |
| AUD-05 | Redação C1–C5 sem rubrica | promessa no template sem worker capacitado | rubrica em `aval-feedback` + eval (`5e30ec9`) |
| AUD-06 | Primeira sessão fria | README ia direto ao comando; `question: deny` sem recepção escrita | seção boas-vindas + parágrafo no plano (`5e30ec9`) |
| AUD-07 | Trilha sem ritmo | módulos sem carga nem parada | colunas no template + eval (`5e30ec9`) |
| AUD-08 | Abandono sem reentrada | progresso registra, ninguém reage à ausência | regra >7 dias + quiz-relâmpago (`5e30ec9`) |
| AUD-09 | Progresso duplicado | §8 do template + `progresso.md` + schema ENEM | plano=metas, progresso=estado (`5e30ec9` + `12707b5`) |
| AUD-10 | Skills prometidas, não plugadas | `API.md` listava, coords não anexavam | 1 linha por coord (`5e30ec9`) |
| AUD-11 | Níveis só na teoria | `coord-pratica` não mencionava progressão | espelho de níveis (`5e30ec9`) |
| AUD-12 | Evals só de integridade | 7 evals cobriam conteúdo, zero comportamento | +6 evals (`5e30ec9`) |
| AUD-13 | Acessibilidade zero | nenhum requisito em workers de entrega | 2–3 linhas por worker (`5e30ec9`) |
| AUD-14 | `API.md` desatualizada | status "a criar" pós-entrega | status "existe" (`5e30ec9` + `12707b5`) |
| AUD-15 | Exemplo ENEM truncado | §§ 3–8 faltando | regenerado do template (`5e30ec9`) |

### Consistência (FAL, já corrigidas em `12707b5`)
| ID | Falha | Causa-raiz | Correção |
|---|---|---|---|
| FAL-01 | Saída `/estudar-enem` omitia simulados+progresso | comando escrito antes do README ENEM | célula da tabela `API.md` |
| FAL-02 | Dono de simulados contraditório | frase antiga sobreviveu à decisão | dono único + consumidor só-lê |
| FAL-03 | Escopo ENEM ambíguo em 4 workers | workers escritos para trilha genérica | escopo `docs/estudos/** no escopo da Task` |
| FAL-04 | Skills table omitia `coord-teoria` | mapeamento parcial | célula completa |
| FAL-05 | §8 duplicava progresso | correção parcial da AUD-09 | só ponteiro |
| FAL-06 | `theme: default` obrigatório vs recomendado | entrega mais rígida que contrato | recomendado em todos |
| FAL-07 | Typo "um ideia" | revisão manual | "uma ideia" |
| FAL-08 | Briefing com público errado | título herdado da missão de criação | runtime correto |

## 1.4 Causas-raiz sistêmicas (o que o processo deve impedir)

1. **Contrato escrito depois do uso**: comando/README prometeram antes do `API.md` consolidar (FAL-01, AUD-04). Antídoto: `API.md` primeiro, sempre.
2. **Regra sem dono executa**: score, simulados, redação existiam sem responsável (AUD-02/04/05). Antídoto: toda regra nova nasce com dono na mesma frase.
3. **Exemplo diverge do template**: exemplo copiado à mão apodrece (AUD-15). Antídoto: exemplo = template + TODO, regenerado a cada mudança de template.
4. **Skill documentada ≠ skill anexada** (AUD-10, FAL-04). Antídoto: wiring (1 linha no coord) no mesmo commit da skill.
5. **Correção parcial reabre o ponto** (AUD-09→FAL-05). Antídoto: fechar com teste literal da frase corrigida.
