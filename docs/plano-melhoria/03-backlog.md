# 3. Backlog Completo Priorizado (IDs MEL-001…)

> Prioridade = valor/risco ÷ custo. Esforço em arquivos tocados (P=pequeno 1–2, M=médio 3–5, G=grande 6+). Verificação = como provar sem executar app (validate + grep + leitura 1-a-1 + gate).

## Onda 3 — Conteúdo que retém (H1)

| ID | Melhoria | Arquivos | Esf. | Verificação |
|---|---|---|---|---|
| MEL-001 | Banco de simulados prontos por área (10–15 questões autorais cada, gabarito + habilidade) | `docs/estudos/enem/simulados-modelo/*`, `API.md` | G | zero questão oficial; `autoral` em todas; validate |
| MEL-002 | Workflow de redação fim-a-fim (proposta → texto do aluno → correção C1–C5 → reescrita) | `aval-feedback.md`, template §9, `evals` | M | eval `redacao-reescrita`; sem nota |
| MEL-003 | Códigos de habilidade da matriz (Hn lidos do PDF v1) nas questões | `enem-questoes.md`, briefing | M | Hn só com fonte+página; `não confirmado` sem PDF |
| MEL-004 | Intercalação ENEM por padrão (simulados misturam áreas) | `enem-questoes.md`, `coord-pratica.md` | P | eval `simulado-bloco-puro` |
| MEL-005 | Variações de quiz (mesma habilidade, enunciado novo) p/ re-teste | `aval-quiz.md`, `evals` | M | erro volta diferente, não igual |
| MEL-006 | Glossário por trilha (jargão explicado uma vez, referenciado depois) | template, `teoria-conceito.md` | M | grep jargão→glossário |
| MEL-007 | Exemplos com erro comum + correção (não só exemplo certo) | `teoria-exemplos.md`, `evals` | M | 1 anti-exemplo por conceito |
| MEL-008 | Slides de revisão cumulativa (deck mistura módulos) | `enem-slides.md` | P | deck cita módulos-fonte |

## Onda 4 — Plataforma do modo (H1)

| ID | Melhoria | Arquivos | Esf. | Verificação |
|---|---|---|---|---|
| MEL-009 | `npm run eval` rodando os 13 evals do modo | `scripts/eval.mjs`, `evals/estudos.md` | G | eval verde no CI |
| MEL-010 | Validate checa Marp (`marp: true` em `slides.md`) | `scripts/validate.mjs` | P | slide sem frontmatter = FAIL |
| MEL-011 | Validate checa convenção `respostas-<modulo>.md` citada | `scripts/validate.mjs` | P | grep convenção nos workers |
| MEL-012 | Painel de progresso em markdown (scores por área, streak, gaps) | `docs/estudos/enem/progresso-modelo.md`, mentor | M | leitura 1-a-1 |
| MEL-013 | Sincronização documentada com `opencode-modo-estudos` (export) | `docs/adr/`, checklist | P | diff vazio pós-sync |
| MEL-014 | Plugin/distribuição: instalar modo via 1 comando | `README.md`, `package.json`, scripts | M | install limpo em config vazia |
| MEL-015 | `docs/melhorias/` com template de proposta contínua | `docs/melhorias/TEMPLATE.md` | P | proposta segue template |

## Débitos pós-melhoria (H2, com dono)

| ID | Melhoria | Dono | Nota |
|---|---|---|---|
| MEL-016 | Render Marp (CLI/PDF) | coord-teoria | hoje só markdown válido |
| MEL-017 | Spaced-repetition externa (Anki/Notion) | coord-avaliacao | hoje manual no `progresso.md` |
| MEL-018 | i18n das trilhas | coord-teoria | hoje só pt-BR |
| MEL-019 | Múltiplas trilhas simultâneas (estado por trilha isolado) | mentor | hoje 1 trilha ativa por vez (convenção) |
| MEL-020 | Comunidade de trilhas (curadoria de trilhas de terceiros) | orquestrador | risco de qualidade; exige gate de curadoria |

## Itens avaliados e REJEITADOS (com motivo — não reabrir sem fato novo)

| Ideia | Motivo da rejeição |
|---|---|
| Calculadora TRI | promete número oficial; fere princípio 3 |
| Correção automática de redação com nota | idem; C1–C5 sem número é o teto honesto |
| Questões ilustrativas no exemplo | reabre risco de questão falsa (padrão ZERO questões consagrado) |
| `question:` interativo no mentor | quebra autonomia + trava execução; diagnóstico cobre |
| Gamificação com pontos/ranking | PII/competição tóxica; streak manual no progresso basta no H1 |
| Vídeo/áudio nas trilhas | sem pipeline de mídia; markdown + Marp cobre H1 |
