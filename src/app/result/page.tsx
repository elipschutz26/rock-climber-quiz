import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

const resultImages: Record<ClimberType, string> = {
  Boulderer:                '/images/result-boulderer.jpg',
  'Sport Climber':          '/images/result-sport.jpg',
  'Trad Climber':           '/images/result-trad.jpg',
  'Multi-Pitch Adventurer': '/images/result-multipitch.jpg',
}

const resultThemes: Record<ClimberType, {
  bg: string
  ring: string
  badge: string
  glow: string
  divider: string
  btn: string
}> = {
  Boulderer: {
    bg:      'from-orange-950 via-stone-950 to-[#070d1a]',
    ring:    'ring-amber-500/40',
    badge:   'bg-amber-500/20 border-amber-400/30 text-amber-300',
    glow:    'drop-shadow-[0_0_28px_rgba(251,191,36,0.6)]',
    divider: 'via-amber-500',
    btn:     'from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600',
  },
  'Sport Climber': {
    bg:      'from-blue-950 via-slate-950 to-[#070d1a]',
    ring:    'ring-blue-500/40',
    badge:   'bg-blue-500/20 border-blue-400/30 text-blue-300',
    glow:    'drop-shadow-[0_0_28px_rgba(59,130,246,0.6)]',
    divider: 'via-blue-500',
    btn:     'from-blue-600 to-blue-900 hover:from-blue-500 hover:to-blue-800',
  },
  'Trad Climber': {
    bg:      'from-green-950 via-slate-950 to-[#070d1a]',
    ring:    'ring-emerald-500/40',
    badge:   'bg-emerald-500/20 border-emerald-400/30 text-emerald-300',
    glow:    'drop-shadow-[0_0_28px_rgba(52,211,153,0.6)]',
    divider: 'via-emerald-500',
    btn:     'from-emerald-700 to-green-900 hover:from-emerald-600 hover:to-green-800',
  },
  'Multi-Pitch Adventurer': {
    bg:      'from-indigo-950 via-slate-950 to-[#070d1a]',
    ring:    'ring-indigo-500/40',
    badge:   'bg-indigo-500/20 border-indigo-400/30 text-indigo-300',
    glow:    'drop-shadow-[0_0_28px_rgba(99,102,241,0.65)]',
    divider: 'via-indigo-500',
    btn:     'from-indigo-600 to-indigo-900 hover:from-indigo-500 hover:to-indigo-800',
  },
}

interface ResultPageProps {
  searchParams: { type?: string }
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const type = searchParams.type as ClimberType
  const result = resultDescriptions[type]
  const theme = resultThemes[type]
  const imageSrc = resultImages[type]

  if (!result) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-scene">
        <p className="text-slate-400 mb-4">Result not found.</p>
        <Link href="/quiz" className="text-indigo-400 underline hover:text-indigo-300">Retake the quiz</Link>
      </main>
    )
  }

  return (
    <main className={`min-h-screen bg-gradient-to-b ${theme.bg} flex flex-col items-center px-4 py-8`}>

      {/* Badge */}
      <div className="mb-6 animate-fade-in delay-0">
        <span className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide ${theme.badge}`}>
          ✓ Quiz Complete
        </span>
      </div>

      {/* Photo card — clearly visible, framed */}
      <div className={`relative w-full max-w-sm rounded-2xl overflow-hidden ring-2 ${theme.ring} shadow-2xl mb-0 animate-scale-in delay-100`}
           style={{ height: '220px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={type}
          className="w-full h-full object-cover"
        />
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Emoji overlapping bottom of card */}
      <div className={`-mt-8 text-[5rem] leading-none animate-scale-in delay-200 animate-float z-10 ${theme.glow}`}>
        {result.emoji}
      </div>

      {/* Text content */}
      <div className="text-center max-w-md mt-2">
        <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-2 animate-fade-in delay-300">
          Your Climbing Identity
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight animate-fade-in-up delay-300">
          {result.title}
        </h1>

        <div className={`h-px w-full mb-5 bg-gradient-to-r from-transparent ${theme.divider} to-transparent animate-fade-in delay-400`} />

        <p className="text-slate-300 text-sm leading-relaxed mb-8 animate-fade-in delay-400">
          {result.description}
        </p>

        <div className="space-y-3 animate-fade-in-up delay-500">
          <Link
            href="/quiz"
            className={`block w-full bg-gradient-to-r ${theme.btn} text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-xl active:scale-[0.98]`}
          >
            Take the Quiz Again
          </Link>
          <Link
            href="/"
            className="block w-full border border-white/10 text-white/50 font-medium py-4 rounded-xl hover:text-white hover:border-white/25 transition-all duration-150 active:scale-[0.98]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
