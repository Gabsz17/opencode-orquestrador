# /revisar — gates via coord-qualidade

Invoque `coord-qualidade` nesta ordem: `qa-unit` → `qa-contrato` → `qa-e2e` → `qa-security + qa-quality` em paralelo.
Anexe `testes-eficazes` em unit/e2e e `revisao-segura` em security. QA nunca edita produção — devolve com arquivo:linha + dono.
Veredito: LIBERADO (sem CRÍTICO, e2e passando) ou BLOQUEADO (gate + motivo).
