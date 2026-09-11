export type LessonCatalogStatus = 'disponivel' | 'em-breve'

export type LessonCatalogItem = {
  id: string
  title: string
  description: string
  status: LessonCatalogStatus
}

export const lessonCatalog: LessonCatalogItem[] = [
  {
    id: '1',
    title: 'Por que as avaliações importam?',
    description:
      'Entenda como avaliações autênticas ajudam outras pessoas a conhecer e confiar em um negócio.',
    status: 'disponivel',
  },
]
