import type { Lesson } from './types.js'

export const profileRepresentsYourBusinessLesson: Lesson = {
  id: 'profile-represents-your-business',
  title: 'Seu perfil representa seu negócio',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'O primeiro contato, antes da visita',
      text: 'O Perfil da Empresa no Google costuma ser o primeiro contato de alguém com o seu negócio — antes até de visitar ou ligar.',
    },
    {
      id: 'first-impression',
      title: 'Cada informação forma uma impressão',
      text: 'Nome, fotos e descrição ajudam a formar a primeira impressão. Um perfil desatualizado passa a impressão errada, mesmo quando o negócio real é ótimo.',
      highlight:
        'O perfil não substitui o negócio real — ele representa o negócio real para quem ainda não o conhece.',
    },
    {
      id: 'control',
      title: 'Isso está sob o seu controle',
      text: 'Você pode revisar e ajustar as informações do seu perfil sempre que quiser, para que ele reflita melhor o negócio de verdade.',
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já entende o papel do perfil. A próxima missão é dar uma olhada geral nele.',
    },
  ],
}
