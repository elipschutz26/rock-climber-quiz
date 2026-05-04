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
          <Link href="/quiz" className="text-white underline">Retake the quiz</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <div className={`bg-gradient-to-br ${result.color} border border-white/10 rounded-3xl p-10 mb-8`}>
          <div className="text-7xl mb-6">{result.emoji}</div>
          <h1 className="text-3xl font-bold text-white mb-4">{result.title}</h1>
          <p className="text-slate-300 text-lg leading-relaxed">{result.description}</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/quiz"
            className="block w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors"
          >
            Retake the Quiz
          </Link>
          <Link
            href="/"
            className="block w-full bg-slate-800 border border-slate-700 text-slate-300 font-medium py-4 rounded-xl hover:bg-slate-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
