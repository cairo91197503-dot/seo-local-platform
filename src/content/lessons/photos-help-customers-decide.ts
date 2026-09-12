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
    },
    {
      id: 'what-photos-do',
      title: 'O que as fotos mostram de verdade',
      text: 'Fotos e vídeos ajudam clientes a conhecer o que o negócio oferece e podem destacar características da empresa.',
      highlight:
        'Use fotos reais do seu negócio — do ambiente, dos produtos, do resultado do seu trabalho. Não é sobre ter fotos bonitas, é sobre mostrar a verdade.',
    },
    {
      id: 'trust',
      title: 'O efeito na confiança',
      text: 'Um cliente que vê fotos reais e recentes sente mais segurança do que quando não vê nenhuma foto, ou vê fotos antigas e genéricas.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Dê uma olhada nas fotos do seu perfil e veja se elas ainda representam o seu negócio hoje.',
    },
  ],
}
