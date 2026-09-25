import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from './config'
import { healthRouter } from './routes/health'
import { authRouter } from './routes/auth'
import { msmesRouter } from './routes/msmes'
import { casesRouter } from './routes/cases'
import { cviRouter } from './routes/cvi'
import { gvsRouter } from './routes/gvs'
import { copilotRouter } from './routes/copilot'
import { climateRouter } from './routes/climate'

export const app = express()

app.use(helmet())
app.use(cors({ origin: config.corsOrigin, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

// Health / Ready endpoints
app.use('/', healthRouter)

// API v1 routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/msmes', msmesRouter)
app.use('/api/v1/cases', casesRouter)
app.use('/api/v1/cvi', cviRouter)
app.use('/api/v1/gvs', gvsRouter)
app.use('/api/v1/copilot', copilotRouter)
app.use('/api/v1/climate', climateRouter)

// Error handling fallback
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[API Error]:', err)
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  })
})
