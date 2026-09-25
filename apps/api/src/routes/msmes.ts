import { Router, Request, Response } from 'express'

export const msmesRouter = Router()

const mockMsmes = [
  {
    id: 'msme-001',
    name: 'Annapurna Agro-Cold Storage',
    udyamNumber: 'UDYAM-MH-12-0049281',
    sector: 'Agri-Processing & Cold Storage',
    district: 'Nagpur',
    state: 'Maharashtra',
    latitude: 21.1458,
    longitude: 79.0882,
    annualRevenue: 42000000,
    ebitdaMargin: 0.152,
    employeeCount: 28,
  },
  {
    id: 'msme-002',
    name: 'Deccan Biomass Pellets Ltd',
    udyamNumber: 'UDYAM-TS-04-0019284',
    sector: 'Renewable Bioenergy',
    district: 'Warangal',
    state: 'Telangana',
    latitude: 17.9689,
    longitude: 79.5941,
    annualRevenue: 86000000,
    ebitdaMargin: 0.21,
    employeeCount: 45,
  },
]

msmesRouter.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: mockMsmes })
})

msmesRouter.get('/:id', (req: Request, res: Response) => {
  const msme = mockMsmes.find((m) => m.id === req.params.id) || mockMsmes[0]
  res.json({ success: true, data: msme })
})
