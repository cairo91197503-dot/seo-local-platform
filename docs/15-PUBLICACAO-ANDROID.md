# Publicação na Google Play (Android)

Este documento registra a decisão e o passo a passo para publicar o Estrelar como app Android na Google Play Store, a partir do próprio app web (React/Vite) — sem reescrever nada em Kotlin/Java.

## Decisão: TWA (Trusted Web Activity), não Capacitor

Decidido com o usuário em 2026-09-13: usar **TWA** em vez de Capacitor.

- **TWA** abre o site real (instalado como PWA) dentro de um app Android fino, sem barra de navegador. Atualizar o site atualiza o app automaticamente — não precisa gerar e reenviar um novo pacote a cada mudança de conteúdo. Não exige Android Studio para gerar o pacote (o Bubblewrap CLI cuida disso). Em compensação, **exige que o app já esteja publicado numa URL HTTPS real** antes de gerar o pacote Android.
- **Capacitor** empacotaria o `dist/` direto dentro do app (funcionaria offline sem depender de URL live) e daria acesso a APIs nativas (câmera, notificações), mas o build do Android normalmente precisa de Android Studio/SDK — mais pesado, e não é necessário hoje porque o app não usa nenhuma API nativa.

Se no futuro o produto precisar de algo que só uma API nativa oferece (notificação push nativa, câmera direto, etc.), Capacitor volta a ser uma opção — não é uma decisão irreversível, mas trocar de abordagem depois exige gerar um novo pacote assinado.

## O que já foi feito (2026-09-13)

O app foi transformado em **PWA instalável**, pré-requisito para o TWA:

- `vite-plugin-pwa` instalado e configurado em `vite.config.ts` — gera `manifest.webmanifest` e um service worker (`sw.js`, via Workbox) automaticamente a cada `npm run build`.
- Ícones gerados a partir do `favicon.svg` (marca "Estrelar") em `public/icons/`: versões `any` (192/512, fundo transparente) e `maskable` (192/512, fundo `#faf6ef`, logo reduzido pra caber na safe zone de 80% que o Android usa pra recortar o ícone em diferentes formatos), mais um `apple-touch-icon.png` (180×180). Script que gera esses ícones: `scripts/gen-icons.mjs` — rode `node scripts/gen-icons.mjs` de novo se o `favicon.svg` mudar.
- `index.html` ganhou `<meta name="theme-color">`, `<meta name="description">` e o link do `apple-touch-icon`.
- Cores do manifest (`theme_color`/`background_color`): `#faf6ef`, a mesma cor de fundo (`--color-bg`) já usada em todo o app — evita um "flash" de cor diferente ao abrir.
- Validado: `npm run build` gera `dist/manifest.webmanifest`, `dist/sw.js` e os ícones corretamente; `npm run preview` serve tudo com os `Content-Type` certos; `npm run lint` limpo.

Isso já é uma melhoria standalone do app web, independente da Play Store: em qualquer navegador compatível (Chrome/Edge no Android, por exemplo), o usuário já pode "Instalar app" e usar o Estrelar como um app com ícone próprio.

## Pré-requisitos que ainda faltam

1. **Colocar o app no ar (prioridade nº 3 do roadmap, já pendente antes disso).** O TWA precisa de uma URL HTTPS real e estável — não dá pra gerar o pacote Android apontando pro `localhost`. Falta: criar a conta/serviço no Render (`render.yaml` já tem o blueprint pronto) e configurar as variáveis de ambiente do Firebase lá.
2. **Decidir o domínio final.** `docs/01-PROJETO.md` planeja `estrelar.app`, mas ainda não há confirmação de registro. Sem domínio próprio, dá pra publicar com a URL padrão do Render (algo como `estrelar.onrender.com`) e trocar depois — mas trocar de domínio depois exige gerar de novo o arquivo `assetlinks.json` (passo abaixo) e reenviar o app pra Play Store.
3. **Política de privacidade publicada numa URL.** A Play Store exige uma URL de política de privacidade para qualquer app que faça login (o Estrelar usa login com Google/Firebase) ou colete dados. Ainda não existe um documento de política de privacidade no projeto — precisa ser escrito e publicado (pode ser uma página simples dentro do próprio app, ex. `/privacidade`) antes de submeter à Play Store.
4. **Conta de desenvolvedor Google Play.** Custo único de US$ 25, criada em https://play.google.com/console — só o usuário pode criar (é uma conta/pagamento pessoal ou da empresa).

## Passo a passo para gerar o pacote Android (depois que o app estiver no ar)

Rodar isso no PC do usuário ou na VM (o Bubblewrap CLI baixa sozinho um JDK e o Android SDK command-line tools na primeira execução — precisa de espaço em disco e conexão de rede, mas não precisa de Android Studio instalado):

```bash
npm install -g @bubblewrap/cli

# Substitua pela URL real do manifest depois do deploy:
bubblewrap init --manifest=https://SEU-DOMINIO-AQUI/manifest.webmanifest
```

O `init` faz perguntas interativas — os valores recomendados para este projeto:

- **Package name (applicationId):** algo como `app.estrelar.twa` ou `br.com.estrelar.app` (formato reverso de domínio; precisa ser único na Play Store e, uma vez publicado, **não pode mudar nunca mais**).
- **App name:** `Estrelar`
- **Launcher icon / theme color / background color:** o Bubblewrap já vai puxar do `manifest.webmanifest` publicado — deve vir certo automaticamente.
- **Signing key:** o `init` oferece criar uma keystore nova. **Backup crítico:** o arquivo `.keystore` gerado (e a senha escolhida) precisam ser guardados num lugar seguro e nunca perdidos — sem ele não é possível publicar nenhuma atualização futura do app, só recomeçar do zero com um app novo na Play Store. Nunca commitar esse arquivo no Git (já está coberto por `*.pfx`/`*.p12` no `.gitignore`, mas vale conferir o nome exato do arquivo gerado).

Depois do `init`, gerar o pacote:

```bash
bubblewrap build
```

Isso gera `app-release-signed.aab` (o formato que a Play Store espera) e imprime o **SHA-256 fingerprint** da chave de assinatura — guarde esse valor, é o próximo passo.

## Verificação de domínio (Digital Asset Links)

Pra o Android confiar que o app TWA e o site são a mesma coisa (e esconder a barra de endereço do navegador), é preciso publicar um arquivo estático em:

```
https://SEU-DOMINIO-AQUI/.well-known/assetlinks.json
```

Com este conteúdo (substituindo `package_name` e `sha256_cert_fingerprints` pelos valores reais do passo anterior):

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "app.estrelar.twa",
    "sha256_cert_fingerprints": ["SUBSTITUA:PELO:FINGERPRINT:REAL:AQUI"]
  }
}]
```

Como este é um app Vite, o jeito mais simples é criar `public/.well-known/assetlinks.json` com esse conteúdo — o Vite copia qualquer coisa em `public/` pro `dist/` sem processar, então ele fica disponível na URL certa automaticamente depois do próximo deploy. **Isso só pode ser feito depois de ter o fingerprint real** (passo anterior), então esse arquivo ainda não existe no projeto.

## Publicar na Play Console

1. Criar o app em https://play.google.com/console (conta de desenvolvedor já paga).
2. Preencher a ficha da loja: nome, descrição curta/longa, categoria, ícone (512×512 — já temos em `public/icons/icon-512-any.png`), capturas de tela (mínimo 2, recomendado mostrar telas reais do app em um celular).
3. Fazer upload do `app-release-signed.aab` na aba de "Produção" (ou "Teste interno" primeiro, recomendado, pra testar antes de liberar pra todo mundo).
4. Preencher o questionário de classificação de conteúdo, o formulário de "Segurança dos dados" (o app coleta e-mail/nome via login Google — precisa declarar isso) e informar a URL da política de privacidade (pré-requisito nº 3 acima).
5. Escolher "Play App Signing" (recomendado pelo próprio Google) — o Google passa a gerenciar a chave de assinatura final, usando a chave do Bubblewrap só como "chave de upload".
6. Enviar para revisão. A primeira revisão de um app novo costuma levar alguns dias.

## Resumo do que falta, em ordem

1. Escrever e publicar a política de privacidade dentro do app.
2. Deploy no Render (variáveis de ambiente do Firebase já documentadas em `.env.example`).
3. Decidir se usa a URL do Render ou espera confirmar `estrelar.app`.
4. Rodar `bubblewrap init` + `bubblewrap build`, guardar a keystore com segurança.
5. Publicar `public/.well-known/assetlinks.json` com o fingerprint real e fazer novo deploy.
6. Criar a conta de desenvolvedor Google Play (US$ 25) e submeter o `.aab`.
