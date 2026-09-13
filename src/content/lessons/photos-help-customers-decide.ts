import type { Lesson } from './types.js'

export const photosHelpCustomersDecideLesson: Lesson = {
  id: 'photos-help-customers-decide',
  title: 'Fotos ajudam o cliente a decidir',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'A primeira coisa que se olha',
      text: 'Fotos são, muitas vezes, a primeira coisa que uma pessoa olha antes mesmo de ler qualquer texto sobre um negócio.',
      narration: {
        script:
          'Fotos são, muitas vezes, a primeira coisa que uma pessoa olha — antes mesmo de ler qualquer texto sobre o negócio.',
        audioSrc: '/audio/lessons/photos-help-customers-decide/intro/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 114, startSeconds: 0, endSeconds: 6.08 },
        ],
      },
    },
    {
      id: 'what-photos-do',
      title: 'O que as fotos mostram de verdade',
      text: 'Fotos e vídeos ajudam clientes a conhecer o que o negócio oferece e podem destacar características da empresa.',
      highlight:
        'Use fotos reais do seu negócio — do ambiente, dos produtos, do resultado do seu trabalho. Não é sobre ter fotos bonitas, é sobre mostrar a verdade.',
      narration: {
        script:
          'Fotos e vídeos ajudam o cliente a conhecer o que o negócio oferece, e podem destacar características da empresa. O importante é usar fotos reais — do ambiente, dos produtos, do resultado do seu trabalho. Não é sobre ter fotos bonitas, é sobre mostrar a verdade.',
        audioSrc: '/audio/lessons/photos-help-customers-decide/what-photos-do/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 113, startSeconds: 0, endSeconds: 5.98 },
          { textStart: 113, textEnd: 204, startSeconds: 5.98, endSeconds: 11.17 },
          { textStart: 204, textEnd: 261, startSeconds: 11.17, endSeconds: 14.08 },
        ],
      },
    },
    {
      id: 'trust',
      title: 'O efeito na confiança',
      text: 'Um cliente que vê fotos reais e recentes sente mais segurança do que quando não vê nenhuma foto, ou vê fotos antigas e genéricas.',
      narration: {
        script:
          'Isso tem efeito direto na confiança: um cliente que vê fotos reais e recentes se sente mais seguro do que quando não vê nenhuma foto, ou vê fotos antigas e genéricas.',
        audioSrc: '/audio/lessons/photos-help-customers-decide/trust/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 166, startSeconds: 0, endSeconds: 9.2 },
        ],
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Dê uma olhada nas fotos do seu perfil e veja se elas ainda representam o seu negócio hoje.',
      narration: {
        script: 'Agora é sua vez: dê uma olhada nas fotos do seu perfil e veja se elas ainda representam o seu negócio hoje.',
        audioSrc: '/audio/lessons/photos-help-customers-decide/action/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 107, startSeconds: 0, endSeconds: 6 },
        ],
      },
    },
  ],
}
