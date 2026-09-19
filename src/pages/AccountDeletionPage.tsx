import { Link } from 'react-router-dom'

export function AccountDeletionPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-page__header">
        <h1 className="page__title">Exclusão de Conta e Dados</h1>
        <p className="page__description">
          Como solicitar a exclusão da sua conta e dados no Estrelar
        </p>
      </header>

      <section className="home-block">
        <h2 className="home-block__title"> Como solicitar a exclusão</h2>
        <p className="home-block__text">
          Você pode solicitar a exclusão permanente da sua conta e de todos os
          seus dados a qualquer momento. Para isso, envie um e-mail para:
        </p>
        <p className="home-block__text">
          <strong>estrelar.app@gmail.com</strong>
        </p>
        <p className="home-block__text">
          Use o assunto: <strong>"Exclusão de conta - Estrelar"</strong>
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">Informações necessárias</h2>
        <p className="home-block__text">
          Para confirmar sua identidade, inclua no e-mail:
        </p>
        <ul className="home-block__list">
          <li>O e-mail associado à sua conta Google</li>
          <li>Seu nome completo</li>
        </ul>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">O que será excluído</h2>
        <p className="home-block__text">
          Ao confirmar a exclusão, todos os seguintes dados serão removidos
          permanentemente:
        </p>
        <ul className="home-block__list">
          <li>Perfil do usuário (nome, e-mail, foto)</li>
          <li>Progresso da jornada (lições concluídas, XP, nível)</li>
          <li>Dados de missões (status, conclusões)</li>
          <li>Link de avaliação cadastrado</li>
          <li>Configurações do negócio (nome, segmento)</li>
          <li>Dados de onboarding</li>
        </ul>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">Prazo</h2>
        <p className="home-block__text">
          A exclusão será processada em até <strong>30 dias</strong> após a
          confirmação do pedido. Você receberá um e-mail de confirmação quando
          a exclusão for concluída.
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">Dados mantidos</h2>
        <p className="home-block__text">
          Por razões legais ou de segurança, podemos manter cópias anonymizadas
          dos dados por até 90 dias após a exclusão, conforme necessário para
          cumprir obrigações legais ou prevenir fraudes.
        </p>
      </section>

      <footer className="privacy-page__footer">
        <Link className="home-block__button" to="/privacidade">
          Ver Política de Privacidade
        </Link>
      </footer>
    </main>
  )
}
