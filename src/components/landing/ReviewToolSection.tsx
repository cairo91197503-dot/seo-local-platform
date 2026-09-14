/**
 * Seção da ferramenta de link/QR Code para avaliações (Etapa 2). A
 * ferramenta real vive em `src/pages/ToolsPage.tsx` + `src/state/reviewLink.ts`
 * (client-side, biblioteca `qrcode`, valida só formato de URL). Esta seção
 * só apresenta a funcionalidade visualmente, com um mockup decorativo em
 * CSS/HTML (sem gerar QR Code real nem reutilizar a lógica interna da
 * ferramenta) — conforme a regra explícita desta etapa: "se isso exigir
 * alterar lógica interna da ferramenta, NÃO faça nesta etapa".
 *
 * Nenhuma afirmação de coleta/publicação automática de avaliações,
 * acesso a dados privados do Google ou geração automática de link — a
 * ferramenta real só transforma um link que o próprio usuário fornece.
 *
 * `id="ferramentas"` (Etapa 3): âncora usada pela navegação do
 * `LandingFooter` — verificado que nenhum outro elemento da Landing usa
 * esse id.
 */
export function ReviewToolSection() {
  return (
    <section
      className="landing-section"
      id="ferramentas"
      aria-labelledby="landing-review-tool-title"
    >
      <div className="landing-review-tool__layout">
        <div className="landing-review-tool__content">
          <h2 id="landing-review-tool-title" className="landing-section__title landing-section__title--left">
            Transforme seu link de avaliação em um QR Code.
          </h2>
          <p className="landing-section__lead landing-section__lead--left">
            Com o link de avaliação do seu negócio em mãos, você pode gerar um QR Code para
            facilitar o acesso dos seus clientes à página de avaliação.
          </p>
          <p className="landing-review-tool__note">
            O Estrelar trabalha com o link que você mesmo informa — não coleta nem publica
            avaliações automaticamente, nem acessa dados privados do seu Perfil da Empresa no
            Google.
          </p>
        </div>

        <div className="landing-review-tool__visual" aria-hidden="true">
          <div className="landing-review-tool__mock-qr">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <p className="landing-review-tool__mock-caption">Peça uma avaliação</p>
        </div>
      </div>
    </section>
  )
}
