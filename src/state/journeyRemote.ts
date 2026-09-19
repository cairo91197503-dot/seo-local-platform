import { loadFirestoreHelpers } from '../lib/firebase'
import { isJourneyState, type JourneyState } from './journey'

/**
 * Persistencia do progresso da jornada no Firestore, por conta.
 *
 * Documento unico por usuario em users/{uid}/progress/journey, separado do
 * documento de identidade (users/{uid}, ver userProfile.ts) para que
 * escritas de progresso (frequentes) nunca concorram com escritas de perfil
 * (raras).
 */

async function getJourneyProgressRef(uid: string, helpers: Awaited<ReturnType<typeof loadFirestoreHelpers>>) {
  return helpers.doc(helpers.firestore, 'users', uid, 'progress', 'journey')
}

/**
 * Busca o progresso salvo da conta. Retorna null quando ainda nao existe
 * documento ou quando o conteudo salvo nao tem o formato esperado.
 */
export async function fetchJourneyProgress(uid: string): Promise<JourneyState | null> {
  const helpers = await loadFirestoreHelpers()
  const ref = await getJourneyProgressRef(uid, helpers)
  const snapshot = await helpers.getDoc(ref)
  if (!snapshot.exists()) {
    return null
  }

  const data: unknown = snapshot.data()
  return isJourneyState(data) ? data : null
}

/**
 * Salva o progresso da conta. Sobrescreve o documento inteiro.
 * Best-effort: chamado em modo fire-and-forget por quem grava.
 */
export async function saveJourneyProgress(uid: string, journey: JourneyState): Promise<void> {
  const helpers = await loadFirestoreHelpers()
  const ref = await getJourneyProgressRef(uid, helpers)
  await helpers.setDoc(ref, { ...journey, updatedAt: helpers.serverTimestamp() })
}
