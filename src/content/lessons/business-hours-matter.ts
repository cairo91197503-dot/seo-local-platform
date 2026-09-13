import type { Lesson } from './types.js'

export const businessHoursMatterLesson: Lesson = {
  id: 'business-hours-matter',
  title: 'Horários também fazem parte da experiência',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Uma porta fechada é uma má primeira experiência',
      text: 'Um horário errado pode fazer um cliente ir até o seu negócio e encontrar a porta fechada.',
      illustration: {
        src: '/images/lessons/business-hours-matter/cena-01.jpg',
        alt: 'Cliente em frente a uma loja fechada, enquanto o celular mostra o perfil informando que o negócio está aberto.',
      },
      narration: {
        script:
          'Um horário errado pode fazer um cliente ir até o seu negócio e encontrar a porta fechada — e isso já é uma má primeira experiência.',
        audioSrc: '/audio/lessons/business-hours-matter/intro/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 131, startSeconds: 0, endSeconds: 6.9 },
        ],
      },
    },
    {
      id: 'special-hours',
      title: 'Situações especiais também contam',
      text: 'Além do horário normal, o Google permite informar horários especiais, como feriados e fechamentos temporários.',
      highlight:
        'Os horários podem e devem ser atualizados sempre que mudarem — inclusive em situações especiais, não só no dia a dia comum.',
      illustration: {
        src: '/images/lessons/business-hours-matter/cena-02.jpg',
        alt: 'Calendário com um feriado marcado e um banner de horário especial sendo salvo no perfil.',
      },
      narration: {
        script:
          'Além do horário normal, o Google permite informar horários especiais, como feriados e fechamentos temporários. Esses horários podem e devem ser atualizados sempre que mudarem — não só no dia a dia comum, mas também nessas situações especiais.',
        audioSrc: '/audio/lessons/business-hours-matter/special-hours/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 111, startSeconds: 0, endSeconds: 6 },
          { textStart: 111, textEnd: 242, startSeconds: 6.03, endSeconds: 13.2 },
        ],
      },
    },
    {
      id: 'consequence',
      title: 'O que isso causa na prática',
      text: 'Um cliente que vê "aberto" no perfil, vai até lá num feriado e encontra fechado perde confiança — mesmo sem culpa do negócio em si.',
      illustration: {
        src: '/images/lessons/business-hours-matter/cena-03.jpg',
        alt: 'Sequência mostrando o celular indicando aberto e depois o mesmo cliente encontrando a porta fechada.',
      },
      narration: {
        script:
          'Na prática, um cliente que vê "aberto" no perfil, vai até lá num feriado e encontra tudo fechado, acaba perdendo confiança — mesmo sem culpa do negócio em si.',
        audioSrc: '/audio/lessons/business-hours-matter/consequence/narration-v001.wav',
        segments: [
          { textStart: 0, textEnd: 158, startSeconds: 0, endSeconds: 8.88 },
        ],
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Confira se o horário do seu perfil está correto, incluindo os próximos feriados ou exceções que você já souber.',
      illustration: {
        src: '/images/lessons/business-hours-matter/cena-04.jpg',
        alt: 'Empresária conferindo no calendário do perfil os horários e os próximos feriados.',
      },
      narration: {
        script:
          'Agora é sua vez: confira se o horário do seu perfil está correto, incluindo os próximos feriados ou exceções que você já souber.',
      },
    },
  ],
}
