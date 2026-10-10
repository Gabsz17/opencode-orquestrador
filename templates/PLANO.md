# PLANO.md — template do orquestrador

> Copie este arquivo para a raiz do projeto como `PLANO.md` no início de cada missão.
> O orquestrador é o ÚNICO escritor deste arquivo (coords propõem diff no relatório).

## 1. Escopo
- Objetivo:
- Fora do escopo:
- Critério de aceite (tudo rodando + gates verdes + evidências):

## 2. Contratos vigentes
- `API.md` (versão/data):
- Convenções (pastas, `.env.example`, Conventional Commits):
- Sub-contratos dos coords (UI / backend / infra — persistidos aqui pelo orquestrador):

## 3. Fases (dono `coord-*`)
| Fase | Dono | Entrada | Saída esperada | Status |
|------|------|---------|----------------|--------|
| Ex: API base | coord-backend | API.md v1 | endpoints + migrações | pendente |
| Ex: Telas | coord-frontend | API.md v1 + sub-contrato UI | telas + store | pendente |
| Ex: Infra | coord-plataforma | — | dev 1 comando + CI verde | pendente |
| Ex: Pesquisa | coord-pesquisa | pergunta + critério | briefing com fontes | pendente |
| Ex: Gates | coord-qualidade | código pronto | LIBERADO | pendente |

## 4. Progresso
- [ ] Contratos fechados
- [ ] Fatias delegadas em paralelo
- [ ] qa-unit verde
- [ ] qa-contrato verde
- [ ] qa-e2e verde
- [ ] qa-security + qa-quality APROVADOS
- [ ] `coord-qualidade: LIBERADO`

Checkpoint a cada retorno de coord: atualizar esta seção + commit local.

## 5. Decisões
| Data | Decisão | Motivo | Quem |
|------|---------|--------|------|
| | | | |

### Contador por erro (3 tentativas no mesmo erro -> pivota)
| Erro | Tentativas | Ação (trocar lib / simplificar) |
|------|------------|----------------------------------|
| | 0/3 | |

## 6. Débitos técnicos (com dono)
| Dívida | Dono | Prazo |
|--------|------|-------|
| | | |
