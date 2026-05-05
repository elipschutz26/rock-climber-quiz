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
      <main className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <p className="text-slate-400 mb-4">Result not found.</p>
          <Link href="/quiz" className="text-indigo-400 underline hover:text-indigo-300">Retake the quiz</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden rock-texture">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.1)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-lg text-center">
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-8">
          Your Result
        </p>

        {/* Result card */}
        <div className={`bg-gradient-to-br ${result.color} border border-white/10 rounded-3xl p-10 mb-6 shadow-2xl`}>
          <div className="text-7xl mb-5 drop-shadow">{result.emoji}</div>
          <h1 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{result.title}</h1>
          <p className="text-slate-300 text-base leading-relaxed">{result.description}</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/quiz"
            className="block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-150 shadow-lg shadow-indigo-900/40"
          >
            Retake the Quiz
          </Link>
          <Link
            href="/"
            className="block w-full bg-slate-800/80 border border-slate-700/60 text-slate-300 font-medium py-4 rounded-xl hover:bg-slate-700/80 hover:text-white transition-all duration-150"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
