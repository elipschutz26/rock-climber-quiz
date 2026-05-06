import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

const resultImages: Record<ClimberType, string> = {
  Boulderer: '/images/result-boulderer.jpg',
  'Sport Climber': '/images/result-sport.jpg',
  'Trad Climber': '/images/result-trad.jpg',
  'Multi-Pitch Adventurer': '/images/result-multipitch.jpg',
}

const resultAccents: Record<ClimberType, { badge: string; btn: string }> = {
  Boulderer:                { badge: 'bg-amber-500/20 border-amber-400/30 text-amber-200',      btn: 'from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600' },
  'Sport Climber':          { badge: 'bg-blue-500/20 border-blue-400/30 text-blue-200',          btn: 'from-blue-600 to-slate-700 hover:from-blue-500 hover:to-slate-600' },
  'Trad Climber':           { badge: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200', btn: 'from-emerald-700 to-slate-700 hover:from-emerald-600 hover:to-slate-600' },
  'Multi-Pitch Adventurer': { badge: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-200',   btn: 'from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600' },
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
        <p className="text-slate-400 mb-4">Result not found.</p>
        <Link href="/quiz" className="text-indigo-400 underline hover:text-indigo-300">Retake the quiz</Link>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black flex flex-col">

      {/* Photo — top half of screen */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={type}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />

      {/* Subtle top vignette for badge readability */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />

      {/* Badge — top center */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 z-20 animate-fade-in delay-0">
        <span className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide backdrop-blur-sm ${accent.badge}`}>
          ✓ Quiz Complete
        </span>
      </div>

      {/* Spacer — pushes panel to bottom ~50% */}
      <div className="flex-1" style={{ minHeight: '42vh' }} />

      {/* Bottom sheet panel */}
      <div className="relative z-10 bg-[#070d1a] rounded-t-[2rem] px-6 pt-20 pb-8 shadow-2xl">

        {/* Emoji — straddles image / panel boundary */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-scale-in delay-200">
          <span className="text-[5.5rem] drop-shadow-2xl leading-none block animate-float">
            {result.emoji}
          </span>
        </div>

        <div className="max-w-md mx-auto text-center">
          <p className="text-xs font-bold text-white/35 tracking-widest uppercase mb-2 animate-fade-in delay-300">
            Your Climbing Identity
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight animate-fade-in-up delay-300">
            {result.title}
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed mb-7 animate-fade-in delay-400">
            {result.description}
          </p>

          <div className="space-y-2.5 animate-fade-in-up delay-500">
            <Link
              href="/quiz"
              className={`block w-full bg-gradient-to-r ${accent.btn} text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg active:scale-[0.98]`}
            >
              Take the Quiz Again
            </Link>
            <Link
              href="/"
              className="block w-full border border-white/10 text-white/60 font-medium py-3.5 rounded-xl hover:text-white hover:border-white/25 transition-all duration-150 active:scale-[0.98]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
