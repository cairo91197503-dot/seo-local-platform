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
      narration: {
        script: 'Configurar o perfil uma vez não é o fim do trabalho — é só o começo.',
      },
    },
    {
      id: 'living-profile',
      title: 'Um retrato vivo do negócio',
      text: 'Sempre que algo mudar no seu negócio — horário, serviço, endereço — o perfil deve mudar junto.',
      highlight: 'O perfil não é uma configuração feita uma única vez; é uma representação viva do negócio.',
      narration: {
        script:
          'Sempre que algo mudar no seu negócio — horário, serviço, endereço — o perfil deve mudar junto. Ele não é uma configuração feita uma única vez; é uma representação viva do seu negócio.',
      },
    },
    {
      id: 'consequence',
      title: 'O que um perfil parado transmite',
      text: 'Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negócio em si esteja ótimo.',
      narration: {
        script:
          'Um perfil desatualizado pode fazer o cliente confiar menos, mesmo que o negócio em si esteja ótimo.',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já entende por que isso é uma rotina, não uma tarefa única. A próxima missão é fazer uma revisão rápida agora.',
      narration: {
        script:
          'Você já entende por que isso é uma rotina, não uma tarefa única. A próxima missão é fazer uma revisão rápida agora.',
      },
    },
  ],
}
