export type MissionCatalogItem = {
  id: string
  title: string
  difficulty: string
  reward: string
  objective: string
  explanation: string
  steps: string[]
  /** Pergunta exibida na etapa final, antes de declarar a ação como realizada. */
  confirmationPrompt: string
  /**
   * Exemplo de mensagem pronta (ex.: para pedir uma avaliação a um cliente).
   * Opcional — nem toda missão envolve mandar uma mensagem para alguém.
   */
  messageExample?: string
  messageExampleNote?: string
}
