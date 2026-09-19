import { Link } from 'react-router-dom'

export function PrivacyPolicyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-page__header">
        <h1 className="page__title">Política de Privacidade</h1>
        <p className="page__description">
          Última atualização: 19 de setembro de 2026
        </p>
      </header>

      <section className="home-block">
        <h2 className="home-block__title">1. Dados que coletamos</h2>
        <p className="home-block__text">
          Quando você faz login com o Google, coletamos apenas as seguintes
          informações básicas do seu perfil Google:
        </p>
        <ul className="privacy-list">
          <li>Nome completo</li>
          <li>Endereço de e-mail</li>
          <li>Foto de perfil</li>
        </ul>
        <p className="home-block__text">
          Também coletamos dados de uso do app, como:
        </p>
        <ul className="privacy-list">
          <li>Progresso nas lições e missões (XP, níveis, conclusões)</li>
          <li>Configurações do negócio (nome e segmento, informados por você no onboarding)</li>
          <li>Link de avaliação que você cadastra na ferramenta</li>
        </ul>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">2. Como usamos seus dados</h2>
        <p className="home-block__text">
          Seus dados são utilizados exclusivamente para:
        </p>
        <ul className="privacy-list">
          <li>Permitir o acesso ao app e salvar seu progresso entre dispositivos</li>
          <li>Personalizar sua experiência de aprendizado</li>
          <li>Gerar o QR Code e link de avaliação na ferramenta</li>
        </ul>
        <p className="home-block__text">
          <strong>Não vendemos, compartilhamos ou compartilhamos seus dados com
          terceiros para fins de marketing ou publicidade.</strong>
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">3. Armazenamento e segurança</h2>
        <p className="home-block__text">
          Seus dados são armazenados no Firebase (Google Cloud), na região
          <strong> southamerica-east1</strong> (São Paulo). Utilizamos:
        </p>
        <ul className="privacy-list">
          <li>Autenticacao via Google OAuth (login seguro)</li>
          <li>Firestore com regras de seguranca que garantem que apenas voce
            acessa seus proprios dados</li>
          <li>HTTPS em todas as comunicacoes</li>
        </ul>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">4. Seus direitos</h2>
        <p className="home-block__text">
          Voce pode, a qualquer momento:
        </p>
        <ul className="privacy-list">
          <li>Solicitar uma copia de todos os seus dados armazenados</li>
          <li>Solicitar a exclusao permanente de sua conta e dados</li>
          <li>Desconectar sua conta Google do app</li>
        </ul>
        <p className="home-block__text">
          Para exercer esses direitos, entre em contato pelo e-mail:{' '}
          <strong>estrelar.app@gmail.com</strong>
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">5. Cookies e armazenamento local</h2>
        <p className="home-block__text">
          O app utiliza armazenamento local do navegador (localStorage) para
          guardar configuracoes e缓存 de dados. Nenhum cookie de rastreamento
          e utilizado.
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">6. Serviços de terceiros</h2>
        <p className="home-block__text">
          Utilizamos os seguintes servicos do Google:
        </p>
        <ul className="privacy-list">
          <li><strong>Firebase Authentication</strong> — login com Google</li>
          <li><strong>Cloud Firestore</strong> — armazenamento de dados</li>
          <li><strong>Firebase Hosting</strong> — hospedagem do app</li>
        </ul>
        <p className="home-block__text">
          Para mais informacoes sobre como o Google trata dados, consulte a
          Politica de Privacidade do Google:{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://policies.google.com/privacy
          </a>
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">7. Menores de idade</h2>
        <p className="home-block__text">
          O Estrelar e destinado a adultos (maiores de 18 anos) que sao donos
          ou responsaveis por pequenos negocios. Nao coletamos intencionalmente
          dados de menores de 18 anos.
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">8. Alterações nesta política</h2>
        <p className="home-block__text">
          Esta política pode ser atualizada periodicamente. Alterações
          significativas serão comunicadas dentro do app.
        </p>
      </section>

      <section className="home-block">
        <h2 className="home-block__title">9. Contato</h2>
        <p className="home-block__text">
          Em caso de dúvidas sobre esta política ou sobre seus dados, entre em
          contato: <strong>estrelar.app@gmail.com</strong>
        </p>
      </section>

      <footer className="privacy-page__footer">
        <Link className="home-block__button" to="/">
          Voltar para o início
        </Link>
      </footer>
    </main>
  )
}
