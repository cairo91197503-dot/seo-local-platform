import { lessonCatalog } from '../../content/lessons/catalog'

/**
 * Seção "o que você aprende" (Etapa 2). A regra desta etapa é explícita:
 * "utilize SOMENTE temas realmente existentes nas lições atuais" e "não
 * inventar novas lições". Em vez de copiar títulos à mão (o que poderia
 * ficar desatualizado se o currículo mudar), os temas vêm diretamente de
 * `src/content/lessons/catalog.ts` — a mesma fonte usada por `LearnPage` —
 * escolhendo 6 ids reais que representam a amplitude do currículo (início,
 * informações, fotos, avaliações e manutenção do perfil).
 */
const FEATURED_LESSON_IDS = [
  'why-appear-in-local-search',
  'profile-represents-your-business',
  'photos-help-customers-decide',
  'reviews-importance',
  'how-to-respond-to-reviews',
  'keep-your-profile-updated',
]

const featuredThemes = FEATURED_LESSON_IDS.map((id) =>
  lessonCatalog.find((lesson) => lesson.id === id),
).filter((lesson): lesson is (typeof lessonCatalog)[number] => lesson !== undefined)

export function LearningSection() {
  return (
    <section className="landing-section" aria-labelledby="landing-learning-title">
      <h2 id="landing-learning-title" className="landing-section__title">
        Tudo começa pelo básico.
      </h2>
      <p className="landing-section__lead">
        O Estrelar apresenta os conceitos em pequenas lições para que você aprenda aos poucos, sem
        precisar entender tudo de uma vez.
      </p>

      <ul className="landing-learning__grid">
        {featuredThemes.map((lesson) => (
          <li key={lesson.id} className="landing-learning__item">
            <h3 className="landing-learning__item-title">{lesson.title}</h3>
            <p className="landing-learning__item-text">{lesson.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
