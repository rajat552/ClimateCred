import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'

export const authRouter = Router()

authRouter.post('/login', (req: Request, res: Response) => {
  const { email, role } = req.body

  // Demo / fallback token generation with structured payload
  const user = {
    id: 'usr-001',
    email: email || 'officer@bank.com',
    fullName: 'Rohan Sharma',
    role: role || 'CREDIT_OFFICER',
    organizationId: 'org-001',
    organizationName: 'National Green NBFC Bank',
  }

  const token = jwt.sign(user, config.jwtSecret, { expiresIn: '7d' })

  res.status(200).json({
    success: true,
    data: {
      token,
      user,
    },
  })
})

authRouter.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ success: false, error: 'Authorization header required' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, config.jwtSecret)
    return res.status(200).json({ success: true, data: decoded })
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
})
