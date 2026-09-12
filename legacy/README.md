# Legado do LocalPulse (código-fonte arquivado)

Este diretório guarda uma cópia curada do código-fonte dos 4 repositórios anteriores do LocalPulse, trazida a pedido do usuário em 2026-09-12 para servir de referência ao reimplementar funcionalidades no Estrelar (`seo-local-platform`).

Para o resumo de **quais funcionalidades existiam** e o racional de por que o projeto não evoluiu, a fonte canônica continua sendo `docs/10-HERANCA-LOCALPULSE.md` — este README trata só do código em si.

## Repositórios de origem

| Pasta aqui | Repositório original | Descrição |
| --- | --- | --- |
| `android-localpulse/` | [`LocalPulse`](https://github.com/cairo91197503-dot/LocalPulse) | App nativo Android (Kotlin/Jetpack Compose). Versão mais completa em funcionalidades. |
| `web-localpulse-v1/` | [`LocalPulse-WEB`](https://github.com/cairo91197503-dot/LocalPulse-WEB) | Primeira reescrita web (React, gerada via Google AI Studio). Poucos commits, versão inicial. |
| `web-localpulse-v2/` | [`LocalPulse-WEB-V2`](https://github.com/cairo91197503-dot/LocalPulse-WEB-V2) | Evolução da versão web: Firebase, login Google, backend Express, mais integrações. Versão web mais completa. |
| `v2-tentativa-unificacao/` | [`LocalPulse-v2.0`](https://github.com/cairo91197503-dot/LocalPulse-v2.0) | Tentativa de reunificar Android + web num só repositório; a parte web ficou incompleta. |

Snapshot tirado em 2026-09-12, do branch padrão de cada repositório no momento.

## O que foi removido nesta cópia (e por quê)

Para manter isto como referência de código limpa, sem lixo de build nem dados sensíveis:

- **Caches e artefatos de build**: `.git/`, `.kotlin/`, `.gradle/`, `node_modules/`, `build/`, `dist/`, `.idea/` — nada disso é código-fonte, e recriar é trivial (`./gradlew build`, `npm install`).
- **`temp_repo/`** (dentro de `LocalPulse-v2.0`): era uma cópia duplicada e desatualizada do app Android, deixada por engano durante uma tentativa de reversão (ver `REVERT_INSTRUCTIONS.md` original). Não tinha valor de referência adicional.
- **`firebase-debug.log`**: log de execução local, sem valor.

## Credenciais reais que foram sanitizadas

Os repositórios originais tinham **credenciais reais do Firebase/Google Cloud do Cairo commitadas no código** (não só placeholders). Isso não são segredos de altíssimo risco — chaves web/Android do Firebase são protegidas pelas regras do Firestore/App Check, não por sigilo (mesmo racional documentado em `docs/07-CHANGELOG.md` deste projeto) — mas, como este repositório (`seo-local-platform`) é **público**, optei por não recolocar identificadores reais de projeto no histórico do Git. Os arquivos abaixo foram substituídos por versões `.example` com valores `REDACTED`, seguindo o mesmo padrão de `.env.example` já usado neste projeto:

- `android-localpulse/app/google-services.json` → `google-services.json.example` (projeto Firebase `localpulse-526a5`)
- `v2-tentativa-unificacao/app/google-services.json` → `google-services.json.example` (mesmo projeto `localpulse-526a5`)
- `web-localpulse-v2/firebase-applet-config.json` → `.example` (projeto `gen-lang-client-0898605785`, gerado via Google AI Studio)
- `web-localpulse-v2/public/firebase-messaging-sw.js` → `.example` (mesmo projeto acima)

Os valores reais continuam existindo nos repositórios originais no GitHub (histórico de commits), então nada foi perdido — só não foram duplicados aqui. Se decidir reaproveitar algum desses projetos Firebase de verdade, pegue as credenciais direto do console do Firebase, não copie os valores antigos (podem estar desatualizados ou o projeto pode ter sido alterado).

## Como isto se relaciona com o projeto atual

**Nada aqui está aprovado para reuso automático.** Isto é material de referência, não código pronto para integrar. Antes de portar qualquer trecho para `src/`, a funcionalidade correspondente precisa passar pelo processo normal de decisão do projeto (`.ai/workflow.md`, `.ai/rules.md`) — arquitetura, stack e modelo pedagógico atuais são diferentes dos usados nesses protótipos (ex: os protótipos usavam Express/backend próprio; o projeto atual não tem backend, só Firebase direto do cliente).

Ver `docs/02-ROADMAP.md` para onde cada funcionalidade herdada se encaixaria (Fases 5, 6 e 7) e `docs/10-HERANCA-LOCALPULSE.md` para o inventário funcional completo.
