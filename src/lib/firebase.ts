import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

/**
 * Inicialização do Firebase para o app React.
 *
 * Os valores de configuração vêm exclusivamente de variáveis de ambiente
 * (`VITE_FIREBASE_*`, lidas pelo Vite e expostas via `import.meta.env`).
 * Nenhum valor é fixado no código-fonte.
 *
 * Importante: a configuração web do Firebase (apiKey, projectId etc.) não é
 * um segredo — ela é pública por design; a proteção real dos dados vem das
 * regras de segurança do Firestore (`firestore.rules`), não do sigilo desses
 * valores. Mesmo assim, seguimos o padrão do projeto de nunca fixar valores
 * de configuração de ambiente diretamente no código (`docs/04-REGRAS.md`,
 * seção "Segurança").
 *
 * Nenhum projeto Firebase real foi criado ainda — ver `docs/05-BANCO-DE-DADOS.md`
 * e `.ai/context.md` para o que depende de ação humana antes deste código
 * funcionar de fato.
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
      `Configuração do Firebase incompleta. Defina estas variáveis de ambiente (veja .env.example): ${missingEnvVars}`,
    )
  }

  return config
}

let app: FirebaseApp | undefined
let auth: Auth | undefined
let firestore: Firestore | undefined

/** Retorna a instância única do app Firebase, inicializando na primeira chamada. */
export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    const existingApps = getApps()
    app = existingApps.length > 0 ? existingApps[0] : initializeApp(readFirebaseConfig())
  }

  return app
}

/** Retorna a instância única do Firebase Authentication. */
export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
  }

  return auth
}

/** Retorna a instância única do Firestore. */
export function getFirebaseFirestore(): Firestore {
  if (!firestore) {
    firestore = getFirestore(getFirebaseApp())
  }

  return firestore
}
