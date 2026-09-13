import type { Lesson } from './types.js'

export const reviewRequestMessageLesson: Lesson = {
  id: 'review-request-message',
  title: 'Como fazer um pedido de avaliação genuíno',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Pedir do jeito certo faz diferença',
      text: 'Pedir uma avaliação é normal e ajuda seu negócio a ser conhecido. Mas a forma como você pede também importa.',
      narration: {
        script:
          'Pedir uma avaliação é normal, e ajuda o seu negócio a ser conhecido. Mas a forma como você pede também importa.',
        audioSrc: '/audio/lessons/review-request-message/intro/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 69, startSeconds: 0, endSeconds: 3.8 },
          { textStart: 69, textEnd: 111, startSeconds: 3.83, endSeconds: 5.94 },
        ],
      },
    },
    {
      id: 'right-way',
      title: 'O que é um pedido genuíno',
      text: 'Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado.',
      highlight:
        'Nunca peça uma nota específica nem ofereça desconto, brinde ou qualquer troca por uma avaliação.',
      narration: {
        script:
          'Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado. Por isso, nunca peça uma nota específica, nem ofereça desconto, brinde ou qualquer troca por uma avaliação.',
        audioSrc: '/audio/lessons/review-request-message/right-way/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 131, startSeconds: 0, endSeconds: 7.69 },
          { textStart: 131, textEnd: 238, startSeconds: 7.69, endSeconds: 13.04 },
        ],
      },
    },
    {
      id: 'timing',
      title: 'O momento certo',
      text: 'O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente.',
      narration: {
        script:
          'O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente.',
        audioSrc: '/audio/lessons/review-request-message/timing/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 128, startSeconds: 0, endSeconds: 6.2 },
        ],
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar sua própria mensagem de solicitação.',
      narration: {
        script:
          'Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar a sua própria mensagem de solicitação.',
        audioSrc: '/audio/lessons/review-request-message/action/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 53, startSeconds: 0, endSeconds: 2.88 },
          { textStart: 53, textEnd: 119, startSeconds: 2.88, endSeconds: 6.2 },
        ],
      },
    },
  ],
}
