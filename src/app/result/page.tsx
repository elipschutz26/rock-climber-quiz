import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

const resultImages: Record<ClimberType, string> = {
  Boulderer: '/images/result-boulderer.jpg',
  'Sport Climber': '/images/result-sport.jpg',
  'Trad Climber': '/images/result-trad.jpg',
  'Multi-Pitch Adventurer': '/images/result-multipitch.jpg',
}

const resultAccents: Record<ClimberType, { badge: string; btn: string }> = {
  Boulderer:              { badge: 'bg-amber-500/20 border-amber-400/30 text-amber-200',   btn: 'from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600' },
  'Sport Climber':        { badge: 'bg-blue-500/20 border-blue-400/30 text-blue-200',       btn: 'from-blue-600 to-slate-700 hover:from-blue-500 hover:to-slate-600' },
  'Trad Climber':         { badge: 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200', btn: 'from-emerald-700 to-slate-700 hover:from-emerald-600 hover:to-slate-600' },
  'Multi-Pitch Adventurer': { badge: 'bg-indigo-500/20 border-indigo-400/30 text-indigo-200', btn: 'from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600' },
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
    <main className="relative min-h-screen overflow-hidden bg-black">

      {/* Full-bleed image — clearly visible */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={type}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient: only darkens from the bottom up — top stays bright */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10" />

      {/* Vignette edges for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_50%,rgba(0,0,0,0.35)_100%)]" />

      {/* Badge — top center */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in delay-0">
        <span className={`inline-flex items-center gap-2 border text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide backdrop-blur-sm ${accent.badge}`}>
          ✓ Quiz Complete
        </span>
      </div>

      {/* Emoji — floats in the center of the image */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[65%] z-10 animate-scale-in delay-200">
        <span className="text-[6rem] sm:text-[8rem] drop-shadow-2xl animate-float leading-none block">
          {result.emoji}
        </span>
      </div>

      {/* Content — anchored to bottom, image visible above */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 sm:pb-10">
        <div className="max-w-lg mx-auto text-center">

          <p className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2 animate-fade-in delay-300">
            Your Climbing Identity
          </p>

          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight tracking-tight animate-fade-in-up delay-300">
            {result.title}
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed mb-6 animate-fade-in delay-400">
            {result.description}
          </p>

          <div className="space-y-2.5 animate-fade-in-up delay-500">
            <Link
              href="/quiz"
              className={`block w-full bg-gradient-to-r ${accent.btn} text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-xl shadow-black/40 active:scale-[0.98]`}
            >
              Take the Quiz Again
            </Link>
            <Link
              href="/"
              className="block w-full bg-white/10 backdrop-blur-sm border border-white/15 text-white/80 font-medium py-3.5 rounded-xl hover:bg-white/15 hover:text-white transition-all duration-150 active:scale-[0.98]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
