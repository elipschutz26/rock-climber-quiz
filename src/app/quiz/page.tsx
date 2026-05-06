'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '@/lib/quiz-data'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const question = questions[currentIndex]
  const isLast = currentIndex === questions.length - 1
  const progress = (currentIndex / questions.length) * 100

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
    <main className="relative min-h-screen overflow-hidden bg-[#060b14] flex flex-col">

      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/result-quiz.jpg" alt="" className="w-full h-full object-cover opacity-65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060b14]/55 via-[#060b14]/25 to-[#060b14]/75" />
      </div>

      {/* Progress bar — pinned to top */}
      <div className="relative z-10 w-full h-0.5 bg-white/8">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-400"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">

          {/* Question counter */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              The Quiz
            </span>
            <span className="font-display text-sm font-bold text-white/30 tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')}
              <span className="text-white/15"> / </span>
              {String(questions.length).padStart(2, '0')}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Ghost question number — decorative watermark */}
              <div className="relative mb-5 overflow-hidden">
                <span
                  className="absolute -top-6 -left-3 font-display font-extrabold text-white/[0.04] select-none pointer-events-none leading-none"
                  style={{ fontSize: 'clamp(80px, 18vw, 160px)' }}
                  aria-hidden="true"
                >
                  {String(currentIndex + 1).padStart(2, '0')}
                </span>

                {/* Question text */}
                <h2
                  className="relative font-display font-extrabold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
                >
                  {question.text}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-2.5 mb-6">
                {question.options.map((option, i) => {
                  const isSelected = selected === i
                  return (
                    <motion.button
                      key={i}
                      onClick={() => setSelected(i)}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className={`w-full flex items-stretch rounded-xl overflow-hidden border transition-all duration-200 ${
                        isSelected
                          ? 'border-indigo-500/60 shadow-lg shadow-indigo-900/30'
                          : 'border-white/8 hover:border-white/20'
                      }`}
                    >
                      {/* Number tab */}
                      <div className={`flex items-center justify-center w-14 shrink-0 font-display text-sm font-bold tabular-nums transition-all duration-200 ${
                        isSelected
                          ? 'bg-indigo-500 text-white'
                          : 'bg-white/5 text-white/25'
                      }`}>
                        {String(i + 1).padStart(2, '0')}
                      </div>

                      {/* Divider */}
                      <div className={`w-px shrink-0 transition-colors duration-200 ${isSelected ? 'bg-indigo-400/30' : 'bg-white/8'}`} />

                      {/* Option text */}
                      <div className={`flex-1 px-5 py-4 text-left text-sm leading-snug transition-colors duration-200 ${
                        isSelected ? 'bg-indigo-500/12 text-white' : 'bg-white/[0.03] text-slate-300 hover:text-white hover:bg-white/[0.06]'
                      }`}>
                        {option.text}
                      </div>

                      {/* Check icon */}
                      <div className={`flex items-center pr-4 transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Next button */}
              <motion.button
                onClick={handleNext}
                disabled={selected === null || submitting}
                whileHover={selected !== null && !submitting ? { scale: 1.015 } : {}}
                whileTap={selected !== null && !submitting ? { scale: 0.985 } : {}}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300 ${
                  selected !== null && !submitting
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-900/40'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin" />
                    Finding your type…
                  </span>
                ) : isLast ? 'Reveal My Climbing Type →' : 'Next →'}
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
