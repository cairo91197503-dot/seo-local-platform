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

export const lessonCatalog: LessonCatalogItem[] = [
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
]
