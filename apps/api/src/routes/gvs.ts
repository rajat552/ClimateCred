import { Router, Request, Response } from 'express'

export const gvsRouter = Router()

/**
 * Deterministic Green Viability Score calculation
 * GVS = (IRR_Weight * irrScore) + (Carbon_Weight * carbonScore) + (Resilience_Weight * resilienceScore) + (Policy_Weight * policyScore)
 */
gvsRouter.post('/calculate', (req: Request, res: Response) => {
  const { irrScore = 86, carbonScore = 79, resilienceScore = 80, policyScore = 85 } = req.body

  // Weights: 40% financial, 30% carbon, 20% resilience, 10% policy
  const gvsScore = Math.round(
    (Number(irrScore) * 0.40) +
    (Number(carbonScore) * 0.30) +
    (Number(resilienceScore) * 0.20) +
    (Number(policyScore) * 0.10)
  )

  let band: 'POOR' | 'MODERATE' | 'HIGH' | 'EXEMPLARY' = 'POOR'
  if (gvsScore >= 80) band = 'EXEMPLARY'
  else if (gvsScore >= 65) band = 'HIGH'
  else if (gvsScore >= 45) band = 'MODERATE'

  res.json({
    success: true,
    data: {
      gvsScore,
      gvsBand: band,
      modelVersion: '1.4.0-deterministic',
      breakdown: {
        irrScore: Number(irrScore),
        carbonScore: Number(carbonScore),
        resilienceScore: Number(resilienceScore),
        policyScore: Number(policyScore),
      },
      computedAt: new Date().toISOString(),
    },
  })
})
