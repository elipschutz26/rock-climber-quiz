'use client'

import { useState } from 'react'

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
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden rock-texture">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.12)_0%,_transparent_60%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-slate-800 border border-indigo-500/30 mb-6 text-4xl shadow-lg shadow-indigo-900/30">
            🧗
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight">
            What Type of<br />Rock Climber Are You?
          </h1>
          <p className="text-slate-400 text-base">
            10 questions. Find your climbing personality.
          </p>
        </div>

        {/* Card */}
        {status === 'sent' ? (
          <div className="bg-slate-900/80 backdrop-blur border border-slate-700/60 rounded-2xl p-8 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-3xl mb-5">
              📬
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Check your inbox</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We sent a login link to{' '}
              <span className="text-indigo-300 font-medium">{email}</span>.
              <br />Click it to start the quiz.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-900/80 backdrop-blur border border-slate-700/60 rounded-2xl p-8 shadow-xl">
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
              className="w-full bg-slate-800/80 border border-slate-600/60 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/40 mb-4 transition-all"
            />
            {status === 'error' && (
              <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all duration-150 disabled:opacity-50 shadow-lg shadow-indigo-900/40"
            >
              {status === 'loading' ? 'Sending…' : 'Send My Login Link →'}
            </button>
            <p className="text-slate-600 text-xs text-center mt-4">
              No password needed — we&apos;ll email you a magic link.
            </p>
          </form>
        )}

        {/* Climber types preview */}
        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {['🪨 Boulderer', '🔩 Sport Climber', '🧰 Trad Climber', '⛰️ Multi-Pitch'].map(t => (
            <span key={t} className="text-xs text-slate-500 bg-slate-800/60 border border-slate-700/50 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </main>
  )
}
