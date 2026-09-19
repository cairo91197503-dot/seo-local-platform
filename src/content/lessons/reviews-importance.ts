import type { Lesson } from './types.js'

export const reviewsImportanceLesson: Lesson = {
  id: 'reviews-importance',
  title: 'Por que as avaliações importam?',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Antes de escolher, as pessoas pesquisam',
      text: 'Quando alguém encontra uma empresa no Google, as avaliações ajudam a entender como foi a experiência de outros clientes.',
      illustration: {
        src: '/images/lessons/reviews-importance/cena-01.png',
        alt: 'Pequeno empresário observa no celular avaliações de clientes ao pesquisar um negócio local.',
      },
      narration: {
        script:
          'Antes de escolher uma empresa, muitas pessoas pesquisam no Google. Nesse momento, as avaliações mostram como foi a experiência de outros clientes. E ajudam quem está pesquisando a conhecer melhor o seu negócio.',
        audioSrc: '/audio/lessons/reviews-importance/cena-01/narration-v001.mp3',
      },
    },
    {
      id: 'trust',
      title: 'Avaliações ajudam a gerar confiança',
      text: 'Experiências reais compartilhadas por clientes podem ajudar outras pessoas a se sentirem mais seguras ao conhecer seu negócio.',
      illustration: {
        src: '/images/lessons/reviews-importance/cena-02.jpg',
        alt: 'Várias pessoas pequenas ao redor de um símbolo de confiança formado por avaliações com estrelas.',
      },
      narration: {
        script:
          'Avaliações também ajudam a gerar confiança: experiências reais compartilhadas por clientes podem ajudar outras pessoas a se sentirem mais seguras ao conhecer o seu negócio.',
        audioSrc: '/audio/lessons/reviews-importance/trust/narration-v001.mp3',
      },
    },
    {
      id: 'timing',
      title: 'Quando pedir uma avaliação?',
      text: 'Depois de um atendimento ou experiência real, você pode convidar o cliente a compartilhar espontaneamente a opinião dele.',
      highlight:
        'Peça uma opinião sincera. Não peça uma nota específica.',
      illustration: {
        src: '/images/lessons/reviews-importance/cena-03.jpg',
        alt: 'Empresário se despedindo com um aperto de mão de um cliente satisfeito, convidando-o gentilmente a deixar uma avaliação sincera.',
      },
      narration: {
        script:
          'O melhor momento para pedir uma avaliação é depois de um atendimento ou experiência real — você pode convidar o cliente a compartilhar espontaneamente a opinião dele. E o importante é pedir uma opinião sincera, nunca uma nota específica.',
        audioSrc: '/audio/lessons/reviews-importance/timing/narration-v001.mp3',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe por que avaliações autênticas são importantes. O próximo passo é colocar isso em prática.',
      illustration: {
        src: '/images/lessons/reviews-importance/cena-04.jpg',
        alt: 'Empresário confiante se preparando para colocar em prática o que aprendeu sobre avaliações.',
      },
      narration: {
        script: 'Você já sabe por que avaliações autênticas são importantes. O próximo passo é colocar isso em prática.',
        audioSrc: '/audio/lessons/reviews-importance/action/narration-v001.mp3',
      },
    },
  ],
}
