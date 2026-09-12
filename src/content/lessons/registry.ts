import type { Lesson } from './types.js'
import { accurateBusinessInfoLesson } from './accurate-business-info'
import { businessHoursMatterLesson } from './business-hours-matter'
import { chooseYourNextActionLesson } from './choose-your-next-action'
import { explainWhatYouOfferLesson } from './explain-what-you-offer'
import { firstProfileCheckupLesson } from './first-profile-checkup'
import { howToRespondToReviewsLesson } from './how-to-respond-to-reviews'
import { keepYourProfileUpdatedLesson } from './keep-your-profile-updated'
import { photosHelpCustomersDecideLesson } from './photos-help-customers-decide'
import { profileRepresentsYourBusinessLesson } from './profile-represents-your-business'
import { reviewRequestMessageLesson } from './review-request-message'
import { reviewsImportanceLesson } from './reviews-importance'
import { whyAppearInLocalSearchLesson } from './why-appear-in-local-search'

/**
 * Registro de conteúdo das lições, indexado por `id`. Cada nova lição deve
 * ser adicionada aqui e em `catalog.ts` (que define o `missionId` associado
 * e o status de disponibilidade). Ordem e objetivo de cada lição em
 * `docs/13-CURRICULO-MVP.md`.
 */
export const lessonRegistry: Record<string, Lesson> = {
  [whyAppearInLocalSearchLesson.id]: whyAppearInLocalSearchLesson,
  [profileRepresentsYourBusinessLesson.id]: profileRepresentsYourBusinessLesson,
  [accurateBusinessInfoLesson.id]: accurateBusinessInfoLesson,
  [businessHoursMatterLesson.id]: businessHoursMatterLesson,
  [explainWhatYouOfferLesson.id]: explainWhatYouOfferLesson,
  [photosHelpCustomersDecideLesson.id]: photosHelpCustomersDecideLesson,
  [reviewsImportanceLesson.id]: reviewsImportanceLesson,
  [reviewRequestMessageLesson.id]: reviewRequestMessageLesson,
  [howToRespondToReviewsLesson.id]: howToRespondToReviewsLesson,
  [keepYourProfileUpdatedLesson.id]: keepYourProfileUpdatedLesson,
  [firstProfileCheckupLesson.id]: firstProfileCheckupLesson,
  [chooseYourNextActionLesson.id]: chooseYourNextActionLesson,
}
