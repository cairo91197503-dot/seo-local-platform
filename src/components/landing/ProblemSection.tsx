/**
 * Seção "problema" da Landing Page pública (Etapa 2 — parte central de
 * conteúdo). Objetivo: gerar identificação com o pequeno empresário sem
 * prometer resultado ("mais clientes", "primeiro lugar" etc.) — regra
 * explícita desta etapa, ver relatório entregue ao usuário.
 */
export function ProblemSection() {
  return (
    <section className="landing-section" aria-labelledby="landing-problem-title">
      <h2 id="landing-problem-title" className="landing-section__title">
        Você sabe que seu negócio precisa estar bem cuidado no Google. Mas por onde começar?
      </h2>
      <p className="landing-section__lead">
        Muitos pequenos negócios sabem que o Perfil da Empresa no Google é importante, mas não
        sabem exatamente o que fazer, em que ordem fazer ou como transformar informação em ação.
      </p>
      <p className="landing-section__lead">
        O Estrelar organiza esse aprendizado em passos simples e práticos.
      </p>
    </section>
  )
}
