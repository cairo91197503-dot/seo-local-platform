import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

/**
 * Inicializacao do Firebase para o app React.
 *
 * Os valores de configuracao vem exclusivamente de variaveis de ambiente
 * (VITE_FIREBASE_*, lidas pelo Vite e expostas via import.meta.env).
 * Nenhum valor e fixado no codigo-fonte.
 *
 * firebase/firestore e carregado via dynamic import() para manter
 * ~180KB fora do bundle inicial (so necessario apos login).
 */

const ENV_VAR_NAMES = {
  apiKey: 'VITE_FIREBASE_API_KEY',
  authDomain: 'VITE_FIREBASE_AUTH_DOMAIN',
  projectId: 'VITE_FIREBASE_PROJECT_ID',
  storageBucket: 'VITE_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'VITE_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'VITE_FIREBASE_APP_ID',
} as const

function readFirebaseConfig() {
  const config = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  }

  const missingKeys = (Object.keys(config) as Array<keyof typeof config>).filter(
    (key) => !config[key],
  )

  if (missingKeys.length > 0) {
    const missingEnvVars = missingKeys.map((key) => ENV_VAR_NAMES[key]).join(', ')
    throw new Error(
      `Configuracao do Firebase incompleta. Defina estas variaveis de ambiente (veja .env.example): ${missingEnvVars}`,
    )
  }

  return config
}

let app: FirebaseApp | undefined
let auth: Auth | undefined

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    const existingApps = getApps()
    app = existingApps.length > 0 ? existingApps[0] : initializeApp(readFirebaseConfig())
  }

  return app
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
  }

  return auth
}

type FirestoreModule = typeof import('firebase/firestore')

let firestoreModulePromise: Promise<FirestoreModule> | null = null

function loadFirestoreModule(): Promise<FirestoreModule> {
  if (!firestoreModulePromise) {
    firestoreModulePromise = import('firebase/firestore')
  }
  return firestoreModulePromise
}

let firestoreInstancePromise: Promise<import('firebase/firestore').Firestore> | null = null

export async function getFirestoreInstance(): Promise<import('firebase/firestore').Firestore> {
  if (!firestoreInstancePromise) {
    firestoreInstancePromise = loadFirestoreModule().then(({ getFirestore }) =>
      getFirestore(getFirebaseApp()),
    )
  }
  return firestoreInstancePromise
}

export async function loadFirestoreHelpers() {
  const [firestore, mod] = await Promise.all([getFirestoreInstance(), loadFirestoreModule()])
  return {
    firestore,
    doc: mod.doc,
    getDoc: mod.getDoc,
    setDoc: mod.setDoc,
    serverTimestamp: mod.serverTimestamp,
  }
}
