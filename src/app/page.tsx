'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'

const RockScene = dynamic(() => import('@/components/RockScene'), { ssr: false })

const climberCards = [
  {
    type: 'Boulderer',
    emoji: '🪨',
    tagline: 'Power & Precision',
    description: 'Short, explosive problems. Just you, the rock, and a crash pad.',
    image: '/images/result-boulderer.jpg',
    gradient: 'from-amber-900/80 to-stone-900/90',
    accent: 'text-amber-400',
    border: 'border-amber-700/30',
  },
  {
    type: 'Sport Climber',
    emoji: '🔩',
    tagline: 'Efficiency & Endurance',
    description: 'Clip bolts, refine your technique, and redpoint your project.',
    image: '/images/result-sport.jpg',
    gradient: 'from-blue-900/80 to-slate-900/90',
    accent: 'text-blue-400',
    border: 'border-blue-700/30',
  },
  {
    type: 'Trad Climber',
    emoji: '🧰',
    tagline: 'Self-Reliance & Adventure',
    description: 'Build your own protection, commit to the unknown, embrace the crack.',
    image: '/images/result-trad.jpg',
    gradient: 'from-green-900/80 to-slate-900/90',
    accent: 'text-emerald-400',
    border: 'border-emerald-700/30',
  },
  {
    type: 'Multi-Pitch Adventurer',
    emoji: '⛰️',
    tagline: 'Big Objectives & Summits',
    description: 'Plan, move fast, and reach summits no one else attempts.',
    image: '/images/result-multipitch.jpg',
    gradient: 'from-indigo-900/80 to-slate-900/90',
    accent: 'text-indigo-400',
    border: 'border-indigo-700/30',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
}

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    const res = await fetch('/api/auth/send-link', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (res.ok) {
      setStatus('sent')
    } else {
      const data = await res.json()
      setErrorMsg(data.error ?? 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <main className="bg-scene overflow-x-hidden">

      {/* ─── HERO SECTION ─── */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden">

        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-25"
          />
        </div>

        {/* Three.js canvas on top of image */}
        <div className="absolute inset-0 z-[1]">
          <RockScene />
        </div>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#070d1a]/55 via-transparent to-[#070d1a]/85 pointer-events-none" />

        {/* Hero content */}
        <div className="relative z-[3] w-full max-w-xl text-center">

          {/* Badge */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              10 Questions · Free · Find Your Style
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-6xl sm:text-7xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            What Kind of<br />
            <span className="text-shimmer">Rock Climber</span>
            <br />Are You?
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-slate-400 text-lg leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38 }}
          >
            Boulderer, sport climber, trad climber, or multi-pitch adventurer —<br className="hidden sm:block" />
            discover which style matches your spirit.
          </motion.p>

          {/* Auth card */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.52 }}
          >
            {status === 'sent' ? (
              <div className="glass glow-strong rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4 animate-float">📬</div>
                <h2 className="text-xl font-bold text-white mb-2">Check your inbox</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Magic link sent to{' '}
                  <span className="text-indigo-300 font-medium">{email}</span>.
                  <br />Click it to start the quiz.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass glow-strong rounded-2xl p-8">
                <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="email">
                  Enter your email to get started
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-slate-800/60 border border-slate-600/40 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/30 mb-4 transition-all text-base"
                />
                {status === 'error' && (
                  <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-indigo-900/50 text-base active:scale-[0.98]"
                >
                  {status === 'loading' ? 'Sending…' : 'Find My Climbing Type →'}
                </button>
                <p className="text-slate-600 text-xs text-center mt-3">
                  No password — we&apos;ll email you a magic link
                </p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
        </motion.div>
      </section>

      {/* ─── CLIMBER TYPES SECTION ─── */}
      <section className="px-4 pb-24 pt-4">
        <div className="max-w-5xl mx-auto">

          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase mb-3">The Four Types</p>
            <h2 className="font-display text-4xl font-extrabold text-white">
              Which one are you?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {climberCards.map((card, i) => (
              <motion.div
                key={card.type}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ scale: 1.025, y: -5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className={`relative overflow-hidden rounded-2xl border ${card.border} cursor-default group`}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={card.type}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                </div>

                {/* Content */}
                <div className="relative p-7">
                  <span className="text-4xl mb-3 block animate-float" style={{ animationDelay: `${i * 0.3}s` }}>
                    {card.emoji}
                  </span>
                  <p className={`text-xs font-bold tracking-widest uppercase mb-1 ${card.accent}`}>
                    {card.tagline}
                  </p>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{card.type}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/quiz"
              className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold px-10 py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-indigo-900/40 text-base active:scale-[0.98]"
            >
              Take the Quiz Now →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
