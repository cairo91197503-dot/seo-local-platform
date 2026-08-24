import type { ReactElement } from 'react'

const STAR_POINTS =
  '100,15 124.7,66 180.8,73.7 140,113 150,168.8 100,142 50,168.8 60,113 19.2,73.7 75.3,66'

export type MascotPose = 'neutral' | 'celebrating' | 'thinking'

type MascotProps = {
  /** Estado emocional da mascote "Estrelo" (ver docs/06-DESIGN-SYSTEM.md). */
  pose?: MascotPose
  /** Largura/altura em px (a arte é quadrada). */
  size?: number
  /** Texto acessível. Por padrão, descreve o estado da mascote. */
  label?: string
  className?: string
}

const DEFAULT_LABELS: Record<MascotPose, string> = {
  neutral: 'Mascote Estrelo, à vontade',
  celebrating: 'Mascote Estrelo comemorando',
  thinking: 'Mascote Estrelo pensando',
}

function NeutralFace(): ReactElement {
  return (
    <>
      <circle cx="82" cy="98" r="7" fill="var(--color-ink)" />
      <circle cx="118" cy="98" r="7" fill="var(--color-ink)" />
      <path
        d="M 82 118 Q 100 132 118 118"
        stroke="var(--color-ink)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="70" cy="110" rx="8" ry="5" fill="var(--color-ink)" opacity="0.12" />
      <ellipse cx="130" cy="110" rx="8" ry="5" fill="var(--color-ink)" opacity="0.12" />
    </>
  )
}

function CelebratingFace(): ReactElement {
  return (
    <>
      <line
        x1="50"
        y1="120"
        x2="20"
        y2="80"
        stroke="var(--color-ink)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="150"
        y1="120"
        x2="180"
        y2="80"
        stroke="var(--color-ink)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 78 100 Q 82 92 86 100"
        stroke="var(--color-ink)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 114 100 Q 118 92 122 100"
        stroke="var(--color-ink)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 78 116 Q 100 138 122 116"
        stroke="var(--color-ink)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 30 40 L 34 50 L 44 54 L 34 58 L 30 68 L 26 58 L 16 54 L 26 50 Z"
        fill="var(--color-accent-growth)"
      />
      <path
        d="M 165 30 L 168 38 L 176 41 L 168 44 L 165 52 L 162 44 L 154 41 L 162 38 Z"
        fill="var(--color-accent-growth)"
      />
    </>
  )
}

function ThinkingFace(): ReactElement {
  return (
    <>
      <g transform="rotate(-6 100 100)">
        <circle cx="82" cy="100" r="6" fill="var(--color-ink)" />
        <circle cx="118" cy="96" r="6" fill="var(--color-ink)" />
        <path
          d="M 88 122 Q 100 118 112 120"
          stroke="var(--color-ink)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <circle cx="150" cy="55" r="4" fill="var(--color-ink)" opacity="0.35" />
      <circle cx="160" cy="68" r="3" fill="var(--color-ink)" opacity="0.25" />
    </>
  )
}

const FACES: Record<MascotPose, () => ReactElement> = {
  neutral: NeutralFace,
  celebrating: CelebratingFace,
  thinking: ThinkingFace,
}

/**
 * Mascote "Estrelo" (nome de trabalho — ver docs/06-DESIGN-SYSTEM.md).
 * Nasce do símbolo de avaliação (estrela) em vez de um bicho genérico.
 */
export function Mascot({ pose = 'neutral', size = 96, label, className }: MascotProps) {
  const Face = FACES[pose]
  const accessibleLabel = label ?? DEFAULT_LABELS[pose]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label={accessibleLabel}
      className={className}
    >
      <polygon
        points={STAR_POINTS}
        fill="var(--color-accent-star)"
        stroke="var(--color-ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <Face />
    </svg>
  )
}
