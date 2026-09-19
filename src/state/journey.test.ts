import { describe, it, expect } from 'vitest'
import {
  getInitialJourneyState,
  getJourneyLevel,
  isLessonCompleted,
  getMissionStatus,
  getCurrentMissionState,
  getNextAction,
  completeOnboarding,
  completeLesson,
  startMission,
  declareMissionAction,
  confirmMission,
  isJourneyState,
  CURRICULUM,
  type JourneyState,
} from './journey'

function makeJourney(overrides: Partial<JourneyState> = {}): JourneyState {
  return { ...getInitialJourneyState(), ...overrides }
}

describe('getInitialJourneyState', () => {
  it('retorna estado inicial válido', () => {
    const state = getInitialJourneyState()
    expect(state.version).toBe(2)
    expect(state.onboardingCompleted).toBe(false)
    expect(state.completedLessonIds).toEqual([])
    expect(state.missionStatuses).toEqual({})
    expect(state.xp).toBe(0)
    expect(state.awardedMilestoneIds).toEqual([])
  })
})

describe('isJourneyState', () => {
  it('aceita estado válido', () => {
    expect(isJourneyState(getInitialJourneyState())).toBe(true)
  })

  it('rejeita null', () => {
    expect(isJourneyState(null)).toBe(false)
  })

  it('rejeita objeto com version errada', () => {
    expect(isJourneyState({ ...getInitialJourneyState(), version: 1 })).toBe(false)
  })

  it('rejeita xp negativo', () => {
    expect(isJourneyState({ ...getInitialJourneyState(), xp: -5 })).toBe(false)
  })

  it('rejeita completedLessonIds que não é array', () => {
    expect(isJourneyState({ ...getInitialJourneyState(), completedLessonIds: 'no' })).toBe(false)
  })
})

describe('getJourneyLevel', () => {
  it('retorna Início para xp < 20', () => {
    expect(getJourneyLevel(0)).toBe('Início')
    expect(getJourneyLevel(19)).toBe('Início')
  })

  it('retorna Fundamentos para xp 20-39', () => {
    expect(getJourneyLevel(20)).toBe('Fundamentos')
    expect(getJourneyLevel(39)).toBe('Fundamentos')
  })

  it('retorna Em prática para xp 40-69', () => {
    expect(getJourneyLevel(40)).toBe('Em prática')
    expect(getJourneyLevel(69)).toBe('Em prática')
  })

  it('retorna Em evolução para xp >= 70', () => {
    expect(getJourneyLevel(70)).toBe('Em evolução')
    expect(getJourneyLevel(200)).toBe('Em evolução')
  })
})

describe('isLessonCompleted', () => {
  it('retorna false quando lição não foi concluída', () => {
    const j = makeJourney()
    expect(isLessonCompleted(j, 'why-appear-in-local-search')).toBe(false)
  })

  it('retorna true quando lição foi concluída', () => {
    const j = makeJourney({ completedLessonIds: ['why-appear-in-local-search'] })
    expect(isLessonCompleted(j, 'why-appear-in-local-search')).toBe(true)
  })
})

describe('getMissionStatus', () => {
  it('retorna locked por padrão', () => {
    const j = makeJourney()
    expect(getMissionStatus(j, 'discover-search-presence')).toBe('locked')
  })

  it('retorna status correto quando existe', () => {
    const j = makeJourney({
      missionStatuses: { 'discover-search-presence': 'available' },
    })
    expect(getMissionStatus(j, 'discover-search-presence')).toBe('available')
  })
})

describe('completeOnboarding', () => {
  it('marca onboarding como completo', () => {
    const j = makeJourney()
    const result = completeOnboarding(j)
    expect(result.onboardingCompleted).toBe(true)
  })

  it('não altera estado se já completou', () => {
    const j = makeJourney({ onboardingCompleted: true })
    const result = completeOnboarding(j)
    expect(result).toBe(j)
  })
})

describe('completeLesson', () => {
  it('adiciona lição à lista de concluídas', () => {
    const j = makeJourney({ onboardingCompleted: true })
    const result = completeLesson(j, 'why-appear-in-local-search')
    expect(result.completedLessonIds).toContain('why-appear-in-local-search')
  })

  it('concede XP de lição', () => {
    const j = makeJourney({ onboardingCompleted: true })
    const result = completeLesson(j, 'why-appear-in-local-search')
    expect(result.xp).toBe(20)
  })

  it('desbloqueia missão associada', () => {
    const j = makeJourney({ onboardingCompleted: true })
    const result = completeLesson(j, 'why-appear-in-local-search')
    expect(result.missionStatuses['discover-search-presence']).toBe('available')
  })

  it('não concede XP duas vezes para a mesma lição', () => {
    const j = makeJourney({
      onboardingCompleted: true,
      completedLessonIds: ['why-appear-in-local-search'],
    })
    const result = completeLesson(j, 'why-appear-in-local-search')
    expect(result.xp).toBe(0)
  })
})

describe('startMission', () => {
  it('muda status de available para in_progress', () => {
    const j = makeJourney({
      missionStatuses: { 'discover-search-presence': 'available' },
    })
    const result = startMission(j, 'discover-search-presence')
    expect(result.missionStatuses['discover-search-presence']).toBe('in_progress')
  })

  it('não altera se missão não está available', () => {
    const j = makeJourney()
    const result = startMission(j, 'discover-search-presence')
    expect(result.missionStatuses['discover-search-presence']).toBeUndefined()
  })
})

describe('declareMissionAction', () => {
  it('muda status de in_progress para action_completed', () => {
    const j = makeJourney({
      missionStatuses: { 'discover-search-presence': 'in_progress' },
    })
    const result = declareMissionAction(j, 'discover-search-presence')
    expect(result.missionStatuses['discover-search-presence']).toBe('action_completed')
  })
})

describe('confirmMission', () => {
  it('conclui missão e concede XP', () => {
    const secondMissionId = CURRICULUM[1]?.missionId
    if (!secondMissionId) return

    const j = makeJourney({
      missionStatuses: { [secondMissionId]: 'action_completed' },
    })
    const result = confirmMission(j, secondMissionId)
    expect(result.missionStatuses[secondMissionId]).toBe('completed')
    expect(result.xp).toBe(40)
  })

  it('concede bônus de jornada inicial na primeira missão', () => {
    const firstMissionId = CURRICULUM[0]?.missionId
    if (!firstMissionId) return

    const j = makeJourney({
      missionStatuses: { [firstMissionId]: 'action_completed' },
    })
    const result = confirmMission(j, firstMissionId)
    expect(result.xp).toBe(40 + 10)
    expect(result.awardedMilestoneIds).toContain('journey:initial:completed')
  })

  it('não concede bônus inicial em missões seguintes', () => {
    const secondMissionId = CURRICULUM[1]?.missionId
    if (!secondMissionId) return

    const j = makeJourney({
      missionStatuses: { [secondMissionId]: 'action_completed' },
    })
    const result = confirmMission(j, secondMissionId)
    expect(result.awardedMilestoneIds).not.toContain('journey:initial:completed')
  })
})

describe('getCurrentMissionState', () => {
  it('retorna locked para primeira lição não concluída', () => {
    const j = makeJourney({ onboardingCompleted: true })
    const result = getCurrentMissionState(j)
    expect(result.kind).toBe('locked')
  })

  it('retorna mission quando lição concluída mas missão não', () => {
    const j = makeJourney({
      onboardingCompleted: true,
      completedLessonIds: ['why-appear-in-local-search'],
      missionStatuses: { 'discover-search-presence': 'available' },
    })
    const result = getCurrentMissionState(j)
    expect(result.kind).toBe('mission')
  })

  it('retorna all-done quando tudo concluído', () => {
    const completedLessons = CURRICULUM.map((item) => item.lessonId)
    const completedMissions = CURRICULUM.reduce(
      (acc, item) => ({ ...acc, [item.missionId]: 'completed' as const }),
      {} as Record<string, 'completed'>,
    )
    const j = makeJourney({
      onboardingCompleted: true,
      completedLessonIds: completedLessons,
      missionStatuses: completedMissions,
    })
    const result = getCurrentMissionState(j)
    expect(result.kind).toBe('all-done')
  })
})

describe('getNextAction', () => {
  it('retorna onboarding quando não completou', () => {
    const j = makeJourney()
    const result = getNextAction(j)
    expect(result.to).toBe('/onboarding')
  })

  it('retorna lição quando há lição pendente', () => {
    const j = makeJourney({ onboardingCompleted: true })
    const result = getNextAction(j)
    expect(result.to).toBe(`/licao/${CURRICULUM[0]?.lessonId}`)
  })

  it('retorna missão quando disponível', () => {
    const j = makeJourney({
      onboardingCompleted: true,
      completedLessonIds: ['why-appear-in-local-search'],
      missionStatuses: { 'discover-search-presence': 'available' },
    })
    const result = getNextAction(j)
    expect(result.to).toBe('/missoes')
  })
})
