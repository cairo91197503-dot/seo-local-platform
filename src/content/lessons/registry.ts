import type { Lesson } from './types.js'
import { accurateBusinessInfoLesson } from './accurate-business-info.js'
import { businessHoursMatterLesson } from './business-hours-matter.js'
import { chooseYourNextActionLesson } from './choose-your-next-action.js'
import { explainWhatYouOfferLesson } from './explain-what-you-offer.js'
import { firstProfileCheckupLesson } from './first-profile-checkup.js'
import { howToRespondToReviewsLesson } from './how-to-respond-to-reviews.js'
import { keepYourProfileUpdatedLesson } from './keep-your-profile-updated.js'
import { photosHelpCustomersDecideLesson } from './photos-help-customers-decide.js'
import { profileRepresentsYourBusinessLesson } from './profile-represents-your-business.js'
import { reviewRequestMessageLesson } from './review-request-message.js'
import { reviewsImportanceLesson } from './reviews-importance.js'
import { whyAppearInLocalSearchLesson } from './why-appear-in-local-search.js'

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
