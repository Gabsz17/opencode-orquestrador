# MCP (quando usar cada um)

| Canal | Quando usar | Quem usa |
|-------|-------------|----------|
| `mcp.repo` | ler/buscar código do próprio projeto com contexto | coords e workers (fallback: `read/grep/glob`) |
| `mcp.docs` | docs oficiais de libs/APIs | `web-researcher` (fallback: `webfetch`) |
| `mcp.browser` | operação real no browser com evidência | `web-operator` (fallback: scripts Playwright em `scripts/browser/`) |

Regras:
- MCP desabilitado (`enabled: false`) por padrão — habilite por máquina conforme `opencode.jsonc` local suportar.
- Sem MCP? Vale o fallback documentado; missão sem evidência/fontes é devolvida do mesmo jeito.
- Credenciais de browser continuam SOMENTE via env, nunca no prompt nem no repo.
