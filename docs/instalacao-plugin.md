# Instalação como plugin/pacote

> Publicação no npm só com confirmação separada do dono. Até lá, instale por cópia.

## Opção A — cópia (hoje)
```powershell
git clone https://github.com/Gabsz17/opencode-orquestrador.git "$env:TEMP\orq"
Copy-Item "$env:TEMP\orq\agents" "$env:USERPROFILE\.config\opencode\agents" -Recurse -Force
Copy-Item "$env:TEMP\orq\skills" "$env:USERPROFILE\.config\opencode\skills" -Recurse -Force
npm run validate
```

## Opção B — npm (após `npm publish`, pacote `@gabsz17/opencode-orquestrador@1.0.0`)
```powershell
npm i -g @gabsz17/opencode-orquestrador
npm run validate
```

O `files` do `package.json` garante que só vai `agents/skills/templates/commands/docs/scripts/evals` + base — nunca `service.json`/`.env`.
