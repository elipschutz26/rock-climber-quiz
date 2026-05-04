import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const base = process.env.BASE_URL ?? 'https://climbtype.xyz'
  const token = req.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${base}/?error=missing-token`)
  }

  const record = await prisma.magicToken.findUnique({ where: { token } })

  if (!record || record.used || record.expiresAt < new Date()) {
    return NextResponse.redirect(`${base}/?error=invalid-token`)
  }

  await prisma.magicToken.update({
    where: { id: record.id },
    data: { used: true },
  })

  const sessionToken = await signToken(record.userId)

  const response = NextResponse.redirect(`${base}/quiz`)
  response.cookies.set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return response
}
