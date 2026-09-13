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
      illustration: {
        src: '/images/lessons/first-profile-checkup/cena-01.jpg',
        alt: 'Empresário olhando para um resumo completo do perfil do negócio, reunindo informações, horários, fotos e avaliações.',
      },
      narration: {
        script:
          'Você já aprendeu várias partes do seu perfil, uma de cada vez. Agora é hora de olhar para ele como um todo.',
        audioSrc: '/audio/lessons/first-profile-checkup/intro/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 63, startSeconds: 0, endSeconds: 3.69 },
          { textStart: 63, textEnd: 107, startSeconds: 3.69, endSeconds: 5.52 },
        ],
      },
    },
    {
      id: 'what-it-means',
      title: 'O que é esse check-up',
      text: 'Um check-up completo junta tudo o que você já revisou — informações, horários, serviços, fotos, avaliações — num único olhar.',
      illustration: {
        src: '/images/lessons/first-profile-checkup/cena-02.jpg',
        alt: 'Cinco ícones do perfil convergindo para uma prancheta única segurada pelo empresário, como um raio-x completo.',
      },
      narration: {
        script:
          'Esse check-up completo junta tudo o que você já revisou — informações, horários, serviços, fotos, avaliações — num único olhar.',
        audioSrc: '/audio/lessons/first-profile-checkup/what-it-means/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 127, startSeconds: 0, endSeconds: 7.38 },
        ],
      },
    },
    {
      id: 'purpose',
      title: 'O que esse check-up não é',
      text: 'Esse olhar não é sobre nota ou posição no Google.',
      highlight: 'É sobre identificar o que ainda pode representar melhor o seu negócio real.',
      illustration: {
        src: '/images/lessons/first-profile-checkup/cena-03.jpg',
        alt: 'Símbolo de nota ou ranking riscado, substituído por uma lupa apontando pequenos ajustes concretos.',
      },
      narration: {
        script:
          'Mas esse olhar não é sobre nota ou posição no Google. É sobre identificar o que ainda pode representar melhor o seu negócio real.',
        audioSrc: '/audio/lessons/first-profile-checkup/purpose/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 54, startSeconds: 0, endSeconds: 2.71 },
          { textStart: 54, textEnd: 129, startSeconds: 2.88, endSeconds: 6.52 },
        ],
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Faça esse olhar completo e identifique o que ainda pode melhorar.',
      illustration: {
        src: '/images/lessons/first-profile-checkup/cena-04.jpg',
        alt: 'Empresário circulando com caneta uma pequena lista de itens identificados para melhorar.',
      },
      narration: {
        script: 'Agora é sua vez: faça esse olhar completo e identifique o que ainda pode melhorar.',
        audioSrc: '/audio/lessons/first-profile-checkup/action/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 82, startSeconds: 0, endSeconds: 4.2 },
        ],
      },
    },
  ],
}
