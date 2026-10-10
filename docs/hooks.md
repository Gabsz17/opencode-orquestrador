# Hooks

## Pre-push manual (sem instalar nada)
```powershell
npm run pre-push   # grep de segredos no staged + barra .env/service.json
```

## Hook automático (opcional, por máquina — nunca commitado)
```powershell
# .git/hooks/pre-push (não vai ao git)
node scripts/pre-push-check.mjs
```
O hook é local por clone. O `validate` no CI continua barrando segredo mesmo sem hook.
