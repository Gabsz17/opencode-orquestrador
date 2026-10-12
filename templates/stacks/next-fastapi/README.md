# Stack next-fastapi (esqueleto — o orquestrador preenche)

> Status: intencional (só README; sem piloto — veredicto QA ciclos-17/18, não reabrir como "stack sem código").

```
app/            # fe-pages (Next routes)
src/components/ # fe-components
src/store/      # fe-state (api-client com API_BASE_URL via env)
server/routes/  # be-api (espelha API.md)
server/services/# be-domain (sem HTTP/SQL direto)
server/db/      # be-data (schema/migrações)
server/auth/    # be-auth (JWT/RBAC + guards)
server/integrations/ # be-integrations
```

1. Copie `templates/PLANO.md` e `templates/API.md` para a raiz.
2. `coord-backend` define `API.md` primeiro; `coord-frontend` define sub-contrato UI antes de paralelizar.
3. `plat-infra` garante `npm run dev` em 1 comando + CI verde.
