import type { User } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getFirebaseFirestore } from '../firebase'

/**
 * Cria ou atualiza o documento de identidade do usuário em `users/{uid}`
 * (`docs/05-BANCO-DE-DADOS.md`): só dados de identidade/perfil básico do
 * Firebase Authentication. Progresso, XP e missões ficam de fora — formato
 * ainda é `DECISÃO NECESSÁRIA` pedagógica (`docs/08-ARQUITETURA-PEDAGOGICA.md`),
 * não devem ser inferidos aqui.
 *
 * `createdAt` só é gravado na primeira vez (documento não existe ainda);
 * chamadas seguintes (login em uma nova sessão) só atualizam os campos que
 * podem mudar no Google (nome, e-mail, foto).
 */
export async function upsertUserProfile(user: User): Promise<void> {
  const firestore = getFirebaseFirestore()
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
