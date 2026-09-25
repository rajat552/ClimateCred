// ============================================
// CLIMATETWIN — SHARED DOMAIN TYPES
// ============================================

// ---- Auth ----

export type UserRole =
  | 'ADMIN'
  | 'OFFICER'
  | 'RISK_ANALYST'
  | 'PORTFOLIO_MANAGER'
  | 'APPLICANT'
  | 'SUSTAINABILITY_ANALYST';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  branch?: string;
  district?: string;
  state?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

// ---- MSME ----

export type MsmeSector =
  | 'agriculture'
  | 'dairy'
  | 'textile'
  | 'food_processing'
  | 'manufacturing'
  | 'handicraft'
  | 'retail'
  | 'services'
  | 'construction'
  | 'transport'
  | 'other';

export interface Msme {
  id: string;
  organizationId: string;
  name: string;
  sector: MsmeSector;
  businessType: string;
  location: string;
  latitude: number;
  longitude: number;
  employeeCount?: number;
  annualRevenue?: number;
  createdAt: string;
  updatedAt: string;
}

// ---- Loan Case ----

export type LoanCaseStatus =
  | 'DRAFT'
  | 'DATA_COLLECTION'
  | 'CLIMATE_ANALYSIS'
  | 'GREEN_PROJECT_ANALYSIS'
  | 'SCENARIO_REVIEW'
  | 'OFFICER_REVIEW'
  | 'EVIDENCE_REQUIRED'
  | 'READY_FOR_HUMAN_UNDERWRITING'
  | 'DATA_QUALITY_HOLD'
  | 'WITHDRAWN'
  | 'MODEL_UNAVAILABLE'
  | 'CLOSED';

export type LoanType =
  | 'term_loan'
  | 'working_capital'
  | 'green_finance'
  | 'equipment'
  | 'microfinance';

export interface LoanCase {
  id: string;
  msmeId: string;
  officerId: string;
  loanType: LoanType;
  requestedAmount: number;
  tenureMonths: number;
  status: LoanCaseStatus;
  createdAt: string;
  updatedAt: string;
  // Relations
  msme?: Msme;
  financialTwin?: FinancialTwin;
  greenProject?: GreenProject;
  climateSnapshot?: ClimateSnapshot;
  cviSnapshot?: CviSnapshot;
  gvsSnapshot?: GvsSnapshot;
}

// ---- Financial Twin ----

export interface FinancialTwin {
  id: string;
  loanCaseId: string;
  monthlyRevenue: number;
  monthlyExpenses: number;
  energyCost: number;
  waterCost: number;
  payroll: number;
  rawMaterialCost: number;
  rent: number;
  debtService: number;
  cashReserve: number;
  seasonality?: string;
  updatedAt: string;
  // Computed (returned by API)
  computedMetrics?: FinancialMetrics;
}

export interface FinancialMetrics {
  freeCashFlow: number;
  operatingMargin: number;
  energyCostRatio: number;
  debtServiceBurden: number;
  cashBufferMonths: number;
  dataQuality: DataQualityLevel;
}

// ---- Green Project ----

export type GreenProjectType =
  | 'solar_rooftop'
  | 'efficient_motor'
  | 'efficient_loom'
  | 'efficient_hvac'
  | 'solar_dryer'
  | 'cold_storage_upgrade'
  | 'led_retrofit'
  | 'efficient_boiler'
  | 'biogas'
  | 'water_efficiency'
  | 'waste_heat_recovery'
  | 'ev_equipment'
  | 'other';

export interface GreenProject {
  id: string;
  loanCaseId: string;
  projectType: GreenProjectType;
  capex: number;
  expectedEnergyReduction: number; // kWh/month
  expectedResourceReduction?: number;
  expectedMaintenanceCost: number; // monthly
  baselineEnergyUse: number; // kWh/month
  baselineEnergyTariff: number; // ₹/kWh
  projectedEnergyUse: number; // kWh/month
  usefulLifeYears: number;
  vendor?: string;
  implementationTimeMonths?: number;
  implementationConfidence?: ImplementationConfidence;
  createdAt: string;
  updatedAt: string;
  // Computed
  economics?: GreenProjectEconomics;
}

export interface GreenProjectEconomics {
  baselineEnergyCost: number; // monthly
  projectedEnergyCost: number; // monthly
  monthlySaving: number;
  annualSaving: number;
  paybackMonths: number;
  fcfImprovementMonthly: number;
  carbonReductionTonnes?: number;
}

export type ImplementationConfidence = 'high' | 'medium' | 'low';

// ---- Climate ----

export interface ClimateSnapshot {
  id: string;
  loanCaseId: string;
  latitude: number;
  longitude: number;
  weatherFeatures: WeatherFeatures;
  heatFeatures: HeatFeatures;
  floodFeatures: FloodFeatures;
  cycloneFeatures: CycloneFeatures;
  satelliteFeatures?: SatelliteFeatures;
  provider: string;
  dataTimestamp: string;
}

export interface WeatherFeatures {
  currentTempC: number;
  humidity: number;
  windSpeedKmh: number;
  description: string;
}

export interface HeatFeatures {
  annualMaxTempC: number;
  extremeHeatDays: number; // days >40°C per year
  maxObservedTempC: number;
  tempAnomalyC: number;
  historicalHeatFrequency: number; // 0-1
}

export interface FloodFeatures {
  extremeRainfallMm: number;
  rainfallIntensityScore: number; // 0-100
  floodSusceptibility: number; // 0-100
  waterBodyProximityKm?: number;
  historicalFloodEvents?: number;
}

export interface CycloneFeatures {
  distanceToCoastKm?: number;
  historicalCycloneFrequency: number; // per decade
  windExposureScore: number; // 0-100
  stormHazardScore: number; // 0-100
}

export interface SatelliteFeatures {
  ndvi?: number; // -1 to 1
  builtUpProxy?: number; // 0-1
  waterPresenceProxy?: number; // 0-1
  surfaceConditionScore?: number; // 0-100
  capturedAt?: string;
}

// ---- CVI ----

export type CviRiskBand = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';

export interface CviSnapshot {
  id: string;
  loanCaseId: string;
  score: number; // 0-100
  heatScore: number;
  floodScore: number;
  cycloneScore: number;
  sensitivityScore: number;
  infrastructureScore: number;
  adaptiveCapacityScore: number;
  riskBand: CviRiskBand;
  confidence: ConfidenceLevel;
  topDrivers: string[];
  mitigatingFactors: string[];
  modelVersion: string;
  dataVersion: string;
  generatedAt: string;
}

export type ConfidenceLevel = 'high' | 'moderate' | 'low' | 'provisional';
export type DataQualityLevel = 'complete' | 'partial' | 'missing';

// ---- GVS ----

export type GvsViabilityBand = 'very_strong' | 'strong' | 'moderate' | 'weak' | 'very_weak';

export interface GvsSnapshot {
  id: string;
  loanCaseId: string;
  score: number; // 0-100
  opexScore: number;
  cashFlowScore: number;
  paybackScore: number;
  resourceReductionScore: number;
  resilienceScore: number;
  implementationScore: number;
  viabilityBand: GvsViabilityBand;
  confidence: ConfidenceLevel;
  topStrengths: string[];
  evidenceGaps: string[];
  modelVersion: string;
  dataVersion: string;
  generatedAt: string;
}

// ---- Scenario ----

export interface ScenarioInputs {
  energyTariffMultiplier?: number; // 1.0 = baseline
  revenueMultiplier?: number;
  heatDaysDelta?: number; // additional heat days
  rainfallSeverity?: 'normal' | 'mild' | 'moderate' | 'severe';
  projectEfficiencyMultiplier?: number;
  capexMultiplier?: number;
  debtServiceMultiplier?: number;
  maintenanceCostMultiplier?: number;
}

export interface ScenarioOutputs {
  projectedFcf: number;
  cviStress?: number;
  gvsSensitivity?: number;
  paybackMonths?: number;
  opexChangePercent?: number;
  verdict: 'positive' | 'caution' | 'high_risk';
}

export interface Scenario {
  id: string;
  loanCaseId: string;
  name: string;
  type: 'base' | 'climate_stress' | 'financial_stress' | 'project_sensitivity' | 'custom';
  inputs: ScenarioInputs;
  outputs: ScenarioOutputs;
  modelVersions: Record<string, string>;
  createdBy: string;
  createdAt: string;
}

// ---- Evidence ----

export type EvidenceType =
  | 'electricity_bill'
  | 'water_bill'
  | 'bank_statement'
  | 'tax_return'
  | 'sales_invoice'
  | 'purchase_invoice'
  | 'project_quote'
  | 'vendor_certificate'
  | 'insurance_policy'
  | 'land_document'
  | 'business_license'
  | 'other';

export type EvidenceStatus = 'pending' | 'verified' | 'rejected' | 'expired';

export interface Evidence {
  id: string;
  loanCaseId: string;
  type: EvidenceType;
  fileUrl: string;
  fileName: string;
  fileSizeBytes: number;
  mimeType: string;
  source: string;
  verificationStatus: EvidenceStatus;
  uploadedBy: string;
  capturedAt?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  notes?: string;
}

export interface EvidenceQualityScore {
  overall: number; // 0-100
  financialEvidence: number;
  climateFreshness: number;
  locationConfidence: number;
  projectAssumptions: number;
  documentCompleteness: number;
  level: DataQualityLevel;
}

// ---- Copilot ----

export interface CopilotRequest {
  loanCaseId: string;
  type: 'summary' | 'evidence_gaps' | 'questions';
}

export interface CopilotSummary {
  executiveSummary: string;
  keyClimateRisks: string[];
  projectStrengths: string[];
  evidenceGaps: string[];
  questionsForApplicant: string[];
  diligenceChecklist: string[];
  generatedAt: string;
  modelUsed: string;
  isProvisional: boolean;
}

// ---- Case Recommendation ----

export type CaseAction =
  | 'PROCEED_TO_HUMAN_UNDERWRITING'
  | 'ENHANCED_CLIMATE_DUE_DILIGENCE'
  | 'ADDITIONAL_PROJECT_EVIDENCE_REQUIRED'
  | 'DATA_QUALITY_HOLD';

export interface CaseRecommendation {
  action: CaseAction;
  reasons: string[];
  configVersion: string;
}

// ---- Portfolio ----

export interface PortfolioOverview {
  totalActiveCases: number;
  highCviCases: number;
  averageCvi: number;
  averageGvs: number;
  evidenceQualityDistribution: Record<DataQualityLevel, number>;
  sectorConcentration: Array<{ sector: MsmeSector; count: number; avgCvi: number }>;
  districtConcentration: Array<{ district: string; count: number; avgCvi: number }>;
}

// ---- Audit ----

export interface AuditLog {
  id: string;
  actorId: string;
  entityType: string;
  entityId: string;
  action: string;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  requestId?: string;
  timestamp: string;
}

// ---- API Response Wrapper ----

export interface ApiResponse<T> {
  success: true;
  data: T;
}

export interface ApiListResponse<T> {
  success: true;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    requestId?: string;
    details?: Record<string, unknown>;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;
export type ApiListResult<T> = ApiListResponse<T> | ApiError;

// ---- Model Registry ----

export interface ModelVersion {
  id: string;
  modelName: 'CVI' | 'GVS' | 'STRESS';
  version: string;
  artifactPath?: string;
  featureSchemaVersion: string;
  metrics: Record<string, number>;
  active: boolean;
  createdAt: string;
}

// ---- Business Sensitivity Inputs ----

export interface BusinessSensitivityInputs {
  sector: MsmeSector;
  isOutdoorOperation: boolean;
  energyDependence: 1 | 2 | 3 | 4 | 5; // 1=low, 5=critical
  waterDependence: 1 | 2 | 3 | 4 | 5;
  coldChainDependence: 1 | 2 | 3 | 4 | 5;
  transportDependence: 1 | 2 | 3 | 4 | 5;
  rawMaterialDependence: 1 | 2 | 3 | 4 | 5;
  seasonalityRisk: 1 | 2 | 3 | 4 | 5;
}

export interface InfrastructureExposureInputs {
  powerReliability: 1 | 2 | 3 | 4 | 5; // 1=very unreliable, 5=reliable
  waterAccess: 1 | 2 | 3 | 4 | 5;
  roadAccessibility: 1 | 2 | 3 | 4 | 5;
  buildingFloor: number;
  hasBackupPower: boolean;
  distanceToMarketKm?: number;
  supplierConcentration: 1 | 2 | 3 | 4 | 5; // 1=single supplier, 5=diversified
}

export interface AdaptiveCapacityInputs {
  hasBackupPower: boolean;
  hasInsurance: boolean;
  emergencyCashReserveMonths: number;
  hasBackupSupplier: boolean;
  hasBusinessContinuityPlan: boolean;
  hasWaterStorage: boolean;
  hasCoolingSystem: boolean;
  hasAlternativeLogistics: boolean;
  customerDiversification: 1 | 2 | 3 | 4 | 5;
}
