# 8. Métricas, Metas e Riscos

## 8.1 Métricas do modo (todas observáveis em markdown, sem PII)

| Métrica | Onde medir | Meta H1 | Sinal de alerta |
|---|---|---|---|
| Planos congelados COM diagnóstico | `PLANO-ESTUDOS.md` §2 | 100% | plano sem score |
| Avanços com gate respeitado | `progresso.md` + quizzes | 100% (zero avanço silencioso) | score < mínimo sem reaprendizagem |
| Sessões com carga+parada | plano §4 | 100% dos módulos | módulo sem os dois campos |
| Reentradas com relâmpago | `progresso.md` (`Última sessão` + gap) | 100% dos gaps >7d | retorno direto ao conteúdo |
| Questões oficiais com citação completa | `questoes.md` | 100% | ano/caderno/nº/link faltando |
| Questões autorais marcadas | `questoes.md` | 100% | questão sem marca |
| Slides Marp válidos | `slides.md` | 100% (`npm run validate`) | frontmatter ausente |
| Respostas no lugar certo | `respostas-*.md` vs quiz editado | 100% | quiz editado pelo aluno |
| Revisões agendadas cumpridas | `progresso.md` | ≥80% | revisão some sem registro |
| Exemplo com zero questões | `enem/exemplo/questoes.md` | sempre 0 | qualquer enunciado |

## 8.2 Metas por onda

- Onda 3: MEL-001 + MEL-002 + MEL-004 prontos (banco mínimo, redação fim-a-fim, intercalação default).
- Onda 4: MEL-009 + MEL-010/011 + MEL-013 prontos (evals rodando, validate com Marp/respostas, sync documentado).
- H1 completo: 10/10 métricas acima no verde por 4 semanas de uso real.

## 8.3 Riscos e mitigações

| Risco | Prob. | Impacto | Mitigação |
|---|---|---|---|
| Questão falsa atribuída ao INEP | média | CRÍTICO (confiança) | dono único + citação completa + eval + gate conteúdo |
| Banco pago copiado | baixa | CRÍTICO (jurídico) | proibição em 3 arquivos + eval + briefing de direitos |
| Promessa de nota (TRI/redação) | média | alto (frustração) | proibição + evals + texto padrão de recusa |
| Exemplo apodrece de novo | média | médio | exemplo = template + TODO; regenerar a cada mudança |
| Skill desplugada (documentada, não anexada) | média | médio | wiring no mesmo commit; validate de convenção (MEL-011) |
| Repo público dessincroniza | alta | médio | MEL-013 (checklist + diff zero) |
| Matriz Hn citada de cabeça | média | médio | MEL-003 (só com PDF+página) |
| Datas de edital hardcodadas | média | baixo | "conforme edital vigente" + link (briefing §2) |
| Trilha gigante sem ritmo | baixa (pós-B2) | médio | eval `sessao-gigante` + gate template |
| Abandono silencioso | alta | alto | reentrada + streak manual (MEL-012) |

## 8.4 O que invalida este plano (gatilhos de revisão)

- Mudança da matriz de referência do INEP (reler PDF, atualizar briefing e Hn).
- Novo formato de prova/redação no edital (revisar §§ ENEM).
- Migração V1→V2 do OpenCode (revisar frontmatters e validate).
- 3 ocorrências do mesmo gap em uso real (vira MEL prioritária, fura fila).
