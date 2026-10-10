# Memória consultável (busca local, sem RAG pesado)

```powershell
npm run memoria -- <termo>   # busca em MEMORIA.md + inbox
```

Regras:
- 1 linha = 1 lição (`- [AAAA-MM-DD] contexto: fato -> ação`).
- Busca por palavra-chave e data; sem dependência externa.
- Se o volume passar de 60 itens, o orquestrador poda o mais velho/sem uso (FIFO 30 nos recentes).
- Futuro: índice por tag ou vetor — só se a busca simples provar insuficiente.
