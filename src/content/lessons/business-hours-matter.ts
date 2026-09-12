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
    },
    {
      id: 'special-hours',
      title: 'Situações especiais também contam',
      text: 'Além do horário normal, o Google permite informar horários especiais, como feriados e fechamentos temporários.',
      highlight:
        'Os horários podem e devem ser atualizados sempre que mudarem — inclusive em situações especiais, não só no dia a dia comum.',
    },
    {
      id: 'consequence',
      title: 'O que isso causa na prática',
      text: 'Um cliente que vê "aberto" no perfil, vai até lá num feriado e encontra fechado perde confiança — mesmo sem culpa do negócio em si.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Confira se o horário do seu perfil está correto, incluindo os próximos feriados ou exceções que você já souber.',
    },
  ],
}
