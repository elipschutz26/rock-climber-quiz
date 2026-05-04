import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.JWT_SECRET!

export function signToken(userId: string): string {
  return jwt.sign({ userId }, SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, SECRET) as { userId: string }
  } catch {
    return null
  }
}

export function getSessionUserId(): string | null {
  const cookieStore = cookies()
  const token = cookieStore.get('session')?.value
  if (!token) return null
  const payload = verifyToken(token)
  return payload?.userId ?? null
}
