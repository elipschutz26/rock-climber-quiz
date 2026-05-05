import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMagicLink(email: string, token: string) {
  const baseUrl = process.env.BASE_URL ?? 'https://www.climbtype.xyz'
  const link = `${baseUrl}/api/auth/verify?token=${token}`

  await resend.emails.send({
    from: 'Rock Climber Quiz <noreply@climbtype.xyz>',
    to: email,
    subject: 'Your login link for Rock Climber Quiz',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;">
        <h2 style="color:#1e293b;">What type of rock climber are you? 🧗</h2>
        <p style="color:#475569;">Click the link below to log in. This link expires in 15 minutes.</p>
        <a href="${link}" style="display:inline-block;background:#0f172a;color:white;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;margin:16px 0;">
          Log In to Take the Quiz
        </a>
        <p style="color:#94a3b8;font-size:14px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  })
}
