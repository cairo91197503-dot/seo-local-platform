import type { Lesson } from './types.js'

export const howToRespondToReviewsLesson: Lesson = {
  id: 'how-to-respond-to-reviews',
  title: 'Como responder avaliações',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Responder também faz parte',
      text: 'Receber uma avaliação é só metade do caminho. Responder também faz parte de cuidar da reputação do seu negócio.',
      illustration: {
        src: '/images/lessons/how-to-respond-to-reviews/cena-01.jpg',
        alt: 'Empresário digitando uma resposta cuidadosa a uma avaliação de cliente no celular.',
      },
      narration: {
        script:
          'Receber uma avaliação é só metade do caminho. Responder também faz parte de cuidar da reputação do seu negócio.',
        audioSrc: '/audio/lessons/how-to-respond-to-reviews/intro/narration-v001.mp3',
      },
    },
    {
      id: 'why-respond',
      title: 'Por que vale a pena responder',
      text: 'O Google recomenda responder às avaliações e tratar o feedback dos clientes com atenção.',
      highlight:
        'Responder bem a uma avaliação positiva agradece; responder bem a uma negativa mostra que você se importa — sem hostilidade.',
      illustration: {
        src: '/images/lessons/how-to-respond-to-reviews/cena-02.jpg',
        alt: 'Duas respostas lado a lado: uma calorosa de agradecimento e outra respeitosa reconhecendo um problema.',
      },
      narration: {
        script:
          'O Google recomenda responder às avaliações e tratar o feedback dos clientes com atenção. Responder bem a uma avaliação positiva agradece; responder bem a uma negativa mostra que você se importa, sem hostilidade.',
        audioSrc: '/audio/lessons/how-to-respond-to-reviews/why-respond/narration-v001.mp3',
      },
    },
    {
      id: 'example',
      title: 'Positiva x negativa',
      text: 'Numa avaliação positiva, um agradecimento simples e específico já ajuda. Numa negativa, reconhecer o problema e mostrar disposição para resolver vale mais do que se justificar ou discutir.',
      illustration: {
        src: '/images/lessons/how-to-respond-to-reviews/cena-03.jpg',
        alt: 'Dois cartões de avaliação completos, um positivo com resposta específica e outro negativo com resposta empática.',
      },
      narration: {
        script:
          'Numa avaliação positiva, um agradecimento simples e específico já ajuda. Numa negativa, reconhecer o problema e mostrar disposição para resolver vale muito mais do que se justificar ou discutir.',
        audioSrc: '/audio/lessons/how-to-respond-to-reviews/example/narration-v001.mp3',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe como pensar sobre isso. A próxima missão é responder a uma avaliação de verdade.',
      illustration: {
        src: '/images/lessons/how-to-respond-to-reviews/cena-04.jpg',
        alt: 'Empresário prestes a enviar uma resposta real a uma avaliação, com expressão confiante.',
      },
      narration: {
        script: 'Você já sabe como pensar sobre isso. A próxima missão é responder a uma avaliação de verdade.',
        audioSrc: '/audio/lessons/how-to-respond-to-reviews/action/narration-v001.mp3',
      },
    },
  ],
}
