import type { Lesson } from './types.js'

export const keepYourProfileUpdatedLesson: Lesson = {
  id: 'keep-your-profile-updated',
  title: 'Seu perfil precisa continuar atualizado',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Configurar não é o fim',
      text: 'Configurar o perfil uma vez não é o fim do trabalho — é só o começo.',
      illustration: {
        src: '/images/lessons/keep-your-profile-updated/cena-01.jpg',
        alt: 'Empresário atualizando o perfil do negócio no celular, com um calendário ao fundo sugerindo rotina.',
      },
      narration: {
        script: 'Configurar o perfil uma vez não é o fim do trabalho — é só o começo.',
        audioSrc: '/audio/lessons/keep-your-profile-updated/intro/narration-v001.mp3',
      },
    },
    {
      id: 'living-profile',
      title: 'Um retrato vivo do negócio',
      text: 'Sempre que algo mudar no seu negócio — horário, serviço, endereço — o perfil deve mudar junto.',
      highlight: 'O perfil não é uma configuração feita uma única vez; é uma representação viva do negócio.',
      illustration: {
        src: '/images/lessons/keep-your-profile-updated/cena-02.jpg',
        alt: 'Ícones de horário, serviço e endereço girando organicamente ao redor de um perfil, sugerindo que ele está sempre vivo.',
      },
      narration: {
        script:
          'Sempre que algo mudar no seu negócio — horário, serviço, endereço — o perfil deve mudar junto. Ele não é uma configuração feita uma única vez; é uma representação viva do seu negócio.',
        audioSrc: '/audio/lessons/keep-your-profile-updated/living-profile/narration-v001.mp3',
      },
    },
    {
      id: 'consequence',
      title: 'O que um perfil parado transmite',
      text: 'Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negócio em si esteja ótimo.',
      illustration: {
        src: '/images/lessons/keep-your-profile-updated/cena-03.jpg',
        alt: 'Negócio real vibrante ao fundo, mas o celular mostra um perfil desatualizado, deixando o cliente em dúvida.',
      },
      narration: {
        script:
          'Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negócio em si esteja ótimo.',
        audioSrc: '/audio/lessons/keep-your-profile-updated/consequence/narration-v001.mp3',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já entende por que isso é uma rotina, não uma tarefa única. A próxima missão é fazer uma revisão rápida agora.',
      illustration: {
        src: '/images/lessons/keep-your-profile-updated/cena-04.jpg',
        alt: 'Empresário prestes a abrir o próprio perfil para uma revisão rápida.',
      },
      narration: {
        script:
          'Você já entende por que isso é uma rotina, não uma tarefa única. A próxima missão é fazer uma revisão rápida agora.',
        audioSrc: '/audio/lessons/keep-your-profile-updated/action/narration-v001.mp3',
      },
    },
  ],
}
