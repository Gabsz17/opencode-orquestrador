# Briefing: fontes oficiais modo ENEM (questões, matriz, slides)

> Data da pesquisa: 2026-10-12. Recheck ciclo-2 (2026-10-12): página `provas-e-gabaritos` viva; `marp.app` confirma `---`, 3 temas e diretivas — contrato mantido. Método: websearch + webfetch direto (web-researcher bloqueado por depth-limit 1; fallback docs/mcp.md). Regra: só afirmação com fonte oficial; sem fonte = `não confirmado`. Mínimo 2 fontes independentes por afirmação técnica. Sem reproduzir questões inteiras (só links + citação curta, Lei 9.610 art. 46 III).
> Memória aplicada: API.md single-writer; nunca gravar segredo; hidden não é segurança; regra anti-alucinação modo estudos.

## 1. Matriz de referência

- Página oficial: https://www.gov.br/inep/pt-br/centrais-de-conteudo/acervo-linha-editorial/publicacoes-institucionais/avaliacoes-e-exames-da-educacao-basica/matrizes-de-referencia-enem (publ. 17/07/2026)
- PDF vigente: https://download.inep.gov.br/enem/outros_documentos/enem_matriz_de_referencia_v1.pdf
- Históricos: https://download.inep.gov.br/download/enem/matriz_referencia.pdf (2012); https://portal.mec.gov.br/dmdocuments/matriz_referencia_novoenem.pdf (2009); https://download.inep.gov.br/enem/outros_documentos/enem_matriz_referencia.pdf
- Estrutura: 5 eixos cognitivos (DL/CF/SP/CA/EP) + 4 áreas (Linguagens, Matemática, Natureza, Humanas) + Redação; cada área = Competências de área -> Habilidades Hn + objetos de conhecimento. Ler contagem exata no PDF v1.

## 2. Edital vigente (ENEM 2026)

- Provas 08 e 15/11/2026; inscrição Página do Participante http://enem.inep.gov.br/participante (gov.br); taxa R$85.
- Fontes: https://www.gov.br/mec/pt-br/assuntos/noticias/2026/junho/enem-2026-ultimo-dia-para-realizar-a-inscricao ; https://www.gov.br/mec/pt-br/assuntos/noticias/2026/maio/enem-2026-saiba-como-se-inscrever ; https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/saiba-como-se-inscrever-no-enem-2026 ; https://g1.globo.com/google/amp/educacao/enem/2026/noticia/2026/05/22/edital-do-enem-2026-e-publicado-veja-datas-do-exame.ghtml ; https://www.cnnbrasil.com.br/educacao/enem-publica-edital-para-prova-de-2026-veja-datas
- Estrutura: 180 objetivas (4x45) + redação dissertativo-argumentativa no 1º dia. 1º dia Linguagens+Humanas+Redação; 2º dia Natureza+Matemática. Detalhe LE: 40 LP + 5 LE.
- Atenção: fim inscrição 05/06 vs prorrogação 12/06 — citar "conforme edital/Página do Participante", não hardcodar.
- Novidades 2026: inscrição automática rede pública; Enem integra Saeb (Decreto 12.915/2026); +10 mil escolas aplicadoras.

## 3. Provas anteriores

- Base: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos (abas 1998-2025; ex. /2021, /2023)
- Espelho: https://riep.inep.gov.br/collections/22b39e5c-3238-4414-9faf-7db037247175 (handle 20.500.14135/568)
- Formato PDF por cor/dia + gabarito + tema redação. Desde 2009: 4 provas 45q; 1998-2008: 63 itens + redação.

## 4. Direitos

- Lei 9.610 art. 46 III permite citação de passagens para estudo com autor+origem: https://www.planalto.gov.br/ccivil_03/leis/l9610.htm
- Portal gov.br/INEP sob CC BY-ND 3.0 (footer).
- `não confirmado`: republicação integral e banco comercial. Regra: só link + citação curta; integral/comercial = PROIBIDO sem licença expressa.

## 5. Marp

- Docs: https://marp.app/ ; https://marp.app/docs ; https://marpit.marp.app/directives ; https://github.com/marp-team/marp/blob/main/website/docs/guide/how-to-write-slides.md ; https://github.com/marp-team/marp/blob/main/website/docs/introduction/install.md ; https://github.com/marp-team/marp-vscode/blob/main/README.md
- Mínimo:
  ```markdown
  ---
  marp: true
  ---
  ```
- Slides separados por `---`; diretivas globais no frontmatter, locais em `<!-- -->`; temas default/gaia/uncover; export CLI/VS Code.

## 6. TRI (conceito)

- Fontes: http://download.inep.gov.br/educacao_basica/enem/nota_tecnica/2011/nota_tecnica_tri.pdf ; https://download.inep.gov.br/publicacoes/institucionais/avaliacoes_e_exames_da_educacao_basica/entenda_a_sua_nota_no_enem_guia_do_participante.pdf ; https://www.gov.br/inep/pt-br/centrais-de-conteudo/noticias/enem/parametros-dos-itens-sao-divulgados-de-forma-inedita
- 3PL (a discriminação, b dificuldade, c acerto casual); comparabilidade; coerência; EAP; mesmos acertos != mesma nota; redação separada. Nunca calcular nota.

## 7. Recomendação a coord-pratica / coord-teoria (runtime; coord-plataforma só cria os agents)

1. enem-questoes: nunca embutir questão integral; guardar só metadados (ano/caderno/cor/nº/habilidade) + link PDF oficial + gabarito-letra; citação curta só com fonte.
2. enem-slides: todo .md de slide começa com `marp: true`; um `---` por quebra; sem HTML arbitrário salvo `<br>`/`<style>`; validar preview VS Code + export.
3. Explicar TRI só como conceito + link guia; proibir "simulador de nota TRI" — prometer apenas % acertos.
4. Datas e estrutura sempre com "conforme edital vigente" + link Página do Participante; não hardcodar cronograma.
5. Matriz: referenciar por código (ex. MT-C5-H23) lido do PDF v1; sem código sem fonte.

## 8. Riscos

| Risco | Sev. | Mitigação |
|---|---|---|
| Republicar questão integral e violar direito autoral | Alta | só link + citação curta art. 46 III; validate barra corpo de questão |
| Provar "nota TRI" e frustrar aluno | Alta | proibir cálculo; só % + conceito |
| Datas hardcodadas dessincronizam (05/06 vs 12/06) | Média | citar edital vigente dinamicamente |
| Marp sem `marp:true` não renderiza | Baixa | frontmatter obrigatório + CI checa |
| Matriz contada de cabeça erra Hn | Média | ler PDF v1, citar página |

## 9. Fontes (URL + acesso 2026-10-12)

Ver seções 1-6 acima. Segundas fontes independentes: MEC + G1/CNN/Brasil Escola para edital/estrutura; RIEP + gov.br para provas; marp.app + GitHub marp-team para Marp; nota técnica + guia + notícia INEP para TRI; Planalto + footer gov.br para direitos.

## 10. Não confirmado

- Licença expressa INEP para republicação integral / banco comercial.
- Contagem Hn exata por área sem abrir PDF v1 (não afirmar).
- URL DOU do edital ENEM 2026 (só notícias secundárias acessadas; buscar DOU antes de citar número).

## 11. Tentativas de fonte primária Hn (log honesto)

- 2026-10-12 (ciclo-3): `download.inep.gov.br/.../enem_matriz_de_referencia_v1.pdf` → transport error; `portal.mec.gov.br/.../matriz_referencia_novoenem.pdf` → transport error.
- 2026-10-12 (ciclo-4): `riep.inep.gov.br/collections/...` → transport error; websearch matriz/Hn → 0 resultados; `todamateria.com.br/matriz-de-referencia-enem/` → 404.
- 2026-10-12 (ciclo-5): retry matriz v1 PDF → transport error; `provas-e-gabaritos/2023` viva (páginas de provas OK, só o `download.inep.gov.br` bloqueia).
- 2026-10-12 (ciclo-9): retry `download.inep.gov.br/download/enem/matriz_referencia.pdf` (2012) → transport error (8 rotas). Padrão: `download.inep.gov.br` inteiro bloqueado neste runner; `www.gov.br/inep` navega normal.
- Conclusão: nenhuma fonte primária acessível neste runner; códigos Hn seguem `não confirmado` (regra mantida, sem exceção).
