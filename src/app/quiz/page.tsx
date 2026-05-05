'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/quiz-data'

export default function QuizPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const question = questions[currentIndex]
  const progress = Math.round(((currentIndex) / questions.length) * 100)
  const isLast = currentIndex === questions.length - 1

  async function handleNext() {
    if (selected === null) return
    const newAnswers = [...answers, selected]

    if (!isLast) {
      setAnswers(newAnswers)
      setCurrentIndex(currentIndex + 1)
      setSelected(null)
    } else {
      setSubmitting(true)
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers }),
      })
      if (res.ok) {
        const { resultType } = await res.json()
        router.push(`/result?type=${encodeURIComponent(resultType)}`)
      } else {
        setSubmitting(false)
        alert('Something went wrong. Please try again.')
      }
    }
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-scene overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-indigo-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-2xl z-10">

        {/* Progress header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex gap-1 flex-1">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i < currentIndex ? 'bg-indigo-500' :
                  i === currentIndex ? 'bg-indigo-500/60' :
                  'bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-500 shrink-0 tabular-nums">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Question card */}
        <div className="glass glow-indigo rounded-2xl p-8 mb-4">
          <span className="inline-block text-xs font-bold text-indigo-400 tracking-widest uppercase mb-4">
            Question {currentIndex + 1}
          </span>
          <h2 className="font-display text-2xl font-bold text-white mb-8 leading-snug">
            {question.text}
          </h2>

          <div className="space-y-2.5">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-start gap-4 group ${
                  selected === i
                    ? 'bg-indigo-500/15 border-indigo-500/70 text-white shadow-sm shadow-indigo-900/20'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <span className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-all duration-150 ${
                  selected === i
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-700/80 text-slate-400 group-hover:bg-slate-600'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="pt-0.5">{option.text}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null || submitting}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/40"
        >
          {submitting ? 'Calculating your result…' : isLast ? 'See My Result →' : 'Next Question →'}
        </button>
      </div>
    </main>
  )
}
