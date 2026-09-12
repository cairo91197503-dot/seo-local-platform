import type { Lesson } from './types.js'

export const howToRespondToReviewsLesson: Lesson = {
  id: 'how-to-respond-to-reviews',
  title: 'Como responder avaliações',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Responder também faz parte',
      text: 'Receber uma avaliação é só metade do caminho. Responder também faz parte de cuidar da reputação do seu negócio.',
    },
    {
      id: 'why-respond',
      title: 'Por que vale a pena responder',
      text: 'O Google recomenda responder às avaliações e tratar o feedback dos clientes com atenção.',
      highlight:
        'Responder bem a uma avaliação positiva agradece; responder bem a uma negativa mostra que você se importa — sem hostilidade.',
    },
    {
      id: 'example',
      title: 'Positiva x negativa',
      text: 'Numa avaliação positiva, um agradecimento simples e específico já ajuda. Numa negativa, reconhecer o problema e mostrar disposição para resolver vale mais do que se justificar ou discutir.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe como pensar sobre isso. A próxima missão é responder a uma avaliação de verdade.',
    },
  ],
}
