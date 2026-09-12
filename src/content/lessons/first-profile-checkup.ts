import type { Lesson } from './types.js'

export const firstProfileCheckupLesson: Lesson = {
  id: 'first-profile-checkup',
  title: 'Faça seu primeiro check-up completo',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Olhando para o todo',
      text: 'Você já aprendeu várias partes do seu perfil, uma de cada vez. Agora é hora de olhar para ele como um todo.',
      narration: {
        script:
          'Você já aprendeu várias partes do seu perfil, uma de cada vez. Agora é hora de olhar para ele como um todo.',
      },
    },
    {
      id: 'what-it-means',
      title: 'O que é esse check-up',
      text: 'Um check-up completo junta tudo o que você já revisou — informações, horários, serviços, fotos, avaliações — num único olhar.',
      narration: {
        script:
          'Esse check-up completo junta tudo o que você já revisou — informações, horários, serviços, fotos, avaliações — num único olhar.',
      },
    },
    {
      id: 'purpose',
      title: 'O que esse check-up não é',
      text: 'Esse olhar não é sobre nota ou posição no Google.',
      highlight: 'É sobre identificar o que ainda pode representar melhor o seu negócio real.',
      narration: {
        script:
          'Mas esse olhar não é sobre nota ou posição no Google. É sobre identificar o que ainda pode representar melhor o seu negócio real.',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Faça esse olhar completo e identifique o que ainda pode melhorar.',
      narration: {
        script: 'Agora é sua vez: faça esse olhar completo e identifique o que ainda pode melhorar.',
      },
    },
  ],
}
