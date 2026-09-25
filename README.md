# ClimateTwin
### Predict • Explain • Underwrite • Prosper
> **MSME Climate-Risk & Green Viability Intelligence Engine for Financial Institutions**

🌐 **Live Local Platform:** [http://localhost:3000](http://localhost:3000) • **API Gateway:** [http://localhost:3001](http://localhost:3001)

---

## 🌍 Executive Summary

**ClimateTwin** is an institutional-grade B2B SaaS platform designed for Non-Banking Financial Companies (NBFCs), commercial banks, and development finance institutions (such as SIDBI and NABARD). It empowers credit and risk officers to underwrite green loans for Micro, Small, and Medium Enterprises (MSMEs) with high confidence by pairing deterministic physical climate hazard scoring with green capex economic viability assessment.

---

## 🚨 The Problem

1. **Unquantified Physical Climate Hazard**: MSMEs face severe operational disruptions and cash-flow shocks from rising heatwaves, unseasonal monsoon floods, and grid blackouts.
2. **Underwriting Uncertainty in Green Capex**: Lenders lack standardized, deterministic models to evaluate the true payback, internal rate of return (IRR), and debt service impact of green transitions (such as rooftop solar, thermal storage, bioenergy, or precision irrigation).
3. **Black-Box AI Skepticism**: Financial institutions cannot rely on generative LLM hallucinations for risk scoring and credit covenants.

---

## 💡 The Solution

ClimateTwin provides an evidence-backed, transparent, dual-engine intelligence platform:

1. **Climate Vulnerability Index (CVI Engine)**:
   - Built on the **ISO 14091:2021** standard.
   - Decomposes physical climate risk into: `(Hazard × Exposure × Sensitivity) ÷ (Adaptive Capacity × 100)`.
   - Incorporates ECMWF ERA5 reanalysis and IMD high-resolution gridded climate data.

2. **Green Viability Score (GVS Engine)**:
   - Aligned with the **GHG Protocol** and Central Electricity Authority (CEA) grid emission baselines.
   - Multi-criteria weighted index: Financial IRR Uplift (40%) + Carbon Mitigation (30%) + Blackout Resilience (20%) + Policy Subsidies (10%).

3. **Dynamic Climate Stress-Test Simulator**:
   - Live interactive multi-hazard sliders (+Heatwave, +Flood, +Diesel/Grid Tariff Spike) with real-time recalculation of stressed Debt Service Coverage Ratios (DSCR) against institutional covenant thresholds (1.20x minimum).

4. **Credit Officer AI Underwriting Copilot**:
   - Server-enforced, zero-client-key LLM narrative synthesizer formulating Credit Appraisal Memos (CAM).

5. **Geospatial & Satellite Evidence Layer**:
   - Sentinel-2 multi-spectral rooftop solar verification and Udyam registry validation.

6. **Regulatory Compliance & Auditability**:
   - Aligned with the Reserve Bank of India (RBI) Green Lending Framework and SEBI BRSR Core.
   - Immutable audit logging for all appraisal modifications and sanction events.

---

## 🏛️ Architecture & Tech Stack

```
                               ┌────────────────────────────────┐
                               │  Web Frontend (React 18 + TS)  │
                               │  Tailwind CSS + Chart.js       │
                               │  Port: 3000                    │
                               └───────────────┬────────────────┘
                                               │ /api
                               ┌───────────────▼────────────────┐
                               │   API Gateway (Express + TS)   │
                               │   Prisma ORM + JWT Auth + RBAC │
                               │   Port: 3001                   │
                               └───┬───────────┬────────────┬───┘
                                   │           │            │
             ┌─────────────────────┘           │            └─────────────────────┐
             ▼                                 ▼                                  ▼
┌───────────────────────────┐     ┌───────────────────────────┐     ┌───────────────────────────┐
│ Climate Engine (FastAPI)  │     │  AI Copilot (FastAPI)     │     │ PostgreSQL + PostGIS      │
│ ERA5/IMD Ensemble Hazard  │     │  Appraisal Synthesis      │     │ MinIO Evidence Store      │
│ Port: 8000                │     │  Port: 8001               │     │ Ports: 5432 / 9000        │
└───────────────────────────┘     └───────────────────────────┘     └───────────────────────────┘
```

---

## 📦 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.0.0` or higher
- **pnpm**: `v9.11.0` or higher (`npm install -g pnpm@9.11.0`)
- **Python**: `3.11+` (for microservices)
- **Docker**: Optional (for complete containerized stack)

### 2. Install Workspace Dependencies
```bash
pnpm install
```

### 3. Run Locally in Development Mode
To start both the **Web Frontend** and **Backend API** concurrently:
```bash
pnpm dev
```

- **Frontend Application:** `http://localhost:3000`
- **Backend API Gateway:** `http://localhost:3001`
- **API Health Endpoint:** `http://localhost:3001/health`

### 4. Build for Production
```bash
pnpm build
```

---

## 🔐 Security & RBAC Roles

ClimateTwin implements institutional Role-Based Access Control:
- **Credit Officer**: Case origination, financial twin modeling, simulation, and memo drafting.
- **Risk Manager**: Portfolio hazard concentration analysis and covenant stress validation.
- **Compliance / Auditor**: Immutable audit trail inspection and regulatory reporting (BRSR/TCFD).
- **System Admin**: Scoring weights configuration, model versioning, and branch management.

---

## 📄 License
Proprietary & Confidential — Designed for Institutional Green Financing.
