#Requires -Version 5.1
# Instala o modo estudos (mentor) na config ativa do OpenCode, com backup automático.
# Uso: powershell -ExecutionPolicy Bypass -File scripts/install-modo-estudos.ps1 [-Destino "$env:USERPROFILE\.config\opencode"]
param([string]$Destino = "$env:USERPROFILE\.config\opencode")
$ErrorActionPreference = "Stop"
$origem = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$backup = "$Destino.backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
$dirs = @("agents", "commands", "skills", "templates", "docs", "evals")
$ensure = { param($p) if (!(Test-Path $p)) { New-Item -ItemType Directory $p | Out-Null } }
foreach ($d in $dirs) {
  $src = Join-Path $origem $d
  if (Test-Path $src) {
    if (Test-Path (Join-Path $Destino $d)) {
      if (!(Test-Path $backup)) { New-Item -ItemType Directory $backup | Out-Null }
      # sem pre-criar backup/<d>: Copy-Item cria <d> no nível certo (pre-criar nidificava agents/agents)
      Copy-Item (Join-Path $Destino $d) (Join-Path $backup $d) -Recurse -Force
    }
    & $ensure (Join-Path $Destino $d)
    Copy-Item (Join-Path $src "*") (Join-Path $Destino $d) -Recurse -Force
  }
}
Write-Output "Modo estudos instalado em $Destino (backup em $backup)"
