export type LessonCatalogStatus = 'disponivel' | 'em-breve'

export type LessonCatalogItem = {
  id: string
  title: string
  description: string
  status: LessonCatalogStatus
  /**
   * Missão do currículo desbloqueada ao concluir esta lição. Ver
   * `src/content/missions/catalog.ts` e `src/state/journey.ts` (CURRICULUM).
   */
  missionId: string
}

/**
 * Ordem e conteúdo definidos em `docs/13-CURRICULO-MVP.md` (currículo do
 * MVP, decidido pelo usuário em 2026-09-12): 1 trilha, 5 módulos, 12 lições.
 * Novas lições devem ser adicionadas primeiro naquele documento, depois
 * aqui. A ordem deste array é a ordem real do currículo (`CURRICULUM`, em
 * `src/state/journey.ts`, deriva dela filtrando por `disponivel`).
 */
export const lessonCatalog: LessonCatalogItem[] = [
  // Módulo 1 — Comece pelo básico
  {
    id: 'why-appear-in-local-search',
    title: 'Por que aparecer nas buscas locais importa',
    description:
      'Entenda por que uma busca local já representa a necessidade concreta de um cliente por perto.',
    status: 'disponivel',
    missionId: 'discover-search-presence',
  },
  {
    id: 'profile-represents-your-business',
    title: 'Seu perfil representa seu negócio',
    description:
      'Entenda que o Perfil da Empresa é a representação do seu negócio real para quem pesquisa no Google.',
    status: 'disponivel',
    missionId: 'basic-profile-checkup',
  },
  {
    id: 'accurate-business-info',
    title: 'Informações corretas ajudam o cliente a entender o negócio',
    description:
      'Entenda por que manter nome, endereço, telefone, categoria e horário corretos ajuda o Google e seus clientes a entenderem seu negócio.',
    status: 'disponivel',
    missionId: 'review-business-info',
  },
  {
    id: 'business-hours-matter',
    title: 'Horários também fazem parte da experiência',
    description:
      'Aprofunde em horários de funcionamento, incluindo feriados e situações especiais.',
    status: 'disponivel',
    missionId: 'review-business-hours',
  },
  // Módulo 2 — Faça o cliente entender seu negócio
  {
    id: 'explain-what-you-offer',
    title: 'Faça o cliente entender o que você oferece',
    description:
      'Entenda como descrever serviços e produtos com clareza ajuda o cliente a decidir.',
    status: 'disponivel',
    missionId: 'review-services',
  },
  {
    id: 'photos-help-customers-decide',
    title: 'Fotos ajudam o cliente a decidir',
    description:
      'Entenda como fotos reais do ambiente, produtos e resultados ajudam o cliente a se sentir seguro ao escolher.',
    status: 'disponivel',
    missionId: 'review-photos',
  },
  // Módulo 3 — Transforme experiência em confiança
  {
    id: 'reviews-importance',
    title: 'Por que as avaliações importam?',
    description:
      'Entenda como avaliações autênticas ajudam outras pessoas a conhecer e confiar em um negócio.',
    status: 'disponivel',
    missionId: 'request-first-review',
  },
  {
    id: 'review-request-message',
    title: 'Como fazer um pedido de avaliação genuíno',
    description:
      'Aprenda a diferença entre um pedido genuíno e um pedido que pode prejudicar seu negócio, e prepare-se para pedir do jeito certo.',
    status: 'disponivel',
    missionId: 'prepare-request-message',
  },
  {
    id: 'how-to-respond-to-reviews',
    title: 'Como responder avaliações',
    description:
      'Entenda por que responder avaliações importa e a diferença entre responder bem a uma avaliação positiva e a uma negativa.',
    status: 'disponivel',
    missionId: 'respond-to-a-review',
  },
  // Módulo 4 — Mantenha seu negócio atualizado
  {
    id: 'keep-your-profile-updated',
    title: 'Seu perfil precisa continuar atualizado',
    description:
      'Entenda que o perfil é uma representação viva do negócio, não uma configuração feita uma única vez.',
    status: 'disponivel',
    missionId: 'quick-profile-review',
  },
  // Módulo 5 — Descubra o que melhorar
  {
    id: 'first-profile-checkup',
    title: 'Faça seu primeiro check-up completo',
    description:
      'Consolide o que você aprendeu em um olhar completo sobre o próprio perfil, identificando lacunas.',
    status: 'disponivel',
    missionId: 'identify-three-improvements',
  },
  {
    id: 'choose-your-next-action',
    title: 'Escolha sua próxima ação',
    description:
      'Feche o currículo transformando reflexão em rotina: escolha e execute uma melhoria concreta.',
    status: 'disponivel',
    missionId: 'execute-one-improvement',
  },
]
