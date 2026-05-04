import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/auth'

function getBaseUrl(req: NextRequest): string {
  const proto = req.headers.get('x-forwarded-proto') ?? 'https'
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host') ?? ''
  return `${proto}://${host}`
}

export async function GET(req: NextRequest) {
  const base = getBaseUrl(req)
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

  const sessionToken = signToken(record.userId)

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
