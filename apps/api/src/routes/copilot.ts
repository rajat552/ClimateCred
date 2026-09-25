import { Router, Request, Response } from 'express'
import { config } from '../config'

export const copilotRouter = Router()

interface MemoRequest {
  caseId: string
  msmeName: string
  sector?: string
  loanAmount?: number
  purpose?: string
  cviScore?: number
  gvsScore?: number
  baselineDscr?: number
  stressedDscr?: number
  projectIrr?: number
  greenTaxonomyScore?: number
  stressScenario?: string
}

copilotRouter.post('/memo', async (req: Request, res: Response) => {
  const {
    caseId = 'case-001',
    msmeName = 'Annapurna Agro-Cold Storage',
    sector = 'Cold Chain / Agri-Logistics',
    loanAmount = 3500000,
    purpose = '80kW Rooftop Solar PV & PCM Phase Change Material Retrofit',
    cviScore = 34,
    gvsScore = 82,
    baselineDscr = 1.84,
    stressedDscr = 1.56,
    projectIrr = 23.4,
    greenTaxonomyScore = 92,
    stressScenario = '+25% Heatwave & Grid Fuel Tariff Spike',
  } = req.body as MemoRequest

  const formattedAmount = `₹${(loanAmount / 100000).toFixed(1)} Lakhs`
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || ''

  let aiGeneratedSynthesis = ''
  let aiModelUsed = 'Deterministic Financial Twin Synthesis'

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const prompt = `You are a Senior Green Credit Underwriting Specialist and Risk Officer at a premier climate bank.
Generate a structured, professional Credit Appraisal Memo (CAM) synthesis for the following MSME green loan application:

- Borrower: ${msmeName}
- Sector: ${sector}
- Facility Amount: ${formattedAmount}
- Purpose: ${purpose}
- Climate Vulnerability Index (CVI): ${cviScore}/100 (Lower is safer)
- Green Viability Score (GVS): ${gvsScore}/100 (Higher is greener & more bankable)
- Baseline DSCR: ${baselineDscr}x
- Stressed DSCR under ${stressScenario}: ${stressedDscr}x (Covenant Threshold: >= 1.20x)
- Project IRR: ${projectIrr}%
- Green Taxonomy Alignment: ${greenTaxonomyScore}% (RBI Green Lending Framework compliant)

Please generate 4 crisp, authoritative sections:
1. Executive Summary & Underwriting Thesis
2. Climate Vulnerability & Physical Risk Assessment (CVI Analysis)
3. Green Viability & Financial Return Analysis (GVS Analysis & Interest Concession)
4. Sanction Recommendation & Conditions Precedent (Telemetry & covenants)`

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 800,
          },
        }),
      })

      if (response.ok) {
        const data = await response.json() as any
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (candidateText) {
          aiGeneratedSynthesis = candidateText
          aiModelUsed = 'Google Gemini 1.5 Flash (Live Server-Side Execution)'
        }
      } else {
        const errText = await response.text()
        console.warn('[Gemini API Warning] Response not OK:', response.status, errText)
      }
    } catch (llmErr) {
      console.warn('[Gemini LLM Error]:', llmErr)
    }
  }

  // Fallback / standard structured memo if Gemini wasn't reachable or offline
  const fallbackMemo = {
    summary: `Borrower application for ${purpose} of ${formattedAmount} demonstrates exceptional credit resilience and regulatory transition alignment.`,
    climateAnalysis: `Physical Climate Risk (CVI: ${cviScore}/100) is well-mitigated. The identified heatwave exposure in the Vidarbha region is directly neutralized by the solar-powered PCM thermal storage unit.`,
    greenViabilityAnalysis: `Green Viability Score (GVS: ${gvsScore}/100) and Taxonomy alignment (${greenTaxonomyScore}%) qualify the borrower for a 35 bps green interest rate subvention under SIDBI/RBI priority sector guidelines.`,
    recommendation: `SANCTION RECOMMENDED. The stressed DSCR of ${stressedDscr}x under severe simulated climate stress maintains a healthy buffer over the institutional 1.20x covenant floor.`,
  }

  const memo = {
    caseId,
    msmeName,
    sector,
    loanAmount,
    formattedAmount,
    purpose,
    cviScore,
    gvsScore,
    projectIrr: `${projectIrr}%`,
    baselineDscr: `${baselineDscr}x`,
    stressedDscr: `${stressedDscr}x`,
    pricingAdjustment: '-35 bps (Green Subvention)',
    sanctionDecision: stressedDscr >= 1.20 ? 'RECOMMENDED FOR SANCTION' : 'CONDITIONAL REFERRAL TO RISK COMMITTEE',
    aiSynthesis: aiGeneratedSynthesis || `${fallbackMemo.summary}\n\n1. Climate Risk: ${fallbackMemo.climateAnalysis}\n\n2. Green Viability: ${fallbackMemo.greenViabilityAnalysis}\n\n3. Decision: ${fallbackMemo.recommendation}`,
    compliance: [
      'RBI Framework for Acceptance of Green Deposits & Green Lending',
      'SEBI BRSR Core Climate Metrics & Avoided Scope-2 Emissions',
      'TCFD Physical Hazard & Transition Scenario Alignment',
      'SIDBI MSME Energy Efficiency Refinance Scheme',
    ],
    metadata: {
      generatedAt: new Date().toISOString(),
      copilotEngine: aiModelUsed,
      security: 'Server-Side Enforced (Zero Client Exposure)',
    },
  }

  res.json({
    success: true,
    data: memo,
  })
})

copilotRouter.post('/chat', async (req: Request, res: Response) => {
  const { message, caseContext } = req.body
  const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || ''

  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const prompt = `You are the ClimateTwin Underwriting AI Copilot. Assist the credit officer with their question regarding the current MSME loan case.
Context: ${JSON.stringify(caseContext || { msme: 'Annapurna Agro', cvi: 34, gvs: 82, loan: '₹35 Lakhs' })}
Officer Query: "${message}"
Answer concisely, with financial precision and regulatory backing.`

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
      const response = await fetch(geminiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 400 },
        }),
      })

      if (response.ok) {
        const data = await response.json() as any
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text
        if (reply) {
          return res.json({
            success: true,
            data: {
              reply,
              model: 'Gemini 1.5 Flash',
            },
          })
        }
      }
    } catch (err) {
      console.warn('[Gemini Chat Error]:', err)
    }
  }

  // Fallback helpful reply
  res.json({
    success: true,
    data: {
      reply: `Regarding "${message}": The borrower exhibits high transition resilience (GVS 82/100). Under simulated +25% heatwave shock, energy savings from the 80kW solar array protect DSCR at 1.56x, easily satisfying the 1.20x minimum covenant requirement.`,
      model: 'Deterministic Climate Twin Copilot',
    },
  })
})
