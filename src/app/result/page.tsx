import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

const resultImages: Record<ClimberType, string> = {
  Boulderer:                '/images/result-boulderer.jpg',
  'Sport Climber':          '/images/result-sport.jpg',
  'Trad Climber':           '/images/result-trad.jpg',
  'Multi-Pitch Adventurer': '/images/result-multipitch.jpg',
}

const resultThemes: Record<ClimberType, {
  badge: string
  glow: string
  line: string
  btn: string
}> = {
  Boulderer: {
    badge: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
    glow:  'drop-shadow-[0_0_40px_rgba(251,191,36,0.5)]',
    line:  'bg-gradient-to-r from-transparent via-amber-500 to-transparent',
    btn:   'from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600',
  },
  'Sport Climber': {
    badge: 'bg-blue-500/15 border-blue-400/30 text-blue-300',
    glow:  'drop-shadow-[0_0_40px_rgba(59,130,246,0.5)]',
    line:  'bg-gradient-to-r from-transparent via-blue-500 to-transparent',
    btn:   'from-blue-600 to-slate-700 hover:from-blue-500 hover:to-slate-600',
  },
  'Trad Climber': {
    badge: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
    glow:  'drop-shadow-[0_0_40px_rgba(52,211,153,0.5)]',
    line:  'bg-gradient-to-r from-transparent via-emerald-500 to-transparent',
    btn:   'from-emerald-700 to-slate-700 hover:from-emerald-600 hover:to-slate-600',
  },
  'Multi-Pitch Adventurer': {
    badge: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300',
    glow:  'drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]',
    line:  'bg-gradient-to-r from-transparent via-indigo-500 to-transparent',
    btn:   'from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600',
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
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-16 overflow-hidden">

      {/* Photo — heavily darkened, pure atmosphere */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-[#070d1a]/75" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center">

        {/* Badge */}
        <div className="flex justify-center mb-10 animate-fade-in delay-0">
          <span className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide ${theme.badge}`}>
            ✓ Quiz Complete
          </span>
        </div>

        {/* Emoji with colored glow */}
        <div className={`text-[6rem] leading-none mb-6 animate-scale-in delay-100 animate-float ${theme.glow}`}>
          {result.emoji}
        </div>

        {/* Eyebrow */}
        <p className="text-xs font-bold text-white/30 tracking-widest uppercase mb-3 animate-fade-in delay-200">
          Your Climbing Identity
        </p>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight animate-fade-in-up delay-200">
          {result.title}
        </h1>

        {/* Colored divider line */}
        <div className={`h-px w-full mb-6 animate-fade-in delay-300 ${theme.line}`} />

        {/* Description */}
        <p className="text-slate-300 text-base leading-relaxed mb-10 animate-fade-in delay-300">
          {result.description}
        </p>

        {/* Buttons */}
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
