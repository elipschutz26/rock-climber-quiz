import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

const resultImages: Record<ClimberType, string> = {
  Boulderer:                '/images/result-boulderer.jpg',
  'Sport Climber':          '/images/result-sport.jpg',
  'Trad Climber':           '/images/result-trad.jpg',
  'Multi-Pitch Adventurer': '/images/result-multipitch.jpg',
}

const resultThemes: Record<ClimberType, {
  topColor: string   // hex — used in gradient overlay on photo AND as bg top
  badge: string
  glow: string
  divider: string
  btn: string
}> = {
  Boulderer: {
    topColor: '#7c2d12',
    badge:    'bg-amber-500/20 border-amber-400/30 text-amber-300',
    glow:     'drop-shadow-[0_0_32px_rgba(251,191,36,0.55)]',
    divider:  'via-amber-500',
    btn:      'from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600',
  },
  'Sport Climber': {
    topColor: '#1e3a8a',
    badge:    'bg-blue-500/20 border-blue-400/30 text-blue-300',
    glow:     'drop-shadow-[0_0_32px_rgba(59,130,246,0.55)]',
    divider:  'via-blue-500',
    btn:      'from-blue-600 to-blue-900 hover:from-blue-500 hover:to-blue-800',
  },
  'Trad Climber': {
    topColor: '#14532d',
    badge:    'bg-emerald-500/20 border-emerald-400/30 text-emerald-300',
    glow:     'drop-shadow-[0_0_32px_rgba(52,211,153,0.55)]',
    divider:  'via-emerald-500',
    btn:      'from-emerald-700 to-emerald-900 hover:from-emerald-600 hover:to-emerald-800',
  },
  'Multi-Pitch Adventurer': {
    topColor: '#312e81',
    badge:    'bg-indigo-500/20 border-indigo-400/30 text-indigo-300',
    glow:     'drop-shadow-[0_0_32px_rgba(99,102,241,0.6)]',
    divider:  'via-indigo-500',
    btn:      'from-indigo-600 to-indigo-900 hover:from-indigo-500 hover:to-indigo-800',
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
    <main
      className="relative min-h-screen overflow-hidden flex flex-col items-center"
      style={{ background: `linear-gradient(to bottom, ${theme.topColor} 0%, #070d1a 55%)` }}
    >
      {/* Photo banner — fades seamlessly into the gradient below */}
      <div className="relative w-full shrink-0" style={{ height: '48vh' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={type}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Gradient fade — starts early so photo bleeds smoothly into bg */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to bottom, ${theme.topColor}66 0%, transparent 25%, transparent 40%, ${theme.topColor}dd 80%, ${theme.topColor} 100%)` }}
        />
        {/* Side vignettes */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(to right, ${theme.topColor}66 0%, transparent 25%, transparent 75%, ${theme.topColor}66 100%)` }}
        />

        {/* Badge — top center over photo */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 animate-fade-in delay-0">
          <span className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide backdrop-blur-sm ${theme.badge}`}>
            ✓ Quiz Complete
          </span>
        </div>

        {/* Emoji — floats out from bottom of photo, straddling the seam */}
        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 text-[6rem] leading-none animate-scale-in delay-100 animate-float ${theme.glow}`}>
          {result.emoji}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center px-6 pt-14 pb-10">


        <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-2 animate-fade-in delay-200 mt-2">
          Your Climbing Identity
        </p>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight animate-fade-in-up delay-200">
          {result.title}
        </h1>

        {/* Colored divider */}
        <div className={`h-px w-full mb-5 animate-fade-in delay-300 bg-gradient-to-r from-transparent ${theme.divider} to-transparent`} />

        <p className="text-slate-300 text-sm leading-relaxed mb-8 animate-fade-in delay-300">
          {result.description}
        </p>

        <div className="space-y-3 animate-fade-in-up delay-400">
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
