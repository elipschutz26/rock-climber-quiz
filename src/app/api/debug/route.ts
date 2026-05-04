import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const tokenCount = await prisma.magicToken.count()
  const userCount = await prisma.user.count()
  const recent = await prisma.magicToken.findMany({ take: 3, orderBy: { createdAt: 'desc' }, select: { createdAt: true, used: true, expiresAt: true } })
  return NextResponse.json({ tokenCount, userCount, recent })
}
