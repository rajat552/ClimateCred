import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'climatetwin-secure-dev-jwt-key-2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  climateEngineUrl: process.env.CLIMATE_ENGINE_URL || 'http://localhost:8000',
  aiCopilotUrl: process.env.AI_COPILOT_URL || 'http://localhost:8001',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
}
