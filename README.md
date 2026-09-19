# Estrelar

O assistente do pequeno negócio para cuidar do Perfil da Empresa no Google.

## Sobre

O Estrelar ajuda pequenos empresários brasileiros a cuidar da presença do negócio no Google por meio de educação prática, missões, gamificação e ferramentas para reputação e SEO local.

- **Free = Aprender** — 12 lições, missões, gamificação e QR Code para avaliações
- **Premium = Fazer** — (em breve) conexão com Google Business Profile, diagnóstico e ações com IA

## Stack

- React 19 + TypeScript + Vite
- Firebase (Authentication, Firestore, Hosting)
- React Router v7
- PWA (vite-plugin-pwa)

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
cp .env.example .env.local
# Preencher com as credenciais do Firebase

# 3. Iniciar desenvolvimento
npm run dev
```

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção (tsc + vite) |
| `npm run preview` | Preview do build local |
| `npm run lint` | Verificação de código com ESLint |
| `npm run test` | Executa testes unitários (vitest) |
| `npm run test:watch` | Testes em modo watch |

## Estrutura

```
src/
├── app/App.tsx          # Roteamento e guards
├── components/          # Componentes React
├── content/             # Lições e missões (dados)
├── lib/                 # Firebase, auth
├── pages/               # Páginas do app
├── state/               # Estado da jornada
└── index.css            # Estilos globais
```

## Documentação

A documentação completa do projeto está em `docs/`:

- `docs/01-PROJETO.md` — Visão do produto
- `docs/02-ROADMAP.md` — Prioridades e fases
- `docs/03-ARQUITETURA.md` — Arquitetura técnica
- `docs/08-ARQUITETURA-PEDAGOGICA.md` — Sistema educacional
- `docs/09-PADRAO-DE-LICOES.md` — Padrão de produção de lições
- `docs/13-CURRICULO-MVP.md` — Currículo do MVP (12 lições)

## Licença

Projeto privado.
