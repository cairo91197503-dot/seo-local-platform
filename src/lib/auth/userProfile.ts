import type { User } from 'firebase/auth'
import { loadFirestoreHelpers } from '../firebase'

/**
 * Cria ou atualiza o documento de identidade do usuario em users/{uid}.
 * So dados de identidade/perfil basico do Firebase Authentication.
 *
 * createdAt so e gravado na primeira vez (documento nao existe ainda);
 * chamadas seguintes so atualizam os campos que podem mudar no Google.
 */
export async function upsertUserProfile(user: User): Promise<void> {
  const { firestore, doc, getDoc, setDoc, serverTimestamp } = await loadFirestoreHelpers()
  const ref = doc(firestore, 'users', user.uid)
  const existing = await getDoc(ref)

  const profile = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  }

  if (existing.exists()) {
    await setDoc(ref, profile, { merge: true })
  } else {
    await setDoc(ref, { ...profile, createdAt: serverTimestamp() })
  }
}

/**
 * Grava o nome e o segmento/ramo do negocio, coletados no onboarding.
 * Usa merge: true para so atualizar esses dois campos.
 */
export async function saveBusinessProfile(
  uid: string,
  data: { businessName: string; businessSegment: string },
): Promise<void> {
  const { firestore, doc, setDoc } = await loadFirestoreHelpers()
  const ref = doc(firestore, 'users', uid)
  await setDoc(ref, data, { merge: true })
}
