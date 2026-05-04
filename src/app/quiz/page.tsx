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

  async function handleNext() {
    if (selected === null) return

    const newAnswers = [...answers, selected]

    if (currentIndex < questions.length - 1) {
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
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span>{progress}% complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-white mb-8">
            {question.text}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 ${
                  selected === i
                    ? 'bg-white text-slate-900 border-white font-medium'
                    : 'bg-slate-900 text-slate-200 border-slate-600 hover:border-slate-400'
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selected === null || submitting}
          className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-40 text-lg"
        >
          {submitting
            ? 'Calculating your result...'
            : currentIndex < questions.length - 1
            ? 'Next Question →'
            : 'See My Result →'}
        </button>
      </div>
    </main>
  )
}
