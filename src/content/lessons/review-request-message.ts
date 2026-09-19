import type { Lesson } from './types.js'

export const reviewRequestMessageLesson: Lesson = {
  id: 'review-request-message',
  title: 'Como fazer um pedido de avaliação genuíno',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Pedir do jeito certo faz diferença',
      text: 'Pedir uma avaliação é normal e ajuda seu negócio a ser conhecido. Mas a forma como você pede também importa.',
      illustration: {
        src: '/images/lessons/review-request-message/cena-01.jpg',
        alt: 'Empresário enviando uma mensagem educada pedindo avaliação a um cliente, logo após um bom atendimento.',
      },
      narration: {
        script:
          'Pedir uma avaliação é normal, e ajuda o seu negócio a ser conhecido. Mas a forma como você pede também importa.',
        audioSrc: '/audio/lessons/review-request-message/intro/narration-v001.mp3',
      },
    },
    {
      id: 'right-way',
      title: 'O que é um pedido genuíno',
      text: 'Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado.',
      highlight:
        'Nunca peça uma nota específica nem ofereça desconto, brinde ou qualquer troca por uma avaliação.',
      illustration: {
        src: '/images/lessons/review-request-message/cena-02.jpg',
        alt: 'Comparação entre uma mensagem correta e educada e uma mensagem errada oferecendo troca por avaliação.',
      },
      narration: {
        script:
          'Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado. Por isso, nunca peça uma nota específica, nem ofereça desconto, brinde ou qualquer troca por uma avaliação.',
        audioSrc: '/audio/lessons/review-request-message/right-way/narration-v001.mp3',
      },
    },
    {
      id: 'timing',
      title: 'O momento certo',
      text: 'O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente.',
      illustration: {
        src: '/images/lessons/review-request-message/cena-03.jpg',
        alt: 'Linha do tempo mostrando o pedido de avaliação sendo feito logo após uma experiência positiva.',
      },
      narration: {
        script:
          'O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente.',
        audioSrc: '/audio/lessons/review-request-message/timing/narration-v001.mp3',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar sua própria mensagem de solicitação.',
      illustration: {
        src: '/images/lessons/review-request-message/cena-04.jpg',
        alt: 'Empresário escrevendo sua própria mensagem de pedido de avaliação no celular.',
      },
      narration: {
        script:
          'Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar a sua própria mensagem de solicitação.',
        audioSrc: '/audio/lessons/review-request-message/action/narration-v001.mp3',
      },
    },
  ],
}
