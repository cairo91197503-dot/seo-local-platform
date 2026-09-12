import type { MissionCatalogItem } from './types'

/**
 * Catálogo de missões, indexado pelo `missionId` referenciado em
 * `src/content/lessons/catalog.ts`. Cada missão liberada por uma lição
 * concluída deve ter uma entrada aqui.
 */
export const missionCatalog: MissionCatalogItem[] = [
  {
    id: 'request-first-review',
    title: 'Peça sua primeira avaliação',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Transforme um bom atendimento em uma oportunidade de receber uma avaliação autêntica no Google.',
    explanation:
      'As avaliações ajudam novos clientes a conhecerem a experiência de outras pessoas com seu negócio. O melhor momento para pedir uma avaliação é depois de uma experiência positiva e real.',
    steps: [
      'Escolha um cliente que acabou de ter uma experiência real com seu negócio.',
      'Agradeça pela preferência e pergunte educadamente se ele gostaria de deixar uma avaliação.',
      'Envie o link de avaliação do seu Perfil da Empresa no Google.',
    ],
    confirmationPrompt: 'Já realizou a ação com um cliente que teve uma boa experiência?',
    messageExample:
      'Obrigado pela preferência! Se você gostou do nosso atendimento, poderia compartilhar sua experiência no Google? Sua avaliação ajuda muito nosso negócio.',
    messageExampleNote:
      'Este é apenas um modelo de mensagem. Você poderá personalizá-lo no futuro.',
  },
  {
    id: 'prepare-request-message',
    title: 'Prepare uma mensagem de solicitação respeitosa',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Escreva sua própria mensagem para pedir avaliações, seguindo boas práticas de um pedido genuíno.',
    explanation:
      'Uma mensagem bem preparada facilita o pedido no dia a dia e evita erros comuns, como pedir uma nota específica ou oferecer algo em troca.',
    steps: [
      'Revise o exemplo de mensagem da lição anterior.',
      'Escreva sua própria versão, usando palavras que combinem com o jeito do seu negócio atender.',
      'Releia e confirme que ela não pede uma nota específica nem oferece nada em troca.',
    ],
    confirmationPrompt: 'Já preparou sua própria mensagem de solicitação?',
    messageExample:
      'Obrigado por visitar nosso negócio! Se puder, compartilhe sua opinião sincera no Google — isso ajuda outras pessoas a nos conhecer.',
    messageExampleNote:
      'Use este exemplo como ponto de partida e adapte para o seu jeito de atender.',
  },
  {
    id: 'review-business-info',
    title: 'Revise uma informação essencial do negócio',
    difficulty: 'Fácil',
    reward: '+40 XP',
    objective:
      'Confira se uma informação essencial do seu Perfil da Empresa no Google — como telefone ou horário de funcionamento — está correta e atualizada.',
    explanation:
      'Informações desatualizadas podem confundir clientes e fazer o negócio perder oportunidades. Conferir esses dados regularmente é uma das formas mais simples de cuidar do seu perfil.',
    steps: [
      'Abra o Perfil da Empresa do seu negócio (pesquise o nome do seu negócio no Google ou acesse business.google.com).',
      'Escolha uma informação essencial para revisar: telefone ou horário de funcionamento.',
      'Confira se está correta e, se precisar, atualize.',
    ],
    confirmationPrompt:
      'Já conferiu e, se necessário, atualizou a informação no seu Perfil da Empresa?',
  },
]
