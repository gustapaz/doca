# Arquitetura

Modo integrado, conforme solution-contract.md. Petite Vue consome Hono + Typanion na mesma origem. SSR contém conteúdo, metadados e navegação; o bundle próprio monta depois da hidratação.

Heurística determinística com base contínua, alturas alinhadas, carga por posição, peso de suporte e cargas frágeis. Não promete ótimo global nem segurança operacional real.

API HTTP de mesma origem.

service.mjs: domínio e exportação. input-schema.mjs: restrições canônicas. validator.mjs: validação da stack. api.mjs: protocolo/router. store.mjs: D1, tokens, CAS, TTL e cotas. transport.mjs: bytes/UTF-8, origem, erros mascarados e cabeçalhos.

