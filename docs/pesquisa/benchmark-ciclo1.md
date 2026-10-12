# Benchmark ciclo-1 — Orquestração multi-agente + estudo com IA (2026-10-12)

> Pesquisa web (coord-pesquisa, modo direto) + arbitragem do orquestrador. Regra: sem fonte = `não confirmado`.

## Adotado neste ciclo (barato e verificável)

1. **Skills como progressive disclosure + anti-shadowing** (LangChain/MS): `validate.mjs` §5d checa IDs únicos kebab + `description` + padrões perigosos.
2. **Guardrails de skills** (AISA/SkillScan: 26,1% vuln): mesmo check acima; sem segredo em `SKILL.md`, sem pipe-para-shell.
3. **FSRS-like manual** (Anki/FSRS): fila de revisão no progresso (acertou→dobra intervalo; errou→volta a 1 dia); sem algoritmo externo no H1.
4. **Diagnóstico que prioriza** (NotaMáx/AprendiAI): plano ordena módulos pelos gaps do diagnóstico.
5. **Streak ritualizado** (gamificação pedagógica): mentor celebra streak e retoma sem culpa.
6. **TRI-coerência mantida** (SAE/INEP): sem previsor de nota; coerência explicada.

## Adiado para H2 (com motivo)

- **Migração V1→V2**: ver ADR-0005 (sem changelog V2 posterior confirmado; validate é V1).
- **LLM-as-judge nos evals**: custo/latência sem runner local; evals estáticos cobrem H1.
- **Handoffs tool-call formais**: `delegacao-verificada` já entrega contrato+evidência; formalizar só se dor aparecer.
- **Correção de redação por foto/trecho automático**: sem pipeline de mídia; C1–C5 + reescrita cobre.

## Fontes (acesso 2026-10-12)

- https://www.langchain.com/blog/choosing-the-right-multi-agent-architecture
- https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns
- https://www.truefoundry.com/blog/multi-agent-orchestration-frameworks
- https://galileo.ai/blog/best-ai-agent-evaluation-platforms
- https://opencode.ai/v2/docs/agents/ ; https://opencode.ai/v2/docs/skills/ ; https://opencode.ai/v2/docs/migrate-v1/ ; https://opencode.ai/changelog (v1.19.0)
- https://www.aft.org/ae/fall2013/dunlosky ; https://faqs.ankiweb.net/what-spaced-repetition-algorithm (`não confirmado` detalhe)
- https://sae.digital/tri-nota-do-enem/ ; https://arxiv.org/pdf/2510.26328 ; https://arxiv.org/html/2601.10338v1
- Notamáx/AprendiAI/enemai/studyh/AIO: features observadas nos sites (marketing; claims de nota sem microdados = `não confirmado`).
