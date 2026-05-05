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
        alert('Something went wrong submitting your quiz. Please try again.')
      }
    }
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden rock-texture">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.08)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-slate-900/80 backdrop-blur border border-slate-700/60 rounded-2xl p-8 mb-5 shadow-xl">
          <p className="text-xs font-semibold text-indigo-400 uppercase tracking-widest mb-4">
            Question {currentIndex + 1}
          </p>
          <h2 className="text-2xl font-bold text-white mb-8 leading-snug">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 ${
                  selected === i
                    ? 'bg-indigo-600/20 text-white border-indigo-500 shadow-sm shadow-indigo-900/30'
                    : 'bg-slate-800/60 text-slate-300 border-slate-700/60 hover:border-slate-500 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 shrink-0 ${
                  selected === i ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null || submitting}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/40 text-base"
        >
          {submitting
            ? 'Calculating your result…'
            : isLast
            ? 'See My Result →'
            : 'Next Question →'}
        </button>
      </div>
    </main>
  )
}
