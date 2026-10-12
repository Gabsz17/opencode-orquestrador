# Briefing: skills do modo orquestrador e do modo estudos

> Data da pesquisa: 2026-10-12. Método: websearch + webfetch direto (coord-pesquisa, modo direto read-only). Base pedagógica: Dunlosky et al. 2013 (alta = testes práticos + espaçamento; moderada = elaboração + intercalação; baixa = releitura/grifo). Formato: doc oficial OpenCode Skills (`name`+`description` obrigatórios; corpo sem limite documentado = `não confirmado`). Skills criadas em `skills/<nome>/SKILL.md` (padrão do repo; diverge de `.opencode/skills/` oficial — ver ADR).

## Skills criadas (5)

| Skill | Cobre | Gatilho |
|---|---|---|
| `recall-ativo` | recall + efeito teste | quiz, exercício, questão, revisão, fechar módulo |
| `repeticao-espacada` | espaçamento + reaprendizagem sucessiva | planejar trilha, agendar revisão, quiz de revisão |
| `pratica-intercalada` | intercalação | listas, projetos, questões ENEM, simulados |
| `explicar-para-aprender` | interrogação elaborativa + autoexplicação + Feynman aplicado | conceito, exemplo, slide, feedback |
| `delegacao-verificada` | delegação + anti-alucinação (dev) | toda Task orquestrador/coords a workers |

## Mapeamento modo estudos (agent x skill)

- `mentor`: `repeticao-espacada` (plano + revisões) + `recall-ativo` (quiz antes de avançar)
- `coord-teoria`: `explicar-para-aprender` (toda delegação) + `recall-ativo` (lição termina com recall)
- `teoria-conceito`: `explicar-para-aprender` + `recall-ativo` (3–5 perguntas sem olhar)
- `teoria-exemplos`: `explicar-para-aprender` (explicar cada passo, declarar travas)
- `enem-slides`: `explicar-para-aprender` (1 ideia/slide) + `repeticao-espacada` (deck = revisão)
- `coord-pratica`: `pratica-intercalada` (toda delegação)
- `pratica-exercicios`: `pratica-intercalada` + `recall-ativo` (fonte fechada primeiro)
- `pratica-projetos`: `pratica-intercalada` (marcos reexigem módulos antigos)
- `enem-questoes`: `pratica-intercalada` (mistura áreas/tipos) + `recall-ativo` (gabarito separado)
- `coord-avaliacao`: `recall-ativo` + `repeticao-espacada`
- `aval-quiz`: `recall-ativo` (fonte fechada → tentativa → gabarito → re-teste)
- `aval-feedback`: `explicar-para-aprender` ("por quê?" do erro) + `repeticao-espacada` (erro vira reaprendizagem)

## Mapeamento modo orquestrador (dev)

- `orquestrador` + todos os coords: `delegacao-verificada` em toda Task (escopo fechado + evidência + anti-alucinação + dry-run + anti-loop 2 voltas).
- Mantidas: `debug-sistematico` (bugs), `testes-eficazes` (QA), `revisao-segura` (auth/segredos).
- NÃO viraram skill: revisão de diff (vira comando, não skill), ADR (template), gestão de contexto (seção da `delegacao-verificada`) — evita skill proliferation.

## Riscos

- Elaboração/Feynman convida a inventar (analogia, "explique com o que sabe") → mitigado com conferência obrigatória + `não confirmado` (residual maior em `enem-questoes`; coord-pratica barra questão falsa).
- Múltipla escolha sem feedback cristaliza o erro → proibido na skill.
- Intercalação precoce degrada → base curta em bloco primeiro.

## Fontes (acesso 2026-10-12)

- Dunlosky et al. 2013, Psych Science in the Public Interest: https://journals.sagepub.com/doi/abs/10.1177/1529100612453266 ; síntese: https://www.aft.org/ae/fall2013/dunlosky
- Karpicke & Roediger 2008, Science: https://doi.org/10.1126/science.1152408 ; Roediger & Butler 2011: https://doi.org/10.1016/j.tics.2010.09.003
- Cepeda et al. 2006, Psych Bulletin: https://doi.org/10.1037/0033-2909.132.3.354 ; Smolen et al. 2016: https://link.springer.com/article/10.1007/s10648-020-09572-8
- Rohrer & Taylor 2007: https://doi.org/10.1007/s11251-007-9015-8 ; Rohrer et al. 2015: http://uweb.cas.usf.edu/~drohrer/pdfs/Rohrer_et_al_2015JEdPsych.pdf
- Pressley et al. 1988: https://doi.org/10.1037/0022-0663.80.3.268 ; Chi et al. 1989: https://doi.org/10.1207/s15516709cog1302_1
- Feynman como técnica nomeada: `não confirmado` (procedural: K-State https://www.k-state.edu/aac/success-tools/collection/Feynman_Technique.pdf ; Bucknell 2020).
- OpenCode Skills: https://open-code.ai/en/docs/skills ; v2: https://v2.opencode.ai/docs/skills ; formato: https://opencodeskills.dev/guides/skill-md-format

## Não confirmado

- Limite de tamanho do corpo da SKILL.md (só `description` tem limite documentado: 1024).
- Layout `skills/` na raiz do repo (oficial: `.opencode/skills/`) — funciona no projeto; registrar ADR.
