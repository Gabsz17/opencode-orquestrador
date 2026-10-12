# 2. Visão, Princípios, Não-Metas e Personas

## 2.1 Visão (3 horizontes)

- **H0 — Modo confiável (feito, 2026-10-11/12)**: hierarquia funcionando, conteúdo sem alucinação, gates verdes.
- **H1 — Modo que retém (este plano, ondas 3–4)**: aluno que começa termina — diagnóstico, ritmo, reentrada, redação e banco o trazem de volta.
- **H2 — Modo que escala (futuro)**: múltiplas trilhas simultâneas, painéis de progresso, distribuição como plugin, comunidade de trilhas.

## 2.2 Dez princípios (ordem de precedência em conflito)

1. **Verdade antes de volume**: sem fonte = `não confirmado`; questão sem fonte = `autoral`. Nenhuma meta justifica questão falsa.
2. **Prova oficial só do INEP, com citação completa**; banco pago nunca; integral nunca (só link + citação curta, Lei 9.610 art. 46 III).
3. **TRI é conceito; redação não tem número**: nunca prometer nota oficial de nada.
4. **Nível se verifica, não se declara**: diagnóstico antes do plano congelado.
5. **Score baixo barra avanço**: `BLOQUEADO + reaprendizagem`, nunca silêncio.
6. **Toda sessão tem tamanho**: carga estimada + critério de parada; sessão infinita é defeito.
7. **Quem some é recebido de volta**: >7 dias = reentrada com quiz-relâmpago, sem culpa.
8. **Resposta tem lugar**: `respostas-<modulo>.md`; quiz/gabarito são só-leitura para o aluno.
9. **Plano = metas, progresso = estado**: uma fonte de verdade para cada coisa.
10. **Acessível por padrão**: linguagem simples, estrutura, alt-text; o público inclui EJA, adolescentes e leitores de tela.

## 2.3 Não-metas (explícitas para blindar escopo)

- Calculadora de nota TRI ou "previsão de nota" de qualquer tipo.
- Correção oficial de redação ou simulador de nota do ENEM.
- Banco de questões copiado (comercial ou integral do INEP no repo).
- App/interface gráfica, login, backend, analytics com PII.
- Render automático de slides no repo (Marp CLI é débito externo).
- Trilhas fora de pt-BR no H1 (i18n é H2).
- Integração Anki/Notion no H1 (débito registrado, sem dono ainda).

## 2.4 Personas (quem o modo serve)

| Persona | Dor | O que o modo entrega | Risco se falhar |
|---|---|---|---|
| **Enemista dedicado** (3º ano/cursinho) | volume sem direção, simulados caros | trilha por área + simulados + scores | abandona se ritmo for infinito |
| **EJA / retorno tardio** | vergonha do nível, tempo curto | diagnóstico gentil + sessões curtas + reentrada | desiste se nível declarado o expõe |
| **Reforço escolar** (fundamental/médio) | base furada invisível | gate de score + reaprendizagem | avança com base fraca e quebra depois |
| **Autodidata curioso** | dispersão entre temas | plano + progresso + revisões | some sem reentrada e não volta |
| **Professor/multiplicador** | material inconsistente | template + exemplos + evals | replica erro se exemplo apodrecer |

## 2.5 Jornadas críticas (as 4 que não podem quebrar)

1. **Primeira sessão**: `/estudar-enem` → boas-vindas → diagnóstico → plano congelado → 1ª lição curta. (Quebrava em AUD-01/03/06.)
2. **Semana 2 (rotina)**: sessão com carga → quiz → score → revisão agendada. (Quebrava em AUD-02/07.)
3. **Retorno após ausência**: abre `progresso.md` → vê `Última sessão` antiga → quiz-relâmpago → retoma sem culpa. (Quebrava em AUD-08.)
4. **Reta final ENEM**: simulados cronometrados → scores por área → redação C1–C5 → revisão dos gaps. (Parcialmente débito: banco pronto.)
