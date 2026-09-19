import { useEffect, useId, useState } from 'react'
import QRCode from 'qrcode'
import {
  clearReviewLink,
  isValidReviewLinkUrl,
  persistReviewLink,
  readReviewLink,
  setReviewLink,
  type ReviewLinkState,
} from '../state/reviewLink'

const QR_COLOR_DARK = '#2a2420'

export function ToolsPage() {
  const [reviewLink, setReviewLinkState] = useState<ReviewLinkState>(readReviewLink)
  const [inputValue, setInputValue] = useState(reviewLink.url ?? '')
  const [formError, setFormError] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [qrError, setQrError] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'copied' | 'failed'>('idle')
  const inputId = useId()

  useEffect(() => {
    if (!reviewLink.url) {
      return
    }

    let cancelled = false

    QRCode.toDataURL(reviewLink.url, {
      width: 512,
      margin: 2,
      color: { dark: QR_COLOR_DARK, light: '#ffffffff' },
    })
      .then((dataUrl) => {
        if (!cancelled) {
          setQrDataUrl(dataUrl)
          setQrError(false)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setQrDataUrl(null)
          setQrError(true)
        }
      })

    return () => {
      cancelled = true
    }
  }, [reviewLink.url])

  useEffect(() => {
    if (copyFeedback === 'idle') {
      return
    }
    const timeout = window.setTimeout(() => setCopyFeedback('idle'), 2500)
    return () => window.clearTimeout(timeout)
  }, [copyFeedback])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidReviewLinkUrl(inputValue)) {
      setFormError('Isso não parece um link válido. Cole o endereço completo, começando com https://')
      return
    }

    const next = setReviewLink(inputValue)
    if (!next) {
      setFormError('Isso não parece um link válido. Cole o endereço completo, começando com https://')
      return
    }

    setFormError(null)
    setReviewLinkState(next)
    persistReviewLink(next)
  }

  const handleChangeLink = () => {
    const cleared = clearReviewLink()
    setReviewLinkState(cleared)
    persistReviewLink(cleared)
    setInputValue('')
    setFormError(null)
  }

  const handleCopy = async () => {
    if (!reviewLink.url) {
      return
    }

    try {
      await navigator.clipboard.writeText(reviewLink.url)
      setCopyFeedback('copied')
    } catch {
      setCopyFeedback('failed')
    }
  }

  const handleDownload = () => {
    if (!qrDataUrl) {
      return
    }

    const link = document.createElement('a')
    link.href = qrDataUrl
    link.download = 'qr-code-avaliacoes-estrelar.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="tools-page">
      <header className="tools-page__header">
        <h1 className="page__title">Ferramentas</h1>
        <p className="page__description">Recursos úteis para o dia a dia do seu negócio.</p>
      </header>

      <section className="home-block" aria-labelledby="review-link-tool-title">
        <h2 id="review-link-tool-title" className="home-block__subtitle">
          Link e QR Code para avaliações
        </h2>

        {reviewLink.url ? (
          <>
            <p className="home-block__text">
              Use o QR Code ou o link abaixo para facilitar o pedido de avaliação: o cliente aponta a
              câmera do celular ou clica no link, e cai direto na tela de avaliação do seu negócio no
              Google.
            </p>

            {qrDataUrl ? (
              <div className="review-link-qr">
                <img
                  src={qrDataUrl}
                  alt="QR Code que leva para o link de avaliação configurado"
                  width={220}
                  height={220}
                  className="review-link-qr__image"
                />
              </div>
            ) : qrError ? (
              <p className="review-link-tool__notice" role="alert">
                Não foi possível gerar o QR Code para este link agora. O link abaixo continua
                funcionando normalmente.
              </p>
            ) : null}

            <p className="review-link-tool__url">
              <span className="review-link-tool__url-label">Link configurado:</span>{' '}
              <span className="review-link-tool__url-value">{reviewLink.url}</span>
            </p>

            <div className="review-link-tool__actions">
              <button type="button" className="home-block__button" onClick={handleCopy}>
                {copyFeedback === 'copied' ? 'Link copiado!' : 'Copiar link'}
              </button>
              <button
                type="button"
                className="quick-access__button"
                onClick={handleDownload}
                disabled={!qrDataUrl}
              >
                Baixar QR Code
              </button>
              <button type="button" className="quick-access__button" onClick={handleChangeLink}>
                Trocar link
              </button>
            </div>

            {copyFeedback === 'failed' ? (
              <p className="review-link-tool__notice" role="alert">
                Não consegui copiar automaticamente. Selecione o link acima e copie manualmente.
              </p>
            ) : null}

            <p className="message-example__note">
              O Estrelar só confere se isso é um link válido — não confirma se ele é o perfil correto
              do seu negócio no Google, nem verifica se alguma avaliação foi realmente enviada.
            </p>
          </>
        ) : (
          <>
            <p className="home-block__text">
              Configure o link de avaliação do seu Perfil da Empresa no Google para gerar um QR Code
              pronto para imprimir ou compartilhar com seus clientes.
            </p>

            <p className="review-link-tool__help">
              Não sabe onde encontrar esse link? Abra o Perfil da Empresa no Google, toque em "Peça
              avaliações" (ou "Compartilhar perfil") e copie o link mostrado lá.
            </p>

            <form className="review-link-tool__form" onSubmit={handleSubmit}>
              <label htmlFor={inputId} className="review-link-tool__label">
                Link de avaliação
              </label>
              <input
                id={inputId}
                type="url"
                inputMode="url"
                placeholder="https://g.page/r/..."
                className="review-link-tool__input"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value)
                  if (formError) {
                    setFormError(null)
                  }
                }}
                aria-invalid={formError ? true : undefined}
                aria-describedby={formError ? `${inputId}-error` : undefined}
              />
              {formError ? (
                <p id={`${inputId}-error`} className="review-link-tool__error" role="alert">
                  {formError}
                </p>
              ) : null}
              <button type="submit" className="home-block__button">
                Gerar QR Code
              </button>
            </form>

            <p className="review-link-tool__note">
              Sem um link configurado, esta ferramenta fica indisponível — mas as lições e missões
              continuam funcionando normalmente.
            </p>
          </>
        )}
      </section>
    </div>
  )
}
