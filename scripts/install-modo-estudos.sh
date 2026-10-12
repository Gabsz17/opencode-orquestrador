#!/usr/bin/env sh
# Instala o modo estudos (mentor) na config ativa do OpenCode, com backup automático.
# Uso: sh scripts/install-modo-estudos.sh [destino]
# Espelho Unix de scripts/install-modo-estudos.ps1 (mesma lista de dirs).
set -eu
DESTINO="${1:-$HOME/.config/opencode}"
ORIGEM="$(cd "$(dirname "$0")/.." && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP="$DESTINO.backup-$STAMP"
for d in agents commands skills templates docs evals; do
  if [ -d "$ORIGEM/$d" ]; then
    if [ -d "$DESTINO/$d" ]; then
      mkdir -p "$BACKUP"
      cp -r "$DESTINO/$d" "$BACKUP/$d"
    fi
    mkdir -p "$DESTINO/$d"
    cp -r "$ORIGEM/$d/." "$DESTINO/$d/"
  fi
done
echo "Modo estudos instalado em $DESTINO (backup em $BACKUP)"
