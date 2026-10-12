# 6. Onda 3 — Conteúdo que Retém (FUTURA, specs prontas para delegar)

> Cada MEL abaixo vira 1 Task a `coord-pratica`/`coord-teoria`/`coord-avaliacao` com: escopo fechado + `API.md` + ownership + skill anexada + critério de aceite. Nada entra em `main` sem gate.

## 6.1 MEL-001 — Banco de simulados prontos por área (prioridade máxima)

- **Problema**: hoje `simulados.md` é estrutura vazia; aluno da reta final não tem o que cronometrar.
- **Spec**: `docs/estudos/enem/simulados-modelo/<area>.md` com 10–15 questões AUTORAIS cada (texto-base + 5 alternativas + gabarito separado com resolução + habilidade com fonte ou `não confirmado`).
- **Proibições**: zero questão atribuída ao INEP; zero banco pago; zero integral de prova.
- **Aceite**: 4 áreas × ≥10 questões + validate + gate conteúdo (questão falsa = CRÍTICO).
- **Skill**: `pratica-intercalada` (áreas misturadas dentro do simulado) + `recall-ativo`.

## 6.2 MEL-002 — Workflow de redação fim-a-fim

- **Problema**: correção sem reescrita não fixa; hoje o ciclo termina no feedback.
- **Spec**: proposta (tema + textos motivadores autorais ou link oficial) → texto em `redacao-<tema>.md` → correção C1–C5 → **reescrita obrigatória dos trechos C1/C2/C3 fracos** → 2ª correção só do que mudou.
- **Aceite**: eval `redacao-reescrita` (reescrita sem 2ª correção = devolvido); nunca número.
- **Skill**: `explicar-para-aprender` (aluno explica o próprio erro) + `repeticao-espacada`.

## 6.3 MEL-003 — Habilidades Hn com fonte

- **Problema**: habilidades citadas de cabeça erram o código.
- **Spec**: `enem-questoes` só cita `ÁREA-Cx-Hy` lido do PDF v1 (`docs/pesquisa/enem-fontes.md` §1) com página; sem PDF = `não confirmado` na habilidade (questão continua válida como `autoral`).
- **Aceite**: grep de `H[0-9]` sem fonte próxima = devolvido.

## 6.4 MEL-004 — Intercalação ENEM por padrão

- **Spec**: `simulados.md` e listas misturam áreas/tipos; enunciado nunca etiqueta o método; 1–2 itens de módulos antigos por lista.
- **Aceite**: eval `simulado-bloco-puro`.

## 6.5 MEL-005 — Variações para re-teste

- **Spec**: erro de quiz volta em enunciado NOVO da mesma habilidade (não a mesma questão); 2–3 acertos espaçados para dar como visto.
- **Aceite**: re-teste idêntico = devolvido (`recall-ativo` passo 4).

## 6.6 MEL-006 — Glossário por trilha

- **Spec**: `glossario.md` por trilha; jargão explicado 1 vez e referenciado (`ver glossário`); `teoria-conceito` mantém o glossário, não cada lição.
- **Aceite**: grep acha jargão sem entrada = devolvido.

## 6.7 MEL-007 — Anti-exemplos

- **Spec**: 1 erro comum trabalhado por conceito (resolução errada + por que erra + correção), além do exemplo certo.
- **Aceite**: conceito sem anti-exemplo = ressalva (não bloqueante no H1).

## 6.8 MEL-008 — Decks cumulativos

- **Spec**: a cada 3 módulos, 1 deck `revisao-geral.md` misturando os 3 (Marp válido, `não confirmado` onde couber).
- **Aceite**: deck só do módulo corrente com nome "geral" = devolvido.
