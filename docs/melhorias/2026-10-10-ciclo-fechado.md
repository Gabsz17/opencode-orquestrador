# Melhoria proposta

- Data: 2026-10-10
- Padrão recorrente (3x onde/quando): PAT sem `workflow` bloqueou push de CI; `.env.example` ignorado por `.env.*`; strip de `//` quebrou URLs no jsonc
- Evidências (gates/arquivos): push recusado em `35b2a28`, `.env.example` ignorado em `dfa8ba6`, validate falhou 2x antes do verde
- Proposta (agent/skill/template a mudar): feito — `SECURITY.md` + `!.env.example` + `validate` com strip só em `^\s*//` (este doc é a evidência de que o ciclo funciona)
- Risco se não fizer: cada projeto novo repete os 3 erros
- Dono sugerido: orquestrador
