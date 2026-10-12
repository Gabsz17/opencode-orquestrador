# Modo estudos — como usar

> Trilhas de aprendizado orquestradas pelo agent `mentor` (teoria + prática + avaliação), com plano por tema e progresso acompanhado sessão a sessão.

## Início rápido

1. Rode `/estudar <tema> [nível]` (nível `iniciante|intermediario|avancado`, default `iniciante`).
2. O mentor cria `docs/estudos/<tema>/PLANO-ESTUDOS.md` a partir de `templates/PLANO-ESTUDOS.md` e delega aos coords.
3. Estude pelos arquivos do tema, responda aos quizzes e receba feedback no padrão `BLOQUEADO: <motivo> + <o que falta> + <próximo passo>`.

## Ciclo de estudo

1. **Plano** — objetivo, nível, pré-requisitos e módulos (`PLANO-ESTUDOS.md` do tema).
2. **Teoria** — conceitos (`teoria-conceito`) + exemplos mínimos (`teoria-exemplos`).
3. **Prática** — exercícios graduados + projeto guiado em marcos.
4. **Avaliação** — quiz do módulo + correção com feedback.
5. **Revisão** — quiz de revisão antes de avançar de módulo; revisões agendadas no progresso.

## Onde fica o progresso

- Por trilha: `docs/estudos/<tema>/progresso.md` (o que o aluno já viu, onde parou, scores, próximas revisões). O mentor atualiza a cada sessão.
- Memória global: `.opencode/memory/MEMORIA.md` + inbox `.opencode/memory/inbox/<agente>.md` (até 3 lições por rodada, sem segredo ou dado pessoal).
- Exemplo de esqueleto (só estrutura, sem conteúdo): `docs/estudos/exemplo-iniciante/progresso.md`.

## Regras do modo

- Afirmação técnica sem fonte oficial = `não confirmado`.
- Níveis: `iniciante` (base + algo funcionando), `intermediario` (integra conceitos), `avancado` (decisões técnicas justificadas).
- Nenhum segredo no repo (`.env` fora do git).

## ENEM

- Trilhas por área em `docs/estudos/enem/<area>/<tema>/` via `/estudar-enem <area> <tema>` (áreas `linguagens|humanas|natureza|matematica|redacao`).
- Cada trilha ENEM tem `questoes.md` (autorais `autoral — padrão ENEM` + oficiais INEP citadas), `simulados.md`, `slides.md` (Marp, `---` por slide) e `progresso.md` (scores por área + simulados + redação por competência).
- Detalhes: `docs/estudos/enem/README.md`. Exemplo de estrutura: `docs/estudos/enem/exemplo/`.
- Regras duras: nunca banco pago, nunca questão falsa atribuída ao INEP, TRI só como conceito.
