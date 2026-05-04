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
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">🧗</div>
          <h1 className="text-4xl font-bold text-white mb-3">
            What Type of Rock Climber Are You?
          </h1>
          <p className="text-slate-400 text-lg">
            10 questions. Find your climbing personality.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-xl font-semibold text-white mb-2">Check your email!</h2>
            <p className="text-slate-400">
              We sent a login link to <span className="text-white font-medium">{email}</span>.
              Click it to start the quiz. It expires in 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
            <label className="block text-slate-300 font-medium mb-2" htmlFor="email">
              Enter your email to get started
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 mb-4"
            />
            {status === 'error' && (
              <p className="text-red-400 text-sm mb-4">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Sending...' : 'Send My Login Link'}
            </button>
            <p className="text-slate-500 text-xs text-center mt-4">
              No password needed. We&apos;ll email you a magic link.
            </p>
          </form>
        )}
      </div>
    </main>
  )
}
