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
    },
    {
      id: 'clarity',
      title: 'Clareza evita mal-entendido',
      text: 'Descrever com clareza os serviços ou produtos ajuda o cliente a decidir sem precisar perguntar o básico primeiro.',
      highlight:
        'Não coloque informação porque o Google gosta. Coloque porque o cliente precisa dela para decidir.',
    },
    {
      id: 'example',
      title: 'O que muda na prática',
      text: 'Uma lista de serviços clara e atualizada economiza tempo seu e do cliente, e evita expectativas erradas.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe por que isso importa. A próxima missão é revisar como o seu negócio descreve o que oferece.',
    },
  ],
}
