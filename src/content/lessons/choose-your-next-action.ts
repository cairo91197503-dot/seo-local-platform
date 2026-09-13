import type { Lesson } from './types.js'

export const chooseYourNextActionLesson: Lesson = {
  id: 'choose-your-next-action',
  title: 'Escolha sua próxima ação',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'O fim do currículo, não da jornada',
      text: 'Você chegou ao fim do currículo, mas não ao fim da jornada. Cuidar da presença do seu negócio é uma rotina contínua.',
      illustration: {
        src: '/images/lessons/choose-your-next-action/cena-01.jpg',
        alt: 'Empresário confiante escolhendo qual ação praticar a seguir, com três opções representadas à frente.',
      },
      narration: {
        script:
          'Você chegou ao fim do currículo, mas não ao fim da jornada. Cuidar da presença do seu negócio no Google é uma rotina contínua.',
      },
    },
    {
      id: 'choose',
      title: 'Escolha uma ação concreta',
      text: 'De tudo que você aprendeu, escolha uma ação concreta para fazer agora.',
      highlight:
        'O objetivo não é "terminar o curso do Estrelar" — é saber cuidar do seu negócio no Google, de forma contínua.',
      illustration: {
        src: '/images/lessons/choose-your-next-action/cena-02.jpg',
        alt: 'Empresário apontando decidido para um dos três cartões de melhoria, com um caminho contínuo ao fundo.',
      },
      narration: {
        script:
          'De tudo que você aprendeu, escolha uma ação concreta para fazer agora. O objetivo não é terminar o curso do Estrelar — é saber cuidar do seu negócio no Google, de forma contínua.',
      },
    },
    {
      id: 'example',
      title: 'De onde escolher',
      text: 'Pode ser qualquer uma das 3 melhorias que você identificou na missão anterior — o importante é escolher uma e executar.',
      illustration: {
        src: '/images/lessons/choose-your-next-action/cena-03.jpg',
        alt: 'Três cartões de melhoria lado a lado — informações, fotos e avaliações — com um deles destacado em verde.',
      },
      narration: {
        script:
          'Pode ser qualquer uma das três melhorias que você identificou na missão anterior — o importante é escolher uma e executar.',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Escolha uma das melhorias que você identificou e coloque em prática agora. Você já sabe cuidar disso sozinho — e, no futuro, o Estrelar vai poder ajudar a fazer parte disso por você, sempre com a sua aprovação antes de qualquer mudança.',
      illustration: {
        src: '/images/lessons/choose-your-next-action/cena-04.jpg',
        alt: 'Empresário já em ação, editando no celular a melhoria escolhida agora mesmo.',
      },
      narration: {
        script:
          'Escolha uma das melhorias que você identificou e coloque em prática agora. Você já sabe cuidar disso sozinho — e, no futuro, o Estrelar vai poder ajudar a fazer parte disso por você, sempre com a sua aprovação antes de qualquer mudança.',
      },
    },
  ],
}
