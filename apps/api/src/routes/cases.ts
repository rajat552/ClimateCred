import { Router, Request, Response } from 'express'

export const casesRouter = Router()

interface LoanCaseRecord {
  id: string
  caseNumber: string
  msmeId: string
  msmeName: string
  loanAmount: number
  tenorMonths: number
  interestRate: number
  purpose: string
  status: string
  cviScore: number
  cviBand: string
  gvsScore: number
  gvsBand: string
  baselineDscr: number
  postProjectDscr: number
  projectIrr: number
  annualCo2AvoidedTons: number
  officer: string
  date: string
}

const mockCases: LoanCaseRecord[] = [
  {
    id: 'case-001',
    caseNumber: 'LN-2026-0891',
    msmeId: 'msme-001',
    msmeName: 'Annapurna Agro-Cold Storage',
    loanAmount: 3500000,
    tenorMonths: 60,
    interestRate: 0.0865,
    purpose: '80kW Rooftop Solar PV + Phase Change Material Retrofit',
    status: 'APPROVED',
    cviScore: 34,
    cviBand: 'MODERATE',
    gvsScore: 82,
    gvsBand: 'HIGH',
    baselineDscr: 1.84,
    postProjectDscr: 2.18,
    projectIrr: 0.234,
    annualCo2AvoidedTons: 74.2,
    officer: 'Rohan Sharma',
    date: '2026-09-24',
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
    officer: 'Ananya Reddy',
    date: '2026-09-25',
  },
  {
    id: 'case-003',
    caseNumber: 'LN-2026-0912',
    msmeId: 'msme-003',
    msmeName: 'Krishna Valley Coastal Aqua',
    loanAmount: 2200000,
    tenorMonths: 48,
    interestRate: 0.0925,
    purpose: 'Aerator & Solar Hybrid Energy Transition',
    status: 'STRESS_TEST_REQUIRED',
    cviScore: 71,
    cviBand: 'HIGH',
    gvsScore: 49,
    gvsBand: 'MODERATE',
    baselineDscr: 1.42,
    postProjectDscr: 1.68,
    projectIrr: 0.165,
    annualCo2AvoidedTons: 38.0,
    officer: 'Rohan Sharma',
    date: '2026-09-23',
  },
  {
    id: 'case-004',
    caseNumber: 'LN-2026-0925',
    msmeId: 'msme-004',
    msmeName: 'Godavari Precision Drip Farm',
    loanAmount: 1850000,
    tenorMonths: 36,
    interestRate: 0.0875,
    purpose: 'Micro-Irrigation Solar Pump & Sensor Grid',
    status: 'APPROVED',
    cviScore: 41,
    cviBand: 'MODERATE',
    gvsScore: 79,
    gvsBand: 'HIGH',
    baselineDscr: 1.95,
    postProjectDscr: 2.45,
    projectIrr: 0.245,
    annualCo2AvoidedTons: 42.1,
    officer: 'Priya Nair',
    date: '2026-09-22',
  },
]

casesRouter.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: mockCases })
})

casesRouter.get('/:id', (req: Request, res: Response) => {
  const c = mockCases.find((item) => item.id === req.params.id) || mockCases[0]
  res.json({ success: true, data: c })
})

casesRouter.post('/', (req: Request, res: Response) => {
  const {
    msmeName,
    loanAmount,
    tenorMonths,
    purpose,
    sector,
    cviScore,
    gvsScore,
    baselineDscr,
    officer,
  } = req.body

  const nextIdNum = mockCases.length + 1
  const id = `case-00${nextIdNum}`
  const caseNumber = `LN-2026-0${930 + nextIdNum}`

  const cvi = Number(cviScore) || 36
  const gvs = Number(gvsScore) || 80

  const newCase: LoanCaseRecord = {
    id,
    caseNumber,
    msmeId: `msme-00${nextIdNum}`,
    msmeName: msmeName || 'New MSME Enterprise',
    loanAmount: Number(loanAmount) || 4000000,
    tenorMonths: Number(tenorMonths) || 60,
    interestRate: gvs >= 75 ? 0.0865 : 0.0900,
    purpose: purpose || 'Rooftop Solar & Energy Efficiency Retrofit',
    status: 'UNDER_REVIEW',
    cviScore: cvi,
    cviBand: cvi <= 30 ? 'LOW' : cvi <= 60 ? 'MODERATE' : 'HIGH',
    gvsScore: gvs,
    gvsBand: gvs >= 85 ? 'EXEMPLARY' : gvs >= 70 ? 'HIGH' : 'MODERATE',
    baselineDscr: Number(baselineDscr) || 1.75,
    postProjectDscr: Math.round(((Number(baselineDscr) || 1.75) + 0.35) * 100) / 100,
    projectIrr: 0.225,
    annualCo2AvoidedTons: Math.round(((Number(loanAmount) || 4000000) / 50000) * 10) / 10,
    officer: officer || 'Rohan Sharma',
    date: new Date().toISOString().split('T')[0] || '2026-09-25',
  }

  mockCases.unshift(newCase)

  res.status(201).json({
    success: true,
    data: newCase,
    message: 'Loan case created and queued for underwriting analysis',
  })
})
