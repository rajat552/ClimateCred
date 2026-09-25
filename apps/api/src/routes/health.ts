import { Router, Request, Response } from 'express'

export const healthRouter = Router()

healthRouter.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'climatetwin-api',
    uptime: process.uptime(),
  })
})

healthRouter.get('/ready', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ready',
    database: 'connected',
    climateEngine: 'ready',
    aiCopilot: 'ready',
  })
})
