import { resultDescriptions, ClimberType } from '@/lib/quiz-data'
import Link from 'next/link'

interface ResultPageProps {
  searchParams: { type?: string }
}

export default function ResultPage({ searchParams }: ResultPageProps) {
  const type = searchParams.type as ClimberType
  const result = resultDescriptions[type]

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
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-scene overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-indigo-700/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg text-center z-10">

        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
            ✓ Quiz Complete
          </span>
        </div>

        {/* Result card */}
        <div className={`bg-gradient-to-br ${result.color} rounded-3xl p-10 mb-6 shadow-2xl shadow-black/40 border border-white/10 relative overflow-hidden`}>
          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="text-8xl mb-5 drop-shadow-lg">{result.emoji}</div>
            <p className="text-xs font-bold text-white/50 tracking-widest uppercase mb-2">Your Climbing Identity</p>
            <h1 className="font-display text-3xl font-extrabold text-white mb-5 tracking-tight">
              {result.title}
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">{result.description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/quiz"
            className="block w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-900/40"
          >
            Retake the Quiz
          </Link>
          <Link
            href="/"
            className="block w-full glass text-slate-300 font-medium py-4 rounded-xl hover:text-white transition-all duration-150"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
