import { Router, Request, Response } from 'express'

export const copilotRouter = Router()

copilotRouter.post('/memo', async (req: Request, res: Response) => {
  const { caseId, msmeName, cviScore, gvsScore, loanAmount, purpose } = req.body

  // Generate credit officer synthesis
  const memo = {
    caseId: caseId || 'case-001',
    msmeName: msmeName || 'Annapurna Agro-Cold Storage',
    summary: `Borrower application for ${purpose || 'Green Energy Upgrade'} of ₹${loanAmount ? (loanAmount / 100000).toFixed(1) + ' Lakhs' : '35 Lakhs'} demonstrates solid credit and transition alignment.`,
    climateAnalysis: `Physical Climate Risk (CVI: ${cviScore || 34}/100) is within acceptable risk appetite. Key vulnerability from regional summer heatwaves is hedged by the proposed capex.`,
    greenViabilityAnalysis: `Green Viability Score (GVS: ${gvsScore || 82}/100) qualifies the project for premier green refinance subvention (-35 bps rebate).`,
    recommendation: 'RECOMMEND SANCTION with standard conditions precedent regarding solar generation telemetry.',
    generatedAt: new Date().toISOString(),
  }

  res.json({
    success: true,
    data: memo,
  })
})
