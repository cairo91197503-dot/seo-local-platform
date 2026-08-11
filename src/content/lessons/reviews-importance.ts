import type { Lesson } from './types'

export const reviewsImportanceLesson: Lesson = {
  id: 'reviews-importance',
  title: 'Por que as avaliações importam?',
  duration: '1 min',
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
        script: 'Antes de escolher uma empresa, muitas pessoas pesquisam no Google. Nesse momento, as avaliações mostram como foi a experiência de outros clientes. E ajudam quem está pesquisando a conhecer melhor o seu negócio.',
        audioSrc: '/audio/lessons/reviews-importance/cena-01.wav',
        segments: [
          {
            text: 'Antes de escolher uma empresa, muita gente pesquisa no Google.',
            startSeconds: 0,
            endSeconds: 3.16,
          },
          {
            text: 'As avaliações mostram a experiência de outros clientes.',
            startSeconds: 3.16,
            endSeconds: 5.99,
          },
          {
            text: 'E ajudam a decidir em qual negócio confiar.',
            startSeconds: 5.99,
            endSeconds: 8.36,
          },
        ],
      },
      estimatedDurationSeconds: 8.53,
    },
    {
      id: 'trust',
      title: 'Avaliações ajudam a gerar confiança',
      text: 'Experiências reais compartilhadas por clientes podem ajudar outras pessoas a se sentirem mais seguras ao conhecer seu negócio.',
    },
    {
      id: 'timing',
      title: 'Quando pedir uma avaliação?',
      text: 'Depois de um atendimento ou experiência real, você pode convidar o cliente a compartilhar espontaneamente a opinião dele.',
      highlight:
        'Peça uma opinião sincera. Não peça uma nota específica.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já sabe por que avaliações autênticas são importantes. O próximo passo é colocar isso em prática.',
    },
  ],
}
