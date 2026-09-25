# 🌍 ClimateTwin — MSME Climate-Risk & Green Viability Intelligence Engine

> **Tagline:** Predict Climate Risk • Quantify Green Viability • Support Better Lending Decisions
>
> **Primary users:** NBFC / micro-lender credit officers, risk analysts, portfolio managers, sustainability teams
>
> **Secondary users:** MSME applicants and relationship managers
>
> **Product type:** B2B SaaS decision-support platform for green MSME finance
>
> **Core outputs:** Climate Vulnerability Index (CVI) + Green Viability Score (GVS) + Explainable Case Intelligence Report

---

# 0. Executive Product Definition

ClimateTwin combines MSME financial/operational information, location-specific climate information, geospatial features and proposed green-project economics into an explainable case-analysis system.

```text
MSME operational data
        +
financial baseline
        +
proposed green investment
        +
weather/climate data
        +
geospatial hazard data
        +
optional satellite-derived features
        ↓
ClimateTwin Intelligence Engine
        ↓
┌────────────────────────┬────────────────────────┐
│ Climate Vulnerability  │ Green Viability Score   │
│ Index (CVI)            │ (GVS)                   │
└────────────────────────┴────────────────────────┘
        ↓
Scenario Stress Testing
        ↓
Explainable Case Intelligence
        ↓
Human Credit Officer Review
```

The system is a **decision-support engine**, not an autonomous loan approval/rejection system. Numerical scores are deterministic/versioned, while the AI layer is used for explanation, summarization and evidence-gap generation.

---

# 1. Product Problem

The product solves two linked information problems for green MSME lending:

1. A lender may know the borrower financially, but may not have a structured view of the **localized physical climate risks** that can disrupt the business.
2. A proposed green investment may have environmental benefits, but the lender needs a structured view of its **operating-cost savings, cash-flow effect, payback and resilience value**.

ClimateTwin therefore answers three questions:

```text
1. How physically climate-vulnerable is this business?
2. How economically viable is the proposed green investment?
3. What evidence should the human officer verify before underwriting?
```

---

# 2. Reference Repository Analysis — RuralMind AI

The uploaded matching reference is **RuralMind AI**. Its README describes a web application for rural entrepreneurs and financial institutions that combines financial health, climate/market factors, explainable insights, scenario simulation and AI support. fileciteturn0file0L7-L9

The reference README already demonstrates:

### Reusable concepts

- role-based entrepreneur/officer portals,
- a digital financial twin,
- what-if scenario simulation,
- an AI mentor,
- weather integration,
- a Python/scikit-learn ML pipeline,
- premium responsive dashboard UX. fileciteturn0file0L15-L28 fileciteturn0file0L30-L34

The reference technology stack includes Vanilla JS, Chart.js, Gemini, OpenWeather and Python/scikit-learn. fileciteturn0file0L38-L44

Its ML pipeline currently trains regression/default-risk models in Python and serializes coefficients into JavaScript for local execution. fileciteturn0file0L75-L77

### Important architectural upgrade

Do **not** simply rename RuralMind pages. Use its proven product ideas but reorganize them around the new domain:

```text
MSME
  ↓
Loan Case
  ↓
Financial Twin
  ↓
Climate Snapshot
  ↓
Green Project
  ↓
CVI + GVS
  ↓
Stress Scenarios
  ↓
Evidence
  ↓
Officer Review
```

The browser should no longer own secrets, authoritative scoring logic or direct database access.

---

# 3. Core Product Modules

```text
1. Identity & RBAC
2. MSME Digital Financial Twin
3. Loan Case Management
4. Climate Data Hub
5. Geospatial/Hazard Engine
6. Climate Vulnerability Engine
7. Green Project Economics
8. Green Viability Engine
9. Scenario/Stress Simulator
10. Officer Copilot
11. Portfolio Intelligence
12. Evidence & Audit Layer
```

---

# 4. Primary User Roles

## 4.1 Credit Officer

Can:

- create and manage cases,
- inspect financial data,
- inspect climate exposure,
- analyze a green project,
- run stress scenarios,
- inspect evidence quality,
- generate case reports,
- record human-review actions.

## 4.2 Risk Analyst

Can:

- inspect model drivers,
- review climate features,
- run additional scenarios,
- compare cases,
- inspect model/data versions.

## 4.3 Portfolio Manager

Can:

- inspect aggregate CVI exposure,
- view district/sector concentration,
- compare GVS across projects,
- inspect portfolio data quality.

## 4.4 MSME Applicant

Can:

- submit business details,
- enter financial baseline,
- provide location,
- propose a green project,
- upload evidence,
- respond to clarification requests.

## 4.5 Sustainability Analyst

Can:

- configure project categories,
- manage impact assumptions,
- review green-project methodology.

## 4.6 Admin

Can:

- manage users,
- manage data providers,
- activate model versions,
- investigate audit events,
- manage thresholds/configuration.

---

# 5. Product Outputs

## Output A — Climate Vulnerability Index (CVI)

Measures the physical climate vulnerability of the **business + location + operating context**.

Higher score = higher vulnerability.

## Output B — Green Viability Score (GVS)

Measures the expected viability of the **proposed green investment** using business economics, cost savings, payback and implementation factors.

Higher score = stronger projected project viability.

## Output C — Case Action

Do not output automatic loan approval/rejection.

Use workflow recommendations such as:

```text
Proceed to Human Underwriting
Enhanced Climate Due Diligence
Additional Project Evidence Required
Data Quality Hold
```

Thresholds must be configurable and explainable.

---

# 6. Climate Vulnerability Index — CVI

## 6.1 MVP hazards

```text
Heat
Flood
Cyclone / Extreme Wind
```

Future extension:

```text
Drought
Water stress
Air quality
Landslide
Wildfire
Coastal/sea-level exposure
```

## 6.2 CVI formula

```text
CVI =
    0.35 × Hazard Exposure
  + 0.25 × Business Sensitivity
  + 0.20 × Infrastructure Exposure
  + 0.20 × Adaptive Capacity
```

Normalize every component to 0–100.

Example communication bands:

```text
0–20     Very Low
21–40    Low
41–60    Moderate
61–80    High
81–100   Very High
```

These are product bands, not regulatory categories.

---

# 7. Hazard Feature Design

## Heat features

```text
annual maximum temperature
extreme-heat days
maximum observed temperature
temperature anomaly
historical heat frequency
```

## Flood features

```text
extreme rainfall
rainfall intensity
terrain/elevation
water-body proximity
flood susceptibility layer
historical events if available
```

## Cyclone features

```text
distance to coast
historical cyclone frequency
wind exposure
track density
storm hazard layer
```

---

# 8. Business Sensitivity

Climate impact depends on the business, not just the location.

Inputs:

```text
sector
business type
critical assets
outdoor/indoor operation
energy dependence
water dependence
cold-chain dependence
raw-material dependence
transport dependence
operating hours
seasonality
```

Example: the same heatwave can affect an outdoor manufacturing unit much more than a small office-based service business.

---

# 9. Infrastructure Exposure

Potential inputs:

```text
power reliability
water access
road accessibility
building type/floor
backup power
distance to critical transport links
supplier concentration
```

---

# 10. Adaptive Capacity

Positive resilience indicators:

```text
backup power
insurance
emergency cash reserve
backup supplier
business continuity plan
water storage
cooling systems
alternative logistics route
customer diversification
```

Adaptive capacity should reduce effective vulnerability.

---

# 11. CVI Explainability

Every CVI result must show:

```text
Overall CVI: 67
Risk band: High

Heat: 72
Flood: 58
Cyclone: 31
Sensitivity: 75
Infrastructure: 63
Adaptive Capacity: 44
```

Then show the actual main contributors:

```text
+ extreme heat exposure
+ high daytime energy dependence
+ limited backup capacity
- supplier diversification
- emergency reserve
```

Every displayed driver must map to a stored feature.

---

# 12. Green Project Analyzer

The project analyzer evaluates investments such as:

```text
solar rooftop
energy-efficient loom
commercial solar dryer
efficient motor
efficient HVAC
cold-storage efficiency upgrade
LED retrofit
energy-efficient boiler
biogas
water-efficient equipment
waste-heat recovery
electric equipment replacement
```

The product should support configurable project types rather than hard-code one technology.

---

# 13. Green Viability Score — GVS

```text
GVS =
    0.30 × Operating-Cost Improvement
  + 0.20 × Cash-Flow Improvement
  + 0.15 × Payback Quality
  + 0.15 × Energy/Resource Reduction
  + 0.10 × Climate-Resilience Benefit
  + 0.10 × Implementation Confidence
```

Normalize to 0–100.

The score is about **project viability**, not a borrower credit score.

---

# 14. Green Project Economics

## Baseline

```text
baseline monthly energy use
baseline energy tariff
baseline monthly energy cost
baseline operating expenses
baseline free cash flow
```

## Projected case

```text
projected energy use
projected energy cost
maintenance cost
project CAPEX
projected operating expenses
projected free cash flow
```

## Savings

```text
Monthly Saving = Baseline Cost − Projected Cost
Annual Saving = Monthly Saving × 12
```

## Payback

```text
Payback Months = CAPEX / Monthly Verified Saving
```

For uneven savings use cumulative-savings payback.

---

# 15. Cash-Flow Improvement

```text
Before:
Revenue − Opex − Debt Service = Free Cash Flow

After:
Revenue − New Opex − Maintenance − Debt Service = Projected FCF

FCF Improvement = Projected FCF − Baseline FCF
```

Do not invent baseline usage or tariffs when evidence is missing. Mark the result as provisional.

---

# 16. Climate-Resilience Benefit

The product should separate:

```text
financial benefit
climate-resilience benefit
```

Example:

```text
Efficient cooling
→ lower electricity cost
→ better operating continuity during extreme heat
```

The UI must not treat a projected resilience benefit as a measured outcome unless verified evidence exists.

---

# 17. Implementation Confidence

Inputs:

```text
technology maturity
vendor availability
installation complexity
maintenance requirement
infrastructure compatibility
applicant readiness
assumption quality
```

This produces a project-risk signal that can reduce the GVS when implementation assumptions are weak.

---

# 18. Financial Digital Twin

The reference repository's Financial Twin becomes a formal MSME financial module. fileciteturn0file0L19-L25

Inputs:

```text
monthly revenue
monthly operating expense
energy expense
water expense
payroll
raw materials
rent
existing debt service
working capital
cash reserve
seasonality
```

Outputs:

```text
current cash flow
operating margin
energy-cost ratio
debt-service burden
cash buffer
projected FCF
```

---

# 19. What-If / Stress Simulator

The reference app already demonstrates what-if simulation of rainfall, market demand, expenses and active loans. fileciteturn0file0L23-L25

ClimateTwin extends that into a case stress engine.

Inputs:

```text
energy tariff
revenue
heat days
rainfall severity
project efficiency
project CAPEX
debt service
maintenance cost
```

Outputs:

```text
projected FCF
CVI stress
GVS sensitivity
payback
operating-cost change
```

---

# 20. Climate Data Architecture

Use provider adapters rather than coupling the system to one API.

```text
ClimateProvider
   ├── WeatherProvider
   ├── SatelliteProvider
   └── HazardLayerProvider
```

The reference project already uses OpenWeather for climate-risk integration, so it is a practical MVP weather adapter. fileciteturn0file0L40-L44

For the advanced prototype, support Sentinel-derived geospatial features.

---

# 21. Satellite Strategy

Do not run raw satellite inference for every loan case.

Use:

```text
Satellite source
      ↓
batch ingestion
      ↓
pre-processing
      ↓
feature extraction
      ↓
grid aggregation
      ↓
geospatial feature store
      ↓
loan-case lookup
```

Candidate features:

```text
NDVI / vegetation proxy
built-up proxy
water presence proxy
land-cover proxy
surface-condition features
```

For MVP, use a small precomputed sample or stubbed provider with the same interface, then connect real Sentinel ingestion as the advanced layer.

---

# 22. Frugal Computing Strategy

This is a core requirement.

### Do expensive work once

```text
batch
cache
precompute
reuse
```

### Avoid

```text
large model on every page load
raw satellite processing in browser
live repeated API calls for identical coordinates
LLM-generated numerical scores
```

### Cache

```text
weather by grid/time window
hazard features by grid
satellite features by tile
model artifacts
geocoding results
scenario configuration
```

---

# 23. Geospatial Architecture

Use:

```text
PostgreSQL + PostGIS
```

Store:

```text
business point geometry
hazard polygons
administrative boundaries
risk grid cells
satellite summary features
```

Case flow:

```text
lat/lng
 ↓
PostGIS point
 ↓
nearest/grid match
 ↓
hazard features
 ↓
climate snapshot
```

---

# 24. ML Architecture

Use a hybrid approach:

```text
Layer 1 — deterministic feature engineering
Layer 2 — lightweight ML models where training data supports them
Layer 3 — rule-based explainability
Layer 4 — LLM explanation only after verified numerical results exist
```

Potential models:

```text
linear/logistic regression
random forest
gradient boosting
```

Do not choose a model because it sounds advanced. Choose it based on validation quality, data availability and explainability.

---

# 25. ML Training Pipeline

The reference repository already uses Python/scikit-learn for model training. fileciteturn0file0L75-L77

New structure:

```text
ml/
├── data/
│   ├── raw/
│   ├── interim/
│   └── processed/
├── features/
│   ├── climate_features.py
│   ├── finance_features.py
│   ├── project_features.py
│   └── geo_features.py
├── training/
│   ├── train_cvi.py
│   ├── train_gvs.py
│   └── train_stress.py
├── models/
│   ├── cvi_model.py
│   ├── gvs_model.py
│   └── stress_model.py
├── evaluation/
│   ├── metrics.py
│   ├── validation.py
│   └── explainability.py
└── artifacts/
    ├── cvi/
    ├── gvs/
    └── stress/
```

---

# 26. Model Registry

Every model artifact needs:

```text
model_id
model_name
version
training_date
dataset_version
feature_schema_version
metrics
artifact_path
status
```

Example:

```text
CVI-1.0
GVS-1.0
STRESS-1.0
```

Every score snapshot must record its model version.

---

# 27. AI Officer Copilot

Use Gemini or another LLM behind the backend. The reference project already uses Gemini for localized recommendations. fileciteturn0file0L27-L28

The Copilot receives only verified structured case data:

```text
CVI components
GVS components
scenario outputs
evidence status
model explanations
known data gaps
```

It generates:

```text
executive summary
key climate risks
project strengths
evidence gaps
questions for applicant
diligence checklist
```

It must not generate or modify CVI/GVS values.

---

# 28. AI Guardrails

System prompt rules:

```text
Use only supplied verified data.
Do not invent numbers.
Do not create missing evidence.
Do not approve or reject a loan.
Do not alter CVI or GVS.
Clearly label assumptions.
State when data is insufficient.
```

Browser must never contain the LLM API key.

---

# 29. Evidence Layer

Every important data point must include provenance:

```text
source
sourceType
uploadedBy
capturedAt
verificationStatus
confidence
```

Example:

```text
Monthly electricity usage
Source: electricity bill
Period: Jan-Dec 2025
Uploaded by: applicant
Status: verified
```

---

# 30. Data Quality Score

Each case gets a separate evidence-quality indicator.

Example:

```text
Financial evidence       30%
Climate freshness        20%
Location confidence      15%
Project assumptions      20%
Documents                15%
```

This prevents a high CVI/GVS from looking equally trustworthy when the underlying data quality is poor.

---

# 31. Confidence-Aware Results

Show:

```text
CVI: 67
Confidence: High
```

or:

```text
CVI: 67
Confidence: Moderate
```

If critical inputs are missing:

```text
CVI: Provisional
```

The same approach applies to GVS.

---

# 32. Missing Data Workflow

```text
Missing utility bill
        ↓
GVS cannot fully validate savings
        ↓
Status: Evidence Required
        ↓
Officer requests document
        ↓
Applicant uploads
        ↓
Verification
        ↓
GVS recalculation
```

Never silently replace missing data with a fabricated number.

---

# 33. Case Recommendation Layer

Use transparent, configurable workflow rules.

Example:

```text
if criticalEvidenceMissing:
    action = Additional Evidence Required

else if cvi >= HIGH_RISK_THRESHOLD:
    action = Enhanced Climate Due Diligence

else if gvs < MIN_GVS_THRESHOLD:
    action = Additional Project Evidence Required

else:
    action = Proceed to Human Underwriting
```

The action is a **workflow recommendation**, not the final lending decision.

---

# 34. Core Database Model

Use PostgreSQL + PostGIS.

## User

```text
id
name
email
phone
role
organizationId
createdAt
updatedAt
```

## Organization

```text
id
name
type
branch
district
state
createdAt
```

## MSME

```text
id
organizationId
name
sector
businessType
location
latitude
longitude
geography
employeeCount
annualRevenue
createdAt
updatedAt
```

## LoanCase

```text
id
msmeId
officerId
loanType
requestedAmount
tenureMonths
status
createdAt
updatedAt
```

## FinancialTwin

```text
id
loanCaseId
monthlyRevenue
monthlyExpenses
energyCost
waterCost
payroll
rawMaterialCost
rent
debtService
cashReserve
seasonality
updatedAt
```

## GreenProject

```text
id
loanCaseId
projectType
capex
expectedEnergyReduction
expectedResourceReduction
expectedMaintenanceCost
usefulLife
vendor
implementationTime
createdAt
updatedAt
```

## ClimateSnapshot

```text
id
loanCaseId
latitude
longitude
weatherFeatures
heatFeatures
floodFeatures
cycloneFeatures
satelliteFeatures
provider
dataTimestamp
```

## CVISnapshot

```text
id
loanCaseId
score
heatScore
floodScore
cycloneScore
sensitivityScore
infrastructureScore
adaptiveCapacityScore
modelVersion
dataVersion
generatedAt
```

## GVSSnapshot

```text
id
loanCaseId
score
opexScore
cashFlowScore
paybackScore
resourceReductionScore
resilienceScore
implementationScore
modelVersion
dataVersion
generatedAt
```

## Scenario

```text
id
loanCaseId
name
inputs
outputs
modelVersions
createdBy
createdAt
```

## Evidence

```text
id
loanCaseId
type
fileUrl
source
verificationStatus
uploadedBy
capturedAt
```

## ModelVersion

```text
id
modelName
version
artifact
featureSchemaVersion
metrics
active
createdAt
```

## AuditLog

```text
id
actorId
entityType
entityId
action
before
after
requestId
timestamp
```

---

# 35. Database Relations

```text
Organization
 ├── Users
 └── MSMEs

MSME
 └── LoanCases

LoanCase
 ├── FinancialTwin
 ├── GreenProject
 ├── ClimateSnapshot
 ├── CVISnapshots
 ├── GVSSnapshots
 ├── Scenarios
 ├── Evidence
 └── AuditLogs

ModelVersion
 ├── CVI models
 ├── GVS models
 └── Stress models
```

---

# 36. Loan Case State Machine

```text
DRAFT
  ↓
DATA_COLLECTION
  ↓
CLIMATE_ANALYSIS
  ↓
GREEN_PROJECT_ANALYSIS
  ↓
SCENARIO_REVIEW
  ↓
OFFICER_REVIEW
  ↓
EVIDENCE_REQUIRED  ←─────────────┐
  ↓                              │
READY_FOR_HUMAN_UNDERWRITING     │
  ↓                              │
CLOSED                           │
                                 │
DATA_QUALITY_HOLD ───────────────┘
```

Additional exception states:

```text
WITHDRAWN
MODEL_UNAVAILABLE
```

---

# 37. Exact Repository Structure

```text
climatetwin/
│
├── apps/
│   ├── web/
│   └── api/
│
├── services/
│   ├── climate-engine/
│   └── ai-copilot/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── validation/
│   ├── config/
│   └── constants/
│
├── ml/
│   ├── data/
│   │   ├── raw/
│   │   ├── interim/
│   │   └── processed/
│   ├── features/
│   ├── training/
│   ├── models/
│   ├── evaluation/
│   └── artifacts/
│
├── database/
│   ├── prisma/
│   ├── migrations/
│   └── seeds/
│
├── data-pipeline/
│   ├── climate/
│   ├── satellite/
│   ├── hazards/
│   └── jobs/
│
├── infra/
│   ├── docker/
│   ├── nginx/
│   └── scripts/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── models/
│   ├── product/
│   └── deployment/
│
├── .github/
│   └── workflows/
│
├── .env.example
├── .gitignore
├── .dockerignore
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── README.md
└── project.md
```

---

# 38. Frontend — `apps/web`

Use:

```text
React
TypeScript
Vite
Tailwind CSS
TanStack Query
Chart.js/Recharts
Leaflet or MapLibre
```

File distribution:

```text
apps/web/
├── src/
│   ├── app/
│   │   ├── router.tsx
│   │   └── providers.tsx
│   │
│   ├── pages/
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── MSMEs/
│   │   ├── Cases/
│   │   ├── Climate/
│   │   ├── GreenProject/
│   │   ├── Scenarios/
│   │   ├── Portfolio/
│   │   ├── Reports/
│   │   └── Settings/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── msme/
│   │   ├── loan-case/
│   │   ├── financial-twin/
│   │   ├── climate-risk/
│   │   ├── green-project/
│   │   ├── scenarios/
│   │   ├── portfolio/
│   │   ├── copilot/
│   │   └── evidence/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── cards/
│   │   ├── charts/
│   │   ├── maps/
│   │   ├── forms/
│   │   ├── modals/
│   │   ├── tables/
│   │   ├── risk/
│   │   └── common/
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── cases.ts
│   │   ├── climate.ts
│   │   └── reports.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCase.ts
│   │   ├── useClimate.ts
│   │   └── useScenario.ts
│   │
│   ├── store/
│   │   ├── auth.store.ts
│   │   └── ui.store.ts
│   │
│   ├── lib/
│   │   ├── formatters.ts
│   │   ├── permissions.ts
│   │   ├── scoring.ts
│   │   └── errors.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css
│   │
│   └── main.tsx
│
├── public/
├── package.json
└── vite.config.ts
```

### Frontend responsibility rules

`pages/` = composition and route-level state only.

`features/` = feature-specific logic.

`components/` = reusable visual components.

`services/` = API clients.

`lib/` = pure utilities.

No direct SQL. No private provider keys.

---

# 39. Backend — `apps/api`

Use:

```text
Node.js
Express
TypeScript
Prisma
Zod
```

Architecture type:

> **Modular monolith**

```text
apps/api/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config.ts
│   │
│   ├── common/
│   │   ├── errors/
│   │   ├── middleware/
│   │   ├── logger/
│   │   ├── auth/
│   │   └── utils/
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── msmes/
│   │   ├── loan-cases/
│   │   ├── financial-twin/
│   │   ├── green-project/
│   │   ├── climate/
│   │   ├── cvi/
│   │   ├── gvs/
│   │   ├── scenarios/
│   │   ├── evidence/
│   │   ├── copilot/
│   │   ├── portfolio/
│   │   ├── reports/
│   │   ├── audit/
│   │   └── admin/
│   │
│   ├── integrations/
│   │   ├── weather/
│   │   ├── satellite/
│   │   ├── geocoding/
│   │   ├── storage/
│   │   └── ai/
│   │
│   ├── jobs/
│   │   ├── climate-refresh.job.ts
│   │   ├── model-run.job.ts
│   │   └── report.job.ts
│   │
│   └── routes/
│       └── index.ts
│
├── tests/
└── package.json
```

Each important domain uses:

```text
module/
├── controller.ts
├── routes.ts
├── service.ts
├── repository.ts
├── schema.ts
├── types.ts
├── policy.ts
├── mapper.ts
└── index.ts
```

Rules:

```text
Controller → HTTP only
Service → business logic
Repository → persistence only
Policy → authorization
Schema → validation
Mapper → DB model to API DTO
```

---

# 40. Climate Engine — `services/climate-engine`

Use:

```text
Python
FastAPI
NumPy
pandas
scikit-learn
geopandas/raster tooling only where actually required
```

Structure:

```text
services/climate-engine/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── routes/
│   │   │   ├── health.py
│   │   │   ├── climate.py
│   │   │   ├── cvi.py
│   │   │   ├── gvs.py
│   │   │   └── scenarios.py
│   │   └── schemas/
│   │       ├── climate.py
│   │       ├── cvi.py
│   │       └── gvs.py
│   │
│   ├── features/
│   │   ├── heat.py
│   │   ├── flood.py
│   │   ├── cyclone.py
│   │   ├── sensitivity.py
│   │   └── resilience.py
│   │
│   ├── engines/
│   │   ├── cvi_engine.py
│   │   ├── gvs_engine.py
│   │   ├── stress_engine.py
│   │   └── payback_engine.py
│   │
│   ├── providers/
│   │   ├── weather_provider.py
│   │   ├── satellite_provider.py
│   │   └── hazard_provider.py
│   │
│   ├── models/
│   │   ├── cvi_model.py
│   │   ├── gvs_model.py
│   │   └── stress_model.py
│   │
│   ├── explain/
│   │   ├── cvi_explainer.py
│   │   └── gvs_explainer.py
│   │
│   ├── config/
│   │   └── settings.py
│   └── utils/
│       ├── normalization.py
│       ├── geospatial.py
│       └── validation.py
│
├── tests/
├── requirements.txt
├── Dockerfile
└── README.md
```

The climate engine returns JSON and never writes directly to PostgreSQL.

---

# 41. AI Copilot Service

A dedicated service keeps the LLM integration isolated.

```text
services/ai-copilot/
├── app/
│   ├── main.py
│   ├── routes/
│   │   ├── health.py
│   │   └── copilot.py
│   ├── prompts/
│   │   ├── summary.txt
│   │   ├── evidence-gaps.txt
│   │   └── questions.txt
│   ├── schemas/
│   ├── providers/
│   │   └── gemini.py
│   ├── services/
│   │   ├── summary.py
│   │   └── guardrails.py
│   └── config/
│       └── settings.py
├── tests/
├── requirements.txt
└── Dockerfile
```

Main API:

```text
POST /copilot/summary
POST /copilot/evidence-gaps
POST /copilot/questions
GET  /health
```

---

# 42. Data Pipeline

```text
data-pipeline/
├── climate/
│   ├── ingest_weather.py
│   ├── normalize_weather.py
│   └── aggregate_weather.py
│
├── satellite/
│   ├── ingest_sentinel.py
│   ├── preprocess.py
│   ├── calculate_indices.py
│   └── aggregate_grid.py
│
├── hazards/
│   ├── ingest_flood.py
│   ├── ingest_cyclone.py
│   └── ingest_heat.py
│
└── jobs/
    ├── daily_update.py
    ├── weekly_satellite_refresh.py
    └── health_check.py
```

Pipeline:

```text
External Source
 → Ingest
 → Validate
 → Normalize
 → Feature Extraction
 → Grid Aggregation
 → Feature Store
 → Climate Engine
```

---

# 43. Shared Packages

```text
packages/
├── ui/
│   ├── Button/
│   ├── Card/
│   ├── Badge/
│   ├── Modal/
│   ├── Table/
│   ├── Chart/
│   └── Map/
│
├── types/
│   ├── auth.ts
│   ├── msme.ts
│   ├── case.ts
│   ├── climate.ts
│   ├── project.ts
│   ├── score.ts
│   └── scenario.ts
│
├── validation/
│   ├── msme.ts
│   ├── case.ts
│   ├── project.ts
│   └── scenario.ts
│
├── constants/
│   ├── roles.ts
│   ├── hazards.ts
│   ├── project-types.ts
│   └── statuses.ts
│
└── config/
    ├── eslint/
    ├── prettier/
    └── typescript/
```

---

# 44. Exact API Contract

Base path:

```text
/api/v1
```

## Auth

```http
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
```

## MSMEs

```http
POST  /msmes
GET   /msmes
GET   /msmes/:id
PATCH /msmes/:id
```

## Loan Cases

```http
POST  /loan-cases
GET   /loan-cases
GET   /loan-cases/:id
PATCH /loan-cases/:id
```

## Financial Twin

```http
GET /loan-cases/:id/financial-twin
PUT /loan-cases/:id/financial-twin
```

## Green Project

```http
POST /loan-cases/:id/green-project
GET  /loan-cases/:id/green-project
PUT  /loan-cases/:id/green-project
```

## Climate

```http
POST /loan-cases/:id/climate/analyze
GET  /loan-cases/:id/climate
```

## CVI

```http
POST /loan-cases/:id/cvi/calculate
GET  /loan-cases/:id/cvi
```

## GVS

```http
POST /loan-cases/:id/gvs/calculate
GET  /loan-cases/:id/gvs
```

## Scenarios

```http
POST /loan-cases/:id/scenarios
GET  /loan-cases/:id/scenarios
POST /loan-cases/:id/scenarios/run
```

## Evidence

```http
POST  /loan-cases/:id/evidence
GET   /loan-cases/:id/evidence
PATCH /evidence/:id/verify
```

## Copilot

```http
POST /loan-cases/:id/copilot/summary
POST /loan-cases/:id/copilot/evidence-gaps
POST /loan-cases/:id/copilot/questions
```

## Reports

```http
GET /loan-cases/:id/report
```

## Portfolio

```http
GET /portfolio/overview
GET /portfolio/climate-map
GET /portfolio/sector-risk
GET /portfolio/green-projects
```

---

# 45. API Response Contract

Success:

```json
{
  "success": true,
  "data": {}
}
```

List:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

Error:

```json
{
  "success": false,
  "error": {
    "code": "CVI_DATA_STALE",
    "message": "Climate data is older than the configured freshness threshold.",
    "requestId": "req_123"
  }
}
```

Never return stack traces, SQL errors or secrets.

---

# 46. End-to-End Request Flow — Climate Analysis

```text
Officer
 ↓
Web UI
 ↓
POST /loan-cases/:id/climate/analyze
 ↓
Auth middleware
 ↓
RBAC policy
 ↓
Validation
 ↓
Climate service
 ↓
Climate provider adapters
 ↓
Climate engine
 ↓
CVI calculation
 ↓
Explanation extraction
 ↓
Node API validates response
 ↓
PostgreSQL snapshot
 ↓
Audit log
 ↓
API response
 ↓
Dashboard update
```

---

# 47. End-to-End Request Flow — Green Project

```text
Officer
 ↓
Enter project CAPEX + baseline
 ↓
API validation
 ↓
Financial Twin
 ↓
Green Project Engine
 ↓
Savings calculation
 ↓
Payback calculation
 ↓
Cash-flow model
 ↓
GVS engine
 ↓
Explainability
 ↓
Persist snapshot
 ↓
Dashboard
```

---

# 48. End-to-End Request Flow — Copilot

```text
Officer opens Copilot
 ↓
API loads verified case data
 ↓
Data redaction / selection
 ↓
Prompt builder
 ↓
LLM provider
 ↓
Guardrail validation
 ↓
Response schema validation
 ↓
Audit log
 ↓
Officer sees explanation
```

The LLM is never allowed to mutate a case score.

---

# 49. Security Architecture

```text
Browser
 ↓
HTTPS
 ↓
Authentication
 ↓
Authorization / RBAC
 ↓
Input Validation
 ↓
Rate Limiting
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

Never expose to browser:

```text
database credentials
AI keys
weather keys
satellite provider secrets
storage credentials
model artifacts
```

---

# 50. File / Data Responsibility Matrix

| Location | Responsibility | Must NOT do |
|---|---|---|
| `pages/` | route composition | large business algorithms |
| `components/` | reusable UI | database calls |
| `features/` | frontend domain behavior | private secrets |
| `services/api` | API communication | SQL |
| `controller.ts` | HTTP boundary | complex business logic |
| `service.ts` | domain logic | rendering |
| `repository.ts` | persistence | scoring rules |
| `schema.ts` | input/output validation | direct side effects |
| `policy.ts` | authorization | UI logic |
| `integrations/` | external services | own business decisions |
| `climate-engine` | climate/geospatial computation | direct production DB writes |
| `ai-copilot` | explanation | score calculation |
| `ml/` | training/evaluation | production user workflow |
| `data-pipeline/` | ingestion/features | UI behavior |
| `database/` | schema/migrations | presentation logic |

---

# 51. Demo UI Screens

## Officer Command Center

```text
Open Cases
High CVI Cases
Average GVS
Data Quality Alerts
Portfolio Climate Map
Recent Cases
Green Project Pipeline
```

## Case Details

Tabs:

```text
Overview
Financial Twin
Climate Risk
Green Project
Scenarios
Evidence
Copilot
Audit Trail
```

## Climate Risk

Show:

```text
CVI 67
Heat 72
Flood 58
Cyclone 31
Sensitivity 75
Infrastructure 63
Adaptive Capacity 44
```

## Green Project

Show:

```text
CAPEX
Energy Baseline
Projected Energy Use
Monthly Saving
Payback
FCF Improvement
GVS
```

## Scenario Simulator

Controls:

```text
Revenue
Energy Tariff
Heat Days
Rainfall Severity
Efficiency
CAPEX
Debt Service
```

Results update live.

---

# 52. Portfolio Dashboard

Questions answered:

```text
Where is climate exposure concentrated?
Which sectors are most vulnerable?
Which green projects show stronger viability?
Where is evidence quality weak?
```

Metrics:

```text
Total active cases
High-CVI cases
Average CVI
Average GVS
District risk concentration
Sector risk concentration
Green project categories
Evidence quality distribution
```

---

# 53. Demo Dataset

Seed at least five example MSMEs:

```text
Himalayan Textiles
GreenGrain Foods
SunDry Agro Processing
UrbanCool Refrigeration
EcoFab Components
```

Each should contain:

```text
location
sector
financial baseline
green project
climate features
evidence
```

---

# 54. Demo Scenarios

## A — Strong Green Project

```text
high energy consumption
+
efficient replacement
+
verified utility history
+
strong projected savings
```

Expected:

```text
GVS high
```

## B — High Climate Vulnerability

```text
heat-sensitive business
+
high heat exposure
+
low adaptive capacity
```

Expected:

```text
CVI high
```

## C — Missing Evidence

```text
missing 12-month energy data
```

Expected:

```text
GVS provisional
Evidence Required
```

## D — Stress Event

```text
severe heat scenario
```

Expected:

```text
FCF deterioration
CVI increase
GVS sensitivity change
```

---

# 55. Three-Minute Judge Demo

## 0:00–0:20 — Hook

Show the officer dashboard.

> “ClimateTwin adds location-specific physical climate risk and the economics of a proposed green investment to the normal MSME financing view.”

## 0:20–0:50 — Case

Select an MSME and show:

```text
location
sector
financial baseline
```

## 0:50–1:20 — Climate Risk

Show CVI and top drivers.

## 1:20–1:55 — Green Project

Show:

```text
CAPEX
energy baseline
monthly saving
payback
GVS
```

## 1:55–2:25 — Stress Scenario

Change energy tariff + heat days. Show the cash-flow, CVI and GVS changes.

## 2:25–2:45 — Copilot

Show the generated summary and evidence gaps.

## 2:45–3:00 — Report

Generate the Case Intelligence Report.

Closing line:

> **“ClimateTwin does not replace the credit officer. It gives the officer a climate-aware, explainable and evidence-backed view of the case.”**

---

# 56. Report Structure

```text
CLIMATETWIN CASE INTELLIGENCE REPORT

1. MSME Profile
2. Requested Facility
3. Financial Twin Snapshot
4. Proposed Green Project
5. Climate Vulnerability
6. CVI Breakdown
7. Green Viability
8. GVS Breakdown
9. Scenario Stress Tests
10. Evidence Quality
11. Key Risk Drivers
12. Evidence Gaps
13. Human Review Action
14. Data Sources
15. Model Versions
16. Audit Summary
```

---

# 57. Local Development

Use pnpm + Turborepo.

Root commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
```

Local services:

```text
web
api
climate-engine
ai-copilot
postgres/postgis
minio
```

---

# 58. Docker Structure

```text
infra/docker/
├── Dockerfile.web
├── Dockerfile.api
├── Dockerfile.climate
└── Dockerfile.copilot
```

Root `docker-compose.yml` orchestrates:

```text
web
api
climate-engine
ai-copilot
postgres
minio
```

Add Redis only when asynchronous jobs genuinely require it.

---

# 59. Environment Variables

```env
NODE_ENV=development
APP_URL=
API_URL=
DATABASE_URL=
POSTGIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
WEATHER_API_KEY=
SATELLITE_API_URL=
SATELLITE_CLIENT_ID=
SATELLITE_CLIENT_SECRET=
AI_PROVIDER=
AI_API_KEY=
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY=
S3_SECRET_KEY=
CLIMATE_ENGINE_URL=
COPILOT_SERVICE_URL=
MAP_PROVIDER=
MAP_TOKEN=
```

Never commit `.env`.

---

# 60. CI/CD

Every pull request runs:

```text
Install
 ↓
Lint
 ↓
Typecheck
 ↓
Unit Tests
 ↓
Integration Tests
 ↓
Build
 ↓
E2E Smoke Test
```

Production deployment is allowed only on success.

---

# 61. Testing Strategy

## Unit tests

```text
CVI components
GVS components
payback
cash flow
normalization
state transitions
permissions
```

## Integration tests

```text
case creation
climate analysis
CVI persistence
GVS persistence
evidence workflow
scenario engine
```

## E2E golden test

```text
Login
→ create/select MSME
→ create case
→ enter financial data
→ enter green project
→ climate analysis
→ CVI
→ GVS
→ scenario
→ evidence
→ Copilot
→ report
```

---

# 62. Data Quality Tests

Test:

```text
missing coordinates
invalid coordinates
stale climate data
future timestamps
missing tariff
negative revenue
negative CAPEX
zero energy usage
impossible payback
duplicate evidence
```

---

# 63. Model Validation

For regression:

```text
MAE
RMSE
R²
```

For classification:

```text
Precision
Recall
F1
ROC-AUC
PR-AUC
```

Where probabilities are exposed, validate calibration.

Do not present a model output as authoritative merely because it produces a number.

---

# 64. Observability

Every backend request should capture:

```text
requestId
userId
route
method
status
latency
errorCode
timestamp
```

Health endpoints:

```text
GET /health
GET /ready
```

Readiness checks:

```text
Database
Storage
Climate engine
Copilot provider
```

---

# 65. Security Checklist

- [ ] Passwords hashed securely.
- [ ] RBAC enforced server-side.
- [ ] Inputs validated with schemas.
- [ ] Uploaded files validated.
- [ ] File size limits applied.
- [ ] Rate limiting active.
- [ ] Secrets only in environment variables.
- [ ] Sensitive actions audited.
- [ ] No private API key in the frontend.
- [ ] No direct browser-to-database path.
- [ ] Report links protected.
- [ ] Public verification pages expose only non-sensitive data.

---

# 66. Performance Strategy

Target cached MVP operations:

```text
Dashboard: < 2 sec
Case summary: < 3 sec
CVI/GVS: < 2 sec after required data is available
Scenario calculation: < 500 ms
Copilot: target < 8 sec
```

Heavy ingestion runs asynchronously.

---

# 67. Git Strategy

Branches:

```text
main
feature/auth
feature/financial-twin
feature/climate-engine
feature/cvi
feature/gvs
feature/scenarios
feature/copilot
feature/portfolio
```

Commit examples:

```text
feat: add loan case workflow
feat: add climate snapshot
feat: add CVI calculator
feat: add green project economics
feat: add GVS calculator
feat: add scenario simulator
fix: handle stale climate data
test: add CVI calculation fixtures
```

---

# 68. Implementation Roadmap

## Phase 0 — Foundation

1. Create monorepo.
2. Configure pnpm/Turborepo.
3. Configure TypeScript.
4. Create React/Vite frontend.
5. Create Express API.
6. Create FastAPI climate engine.
7. Configure PostgreSQL/PostGIS.
8. Configure Docker.
9. Add shared packages.
10. Add `.env.example`.

**Done when:** all services start locally and health checks pass.

## Phase 1 — Auth/RBAC

1. User model.
2. Organization model.
3. Login.
4. Logout.
5. Session/token.
6. RBAC middleware.
7. Officer role.
8. Analyst role.
9. Applicant role.
10. Admin role.

## Phase 2 — MSME + Financial Twin

1. MSME CRUD.
2. Case creation.
3. Financial baseline.
4. Expense categories.
5. Energy-cost model.
6. Debt-service input.
7. Cash-flow calculation.
8. Cash-buffer calculation.
9. Financial dashboard.
10. Tests.

## Phase 3 — Climate Data

1. Coordinate validation.
2. Geocoding.
3. Weather adapter.
4. Weather cache.
5. Climate snapshot.
6. Heat features.
7. Flood features.
8. Cyclone features.
9. Data freshness.
10. Error/fallback behavior.

## Phase 4 — Geospatial/Satellite

1. PostGIS geometry.
2. Risk-grid structure.
3. Hazard polygons.
4. Feature lookup.
5. Sentinel ingestion interface.
6. Pre-processing stub.
7. NDVI/index pipeline.
8. Built-up proxy.
9. Water proxy.
10. Grid aggregation.

## Phase 5 — CVI

1. Normalize features.
2. Hazard score.
3. Sensitivity score.
4. Infrastructure score.
5. Adaptive-capacity score.
6. Weighted CVI.
7. Risk bands.
8. Driver extraction.
9. Model versioning.
10. Snapshot persistence.

## Phase 6 — Green Project

1. Project categories.
2. CAPEX input.
3. Baseline energy.
4. Tariff input.
5. Efficiency assumption.
6. Savings.
7. Maintenance.
8. Payback.
9. Cash-flow effect.
10. Resilience factor.

## Phase 7 — GVS

1. Cost-improvement score.
2. Cash-flow score.
3. Payback score.
4. Resource reduction score.
5. Resilience score.
6. Implementation score.
7. GVS calculation.
8. Explanation.
9. Confidence.
10. Snapshot persistence.

## Phase 8 — Scenario Engine

1. Scenario model.
2. Base case.
3. Heat stress.
4. Rainfall stress.
5. Tariff stress.
6. Revenue stress.
7. Efficiency stress.
8. Cash-flow result.
9. CVI stress.
10. GVS sensitivity.

## Phase 9 — Evidence + Copilot + Reports

1. Evidence upload.
2. Verification status.
3. Evidence quality.
4. Copilot endpoint.
5. Prompt builder.
6. Guardrails.
7. Summary.
8. Evidence gaps.
9. Report data model.
10. PDF generation.

## Phase 10 — Portfolio

1. Portfolio metrics.
2. District climate map.
3. Sector exposure.
4. GVS distribution.
5. Green-project pipeline.
6. High-CVI concentration.
7. Evidence quality.
8. Stress-test summary.
9. Export.
10. Tests.

## Phase 11 — Security/Reliability

1. Rate limits.
2. File validation.
3. Access policies.
4. Audit log.
5. Health checks.
6. Logging.
7. Monitoring.
8. Backup procedure.
9. Failure testing.
10. Security review.

## Phase 12 — Deployment/Demo

1. Seed demo data.
2. Load demo scenarios.
3. End-to-end QA.
4. Production build.
5. Frontend deploy.
6. API deploy.
7. Climate engine deploy.
8. Copilot deploy.
9. Production DB migration.
10. Final demo rehearsal.

---

# 69. Build Rule

Every implementation step follows:

```text
IMPLEMENT
   ↓
RUN
   ↓
TEST
   ↓
FIX
   ↓
DOCUMENT
   ↓
COMMIT
```

Never move to a dependent phase with broken functionality.

---

# 70. Grand-Finale Extensibility

Keep all important assumptions configurable:

```text
CVI weights
GVS weights
hazard thresholds
sector sensitivities
adaptive-capacity factors
project categories
scenario definitions
review thresholds
evidence requirements
```

Store configuration versions, for example:

```text
CVI-CONFIG-1.0
GVS-CONFIG-1.0
STRESS-CONFIG-1.0
```

The final case study can then change without rewriting the architecture.

---

# 71. MVP vs Advanced Prototype

## MVP

Must include:

```text
MSME profile
Loan case
Financial Twin
Weather integration
CVI
Green Project Analyzer
GVS
What-if simulator
Officer dashboard
AI explanation
Report
```

## Advanced

Add:

```text
PostGIS
Sentinel-derived features
portfolio climate map
hazard layers
model registry
evidence-quality engine
stress testing
data provenance
full audit trail
```

---

# 72. Anti-Patterns

Do not waste MVP time on:

```text
blockchain
NFTs
large microservice mesh
raw satellite inference in browser
huge deep-learning models
LLM-generated credit scores
automatic loan approval/rejection
generic chatbot as the core product
```

Every feature must improve one of:

```text
CVI
GVS
Scenario Analysis
Evidence Quality
Officer Review
```

---

# 73. Final Architecture

```text
                              CLIMATETWIN
                                   │
        ┌──────────────────────────┼─────────────────────────┐
        │                          │                         │
        ▼                          ▼                         ▼
   MSME PORTAL               OFFICER PORTAL           PORTFOLIO PORTAL
        │                          │                         │
        └──────────────────────────┼─────────────────────────┘
                                   ▼
                           REACT + VITE WEB
                                   │
                                   ▼
                        NODE + EXPRESS API
                                   │
        ┌───────────────┬──────────┼──────────┬───────────────┐
        ▼               ▼          ▼          ▼               ▼
   Loan Cases      Financial    Evidence    Portfolio      Reports
                    Twin
        │
        ├───────────────┐
        ▼               ▼
 Climate Engine      Green Engine
        │               │
   ┌────┼────┐      ┌───┼─────┐
   ▼    ▼    ▼      ▼   ▼     ▼
 Weather Flood Cyclone CAPEX Payback CashFlow
   │
   ▼
PostGIS + Climate Feature Store
   │
   ├── Hazard Layers
   ├── Weather Features
   └── Satellite Features
            │
            ▼
       CVI / GVS / Stress Models
            │
            ▼
       Explainability Layer
            │
            ▼
       Officer Copilot
            │
            ▼
       Case Intelligence Report
            │
            ▼
       Human Underwriting
```

---

# 74. Golden Demo Workflow

The final live demo should be deterministic and pre-seeded.

```text
1. Login as Credit Officer
2. Open Himalayan Textiles
3. Open/create a green-loan case
4. Review Financial Twin
5. Review location and climate map
6. Calculate CVI
7. Open green project
8. Show baseline vs projected energy cost
9. Calculate payback
10. Calculate GVS
11. Run heat + tariff stress scenario
12. Open evidence quality
13. Ask Copilot for summary
14. Show evidence gaps
15. Generate Case Intelligence Report
16. Record human review action
```

Target live-demo time: **under 3 minutes**.

---

# 75. Definition of Done

## Core

- [ ] Authentication works.
- [ ] RBAC works.
- [ ] MSME can be created.
- [ ] Loan case can be created.
- [ ] Financial Twin works.
- [ ] Climate data loads.
- [ ] CVI calculates.
- [ ] GVS calculates.
- [ ] Scenario simulator works.
- [ ] Evidence workflow works.
- [ ] Copilot works.
- [ ] Report works.
- [ ] Audit trail works.

## Climate

- [ ] Coordinates validated.
- [ ] Hazard features available.
- [ ] Model version visible.
- [ ] Data timestamp visible.
- [ ] Top drivers visible.

## Green project

- [ ] CAPEX supported.
- [ ] Baseline supported.
- [ ] Savings calculated.
- [ ] Payback calculated.
- [ ] Cash-flow effect shown.
- [ ] GVS explained.

## Reliability

- [ ] Missing data is handled.
- [ ] External API failure is handled.
- [ ] AI failure has fallback.
- [ ] No secrets are exposed.
- [ ] Golden path has E2E coverage.

---

# 76. Final Product Positioning

## One line

> **ClimateTwin helps MSME lenders understand both the climate vulnerability of a business and the economic viability of the green investment they are financing.**

## The three-question story

```text
1. Where is the business vulnerable?
2. What does the proposed green investment change?
3. What evidence should the officer verify?
```

## The product equation

```text
Climate Risk
+
Financial Reality
+
Green Project Economics
+
Explainable Evidence
=
Climate-aware Human Decision Support
```

---

# 77. Final Engineering Principles

1. The browser never owns provider secrets.
2. The browser never directly writes to PostgreSQL.
3. LLMs never calculate authoritative CVI/GVS values.
4. Every score is versioned.
5. Every score is explainable.
6. Every climate observation has a source/timestamp.
7. Every critical input has provenance.
8. Missing data remains visible.
9. Satellite processing is batch/precomputed wherever possible.
10. Model outputs support human review and do not autonomously approve/reject credit.
11. Re-running the same case under the same data/model versions must be reproducible.
12. The architecture must stay simple enough to demo reliably.

---

# 78. Final Project Identity

**Project Name:** ClimateTwin

**Full Name:** MSME Climate-Risk and Green Viability Intelligence Engine

**Domain:** Climate Tech + Sustainable Finance

**Primary customer:** NBFCs / micro-lenders / sustainable-finance teams

**Core intelligence:**

```text
CVI
+
GVS
+
Scenario Stress Testing
+
Explainability
+
Evidence Quality
```

**Core technical moat:**

```text
Geospatial climate intelligence
+
MSME financial digital twin
+
Green project economics
+
Versioned scoring
+
Human-in-the-loop review
```

**Core demo statement:**

> “Give us an MSME, its location, its financial baseline and a proposed green investment — ClimateTwin shows the physical climate risk, the economic viability of the investment, the stress scenarios, and the evidence a credit officer should verify.”

---

# 79. Source Basis

This project plan is based primarily on the uploaded **RuralMind AI README** and the new ClimateTwin concept supplied for this project.

The uploaded README specifically supports the reuse of role-based portals, a digital financial twin, what-if simulation, AI assistance, weather integration and a Python/scikit-learn ML pipeline. fileciteturn0file0L15-L28 fileciteturn0file0L38-L44 fileciteturn0file0L75-L77

The README does **not** establish that the reference repository already contains PostGIS, Sentinel processing, CVI/GVS models, Node/Express APIs, or the complete green-finance workflow. Those are new architectural additions for ClimateTwin.
