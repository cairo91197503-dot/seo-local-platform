# Changelog

## 2026-08-09 — Pipeline audiovisual da primeira microlição

### Narração da Cena 1

A Cena 1 da lição **“Por que as avaliações importam?”** usa a voz Piper `pt_BR-faber-medium`. A narração Faber foi aprovada, o novo áudio foi integrado ao projeto e os timestamps foram recalculados para essa gravação.

A integração foi validada com:

- `npm run build`;
- `npm run lint`;
- `git diff --check`.

A narração da Cena 1 é considerada concluída por enquanto. No futuro, ela poderá ser substituída por uma ferramenta TTS paga sem mudar a arquitetura atual; nesse caso, deverão ser substituídos o áudio e os timestamps correspondentes.

### Geração de imagens

Foi feita a pré-validação de uma geração experimental para a imagem da Cena 1 com o modelo `gpt-image-2`. A geração não foi executada porque `OPENAI_API_KEY` não está configurada, e foi decidido não prosseguir com uma solução paga neste momento.

A próxima alternativa a investigar é o **Cloudflare Workers AI**, buscando uma solução gratuita ou com franquia gratuita para gerar as imagens das cenas. Nenhuma configuração Cloudflare foi realizada e nenhuma imagem foi gerada por esse serviço.

O fluxo a preservar para geração de imagens é:

Codex → geração externa → PNG de teste fora do projeto → validação → avaliação e aprovação manual → integração no projeto.

Assets aprovados não devem ser sobrescritos durante testes.

### Conceito visual da Cena 1

O conceito definido mostra uma pessoa pesquisando empresas locais antes de escolher um negócio, com:

- pessoa adulta pesquisando no celular;
- interface genérica de busca e avaliações;
- cartões de empresas;
- estrelas de avaliação;
- sinais de reputação e confiança;
- tomada de decisão;
- comunicação visual que não dependa de texto dentro da imagem;
- ausência do logotipo do Google;
- estilo editorial moderno, profissional, limpo e educacional.

A proporção estudada foi `1536x1024` (`3:2`). Antes de gerar uma imagem com outro modelo, deve-se confirmar se dimensão e proporção continuam adequadas.

### Próxima sessão

Começar pela investigação do Cloudflare Workers AI para geração de imagens. Não retomar a pesquisa de TTS, os testes com Chatterbox/Kokoro ou alterações na narração Faber aprovada.

Antes de qualquer geração:

1. consultar a documentação oficial atual;
2. verificar plano e franquia gratuita;
3. verificar modelos de text-to-image disponíveis;
4. verificar requisitos de conta e token;
5. verificar o custo em Neurons por geração;
6. escolher o modelo mais adequado para a Cena 1;
7. preparar uma única geração experimental;
8. parar antes de gerar ou consumir cota e pedir autorização.
