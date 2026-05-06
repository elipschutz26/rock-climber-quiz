import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

const resultImages: Record<ClimberType, string> = {
  Boulderer: '/images/result-boulderer.jpg',
  'Sport Climber': '/images/result-sport.jpg',
  'Trad Climber': '/images/result-trad.jpg',
  'Multi-Pitch Adventurer': '/images/result-multipitch.jpg',
}

const resultAccents: Record<ClimberType, { badge: string; button: string }> = {
  Boulderer: { badge: 'bg-amber-500/15 border-amber-500/25 text-amber-300', button: 'from-amber-700 to-orange-800 hover:from-amber-600 hover:to-orange-700' },
  'Sport Climber': { badge: 'bg-blue-500/15 border-blue-500/25 text-blue-300', button: 'from-blue-700 to-slate-800 hover:from-blue-600 hover:to-slate-700' },
  'Trad Climber': { badge: 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300', button: 'from-emerald-800 to-slate-800 hover:from-emerald-700 hover:to-slate-700' },
  'Multi-Pitch Adventurer': { badge: 'bg-indigo-500/15 border-indigo-500/25 text-indigo-300', button: 'from-indigo-700 to-slate-900 hover:from-indigo-600 hover:to-slate-800' },
}

interface ResultPageProps {
  searchParams: { type?: string }
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const type = searchParams.type as ClimberType
  const result = resultDescriptions[type]
  const accent = resultAccents[type]
  const imageSrc = resultImages[type]

  if (!result) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-scene">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Result not found.</p>
          <Link href="/quiz" className="text-indigo-400 underline hover:text-indigo-300">Retake the quiz</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden bg-[#070d1a]">

      {/* Full-bleed hero background image */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={type}
          className="w-full h-full object-cover opacity-30"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-70`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a] via-[#070d1a]/40 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">

        {/* Badge — fades in */}
        <div className="flex justify-center mb-6 animate-fade-in-up delay-0">
          <span className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide ${accent.badge}`}>
            ✓ Quiz Complete
          </span>
        </div>

        {/* Giant emoji — floats */}
        <div className="text-[7rem] mb-2 animate-scale-in delay-100 drop-shadow-2xl leading-none animate-float">
          {result.emoji}
        </div>

        {/* Eyebrow label */}
        <p className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2 animate-fade-in delay-200">
          Your Climbing Identity
        </p>

        {/* Main title — big reveal */}
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight animate-fade-in-up delay-300">
          {result.title}
        </h1>

        {/* Description card */}
        <div className="glass glow-indigo rounded-2xl px-8 py-6 mb-8 animate-fade-in-up delay-400">
          <p className="text-slate-200 text-base leading-relaxed">{result.description}</p>
        </div>

        {/* Actions */}
        <div className="space-y-3 animate-fade-in-up delay-500">
          <Link
            href="/quiz"
            className={`block w-full bg-gradient-to-r ${accent.button} text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-xl shadow-black/40 active:scale-[0.98]`}
          >
            Take the Quiz Again
          </Link>
          <Link
            href="/"
            className="block w-full glass text-slate-300 font-medium py-4 rounded-xl hover:text-white transition-all duration-150 active:scale-[0.98]"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
