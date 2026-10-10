# API.md — template de contrato (single-writer: orquestrador)

> Workers (`be-api`) NÃO editam este arquivo. Mudança necessária? Propor diff no relatório + justificativa de compatibilidade.

## Base
- BaseURL (via env, ex: `API_BASE_URL`):
- Auth (ex: Bearer JWT, expiração, RBAC):
- Erros padronizados (ex: `{ "error": { "code": "", "message": "" } }`):
- Versão/data:

## Rotas
| Método | Rota | Auth | Request (schema) | Response 2xx (schema) | Erros |
|--------|------|------|------------------|------------------------|-------|
| GET | `/health` | não | — | `{ "ok": true }` | — |
| | | | | | |

## Modelos
```ts
// Ex:
// type User = { id: string; email: string; role: "admin" | "user" }
```

## Quebras de compatibilidade
| Data | Mudança | Justificativa | Impacto (frontend/integrações) |
|------|---------|---------------|---------------------------------|
| | | | |
