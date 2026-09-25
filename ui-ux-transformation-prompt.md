# ClimateTwin — UI/UX Transformation Prompt

## Role

You are a senior UI/UX engineer, product designer, interaction designer, visual designer, and frontend engineer with extensive experience building premium, human-centered B2B SaaS products.

Your task is NOT to blindly redesign the project.

First understand the product like a human product designer, then redesign/refine the existing interface so the UI naturally communicates the product's purpose, industry, users, and value.

---

## 1. Source Files — Read These First

Before making ANY UI change, completely read and understand:

1. `project.md`
2. `implementation-workflow.md`
3. `README.md`
4. The entire existing repository

Treat:

- `project.md` → product and architecture source of truth
- `implementation-workflow.md` → implementation and testing source of truth
- `README.md` → current project documentation that must eventually be updated
- Existing repository → source of current functionality and reusable UI/components

Do NOT start coding before this analysis is complete.

---

## 2. Understand the Product Like a Human

Determine internally:

- What is this product?
- Who uses it?
- Why would they use it?
- What problem does it solve?
- What industry/category does it belong to?
- What emotional feeling should the UI create?
- What kind of company would use this product?
- What information is most important?
- What actions are most important?

For ClimateTwin, understand the product as:

```text
B2B SaaS
+
NBFC / Financial Intelligence
+
MSME
+
Climate Risk
+
Green Finance
+
AI-assisted Decision Support
```

The interface should feel like a serious professional intelligence platform.

It should NOT feel like:

- a generic student dashboard
- a generic admin template
- a simple weather application
- a generic AI chatbot
- a gaming dashboard
- a generic finance app

---

## 3. Audit the Existing UI

Inspect the entire current frontend.

Analyze:

- visual hierarchy
- navigation
- layout
- typography
- colors
- spacing
- cards
- tables
- charts
- forms
- buttons
- icons
- animations
- loading states
- empty states
- error states
- modals
- dashboards
- responsive behavior
- accessibility
- consistency
- information density
- visual storytelling

Identify:

A. UI worth keeping
B. UI worth refining
C. UI that conflicts with ClimateTwin
D. Missing UI
E. Reusable components
F. Components that should be redesigned
G. Pages that should be reorganized

Do not destroy good existing work unnecessarily.

Reuse good components whenever they fit the new product.

---

## 4. Create a Visual Design Direction

Before implementing the redesign, derive a visual direction from the actual project category.

Do NOT randomly choose colors.

Think like a professional product designer.

For ClimateTwin, reason about the visual language associated with:

- climate technology
- sustainable finance
- enterprise risk intelligence
- financial analytics
- geospatial intelligence
- professional B2B SaaS

The design should communicate:

```text
TRUST
+
INTELLIGENCE
+
CLIMATE
+
FINANCIAL PRECISION
+
MODERN TECHNOLOGY
```

Potential visual direction:

- deep navy / charcoal for trust and finance
- restrained green/teal for sustainability
- cool neutrals for dashboards
- amber/orange only for warnings
- red only for genuine high-risk states
- white/light surfaces where readability requires it

Do NOT overuse green simply because the product is climate-related.

Do NOT create a childish "eco" aesthetic.

---

## 5. Build the Design System

Create a consistent design system.

### Color tokens

- primary
- secondary
- background
- surface
- border
- text
- muted text
- success
- warning
- danger
- info

### Typography

- display
- page heading
- section heading
- body
- caption
- metric
- table

### Spacing

- page spacing
- card spacing
- section spacing
- form spacing

### Component styling

- buttons
- cards
- badges
- inputs
- tables
- tabs
- modals
- dropdowns
- tooltips
- charts

The entire application must feel like one product.

---

## 6. Human-Centered Information Hierarchy

Design around the actual workflow:

```text
MSME
↓
Loan Case
↓
Financial Twin
↓
Climate Risk
↓
CVI
↓
Green Project
↓
GVS
↓
Scenario Simulator
↓
Evidence
↓
Officer Copilot
↓
Case Report
↓
Human Review
↓
Audit Trail
```

The user should always understand:

- Where am I?
- What am I looking at?
- Why does this matter?
- What should I do next?

---

## 7. Premium Command Center

Design the main dashboard like a real B2B intelligence platform.

Possible sections:

- active loan cases
- climate-risk exposure
- high-CVI cases
- green project pipeline
- average GVS
- evidence quality
- recent activity
- climate map
- alerts
- review queue

Use visual hierarchy instead of giving every metric equal weight.

---

## 8. CVI Experience

Design CVI as a major product feature.

Show:

```text
Climate Vulnerability Index
Overall score
Risk band
Heat
Flood
Cyclone
Business sensitivity
Infrastructure exposure
Adaptive capacity
```

Add:

> Why this score?

Reveal the most important drivers.

Do not make CVI look like an arbitrary number. The user should understand how the score was formed.

---

## 9. GVS Experience

Design GVS as a separate green-project intelligence experience.

Show:

- Project
- CAPEX
- Energy baseline
- Projected savings
- Monthly savings
- Payback
- Cash-flow impact
- Resilience benefit
- GVS

Then visually explain:

> Why is this project viable?

The user should understand the economic logic without reading technical documentation.

---

## 10. Scenario Simulator

Make the simulator highly interactive.

Use:

- sliders
- inputs
- toggles
- scenario cards
- charts
- before/after comparison
- subtle animated transitions

Example inputs:

- Energy tariff
- Revenue
- Heat days
- Project efficiency
- CAPEX

When values change, update:

- Cash Flow
- CVI
- GVS
- Payback
- Stress level

Animation should communicate change, not decorate the page.

---

## 11. Map and Geospatial Visualization

Where location/climate information benefits from visual representation, use a professional map.

Show:

- MSME locations
- climate exposure
- CVI
- geographic concentration
- portfolio risk

Use meaningful colors and legends.

Do not make the map decorative. It must help answer:

> Where is the risk?

---

## 12. Images and Visual Assets

First determine whether an image would genuinely improve a page.

Use images only when they improve:

- storytelling
- context
- onboarding
- product understanding
- empty states
- landing page
- case visualization

If image-generation capability is available and an image is genuinely useful, generate an original visual appropriate for the project.

The generated visual should match:

- ClimateTwin theme
- enterprise aesthetic
- climate + finance category
- typography requirements if text is included
- current color system
- overall product identity

Do NOT add random stock-looking images just to fill space.

Do NOT add images to information-dense dashboards where charts/data are better.

If image generation is unavailable, use a clean designed placeholder/component and document the asset requirement instead of inventing an external URL.

---

## 13. Landing Page

Create/refine a strong landing page that explains the product immediately.

### Hero

> Climate intelligence for better MSME green-finance decisions.

Supporting message:

> Understand physical climate risk, quantify green-project viability, and give credit officers an explainable evidence-backed view of every case.

### How it works

```text
MSME
→ Climate Risk
→ Green Project
→ Intelligence
→ Human Review
```

Then show:

- product preview
- CVI
- GVS
- Financial Twin
- Scenario Analysis
- Officer Copilot
- trust/technology section
- CTA

Do not make the landing page sound like a generic AI startup.

---

## 14. Interaction Design

Every important action needs:

- hover state
- active state
- loading state
- success state
- error state
- disabled state

Forms should provide:

- clear labels
- helpful descriptions
- inline validation
- meaningful errors
- sensible defaults
- confirmation where necessary

Tables should provide:

- sorting
- filtering where useful
- pagination where useful
- clear status indicators

Dashboards should provide:

- skeleton loading
- empty states
- error recovery
- refresh state

---

## 15. Microinteractions

Use subtle interaction:

- number transitions
- chart reveal
- card hover
- tab transition
- modal animation
- map interaction
- progress changes
- scenario update animation

Do not turn the application into an animation showcase.

Professional > flashy.

---

## 16. Responsive Design

Primary target:

**Desktop / Laptop**

Secondary:

**Tablet**

Supporting:

**Mobile Web**

This is a B2B SaaS platform. Do not force the desktop dashboard into a tiny mobile interface.

Adapt intelligently:

- desktop → full dashboard
- tablet → compressed dashboard
- mobile → priority-focused views

All critical actions must remain usable.

---

## 17. Accessibility

Check:

- color contrast
- keyboard navigation
- focus states
- semantic HTML
- form labels
- screen-reader-friendly controls
- chart alternatives
- error messages
- clickable target size

Never communicate risk only through color.

Correct:

```text
High Risk
+
red
+
icon
+
text
```

Not red alone.

---

## 18. Performance

Do not sacrifice performance for aesthetics.

Optimize:

- images
- SVGs
- charts
- animations
- map loading
- code splitting
- lazy loading
- API requests

Do not repeatedly call the same API unnecessarily.

Do not load heavy visual assets before needed.

---

## 19. Implementation Rules

Before changing each page:

1. understand existing page
2. understand `project.md` requirement
3. identify reusable components
4. determine visual intent
5. implement
6. test
7. compare with surrounding pages
8. fix inconsistency
9. run regression test

Never redesign one page in isolation and leave the rest visually inconsistent.

---

## 20. Page-by-Page Priority

Refine in this order:

1. Global design system
2. App shell / navigation
3. Landing page
4. Main dashboard
5. MSME profile
6. Loan Case
7. Financial Twin
8. Climate Risk
9. CVI
10. Green Project
11. GVS
12. Scenario Simulator
13. Evidence
14. Officer Copilot
15. Report
16. Portfolio Intelligence
17. Audit Trail
18. Settings / Admin

Do not move to the next major page if the design system is still inconsistent.

---

## 21. README Update

At the end of the UI transformation, completely re-read `README.md`.

Update it to accurately represent the final project.

README must contain:

```text
# ClimateTwin

What the product is

Problem

Solution

Target users

Core features

CVI

GVS

Financial Twin

Scenario Simulator

Climate Intelligence

Officer Copilot

Evidence

Architecture

Technology stack

Repository structure

Setup

Environment variables

Development

Testing

Production build

Deployment

Screenshots / visual previews if available

Project workflow

Important limitations

Future scope
```

Do not leave old RuralMind/project terminology if it no longer represents the final application.

Do not claim features that do not actually exist.

README must reflect the actual current codebase.

---

## 22. Documentation Consistency

After UI work, check:

- `project.md`
- `implementation-workflow.md`
- `README.md`

Ensure consistent terminology:

```text
ClimateTwin
CVI
GVS
Financial Twin
Green Project
Climate Risk
Officer Copilot
```

If implementation differs from documentation because of an actual code change, update the documentation accordingly.

---

## 23. Final Visual QA

Before declaring UI work complete, inspect every major screen.

Check:

- spacing
- alignment
- typography
- colors
- visual hierarchy
- responsiveness
- charts
- buttons
- forms
- loading states
- error states
- empty states
- icons
- images
- animations
- consistency

Ask:

> Does this feel like a professional product that an NBFC credit officer could actually use?

If not, refine it.

---

## 24. Final Product QA

Make sure UI work has not broken functionality.

Run:

- frontend build
- lint
- typecheck
- unit tests
- integration tests
- E2E tests

Then run the main workflow:

```text
Login
→ MSME
→ Loan Case
→ Financial Twin
→ Climate Data
→ CVI
→ Green Project
→ GVS
→ Scenario
→ Evidence
→ Copilot
→ Report
→ Human Review
→ Audit
```

---

# Final Instruction

Do NOT start by changing colors or components.

FIRST:

1. Analyze `project.md`
2. Analyze `implementation-workflow.md`
3. Analyze `README.md`
4. Analyze the complete existing repository
5. Analyze the current UI
6. Analyze current architecture
7. Analyze reusable components
8. Understand the target users
9. Understand the product category

THEN:

1. Create the visual design direction.
2. Refine the existing frontend intelligently.
3. Preserve good existing work.
4. Replace only what conflicts with the new product.
5. Generate original visual assets only where they genuinely improve the product and only when image-generation capability is available.
6. Make the entire experience intentional, human-centered, interactive, premium, professional, and consistent.
7. Update `README.md` completely so it reflects the actual final ClimateTwin application.
8. Run appropriate tests and regression checks.

The final outcome must be:

> NOT JUST A BEAUTIFUL UI.

It must be:

> A BEAUTIFUL + INTERACTIVE + RESPONSIVE + ACCESSIBLE + FUNCTIONAL + PROFESSIONALLY ARCHITECTED CLIMATETWIN WEB APPLICATION.

Do not claim completion until both the final UI and the complete application workflow have been tested.
