import type { Lesson } from './types.js'
import { reviewRequestMessageLesson } from './review-request-message'
import { reviewsImportanceLesson } from './reviews-importance'

/**
 * Registro de conteúdo das lições, indexado por `id`. Cada nova lição deve
 * ser adicionada aqui e em `catalog.ts` (que define o `missionId` associado
 * e o status de disponibilidade).
 */
export const lessonRegistry: Record<string, Lesson> = {
  [reviewsImportanceLesson.id]: reviewsImportanceLesson,
  [reviewRequestMessageLesson.id]: reviewRequestMessageLesson,
}
