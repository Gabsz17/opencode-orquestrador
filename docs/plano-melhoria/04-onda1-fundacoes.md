# 4. Onda 1 — Fundações Pedagógicas (APLICADA, commits `5e30ec9`/`12707b5`)

> Specs do que foi aplicado + evidência. Nada aqui é proposta: tudo verde com gate.

## 4.1 MEL-A1 — Quiz-diagnóstico (AUD-01)

- **Problema**: nível declarado sem verificação; avançado entediado, iniciante afundado.
- **Spec**: `coord-avaliacao` aplica 5–7 itens fonte-fechada antes do plano congelar; `mentor` registra `declarado + score = nível final` no plano; template §2 tem o campo.
- **Arquivos**: `mentor.md:48` (1b), `coord-avaliacao.md:45`, template §2.
- **Evidência**: gate item 1 PASSOU; eval `nivel-falso`.
- **Edge cases**: aluno zera o diagnóstico → nível `iniciante` + módulo 0 de base, sem julgamento no texto; aluno gabarita → pula base, registra "verificado avançado".

## 4.2 MEL-A2 — Gate de score (AUD-02)

- **Problema**: `Score mínimo` órfão, avanço silencioso com base fraca.
- **Spec**: score < mínimo → `BLOQUEADO + plano de reaprendizagem` (o que revisar + novo quiz). Avanço exige score ≥ mínimo OU reaprendizagem concluída.
- **Arquivos**: `coord-avaliacao.md:44`, template §6.
- **Evidência**: gate item 2; eval `score-baixo-avanca`.
- **Anti-gaming**: reaprendizagem exige quiz NOVO (variação), não repetição do mesmo.

## 4.3 MEL-A3 — Contrato de resposta (AUD-03)

- **Problema**: correção sem lugar de resposta; primeira sessão quebrava.
- **Spec**: `respostas-<modulo>.md` por módulo; quiz/gabarito só-leitura; sem arquivo = `sem material para corrigir` (nunca inventar resposta).
- **Arquivos**: `aval-quiz.md:41`, `aval-feedback.md:41`, template §5, README primeira sessão.
- **Evidência**: gate itens 3/9; eval `resposta-sem-contrato`.

## 4.4 MEL-A4 — Dono de simulados (AUD-04 → FAL-02)

- **Problema**: arquivo sem dono, frase contraditória entre worker e `API.md`.
- **Decisão do orquestrador**: `enem-questoes` owns `simulados.md` integralmente; `coord-avaliacao` consome para quizzes, nunca edita; banco pronto futuro = débito do próprio `enem-questoes`.
- **Arquivos**: `enem-questoes.md:47`, `API.md:34`.
- **Evidência**: gate item 12; grep mostra 1 dono.

## 4.5 MEL-A5 — Rubrica C1–C5 (AUD-05)

- **Problema**: redação prometida sem worker capacitado; risco de nota inventada.
- **Spec**: `aval-feedback` corrige por competência (o que melhorar + exemplo), proibição explícita de número oficial.
- **Arquivos**: `aval-feedback.md:42`, template §9, README ENEM.
- **Evidência**: gate item 4; eval `redacao-com-nota`.
- **Limite honesto**: sem reescrita obrigatória nesta onda (vira MEL-002).

## 4.6 Lições da onda 1 (para repetir)

- Regra nova nasce com dono na mesma frase (cura causa-raiz 2).
- Gate sem eval correspondente é promessa (todo gate ganhou eval).
- Correção de frase exige re-leitura literal da frase (cura causa-raiz 5).
