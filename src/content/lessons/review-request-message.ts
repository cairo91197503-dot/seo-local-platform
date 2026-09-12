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
    },
    {
      id: 'right-way',
      title: 'O que é um pedido genuíno',
      text: 'Um pedido genuíno é educado e sincero: você convida a pessoa a compartilhar a opinião real dela, sem tentar controlar o resultado.',
      highlight:
        'Nunca peça uma nota específica nem ofereça desconto, brinde ou qualquer troca por uma avaliação.',
    },
    {
      id: 'timing',
      title: 'O momento certo',
      text: 'O melhor momento para pedir é logo depois de uma experiência positiva real, quando a lembrança ainda está fresca para o cliente.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe como pedir avaliações de forma genuína. A próxima missão é preparar sua própria mensagem de solicitação.',
    },
  ],
}
