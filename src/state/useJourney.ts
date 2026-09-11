import { useContext } from 'react'
import { JourneyContext, type JourneyContextValue } from './journey-context'

export function useJourney(): JourneyContextValue {
  const journey = useContext(JourneyContext)
  if (!journey) throw new Error('useJourney deve ser usado dentro de JourneyProvider.')
  return journey
}
