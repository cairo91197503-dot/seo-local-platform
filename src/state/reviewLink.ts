/**
 * Configuração do link de avaliação (e o QR Code derivado dele) — ver
 * `docs/12-ESPECIFICACAO-MVP.md`, seção "Link e QR Code para avaliações".
 *
 * Regras da especificação encapsuladas aqui:
 * - Validação é só presença + formato de URL válida (`isValidReviewLinkUrl`).
 *   Isso NÃO confirma propriedade, perfil associado, destino final ou
 *   vínculo com o Google — só que o texto parece uma URL utilizável.
 * - Atualizar o link substitui a configuração atual (não há histórico).
 * - Nenhuma ação aqui concede XP nem confirma que uma avaliação foi
 *   solicitada — isso é responsabilidade da missão `request-first-review`,
 *   que segue com confirmação manual separada.
 *
 * Persistência: localStorage, mesmo padrão de `state/journey.ts` (chave
 * própria e versionada). Ainda não há um schema de Firestore decidido para
 * estado de progresso/configuração (ver `src/lib/auth/userProfile.ts`), então
 * manter o mesmo mecanismo já usado no resto do app evita introduzir uma
 * decisão de arquitetura nova sem pedido explícito.
 */

export const REVIEW_LINK_STORAGE_KEY = 'estrelar-review-link-v1'

export type ReviewLinkState = {
  version: 1
  url: string | null
  configuredAt: string | null
}

const INITIAL_STATE: ReviewLinkState = {
  version: 1,
  url: null,
  configuredAt: null,
}

function isReviewLinkState(value: unknown): value is ReviewLinkState {
  if (!value || typeof value !== 'object') {
    return false
  }

  const state = value as Partial<ReviewLinkState>
  return (
    state.version === 1 &&
    (state.url === null || typeof state.url === 'string') &&
    (state.configuredAt === null || typeof state.configuredAt === 'string')
  )
}

export function getInitialReviewLinkState(): ReviewLinkState {
  return { ...INITIAL_STATE }
}

export function readReviewLink(): ReviewLinkState {
  if (typeof window === 'undefined') {
    return getInitialReviewLinkState()
  }

  try {
    const stored = window.localStorage.getItem(REVIEW_LINK_STORAGE_KEY)
    if (!stored) {
      return getInitialReviewLinkState()
    }

    const parsed: unknown = JSON.parse(stored)
    return isReviewLinkState(parsed) ? parsed : getInitialReviewLinkState()
  } catch {
    return getInitialReviewLinkState()
  }
}

export function persistReviewLink(state: ReviewLinkState): boolean {
  try {
    window.localStorage.setItem(REVIEW_LINK_STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}

/**
 * Só verifica presença e formato de URL válida (`http`/`https`) — a
 * especificação é explícita que isso não confirma propriedade, perfil
 * associado, destino final ou vínculo real com o Google.
 */
export function isValidReviewLinkUrl(value: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) {
    return false
  }

  try {
    const parsed = new URL(trimmed)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/**
 * Substitui a configuração atual por uma nova URL válida. Retorna o estado
 * inalterado se a URL não passar na validação básica — quem chama deve
 * checar `isValidReviewLinkUrl` separadamente para dar feedback ao usuário.
 */
export function setReviewLink(url: string): ReviewLinkState | null {
  const trimmed = url.trim()
  if (!isValidReviewLinkUrl(trimmed)) {
    return null
  }

  return {
    version: 1,
    url: trimmed,
    configuredAt: new Date().toISOString(),
  }
}

export function clearReviewLink(): ReviewLinkState {
  return getInitialReviewLinkState()
}
