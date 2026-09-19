import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Mascot } from '../mascot/Mascot'
import styles from './ErrorBoundary.module.css'

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary capturou:', error, info.componentStack)
  }

  private handleReset = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.root}>
          <Mascot pose="thinking" size={88} />
          <h1 className={styles.title}>Algo deu errado</h1>
          <p className={styles.description}>
            Ocorreu um erro inesperado. Tente recarregar a pagina ou volte para o inicio.
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.button}
              onClick={this.handleReset}
            >
              Tentar novamente
            </button>
            <a href="/" className={styles.link}>
              Voltar para o inicio
            </a>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
