import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUserId } from '@/lib/auth'
import { questions, scoreQuiz } from '@/lib/quiz-data'

export async function POST(req: NextRequest) {
  const userId = getSessionUserId()

  if (!userId) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { answers } = await req.json()

  if (!Array.isArray(answers) || answers.length !== questions.length) {
    return NextResponse.json({ error: 'Invalid answers' }, { status: 400 })
  }

  const resultType = scoreQuiz(answers, questions)

  await prisma.quizResult.create({
    data: { userId, resultType, answers },
  })

  return NextResponse.json({ resultType })
}
