import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendMagicLink } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()

  const user = await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: {},
    create: { email: normalizedEmail },
  })

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000)

  await prisma.magicToken.create({
    data: { token, userId: user.id, expiresAt },
  })

  await sendMagicLink(normalizedEmail, token)

  return NextResponse.json({ message: 'Check your email for a login link!' })
}
