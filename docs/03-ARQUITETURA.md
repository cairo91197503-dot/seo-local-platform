# Arquitetura

## Objetivo

Manter o projeto simples, modular e preparado para crescer sem criar dependências desnecessárias.

## Visão inicial

Usuário

↓

Webapp React

↓

Camada de serviços

↓

Firebase / APIs / IA

## Frontend

Tecnologias planejadas:

- React

- TypeScript

- Vite

A interface não deve acessar integrações externas de forma desorganizada.

Componentes visuais, regras de negócio e integrações devem permanecer separados.

## Serviços

A aplicação deverá possuir uma camada responsável por comunicação com serviços externos.

Exemplos futuros:

- Firebase

- Google

- serviços de IA

- analytics

- pagamentos

Isso permitirá substituir ou modificar uma integração sem reconstruir toda a interface.

## Firebase

Uso inicial planejado:

- Authentication — usuários

- Firestore — dados da aplicação

Outros serviços do Firebase serão avaliados conforme a necessidade.

## Inteligência Artificial

A IA deverá ser tratada como um serviço da plataforma.

O frontend não deve armazenar chaves privadas de provedores de IA.

A arquitetura deve permitir trocar o provedor/modelo futuramente.

## Google

A integração com o Perfil da Empresa no Google será opcional na arquitetura principal.

Quando disponível e aprovada, deverá funcionar através de uma camada própria de integração.

O produto deve continuar funcional sem essa integração.

## Infraestrutura

Planejado atualmente:

- GitHub — código e versionamento

- Render — hospedagem/deploy

- Firebase — autenticação e dados

- Oracle Cloud — possível ambiente remoto de desenvolvimento

## Ambientes

Inicialmente teremos:

- desenvolvimento local

- produção

Outros ambientes serão adicionados somente quando houver necessidade.

## Segurança

Nunca armazenar no repositório:

- senhas

- tokens

- chaves privadas

- credenciais

- arquivos `.env` contendo segredos

## Regra arquitetural

Não adicionar complexidade antecipadamente.

Uma tecnologia nova só deve entrar no projeto quando resolver um problema concreto.