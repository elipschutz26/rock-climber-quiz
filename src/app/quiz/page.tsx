'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/quiz-data'
import { motion, AnimatePresence } from 'framer-motion'

const OPTION_LETTERS = ['A', 'B', 'C', 'D']

export default function QuizPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [direction, setDirection] = useState(1)

  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1
  const progress = currentIndex / questions.length

  async function handleNext() {
    if (selected === null) return
    const newAnswers = [...answers, selected]

    if (!isLast) {
      setDirection(1)
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

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-indigo-600/8 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-700/8 blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-2xl z-10">

        {/* Progress section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold text-slate-500 tabular-nums">
              {Math.round(progress * 100)}% complete
            </span>
          </div>

          {/* Animated progress bar */}
          <div className="relative h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>

          {/* Dot indicators */}
          <div className="flex gap-1.5 mt-3">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  backgroundColor:
                    i < currentIndex ? '#6366f1' :
                    i === currentIndex ? '#818cf8' :
                    '#1e293b',
                  scale: i === currentIndex ? 1.3 : 1,
                }}
                transition={{ duration: 0.25 }}
                className="h-1.5 flex-1 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Question card with slide animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="glass glow-indigo rounded-2xl p-8 mb-4">

              {/* Climbing icon decoration */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-400 text-sm">🧗</span>
                </div>
                <span className="text-xs font-bold text-indigo-400 tracking-widest uppercase">
                  Question {currentIndex + 1}
                </span>
              </div>

              <h2 className="font-display text-2xl font-bold text-white mb-7 leading-snug">
                {question.text}
              </h2>

              <div className="space-y-2.5">
                {question.options.map((option, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelected(i)}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-colors duration-150 flex items-start gap-4 ${
                      selected === i
                        ? 'bg-indigo-500/15 border-indigo-500/70 text-white shadow-sm shadow-indigo-900/20'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-300 hover:border-slate-600/80 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <span className={`shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-colors duration-150 ${
                      selected === i
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-700/80 text-slate-400'
                    }`}>
                      {OPTION_LETTERS[i]}
                    </span>
                    <span className="pt-0.5">{option.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleNext}
              disabled={selected === null || submitting}
              whileHover={selected !== null && !submitting ? { scale: 1.02 } : {}}
              whileTap={selected !== null && !submitting ? { scale: 0.98 } : {}}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/40 text-base"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculating your result…
                </span>
              ) : isLast ? 'Reveal My Climbing Type →' : 'Next Question →'}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
