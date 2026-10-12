# 7. Onda 4 — Plataforma do Modo (FUTURA, specs prontas para delegar)

## 7.1 MEL-009 — `npm run eval` executável (prioridade máxima da onda)

- **Problema**: 13 evals são tabela, não runner; ninguém os executa.
- **Spec**: estender `scripts/eval.mjs` (ver `evals/README.md`) com os cenários de `evals/estudos.md`: cada cenário injeta a falha num piloto (`docs/estudos/enem/exemplo/`) e checa se o comportamento esperado ocorre (devolução/gate/marca). Saída em tabela PASSOU/FALHOU.
- **Aceite**: `npm run eval` verde no CI; doc de como adicionar eval novo (1 cenário = 1 linha na tabela + 1 fixture).

## 7.2 MEL-010/011 — Validate com Marp e respostas

- **Spec**: `scripts/validate.mjs` FAIL se `docs/estudos/enem/**/slides.md` sem `marp: true` no frontmatter; WARNING se worker de avaliação não menciona `respostas-<modulo>.md`.
- **Aceite**: slide inválido e convenção ausente quebram `npm run validate` (ou avisam, conforme severidade).

## 7.3 MEL-012 — Painel de progresso em markdown

- **Spec**: `docs/estudos/enem/progresso-modelo.md` com: scores por área (tabela), streak de sessões (manual, sem PII), top 3 gaps (habilidades com mais erro), próximas 3 revisões. Mentor preenche a cada sessão.
- **Aceite**: modelo cobre as 4 áreas + redação; exemplo preenchido sem dado real.

## 7.4 MEL-013 — Export sincronizado com `opencode-modo-estudos`

- **Problema**: repo público dessincroniza a cada missão (hoje: `main = 52fcd49`, atrás de 6+ commits).
- **Spec**: checklist de export (arquivos-fonte → destino, o que NUNCA vai: `PLANO.md` raiz, `API.md` raiz, `.opencode/memory/`, `.env*`) + verificação `diff --no-index` vazio nos arquivos espelhados + commit + push nos dois repos.
- **Aceite**: rodada de sync com diff zero + 2 pushes verdes.

## 7.5 MEL-014 — Instalação em 1 comando

- **Spec**: `scripts/install-modo-estudos.ps1` (copia agents/commands/skills/templates/docs/evals para a config ativa com backup automático) + seção no README do repo público + teste em config vazia.
- **Aceite**: install limpo + `npm run validate` verde na config destino (ou instrução equivalente).

## 7.6 MEL-015 — Propostas contínuas (`docs/melhorias/`)

- **Spec**: `docs/melhorias/TEMPLATE.md` (problema, proposta, arquivos, verificação, dono) para qualquer um propor melhoria futura sem reabrir este plano.
- **Aceite**: 1 proposta-exemplo preenchida seguindo o template.
