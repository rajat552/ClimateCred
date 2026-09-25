import { Router, Request, Response } from 'express'

export const cviRouter = Router()

/**
 * Deterministic Climate Vulnerability Index calculation
 * CVI = (HazardScore * ExposureScore * SensitivityScore) / (AdaptiveCapacityScore + epsilon) normalized to 0-100
 */
cviRouter.post('/calculate', (req: Request, res: Response) => {
  const { hazard = 42, exposure = 38, sensitivity = 55, adaptiveCapacity = 68 } = req.body

  // Deterministic formula
  const rawScore = (Number(hazard) * Number(exposure) * Number(sensitivity)) / Math.max(Number(adaptiveCapacity) * 100, 1)
  const normalizedCvi = Math.min(100, Math.max(0, Math.round(rawScore * 10) / 10))

  let band: 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH' | 'CRITICAL' = 'LOW'
  if (normalizedCvi > 75) band = 'CRITICAL'
  else if (normalizedCvi > 60) band = 'VERY_HIGH'
  else if (normalizedCvi > 45) band = 'HIGH'
  else if (normalizedCvi > 25) band = 'MODERATE'

  res.json({
    success: true,
    data: {
      cviScore: normalizedCvi,
      cviBand: band,
      modelVersion: '1.2.1-deterministic',
      breakdown: {
        hazardScore: Number(hazard),
        exposureScore: Number(exposure),
        sensitivityScore: Number(sensitivity),
        adaptiveCapacityScore: Number(adaptiveCapacity),
      },
      computedAt: new Date().toISOString(),
    },
  })
})
