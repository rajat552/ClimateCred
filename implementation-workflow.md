# ClimateTwin — 10-Phase / 100-Step Implementation & Verification Workflow

> **Project:** ClimateTwin — MSME Climate-Risk & Green Viability Intelligence Engine
>
> **Primary source:** `project.md`
>
> **Reference architecture basis:** RuralMind AI README already contains role-based portals, a digital financial twin, what-if simulation, AI assistance, weather integration and a Python/scikit-learn ML pipeline. fileciteturn0file0L15-L28 fileciteturn0file0L38-L44 fileciteturn0file0L75-L77
>
> **Workflow objective:** Build, test, review, commit, push and continuously verify the complete application from an empty repository to a deployable, demo-ready end-to-end system.

---

# 1. Workflow Operating Model

This document is the **execution workflow**, while `project.md` is the **product + architecture specification**.

The implementation must never be:

```text
Build everything
      ↓
Test at the end
      ↓
Discover architecture problems
```

Instead use:

```text
ANALYZE
   ↓
PLAN
   ↓
IMPLEMENT ONE STEP
   ↓
RUN TARGETED TESTS
   ↓
RUN TYPECHECK / LINT
   ↓
REVIEW THE CHANGE
   ↓
RUN REGRESSION TESTS
   ↓
COMMIT
   ↓
PUSH
   ↓
CHECK GIT STATUS / CI
   ↓
UPDATE DOCUMENTATION
   ↓
MOVE TO NEXT STEP
```

---

# 2. Non-Negotiable Rules

## Rule 1 — Never skip the test gate

Every step must have a verification action.

A step is not complete because code compiles.

It is complete only when:

```text
Implementation
+
Targeted test
+
Regression test
+
Code review
+
Git commit
+
Git push
```

## Rule 2 — Never continue with a broken main branch

After every milestone:

```bash
git status
git pull --rebase
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The exact command may be adapted to the repository, but the equivalent checks must pass.

## Rule 3 — Keep changes small

One step should produce one coherent change.

Avoid:

```text
step 23:
auth + UI + database + AI + deployment
```

Prefer:

```text
step 23:
implement RBAC middleware
```

## Rule 4 — Review before commit

Before committing:

```text
What changed?
Why was it changed?
What can break?
What tests prove it works?
What files should NOT have changed?
```

## Rule 5 — No fake success

Never mark a step complete because:

- a UI is visible,
- an API returns `200`,
- mock data appears,
- a button exists.

The full data path must be verified where relevant.

## Rule 6 — No secrets in Git

Never commit:

```text
.env
API keys
database passwords
JWT secrets
AI provider secrets
cloud credentials
private model artifacts
```

## Rule 7 — Preserve the architecture

Follow `project.md`:

```text
Web
 ↓
API
 ↓
Service
 ↓
Repository
 ↓
Database
```

AI / climate:

```text
API
 ↓
integration/client
 ↓
climate-engine / AI service
```

---

# 3. Agent / Developer Execution Loop

Use this exact loop for **every one of the 100 steps**.

## STEP EXECUTION TEMPLATE

### A. Analyze

Before writing code:

1. Read the relevant part of `project.md`.
2. Inspect existing files.
3. Identify dependencies.
4. Identify impacted modules.
5. Identify risks.
6. State what will change.
7. State what will not change.

### B. Implement

Write the smallest correct implementation.

### C. Targeted Test

Run tests specific to the new functionality.

### D. Static Verification

Run:

```bash
pnpm lint
pnpm typecheck
```

For Python services:

```bash
pytest
ruff check .
```

or the project's equivalent configured tools.

### E. Integration Verification

Run the smallest affected integration workflow.

Example:

```text
Auth step
→ registration/login integration test

CVI step
→ case + climate + CVI integration test

GVS step
→ financial baseline + green project + GVS test
```

### F. Review

Check:

```text
Correctness
Architecture
Security
Edge cases
Error handling
Logging
Performance
Maintainability
Tests
Documentation
```

### G. Git

```bash
git status
git diff
git add .
git commit -m "<type>: <description>"
git push origin <branch>
```

### H. Post-Push Verification

Verify:

```text
remote branch updated
CI status
working tree clean
```

---

# 4. Required Verification Levels

Every step is assigned one or more verification levels.

## L1 — Static

```text
Lint
Typecheck
Formatting
```

## L2 — Unit

Business logic tested directly.

## L3 — Integration

Multiple modules work together.

## L4 — E2E

Real user workflow through the UI/API/database.

## L5 — System

Full application across frontend, backend, database, external-service adapters and model services.

Every phase ends with **L5 system verification**.

---

# 5. Golden End-to-End Journey

This is the application's primary health-check workflow.

```text
Login
 ↓
Create / select MSME
 ↓
Create Loan Case
 ↓
Enter Financial Twin
 ↓
Enter Green Project
 ↓
Capture / verify location
 ↓
Fetch Climate Snapshot
 ↓
Calculate CVI
 ↓
Calculate GVS
 ↓
Run Stress Scenario
 ↓
Review Evidence Quality
 ↓
Generate Officer Copilot Summary
 ↓
Generate Case Intelligence Report
 ↓
Review / action
 ↓
Audit trail
```

The implementation workflow must repeatedly test this journey as more features are added.

---

# 6. Phase 1 — Repository, Monorepo & Development Foundation

## Objective

Create the complete technical foundation without implementing product logic.

### Step 1 — Inspect and map the repository

**Actions**

- Read `project.md`.
- Inspect current repository.
- Identify existing files/components from the reference repo if present.
- Create an architecture-to-file mapping.
- Confirm frontend, backend, services, database and test boundaries.

**Test**

```text
Repository structure review
No duplicate/contradictory app entry points
No accidental legacy architecture
```

**Review**

Confirm the implementation matches:

```text
apps/web
apps/api
services/climate-engine
services/ai-copilot
database
ml
data-pipeline
packages
tests
infra
docs
```

**Git**

```bash
git add .
git commit -m "chore: establish project architecture map"
git push
```

---

### Step 2 — Initialize workspace tooling

Implement:

```text
pnpm
workspace
Turborepo
TypeScript configuration
shared linting
formatting
```

**Test**

```bash
pnpm install
pnpm lint
pnpm typecheck
```

**Review**

Check that every workspace resolves independently.

**Git**

```bash
git add .
git commit -m "chore: initialize monorepo tooling"
git push
```

---

### Step 3 — Create web application

Create the frontend shell.

**Expected**

```text
apps/web
```

with:

- routing,
- layout,
- error boundary,
- loading state,
- environment handling.

**Test**

```bash
pnpm --filter web dev
pnpm --filter web build
```

**E2E**

Open:

```text
/
```

and confirm the application renders.

**Git**

```bash
git add .
git commit -m "feat: initialize web application"
git push
```

---

### Step 4 — Create API application

Create Express + TypeScript server.

Required:

```text
health
readiness
error handling
request id
logging
```

**Test**

```http
GET /health
GET /ready
```

**Expected**

```json
{
  "status": "ok"
}
```

**Git**

```bash
git add .
git commit -m "feat: initialize api service"
git push
```

---

### Step 5 — Create climate engine shell

Create Python/FastAPI service.

Endpoints:

```text
/health
/ready
```

**Test**

```bash
pytest
python -m ...
```

and API health check.

**Git**

```bash
git add .
git commit -m "feat: initialize climate engine"
git push
```

---

### Step 6 — Create AI Copilot service boundary

Create provider adapter, even before real AI integration.

Required concept:

```text
CopilotProvider
```

with a mock/local implementation.

**Test**

Request should return schema-valid placeholder output.

**Review**

Ensure no AI API key appears in frontend code.

**Git**

```bash
git add .
git commit -m "feat: establish copilot service boundary"
git push
```

---

### Step 7 — Configure PostgreSQL/PostGIS

Create local database.

Verify:

```text
database connection
PostGIS extension
migration command
health query
```

**Test**

```text
SELECT PostGIS_Version();
```

**Git**

```bash
git add .
git commit -m "chore: configure postgres and postgis"
git push
```

---

### Step 8 — Configure object storage

Use MinIO for local development.

Create buckets:

```text
evidence
reports
avatars
```

**Test**

- upload file,
- retrieve private object through signed URL,
- delete test object.

**Git**

```bash
git add .
git commit -m "feat: configure object storage"
git push
```

---

### Step 9 — Configure Docker Compose

Services:

```text
web
api
climate-engine
ai-copilot
postgres
minio
```

**Test**

```bash
docker compose up --build
```

Then verify all health checks.

**Git**

```bash
git add .
git commit -m "chore: add local container orchestration"
git push
```

---

### Step 10 — Phase 1 system gate

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
docker compose up --build
```

Then verify:

```text
Web → API
API → DB
API → MinIO
API → Climate Engine
API → Copilot
```

### Phase 1 review gate

Must answer:

- Does the architecture match `project.md`?
- Is the repository clean?
- Are there any duplicate application entry points?
- Are secrets excluded?
- Can a fresh developer start the stack?

**Commit**

```bash
git add .
git commit -m "milestone: complete phase 1 foundation"
git push
```

---

# 7. Phase 2 — Identity, RBAC, Organizations & MSMEs

## Objective

Build the identity foundation required by every downstream workflow.

### Step 11 — User model

Implement:

```text
User
Organization
Role
```

Roles:

```text
ADMIN
OFFICER
RISK_ANALYST
PORTFOLIO_MANAGER
APPLICANT
SUSTAINABILITY_ANALYST
```

**Test**

Database constraints and unique email behavior.

**Git**

```bash
git add .
git commit -m "feat: add identity domain"
git push
```

---

### Step 12 — Authentication

Implement:

```text
register
login
logout
refresh/me
```

**Test**

- valid login,
- invalid password,
- expired token,
- refresh,
- logout.

**E2E**

```text
Login UI
→ API
→ DB
→ authenticated dashboard
```

**Git**

```bash
git add .
git commit -m "feat: implement authentication"
git push
```

---

### Step 13 — RBAC

Implement server-side role middleware.

**Test**

Try every protected route with every role.

**Expected**

```text
authorized → 200/allowed
unauthorized → 403
unauthenticated → 401
```

**Git**

```bash
git add .
git commit -m "feat: add role based access control"
git push
```

---

### Step 14 — Organization management

Implement organization CRUD.

**Test**

- create,
- update,
- view,
- permission checks.

**Git**

```bash
git add .
git commit -m "feat: add organization management"
git push
```

---

### Step 15 — MSME model

Implement:

```text
name
sector
business type
location
coordinates
employees
revenue
```

**Test**

Validation:

```text
invalid coordinates
negative revenue
missing sector
duplicate records
```

**Git**

```bash
git add .
git commit -m "feat: add msme domain"
git push
```

---

### Step 16 — MSME UI

Create:

```text
MSME list
MSME detail
Create MSME
Edit MSME
```

**E2E**

```text
Officer login
→ create MSME
→ reopen MSME
→ verify saved data
```

**Git**

```bash
git add .
git commit -m "feat: add msme management ui"
git push
```

---

### Step 17 — Location / geospatial data

Store:

```text
latitude
longitude
PostGIS geography point
```

**Test**

- valid coordinates,
- invalid coordinates,
- reverse lookup,
- PostGIS point persistence.

**Git**

```bash
git add .
git commit -m "feat: add geospatial msme location"
git push
```

---

### Step 18 — Evidence upload foundation

Create evidence upload:

```text
type
file
source
verification status
```

**Test**

- valid PDF/image,
- oversized file,
- invalid extension,
- unauthorized access.

**Git**

```bash
git add .
git commit -m "feat: add evidence upload foundation"
git push
```

---

### Step 19 — Applicant portal foundation

Create applicant experience for:

```text
profile
business details
documents
```

**E2E**

```text
Applicant login
→ view profile
→ update data
→ upload evidence
→ officer sees evidence
```

**Git**

```bash
git add .
git commit -m "feat: add applicant portal foundation"
git push
```

---

### Step 20 — Phase 2 system gate

Full test:

```text
Officer login
→ create organization
→ create MSME
→ add location
→ upload evidence
→ Applicant view
→ permission checks
→ audit log
```

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 2 identity and msme"
git push
```

---

# 8. Phase 3 — Loan Case + Financial Digital Twin

## Objective

Convert an MSME into a finance case and create the financial baseline required by GVS.

### Step 21 — Loan Case model

Fields:

```text
msmeId
officerId
requested amount
tenure
loan type
status
```

**Test**

State validation.

**Git**

```bash
git add .
git commit -m "feat: add loan case domain"
git push
```

---

### Step 22 — Loan Case UI

Implement:

```text
new case
case list
case detail
status
```

**E2E**

```text
MSME
→ create case
→ open case
```

**Git**

```bash
git add .
git commit -m "feat: add loan case workflow"
git push
```

---

### Step 23 — Financial Twin model

Implement:

```text
monthly revenue
operating expenses
energy
water
payroll
raw materials
debt service
cash reserve
seasonality
```

**Test**

Database constraints + validation.

**Git**

```bash
git add .
git commit -m "feat: add financial twin model"
git push
```

---

### Step 24 — Financial calculations

Implement:

```text
operating margin
monthly free cash flow
energy cost ratio
debt service burden
cash buffer
```

**Unit tests**

Include:

- zero debt,
- high expenses,
- missing optional fields,
- low cash reserve.

**Git**

```bash
git add .
git commit -m "feat: implement financial twin calculations"
git push
```

---

### Step 25 — Financial Twin UI

Create cards/charts:

```text
Revenue
Expenses
Free Cash Flow
Debt Service
Energy Cost
Cash Buffer
```

**Test**

Verify UI values equal API values.

**Git**

```bash
git add .
git commit -m "feat: add financial twin dashboard"
git push
```

---

### Step 26 — Historical trend

Allow multiple monthly periods.

**Test**

- chronological sorting,
- missing months,
- duplicate month rejection,
- trend calculation.

**Git**

```bash
git add .
git commit -m "feat: add financial history and trends"
git push
```

---

### Step 27 — Data quality for finance

Create:

```text
financial data completeness
```

Show:

```text
Complete
Partial
Missing
```

**Test**

Known incomplete fixture.

**Git**

```bash
git add .
git commit -m "feat: add financial data quality checks"
git push
```

---

### Step 28 — Financial evidence linking

Link financial fields to uploaded evidence.

Example:

```text
energyCost
→ electricity bill
```

**Test**

Evidence verification changes data quality.

**Git**

```bash
git add .
git commit -m "feat: link financial values to evidence"
git push
```

---

### Step 29 — Financial API integration test

Full path:

```text
Case
→ financial baseline
→ calculation
→ persistence
→ dashboard
```

**Git**

```bash
git add .
git commit -m "test: add financial twin integration coverage"
git push
```

---

### Step 30 — Phase 3 system gate

Run the first true financial end-to-end test:

```text
Login
→ MSME
→ Loan Case
→ Financial Twin
→ Save
→ Refresh
→ Values persist
→ Calculations match
→ Evidence status visible
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 3 financial twin"
git push
```

---

# 9. Phase 4 — Climate Data & Geospatial Intelligence

## Objective

Build the data foundation required for CVI.

### Step 31 — Climate provider abstraction

Create:

```text
ClimateProvider
```

and adapters.

Never couple business logic directly to one provider.

**Test**

Mock provider + integration provider.

**Git**

```bash
git add .
git commit -m "feat: add climate provider abstraction"
git push
```

---

### Step 32 — Weather integration

Integrate configured weather provider.

**Test**

- valid location,
- provider timeout,
- invalid API key,
- malformed data,
- cache hit.

**Git**

```bash
git add .
git commit -m "feat: integrate weather data provider"
git push
```

---

### Step 33 — Climate cache

Cache by:

```text
latitude/longitude/grid
timestamp
provider
```

**Test**

Repeated call should use cache.

**Git**

```bash
git add .
git commit -m "feat: add climate data caching"
git push
```

---

### Step 34 — Climate Snapshot

Persist:

```text
temperature
rainfall
extreme event features
provider
timestamp
```

**Test**

Fresh and stale snapshot cases.

**Git**

```bash
git add .
git commit -m "feat: persist climate snapshots"
git push
```

---

### Step 35 — Heat features

Implement:

```text
average max temperature
extreme heat days
temperature anomaly
```

**Unit tests**

Use fixed fixture data.

**Git**

```bash
git add .
git commit -m "feat: implement heat risk features"
git push
```

---

### Step 36 — Flood features

Implement available:

```text
rainfall intensity
historical precipitation indicators
hazard layer lookup
```

**Test**

Point-to-grid/polygon lookup.

**Git**

```bash
git add .
git commit -m "feat: implement flood exposure features"
git push
```

---

### Step 37 — Cyclone features

Implement configured cyclone/wind features.

**Test**

Coastal vs inland fixtures.

**Git**

```bash
git add .
git commit -m "feat: implement cyclone exposure features"
git push
```

---

### Step 38 — PostGIS feature lookup

Implement:

```text
MSME point
→ hazard geometry
→ feature profile
```

**Test**

Boundary cases and missing geometry.

**Git**

```bash
git add .
git commit -m "feat: add postgis climate feature lookup"
git push
```

---

### Step 39 — Climate map

Display:

```text
MSME location
risk layer
case selection
```

**E2E**

Officer opens map and selects case.

**Git**

```bash
git add .
git commit -m "feat: add climate risk map"
git push
```

---

### Step 40 — Phase 4 system gate

Test:

```text
MSME location
→ climate provider
→ cache
→ climate snapshot
→ geospatial lookup
→ map
```

Failure simulation:

```text
provider unavailable
```

Expected:

```text
clear error + cached/stale status if available
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 4 climate foundation"
git push
```

---

# 10. Phase 5 — Climate Vulnerability Index (CVI)

## Objective

Create a transparent, versioned climate vulnerability engine.

### Step 41 — CVI feature schema

Define:

```text
hazard exposure
business sensitivity
infrastructure exposure
adaptive capacity
```

**Test**

Schema rejects incomplete inputs.

**Git**

```bash
git add .
git commit -m "feat: define cvi feature schema"
git push
```

---

### Step 42 — Feature normalization

Normalize to:

```text
0–100
```

**Test**

- min,
- max,
- out-of-range,
- missing values.

**Git**

```bash
git add .
git commit -m "feat: add cvi feature normalization"
git push
```

---

### Step 43 — Hazard scoring

Calculate:

```text
heat
flood
cyclone
```

**Test**

Known fixtures with expected ranges.

**Git**

```bash
git add .
git commit -m "feat: implement cvi hazard scoring"
git push
```

---

### Step 44 — Business sensitivity score

Inputs:

```text
sector
energy dependency
water dependency
transport dependency
operating conditions
```

**Test**

Sector fixture matrix.

**Git**

```bash
git add .
git commit -m "feat: implement business sensitivity scoring"
git push
```

---

### Step 45 — Infrastructure score

Implement:

```text
power reliability
water access
road access
facility exposure
```

**Test**

High/low resilience fixtures.

**Git**

```bash
git add .
git commit -m "feat: implement infrastructure exposure scoring"
git push
```

---

### Step 46 — Adaptive-capacity score

Implement:

```text
backup power
insurance
cash reserve
backup supplier
continuity plan
```

**Test**

Mitigation should reduce effective vulnerability.

**Git**

```bash
git add .
git commit -m "feat: implement adaptive capacity scoring"
git push
```

---

### Step 47 — CVI engine

Implement weighted formula.

**Test**

Manually calculated fixtures must match engine output.

**Git**

```bash
git add .
git commit -m "feat: implement cvi engine"
git push
```

---

### Step 48 — CVI explanation engine

Return:

```text
score
risk band
top drivers
mitigating factors
```

**Test**

Explanation must reference real inputs.

**Git**

```bash
git add .
git commit -m "feat: add explainable cvi output"
git push
```

---

### Step 49 — CVI persistence/versioning

Persist:

```text
model version
data timestamp
score
components
```

**Test**

Historical CVI snapshots remain immutable.

**Git**

```bash
git add .
git commit -m "feat: add versioned cvi snapshots"
git push
```

---

### Step 50 — Phase 5 system gate

Golden CVI path:

```text
Case
→ location
→ climate data
→ features
→ CVI
→ explanation
→ persistence
→ UI
```

Test stale-data and missing-data paths.

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 5 cvi engine"
git push
```

---

# 11. Phase 6 — Green Project Economics & GVS

## Objective

Quantify the economic and resilience viability of the proposed green investment.

### Step 51 — Green project model

Support categories:

```text
solar
efficient loom
motor
HVAC
dryer
cold storage
LED
boiler
biogas
water efficiency
```

**Test**

Project schema validation.

**Git**

```bash
git add .
git commit -m "feat: add green project domain"
git push
```

---

### Step 52 — Baseline energy model

Inputs:

```text
monthly kWh
tariff
energy cost
```

**Test**

Known bill calculation.

**Git**

```bash
git add .
git commit -m "feat: add energy baseline model"
git push
```

---

### Step 53 — Project savings

Implement:

```text
baseline cost
-
projected cost
=
monthly savings
```

**Test**

Expected calculation fixtures.

**Git**

```bash
git add .
git commit -m "feat: calculate green project savings"
git push
```

---

### Step 54 — Payback engine

Implement:

```text
CAPEX / monthly savings
```

Handle:

```text
zero savings
variable savings
maintenance costs
```

**Test**

Edge cases.

**Git**

```bash
git add .
git commit -m "feat: implement green project payback"
git push
```

---

### Step 55 — Cash-flow uplift

Compare:

```text
baseline FCF
vs
projected FCF
```

**Test**

Savings must flow into financial model.

**Git**

```bash
git add .
git commit -m "feat: connect green project to cash flow"
git push
```

---

### Step 56 — Resource reduction

Add:

```text
energy reduction
water reduction
material/resource reduction
```

**Test**

Units are explicit.

**Git**

```bash
git add .
git commit -m "feat: add resource reduction metrics"
git push
```

---

### Step 57 — Resilience benefit

Implement configurable resilience factors.

**Test**

Resilience should influence GVS without falsely changing financial savings.

**Git**

```bash
git add .
git commit -m "feat: add green project resilience benefit"
git push
```

---

### Step 58 — GVS engine

Implement weighted:

```text
cost improvement
cash-flow improvement
payback
resource reduction
resilience
implementation confidence
```

**Test**

Manually verified score fixtures.

**Git**

```bash
git add .
git commit -m "feat: implement gvs engine"
git push
```

---

### Step 59 — GVS UI + explanation

Display:

```text
GVS
components
drivers
confidence
data quality
```

**E2E**

Green project entered → GVS updates.

**Git**

```bash
git add .
git commit -m "feat: add explainable gvs dashboard"
git push
```

---

### Step 60 — Phase 6 system gate

Run:

```text
Case
→ Financial Twin
→ Green Project
→ Energy baseline
→ Savings
→ Payback
→ Cash-flow uplift
→ GVS
→ Explanation
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 6 green viability"
git push
```

---

# 12. Phase 7 — Scenario Engine, Evidence Quality & Stress Testing

## Objective

Make the platform useful under changing assumptions rather than only a static score generator.

### Step 61 — Scenario input schema

Support:

```text
energy tariff
revenue
heat days
rainfall severity
project efficiency
CAPEX
debt service
```

**Test**

Schema validation.

**Git**

```bash
git add .
git commit -m "feat: define scenario inputs"
git push
```

---

### Step 62 — Base scenario

Create:

```text
BASE
```

**Test**

Base result must reproduce current case values.

**Git**

```bash
git add .
git commit -m "feat: add base scenario"
git push
```

---

### Step 63 — Climate stress scenario

Implement:

```text
mild
moderate
severe
```

**Test**

Increasing heat/rainfall stress changes configured outputs monotonically where expected.

**Git**

```bash
git add .
git commit -m "feat: add climate stress scenarios"
git push
```

---

### Step 64 — Financial stress scenario

Implement:

```text
revenue shock
expense shock
tariff shock
debt-service shock
```

**Test**

Cash flow responds correctly.

**Git**

```bash
git add .
git commit -m "feat: add financial stress scenarios"
git push
```

---

### Step 65 — Project sensitivity

Vary:

```text
efficiency
CAPEX
maintenance
tariff
```

**Test**

Payback/GVS recalculates.

**Git**

```bash
git add .
git commit -m "feat: add green project sensitivity"
git push
```

---

### Step 66 — Scenario persistence

Store:

```text
inputs
outputs
model versions
createdBy
timestamp
```

**Test**

Reload scenario and reproduce results.

**Git**

```bash
git add .
git commit -m "feat: persist scenario runs"
git push
```

---

### Step 67 — Scenario UI

Create sliders/forms and output cards.

**Test**

UI and API stay synchronized.

**Git**

```bash
git add .
git commit -m "feat: add scenario simulator ui"
git push
```

---

### Step 68 — Evidence quality score

Calculate:

```text
financial evidence
climate freshness
location confidence
project assumptions
document completeness
```

**Test**

Known evidence fixtures.

**Git**

```bash
git add .
git commit -m "feat: add evidence quality scoring"
git push
```

---

### Step 69 — Missing-data workflow

Implement:

```text
missing evidence
→ evidence request
→ upload
→ verification
→ recalculation
```

**E2E**

Missing electricity bill prevents a fully validated GVS and triggers evidence required.

**Git**

```bash
git add .
git commit -m "feat: add evidence gap workflow"
git push
```

---

### Step 70 — Phase 7 system gate

Run:

```text
Case
→ Base
→ Climate stress
→ Financial stress
→ Project sensitivity
→ Evidence quality
→ Missing evidence
→ Recalculate
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 7 scenarios and evidence"
git push
```

---

# 13. Phase 8 — Officer Copilot, Reports, Portfolio & Audit

## Objective

Turn model outputs into an officer-ready decision-support product.

### Step 71 — Copilot prompt builder

Create backend prompt builder using only verified case data.

**Guardrails**

```text
No invented numbers
No score modification
No loan approval/rejection
Label assumptions
```

**Test**

Prompt contains expected structured data.

**Git**

```bash
git add .
git commit -m "feat: add copilot prompt builder"
git push
```

---

### Step 72 — Copilot summary

Return:

```text
summary
key risks
project strengths
evidence gaps
questions
```

**Test**

Schema validation + mocked provider.

**Git**

```bash
git add .
git commit -m "feat: add officer copilot summary"
git push
```

---

### Step 73 — AI provider integration

Connect configured provider.

**Test**

- normal response,
- timeout,
- rate limit,
- malformed response,
- provider unavailable.

**Fallback**

Return deterministic template summary where possible.

**Git**

```bash
git add .
git commit -m "feat: integrate copilot provider"
git push
```

---

### Step 74 — Case Intelligence Report

Create report data model.

Include:

```text
MSME
loan
financial
CVI
GVS
scenarios
evidence
data quality
drivers
model versions
```

**Test**

Report data equals source case data.

**Git**

```bash
git add .
git commit -m "feat: build case intelligence report"
git push
```

---

### Step 75 — PDF generation

Render report server-side.

**Test**

PDF:

- opens,
- contains required sections,
- does not expose secrets,
- shows model versions.

**Git**

```bash
git add .
git commit -m "feat: add case report pdf generation"
git push
```

---

### Step 76 — Audit trail

Audit:

```text
case creation
data edits
score generation
evidence verification
scenario runs
report generation
officer action
```

**Test**

Sensitive action creates audit event.

**Git**

```bash
git add .
git commit -m "feat: add case audit trail"
git push
```

---

### Step 77 — Officer review actions

Implement:

```text
Proceed to Human Underwriting
Additional Evidence Required
Enhanced Climate Due Diligence
```

**Test**

Rules are server-side and configurable.

**Git**

```bash
git add .
git commit -m "feat: add officer review actions"
git push
```

---

### Step 78 — Portfolio overview

Implement:

```text
case count
high CVI
average CVI
average GVS
data-quality distribution
```

**Test**

Aggregate fixtures.

**Git**

```bash
git add .
git commit -m "feat: add portfolio overview"
git push
```

---

### Step 79 — Portfolio climate map

Show aggregate spatial risk.

**Test**

Only authorized users can access portfolio-level information.

**Git**

```bash
git add .
git commit -m "feat: add portfolio climate map"
git push
```

---

### Step 80 — Phase 8 system gate

Complete:

```text
Case
→ CVI
→ GVS
→ Scenarios
→ Evidence
→ Copilot
→ Report
→ Audit
→ Officer action
→ Portfolio
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 8 intelligence workflow"
git push
```

---

# 14. Phase 9 — Security, Observability, UX Polish & Production Hardening

## Objective

Make the platform reliable enough for judging and deployment.

### Step 81 — API security hardening

Implement:

```text
rate limiting
secure headers
input validation
CORS
request IDs
```

**Test**

Unauthorized and malformed requests.

**Git**

```bash
git add .
git commit -m "security: harden api boundaries"
git push
```

---

### Step 82 — File security

Validate:

```text
type
size
extension
content signature
```

Use private storage.

**Test**

Malicious/invalid fixtures.

**Git**

```bash
git add .
git commit -m "security: harden evidence uploads"
git push
```

---

### Step 83 — Secret management

Audit source for:

```text
API keys
JWT secrets
DB credentials
```

**Test**

```bash
git grep -n "API_KEY"
```

or equivalent secret scan.

**Git**

```bash
git add .
git commit -m "security: remove exposed credentials and harden env"
git push
```

---

### Step 84 — Logging

Add structured logs:

```text
requestId
userId
route
status
latency
errorCode
```

**Test**

Generate request and inspect log.

**Git**

```bash
git add .
git commit -m "feat: add structured observability logging"
git push
```

---

### Step 85 — Error boundaries and API error UX

Frontend:

```text
loading
empty
error
retry
```

Backend:

```text
structured error contract
```

**Test**

Force backend failures.

**Git**

```bash
git add .
git commit -m "feat: improve application error handling"
git push
```

---

### Step 86 — Performance pass

Measure:

```text
dashboard
case page
CVI
GVS
scenario
report
```

**Test**

Record baseline and optimized timings.

**Git**

```bash
git add .
git commit -m "perf: optimize critical user flows"
git push
```

---

### Step 87 — Responsive UX

Test:

```text
desktop
tablet
mobile
```

**Review**

No critical action should require horizontal scrolling.

**Git**

```bash
git add .
git commit -m "feat: polish responsive dashboard experience"
git push
```

---

### Step 88 — Accessibility pass

Check:

```text
keyboard navigation
focus state
labels
contrast
semantic buttons
form errors
```

**Git**

```bash
git add .
git commit -m "fix: improve accessibility across critical flows"
git push
```

---

### Step 89 — Production deployment

Deploy:

```text
web
api
climate-engine
copilot
database
storage
```

**Test**

Production health checks.

**Git**

```bash
git add .
git commit -m "chore: prepare production deployment"
git push
```

---

### Step 90 — Phase 9 system gate

Run production-like:

```text
smoke test
security test
E2E
build
health checks
```

**Milestone**

```bash
git add .
git commit -m "milestone: complete phase 9 hardening and deployment"
git push
```

---

# 15. Phase 10 — Final Validation, Demo, QA & Release

## Objective

Prove the complete system works from a clean environment.

### Step 91 — Fresh environment install

Start from a clean environment.

Run:

```bash
git clone <repo>
cd climatetwin
pnpm install
```

**Test**

No undocumented manual setup.

**Git**

```bash
git add .
git commit -m "test: validate fresh environment setup"
git push
```

---

### Step 92 — Database migration test

Run:

```bash
pnpm db:migrate
pnpm db:seed
```

**Test**

Fresh database reaches usable state.

**Git**

```bash
git add .
git commit -m "test: validate reproducible database setup"
git push
```

---

### Step 93 — Full automated suite

Run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
```

For Python:

```bash
pytest
ruff check .
```

No critical failures allowed.

**Git**

```bash
git add .
git commit -m "test: run full automated quality suite"
git push
```

---

### Step 94 — Full golden-path E2E

Run exactly:

```text
Login
→ MSME
→ Case
→ Financial Twin
→ Green Project
→ Climate
→ CVI
→ GVS
→ Scenario
→ Evidence
→ Copilot
→ Report
→ Review
→ Audit
```

Record the result.

**Git**

```bash
git add .
git commit -m "test: verify complete golden user journey"
git push
```

---

### Step 95 — Failure-path E2E

Test:

```text
invalid login
missing coordinates
climate API failure
AI timeout
missing utility bill
invalid project assumptions
unauthorized access
file upload failure
report failure
```

Expected:

```text
graceful handling
+
no corrupted state
+
clear user feedback
```

**Git**

```bash
git add .
git commit -m "test: verify critical failure paths"
git push
```

---

### Step 96 — Data consistency audit

Verify:

```text
Financial Twin values
        ↓
GVS inputs

Climate Snapshot
        ↓
CVI inputs

CVI/GVS
        ↓
Report

Report
        ↓
Audit trail
```

No values should disagree.

**Git**

```bash
git add .
git commit -m "test: audit cross-module data consistency"
git push
```

---

### Step 97 — Security audit

Check:

```text
authentication
authorization
secrets
uploads
API exposure
CORS
rate limiting
database access
```

**Git**

```bash
git add .
git commit -m "security: complete release security audit"
git push
```

---

### Step 98 — Judge demo data and demo reset

Create one perfect deterministic case.

Requirements:

```text
known MSME
known location
known financial history
known project
known climate data
known CVI
known GVS
known scenario
known evidence
```

Create:

```text
Reset Demo
```

**Test**

Run demo repeatedly.

Every run must produce the same expected flow.

**Git**

```bash
git add .
git commit -m "feat: finalize deterministic judge demo scenario"
git push
```

---

### Step 99 — Documentation and release candidate

Update:

```text
README.md
project.md
API documentation
deployment docs
demo script
environment documentation
```

Create release checklist.

**Git**

```bash
git add .
git commit -m "docs: finalize release documentation"
git push
```

---

### Step 100 — Final release gate

Run everything one final time.

```bash
git status
git pull --rebase

pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm test:integration
pnpm test:e2e
pnpm build
```

Python:

```bash
pytest
ruff check .
```

Infrastructure:

```bash
docker compose up --build
```

Production:

```text
health
readiness
login
golden path
report
audit
```

Then:

```bash
git tag v1.0.0-climatetwin
git push origin main --tags
```

Final commit:

```bash
git add .
git commit -m "release: ClimateTwin v1.0.0"
git push
```

---

# 16. Continuous End-to-End Verification Matrix

The application must not wait until Phase 10 to discover integration failures.

Use this expanding matrix.

| Phase | Golden path coverage |
|---|---|
| 1 | Web → API → DB/service health |
| 2 | Login → MSME → evidence |
| 3 | Login → MSME → Case → Financial Twin |
| 4 | Case → Location → Climate Snapshot |
| 5 | Case → Climate → CVI |
| 6 | Case → Financial → Green Project → GVS |
| 7 | Case → CVI/GVS → Scenario → Evidence |
| 8 | Full case → Copilot → Report → Audit |
| 9 | Full case under production-like conditions |
| 10 | Fresh-install full system + release validation |

---

# 17. Regression Test Rules

After every new feature:

### Existing features that must remain checked

If you modify:

```text
Auth
```

run:

```text
Auth regression
MSME regression
Case regression
```

If you modify:

```text
Financial Twin
```

run:

```text
Financial regression
GVS regression
Scenario regression
Report regression
```

If you modify:

```text
Climate engine
```

run:

```text
Climate regression
CVI regression
Scenario regression
Report regression
```

If you modify:

```text
GVS
```

run:

```text
GVS
Scenario
Report
Officer workflow
```

---

# 18. Per-Step Code Review Checklist

Before every commit, review:

## Correctness

```text
Does the implementation do exactly what this step requires?
```

## Architecture

```text
Is logic in the correct module?
```

## Data

```text
Are validation and constraints correct?
```

## Security

```text
Could unauthorized users access/change this?
```

## Error handling

```text
What happens when the dependency fails?
```

## Edge cases

```text
Null?
Zero?
Negative?
Empty?
Duplicate?
Timeout?
Stale?
Unauthorized?
```

## Tests

```text
Does the test prove behavior rather than merely execute the code?
```

## Documentation

```text
Does project.md or docs need an update?
```

---

# 19. Commit Convention

Use conventional commit categories.

```text
feat:
fix:
test:
refactor:
perf:
security:
docs:
chore:
build:
ci:
```

Examples:

```text
feat: implement cvi engine
test: add cvi boundary test cases
fix: handle stale climate snapshots
security: protect evidence endpoints
perf: cache climate feature lookup
docs: document gvs calculation
```

---

# 20. Push Policy

Every completed step must be pushed.

Required:

```bash
git status
git add <files>
git commit -m "..."
git push
```

Do not accumulate 15 unpushed steps and discover later that:

- the remote is broken,
- files are missing,
- another teammate changed dependencies,
- merge conflicts are huge.

---

# 21. Branch Policy

For a team:

```text
main
feature/auth
feature/financial-twin
feature/climate
feature/cvi
feature/gvs
feature/scenarios
feature/copilot
feature/portfolio
```

Rules:

```text
main = always runnable
feature branch = focused feature
PR = code + tests
merge = after review
```

---

# 22. Daily Development Checklist

Before coding:

```text
□ Pull latest changes
□ Read current task
□ Read affected project.md section
□ Inspect current architecture
□ Identify dependencies
```

After coding:

```text
□ Targeted tests
□ Lint
□ Typecheck
□ Integration test
□ Manual verification
□ Review diff
□ Commit
□ Push
□ Verify remote/CI
```

---

# 23. Phase Completion Checklist

Every phase is complete only if:

```text
□ All 10 steps completed
□ All step tests pass
□ All commits pushed
□ CI passes
□ No known critical bug
□ Documentation updated
□ Regression suite passes
□ Phase E2E passes
□ Phase milestone commit exists
```

---

# 24. Full Application Health Definition

The system is considered **working** only if all of these are true.

## Frontend

```text
□ Login works
□ Navigation works
□ Forms validate
□ API states render
□ Error states render
□ Responsive UI works
```

## API

```text
□ Auth works
□ RBAC works
□ Case APIs work
□ Financial APIs work
□ Climate APIs work
□ CVI APIs work
□ GVS APIs work
□ Scenario APIs work
□ Evidence APIs work
□ Report APIs work
□ Audit APIs work
```

## Climate Engine

```text
□ Climate data ingestion works
□ Feature calculation works
□ CVI works
□ Stress model works
□ Versioning works
```

## GVS

```text
□ Project inputs
□ Baseline
□ Savings
□ Payback
□ Cash-flow
□ Resilience
□ GVS
```

## AI Copilot

```text
□ Context builder
□ Provider
□ Guardrails
□ Schema validation
□ Failure fallback
```

## Database

```text
□ Migration
□ Seed
□ Constraints
□ PostGIS
□ Transactions
```

## Storage

```text
□ Upload
□ Download
□ Permissions
□ File validation
```

---

# 25. Final Golden-Path Acceptance Test

Use this exact manual script before demo/release.

### Actor

```text
Credit Officer
```

### Case

```text
Himalayan Textiles
```

### Action 1

Login.

### Action 2

Open MSME.

### Action 3

Create:

```text
Green Project Loan
```

### Action 4

Enter:

```text
monthly revenue
monthly expenses
energy cost
debt service
cash reserve
```

### Action 5

Add:

```text
energy-efficient machinery
```

### Action 6

Enter:

```text
CAPEX
energy baseline
expected efficiency
maintenance
```

### Action 7

Open climate panel.

Expected:

```text
climate snapshot
```

### Action 8

Calculate CVI.

Expected:

```text
overall score
components
drivers
model version
```

### Action 9

Calculate GVS.

Expected:

```text
score
savings
payback
cash-flow effect
drivers
```

### Action 10

Run heat/tariff stress.

Expected:

```text
cash-flow change
CVI change
GVS sensitivity
```

### Action 11

Open evidence.

Expected:

```text
verified / missing
```

### Action 12

Open Copilot.

Expected:

```text
summary
risks
strengths
evidence gaps
questions
```

### Action 13

Generate report.

Expected:

```text
PDF
```

### Action 14

Select human-review action.

Expected:

```text
case status changes
```

### Action 15

Open audit.

Expected:

```text
complete timeline
```

If any of these fail, the release is **not ready**.

---

# 26. Final Release Checklist

## Product

```text
□ Product flow is complete
□ No placeholder page on golden path
□ No fake score
□ No hidden assumption
```

## Engineering

```text
□ Clean repository
□ Tests pass
□ Build passes
□ Docker works
□ Production works
```

## Data

```text
□ Model versions stored
□ Data timestamps stored
□ Evidence provenance stored
□ Score reproducibility checked
```

## Security

```text
□ No secrets committed
□ RBAC checked
□ Uploads protected
□ Sensitive data protected
```

## AI

```text
□ No score generation by LLM
□ No fabricated values
□ Fallback works
□ Provider failure handled
```

## Demo

```text
□ Demo account
□ Demo case
□ Demo data
□ Demo reset
□ Golden path < 3 min
```

---

# 27. How to Use This Workflow With an AI Coding Agent

Give the coding agent:

```text
1. project.md
2. this implementation-workflow.md
3. repository
```

Then instruct it:

> Work strictly phase-by-phase and step-by-step. Before implementing a step, inspect project.md and the current repository. Do not skip steps. For the current step, identify affected files and dependencies, implement only the requested scope, run targeted tests, run lint and typecheck, run relevant integration/regression tests, review the diff for architecture/security/error-handling issues, fix all discovered issues, commit the step, push the branch, verify the remote/CI status, and then move to the next step. At the end of every phase, run the phase-level end-to-end workflow and fix any regression before starting the next phase. Never claim success without executing the relevant tests. Never expose secrets. Never replace authoritative CVI/GVS calculations with LLM output.

---

# 28. Recommended Agent Execution Format

For every step, the agent should report internally/visibly:

```text
STEP: 47 — Implement CVI Engine

1. ANALYSIS
   - Existing files inspected
   - Dependencies identified
   - Planned files

2. IMPLEMENTATION
   - Files changed
   - Logic added

3. TESTING
   - Unit tests
   - Integration tests
   - Regression tests

4. REVIEW
   - Architecture review
   - Security review
   - Edge-case review

5. RESULT
   - Pass / Fail
   - Issues fixed

6. GIT
   - Commit hash
   - Branch
   - Push status

7. NEXT
   - Step 48
```

This makes progress auditable.

---

# 29. Emergency Rollback Workflow

If a step breaks the application:

```text
Stop
 ↓
Do not continue
 ↓
Identify last green commit
 ↓
Reproduce failure
 ↓
Fix or revert
 ↓
Run regression
 ↓
Push corrected commit
 ↓
Resume workflow
```

Do not bury failures by moving forward.

---

# 30. Final Philosophy

The development objective is not:

> “Finish 100 coding tasks.”

It is:

> **Finish 100 verified increments that collectively form one reliable end-to-end product.**

The required loop is:

```text
BUILD
 ↓
TEST
 ↓
REVIEW
 ↓
INTEGRATE
 ↓
COMMIT
 ↓
PUSH
 ↓
REGRESSION
 ↓
E2E
 ↓
NEXT
```

At the end, ClimateTwin should not merely contain:

```text
CVI page
GVS page
dashboard
AI chatbot
```

It must contain a connected system:

```text
MSME
 ↓
Loan Case
 ↓
Financial Twin
 ↓
Climate Intelligence
 ↓
CVI
 ↓
Green Project Economics
 ↓
GVS
 ↓
Stress Testing
 ↓
Evidence
 ↓
Copilot
 ↓
Report
 ↓
Human Review
 ↓
Audit
```

That connected workflow is the real definition of **“project complete.”**
