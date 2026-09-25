import { Router, Request, Response } from 'express'

export const casesRouter = Router()

const mockCases = [
  {
    id: 'case-001',
    caseNumber: 'LN-2026-0891',
    msmeId: 'msme-001',
    msmeName: 'Annapurna Agro-Cold Storage',
    loanAmount: 3500000,
    tenorMonths: 60,
    interestRate: 0.0885,
    purpose: '80kW Rooftop Solar PV + Phase Change Material Retrofit',
    status: 'APPROVED',
    cviScore: 34,
    cviBand: 'MODERATE',
    gvsScore: 82,
    gvsBand: 'HIGH',
    baselineDscr: 1.84,
    postProjectDscr: 2.18,
    projectIrr: 0.234,
    annualCo2AvoidedTons: 82.5,
  },
  {
    id: 'case-002',
    caseNumber: 'LN-2026-0904',
    msmeId: 'msme-002',
    msmeName: 'Deccan Biomass Pellets Ltd',
    loanAmount: 7500000,
    tenorMonths: 84,
    interestRate: 0.0845,
    purpose: 'Briquetting & Pelleting Line Electrification',
    status: 'UNDER_REVIEW',
    cviScore: 28,
    cviBand: 'LOW',
    gvsScore: 88,
    gvsBand: 'EXEMPLARY',
    baselineDscr: 2.12,
    postProjectDscr: 2.65,
    projectIrr: 0.285,
    annualCo2AvoidedTons: 240.0,
  },
]

casesRouter.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: mockCases })
})

casesRouter.get('/:id', (req: Request, res: Response) => {
  const c = mockCases.find((item) => item.id === req.params.id) || mockCases[0]
  res.json({ success: true, data: c })
})
