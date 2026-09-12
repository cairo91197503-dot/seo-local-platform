import type { Lesson } from './types.js'

export const whyAppearInLocalSearchLesson: Lesson = {
  id: 'why-appear-in-local-search',
  title: 'Por que aparecer nas buscas locais importa',
  duration: '1 min',
  level: 'Iniciante',
  futureReward: '20 XP',
  scenes: [
    {
      id: 'intro',
      title: 'Uma busca já é uma necessidade concreta',
      text: 'Quando alguém precisa de algo perto de casa ou do trabalho, a primeira coisa que costuma fazer é pesquisar no Google.',
      illustration: {
        src: '/images/lessons/why-appear-in-local-search/cena-01.jpg',
        alt: 'Pessoa pesquisando no celular por uma padaria perto de casa, com vários resultados locais no mapa.',
      },
    },
    {
      id: 'first-step',
      title: 'O primeiro passo antes de ser escolhido',
      text: 'Essa pessoa já está procurando resolver algo agora — não é só curiosidade.',
      highlight:
        'Aparecer nessas buscas é o primeiro passo: antes de ser escolhido, o negócio precisa ser encontrado.',
      illustration: {
        src: '/images/lessons/why-appear-in-local-search/cena-02.jpg',
        alt: 'Caminho em dois degraus mostrando primeiro "ser encontrado" e depois "ser escolhido".',
      },
    },
    {
      id: 'where',
      title: 'Onde essas buscas aparecem',
      text: 'Os resultados locais aparecem tanto na Pesquisa Google quanto no Google Maps.',
      illustration: {
        src: '/images/lessons/why-appear-in-local-search/cena-03.jpg',
        alt: 'Celular dividido mostrando um resultado na Pesquisa Google de um lado e o mesmo negócio no Google Maps do outro.',
      },
    },
    {
      id: 'action',
      title: 'Agora é sua vez',
      text: 'Você já entende por que aparecer importa. A próxima missão é descobrir como o seu negócio aparece hoje.',
      illustration: {
        src: '/images/lessons/why-appear-in-local-search/cena-04.jpg',
        alt: 'Empresária com lupa olhando para o próprio perfil no celular, prestes a descobrir como o negócio aparece hoje.',
      },
    },
  ],
}
