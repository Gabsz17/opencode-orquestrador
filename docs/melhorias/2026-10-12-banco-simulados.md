# Proposta 2026-10-12 — Banco de simulados prontos por área (MEL-001)

## Problema (com evidência)

- Onde dói: `docs/estudos/enem/exemplo/simulados.md` (só tabela TODO) + `enem-questoes.md:47` (banco = débito futuro).
- Quem sofre (persona): enemista dedicado na reta final (jornada 4 do plano, cap. 2.5).
- Frequência: estrutural (todo aluno da reta final precisa).

## Proposta

- O que muda: `docs/estudos/enem/simulados-modelo/<area>.md` (4 arquivos, 10–15 questões autorais cada + gabarito + habilidade) + linha no `API.md`.
- Skill anexada: `pratica-intercalada` + `recall-ativo` (Task ao `coord-pratica`).
- O que NÃO muda: exemplo-esqueleto (continua zero questões); regra anti-banco-pago; TRI-conceito.

## Verificação (como provar)

- [ ] `npm run validate` verde
- [ ] grep: zero `ENEM 20` atribuído + `autoral` em todas
- [ ] gate do `coord-qualidade`: item conteúdo ENEM (questão falsa = CRÍTICO)
- [ ] exemplo/esqueleto intacto (zero conteúdo inventado)

## Dono e onda

- Dono: `coord-pratica` (conteúdo) + orquestrador (contrato `API.md`).
- Onda: 3-conteúdo (prioridade máxima).
