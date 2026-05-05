'use client'

import { useState } from 'react'

const climberTypes = [
  { emoji: '🪨', label: 'Boulderer' },
  { emoji: '🔩', label: 'Sport Climber' },
  { emoji: '🧰', label: 'Trad Climber' },
  { emoji: '⛰️', label: 'Multi-Pitch' },
]

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
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 bg-scene mountain-bg overflow-hidden">

      {/* Floating orb decorations */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-indigo-700/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 w-80 h-80 rounded-full bg-violet-700/10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md z-10">

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            10 Questions · Free
          </span>
        </div>

        {/* Hero text */}
        <div className="text-center mb-10">
          <h1 className="font-display text-5xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight">
            What Type of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Rock Climber
            </span>
            <br />Are You?
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Find out if you&apos;re a boulderer, sport climber,<br />
            trad climber, or multi-pitch adventurer.
          </p>
        </div>

        {/* Card */}
        {status === 'sent' ? (
          <div className="glass glow-indigo rounded-2xl p-8 text-center">
            <div className="text-5xl mb-5">📬</div>
            <h2 className="text-xl font-bold text-white mb-2">Check your inbox</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Magic link sent to{' '}
              <span className="text-indigo-300 font-medium">{email}</span>.
              <br />Click it to start the quiz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass glow-indigo rounded-2xl p-8">
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
              className="w-full bg-slate-800/60 border border-slate-600/50 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/30 mb-4 transition-all"
            />
            {status === 'error' && (
              <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-indigo-900/50"
            >
              {status === 'loading' ? 'Sending…' : 'Send My Login Link →'}
            </button>
            <p className="text-slate-600 text-xs text-center mt-4">
              No password — we&apos;ll email you a magic link
            </p>
          </form>
        )}

        {/* Climber type pills */}
        <div className="flex justify-center flex-wrap gap-2 mt-8">
          {climberTypes.map(({ emoji, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/40 border border-slate-700/40 px-3 py-1.5 rounded-full">
              <span>{emoji}</span> {label}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}
