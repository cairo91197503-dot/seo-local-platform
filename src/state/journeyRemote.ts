import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getFirebaseFirestore } from '../lib/firebase'
import { isJourneyState, type JourneyState } from './journey'

/**
 * Persistência do progresso da jornada no Firestore, por conta (resolve a
 * `DECISÃO NECESSÁRIA` "persistência de progresso" de
 * `docs/08-ARQUITETURA-PEDAGOGICA.md`, no que depende de mecanismo técnico —
 * o formato definitivo de XP/missão/quiz continua em aberto).
 *
 * Documento único por usuário em `users/{uid}/progress/journey`, separado do
 * documento de identidade (`users/{uid}`, ver `userProfile.ts`) para que
 * escritas de progresso (frequentes) nunca concorram com escritas de perfil
 * (raras). Ver `docs/05-BANCO-DE-DADOS.md` e `firestore.rules`.
 */

function getJourneyProgressRef(uid: string) {
  return doc(getFirebaseFirestore(), 'users', uid, 'progress', 'journey')
}

/**
 * Busca o progresso salvo da conta. Retorna `null` quando ainda não existe
 * documento (conta nova neste dispositivo/funcionalidade) ou quando o
 * conteúdo salvo não tem o formato esperado (defensivo, mesmo padrão de
 * `readJourney`).
 */
export async function fetchJourneyProgress(uid: string): Promise<JourneyState | null> {
  const snapshot = await getDoc(getJourneyProgressRef(uid))
  if (!snapshot.exists()) {
    return null
  }

  const data: unknown = snapshot.data()
  return isJourneyState(data) ? data : null
}

/**
 * Salva o progresso da conta. Sobrescreve o documento inteiro (em vez de
 * `merge: true`): o progresso é sempre computado como um objeto completo
 * (`JourneyState`), então não há campos parciais a preservar, e isso evita
 * que um formato antigo deixe campos órfãos depois de uma mudança de forma.
 *
 * Best-effort: chamado em modo "fire-and-forget" por quem grava (ver
 * `JourneyProvider`), sem bloquear a interface nem interromper o fluxo do
 * usuário se falhar (ex.: offline) — mesmo padrão de `upsertUserProfile`.
 */
export async function saveJourneyProgress(uid: string, journey: JourneyState): Promise<void> {
  await setDoc(getJourneyProgressRef(uid), { ...journey, updatedAt: serverTimestamp() })
}
