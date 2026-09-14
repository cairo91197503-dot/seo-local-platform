/**
 * Seção de gamificação (Etapa 2). Mostra XP e níveis — recursos reais do
 * Free, ver `src/state/journey.ts` (`getJourneyLevel`).
 *
 * Os 4 nomes de nível abaixo são cópia literal dos retornados por
 * `getJourneyLevel` ('Início', 'Fundamentos', 'Em prática', 'Em evolução').
 * Mantidos como texto próprio (em vez de importar `journey.ts`) de propósito:
 * a Landing é pública e não deve acoplar sua área de marketing à lógica de
 * usuário autenticado — mesmo princípio já usado pelos números de
 * `TRUST_ITEMS` em `LandingPage.tsx`. Se os nomes de nível mudarem em
 * `journey.ts`, atualize esta lista junto.
 *
 * REGRA DESTA ETAPA: não mencionar "sequência", "streak" ou "dias
 * seguidos" — há uma pendência conhecida na exibição de sequência no app
 * (`HomePage.tsx`), então a Landing não reproduz essa informação. Também não
 * inventar conquistas, medalhas ou sistemas que ainda não existem.
 */
const JOURNEY_LEVELS = ['Início', 'Fundamentos', 'Em prática', 'Em evolução']

export function GamificationSection() {
  return (
    <section className="landing-section" aria-labelledby="landing-gamification-title">
      <h2 id="landing-gamification-title" className="landing-section__title">
        Cada ação conta.
      </h2>
      <p className="landing-section__lead">
        Conforme você avança pelas lições e missões, acumula XP e acompanha seu progresso na
        jornada.
      </p>

      <div className="landing-gamification__visual">
        <p className="landing-gamification__xp-label">XP</p>
        <ol className="landing-gamification__levels">
          {JOURNEY_LEVELS.map((level) => (
            <li key={level} className="landing-gamification__level">
              {level}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
