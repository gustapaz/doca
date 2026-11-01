# Validação — DOCA

Conferência em 2026-11-01. Demo: [DOCA](https://doca-gustapaz.starrylinen.chatgpt.site).

- 20 testes de domínio, API e D1 aprovados; o lote completo soma 215 testes.
- Build de produção, TypeScript e formatação aprovados. CI reproduz os testes no GitHub.
- Smoke HTTP público aprovado: saúde do banco, domínio, rejeição de entrada extra, criação, leitura privada, isolamento, edição, revisão antiga/CAS, publicação, exportação, encerramento do link, remoção do registro de teste, HTML e OpenAPI.
- Navegador público: calcular, guardar, reler, criar link e baixar o arquivo da revisão salva.
- Desktop e larguras de 390 e 768 px verificadas. Com barra de rolagem, as áreas úteis observadas foram 375 e 753 px; nenhuma rolagem horizontal após as correções.
- Redução dos níveis de carga; manifesto mostra volumes que ficaram fora, sem inventar carregamento viável.
- Exportação verificada: `doca.csv`, 263 bytes, SHA-256 `ad4c9a25e9f6ecd5b723d400ce87be511d93fcca40e3308f0f7b1840c2065a42`.

## Evidências visuais

![Demo no desktop](screenshots/desktop.jpg)

![Demo no celular](screenshots/mobile.jpg)

## Publicação e limites

Commit da aplicação publicada: `78ec7b88bf7e65d80af272b22ca2ec94ca47db8f`. Commits posteriores que acrescentam estas evidências não alteram o bundle da aplicação.

Dados de demonstração sintéticos, retenção de sete dias, limite global de doze novos registros por hora UTC e até trinta revisões por registro. Edição autorizada por chave aleatória guardada nesta aba; um link público permite leitura. A demo não promete disponibilidade ilimitada nem armazenamento permanente. Nenhum cartão, trial ou faturamento foi ativado.

Não há nota Lighthouse declarada nem certificação de conformidade: as verificações acima descrevem os testes efetivamente executados.
