import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const protectedPaths = ['/quiz', '/result']
  const isProtected = protectedPaths.some(path =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('session')?.value
  const payload = token ? await verifyToken(token) : null

  if (!payload) {
    const base = process.env.BASE_URL ?? 'https://web-production-a3e76c.up.railway.app'
    return NextResponse.redirect(`${base}/`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/quiz/:path*', '/result/:path*'],
}
