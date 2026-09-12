import type { Lesson } from './types.js'

export const explainWhatYouOfferLesson: Lesson = {
  id: 'explain-what-you-offer',
  title: 'Faça o cliente entender o que você oferece',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'O cliente quer entender rápido',
      text: 'Antes de entrar em contato, o cliente quer entender rapidamente o que o seu negócio oferece.',
      illustration: {
        src: '/images/lessons/explain-what-you-offer/cena-01.jpg',
        alt: 'Cliente lendo no celular uma lista clara dos serviços oferecidos por um salão.',
      },
      narration: {
        script: 'Antes de entrar em contato, o cliente quer entender rapidamente o que o seu negócio oferece.',
      },
    },
    {
      id: 'clarity',
      title: 'Clareza evita mal-entendido',
      text: 'Descrever com clareza os serviços ou produtos ajuda o cliente a decidir sem precisar perguntar o básico primeiro.',
      highlight:
        'Não coloque informação porque o Google gosta. Coloque porque o cliente precisa dela para decidir.',
      illustration: {
        src: '/images/lessons/explain-what-you-offer/cena-02.jpg',
        alt: 'Pergunta do cliente sendo respondida diretamente por uma lista clara de serviços no perfil.',
      },
      narration: {
        script:
          'Descrever com clareza os serviços ou produtos ajuda o cliente a decidir sem precisar perguntar o básico primeiro. E o critério aqui é simples: não coloque uma informação porque o Google gosta dela. Coloque porque o cliente precisa dela para decidir.',
      },
    },
    {
      id: 'example',
      title: 'O que muda na prática',
      text: 'Uma lista de serviços clara e atualizada economiza tempo seu e do cliente, e evita expectativas erradas.',
      illustration: {
        src: '/images/lessons/explain-what-you-offer/cena-03.jpg',
        alt: 'Empresária organizando um checklist de serviços, com cliente satisfeito ao lado.',
      },
      narration: {
        script:
          'Na prática, uma lista de serviços clara e atualizada economiza tempo seu e do cliente, e evita expectativas erradas.',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe por que isso importa. A próxima missão é revisar como o seu negócio descreve o que oferece.',
      illustration: {
        src: '/images/lessons/explain-what-you-offer/cena-04.jpg',
        alt: 'Empresária editando a lista de serviços do próprio perfil, adicionando um novo item.',
      },
      narration: {
        script:
          'Você já sabe por que isso importa. A próxima missão é revisar como o seu negócio descreve o que oferece.',
      },
    },
  ],
}
