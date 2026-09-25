// ============================================
// RURALMIND AI — MOCK & TRAINED DATA
// ============================================

import { trainedModel } from './trained_model.js';

// Calculate real health score from the trained SME model coefficients
const coefficients = trainedModel?.healthScoreModel?.coefficients || [];
const intercept = trainedModel?.healthScoreModel?.intercept || 78;

// Simulate Lakshmi's survey answers (FL: high, FR: low-risk, RA: high risk-mitigation)
const lakshmiInputs = [4, 4, 4, 4, 2, 2, 2, 2, 4, 4, 4, 4];
let predictedHealthScore = 78;
if (coefficients.length === lakshmiInputs.length) {
  const rawPred = intercept + coefficients.reduce((acc, coef, i) => acc + coef * lakshmiInputs[i], 0);
  predictedHealthScore = Math.max(0, Math.min(100, Math.round(rawPred)));
}

const isNewUser = (localStorage.getItem('appMode') === 'new_user');
const onboardingComplete = (localStorage.getItem('onboardingComplete') === 'true');

// Initialize demo mode values if not already present
if (!isNewUser) {
  if (!localStorage.getItem('demoRevenue')) {
    localStorage.setItem('demoRevenue', '₹42,580');
    localStorage.setItem('demoExpenses', '₹14,230');
    localStorage.setItem('demoCashflow', '₹28,350');
    localStorage.setItem('demoTransactions', JSON.stringify([
      { name: 'Milk Sale — Amul Collection', amount: '+₹4,200', type: 'income', icon: 'payments', date: 'Today, 8:30 AM', color: 'green' },
      { name: 'Cattle Feed Purchase', amount: '-₹1,850', type: 'expense', icon: 'shopping_bag', date: 'Today, 7:15 AM', color: 'red' },
      { name: 'UPI Payment — Veterinary', amount: '-₹500', type: 'expense', icon: 'medical_services', date: 'Yesterday', color: 'red' },
      { name: 'Milk Sale — Evening', amount: '+₹3,800', type: 'income', icon: 'payments', date: 'Yesterday', color: 'green' },
      { name: 'Government Subsidy', amount: '+₹15,000', type: 'income', icon: 'account_balance', date: '2 days ago', color: 'blue' },
    ]));
  }
}

export const userData = {
  name: isNewUser ? (localStorage.getItem('newUserName') || 'New User') : 'Lakshmi',
  role: 'entrepreneur',
  business: isNewUser ? (localStorage.getItem('newBusinessName') || 'My Farm') : 'Lakshmi Dairy Farm',
  village: isNewUser ? 'New Village' : 'Sundarpura',
  district: isNewUser ? 'New District' : 'Anand',
  state: isNewUser ? 'New State' : 'Gujarat',
  phone: isNewUser ? '+91 99999 88888' : '+91 98765 43210',
  avatar: isNewUser ? (localStorage.getItem('newUserName')?.[0] || 'U') : 'L',
  healthScore: isNewUser ? parseInt(localStorage.getItem('onboardingHealthScore') || '0') : predictedHealthScore,
};

// Calculate real default risk score from the trained ML model
const mlRiskScore = trainedModel?.defaultRiskModel?.lakshmiRiskScore || 42;
const mlRiskLevel = mlRiskScore > 30 ? 'Medium' : 'Low';

export const dashboardData = {
  revenue: isNewUser ? (localStorage.getItem('newRevenue') || '₹0') : (localStorage.getItem('demoRevenue') || '₹42,580'),
  revenueChange: isNewUser ? '—' : '+12.4%',
  cashflow: isNewUser ? (localStorage.getItem('newCashflow') || '₹0') : (localStorage.getItem('demoCashflow') || '₹28,350'),
  cashflowChange: isNewUser ? '—' : '+8.2%',
  riskLevel: isNewUser ? (onboardingComplete ? 'Low' : 'N/A') : mlRiskLevel,
  riskScore: isNewUser ? (onboardingComplete ? 9.2 : 'N/A') : mlRiskScore,
  expenses: isNewUser ? (localStorage.getItem('newExpenses') || '₹0') : (localStorage.getItem('demoExpenses') || '₹14,230'),
  profit: isNewUser ? (localStorage.getItem('newCashflow') || '₹0') : (localStorage.getItem('demoCashflow') || '₹28,350'),
  savings: isNewUser ? '₹0' : '₹1,85,000',
  loan: isNewUser ? '₹0' : '₹2,50,000',
};

export const transactions = isNewUser 
  ? JSON.parse(localStorage.getItem('newTransactions') || '[]')
  : JSON.parse(localStorage.getItem('demoTransactions') || '[]');


export const twinMetrics = [
  { label: 'Financial Stability', value: isNewUser ? '0%' : '82%', icon: 'account_balance', color: '#2E7D32' },
  { label: 'Market Stability', value: isNewUser ? '0%' : '71%', icon: 'trending_up', color: '#1565C0' },
  { label: 'Climate Stability', value: isNewUser ? '0%' : '65%', icon: 'cloud', color: '#F59E0B' },
  { label: 'Digital Payments', value: isNewUser ? '0%' : '91%', icon: 'contactless', color: '#8B5CF6' },
  { label: 'Repayment Capacity', value: isNewUser ? '0%' : '88%', icon: 'verified', color: '#10B981' },
  { label: 'Credit Score', value: isNewUser ? 'N/A' : '724', icon: 'score', color: '#EC4899' },
];

export const forecastData = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  income: isNewUser ? Array(12).fill(0) : [38000,41000,39500,42000,44000,42580,43500,45000,44200,46000,47500,48000],
  expenses: isNewUser ? Array(12).fill(0) : [15000,14200,16000,14500,13800,14230,14800,15200,14900,15500,15000,14600],
  forecast: isNewUser ? Array(12).fill(0) : [null,null,null,null,null,null,43500,45000,44200,46000,47500,48000],
  confidence: isNewUser ? 0 : 87,
};

export const riskFactors = isNewUser ? [] : [
  { name: 'Feed Cost Increase', value: 32, direction: 'up', color: '#EF4444' },
  { name: 'Milk Price Drop', value: 18, direction: 'down', color: '#F59E0B' },
  { name: 'Seasonal Effect', value: 19, direction: 'down', color: '#8B5CF6' },
  { name: 'Weather Impact', value: 16, direction: 'down', color: '#1565C0' },
  { name: 'UPI Decline', value: 15, direction: 'down', color: '#EC4899' },
];

export const aiInsight = isNewUser
  ? "Welcome to RuralMind AI! Take the onboarding survey to analyze your financial health, and register transactions to generate AI Cash Flow insights."
  : "Your dairy farm's profit margin has improved by 8.2% this month. However, feed costs are rising — consider switching to Napier grass supplementation to save ₹3,200/month. Monsoon season may affect milk quality; plan cold storage backup.";

export const chatMessages = [
  { role: 'user', text: 'How can I improve my profit this quarter?' },
  { role: 'ai', text: "Based on your financial twin analysis, here are 3 recommendations:", recommendations: [
    { title: 'Switch Feed Supplier', savings: '₹3,200/month', risk: '-15% risk', icon: 'inventory_2' },
    { title: 'Add Evening Collection', savings: '₹4,800/month', risk: '-8% risk', icon: 'schedule' },
    { title: 'Apply for NABARD Subsidy', savings: '₹25,000 one-time', risk: 'No risk impact', icon: 'account_balance' },
  ]},
  { role: 'user', text: 'Tell me about government schemes' },
  { role: 'ai', text: "Here are relevant government schemes for your dairy business:", schemes: [
    { name: 'Rashtriya Gokul Mission', benefit: 'Up to ₹50,000 subsidy for breed improvement' },
    { name: 'NABARD Dairy Entrepreneurship', benefit: '25% subsidy on dairy equipment (max ₹7 lakh)' },
    { name: 'National Livestock Mission', benefit: 'Training + ₹10,000 starter support' },
  ]},
];

export const alerts = isNewUser
  ? (onboardingComplete ? [{ severity: 'low', title: 'Welcome to RuralMind!', desc: 'Link your UPI account to begin tracking real-time risk alerts.', time: 'Just now', action: 'Link Bank' }] : [])
  : [
      { severity: 'high', title: 'Feed Cost Spike Alert', desc: 'Cattle feed prices increased 32% in your region. Estimated monthly impact: +₹5,760. Consider alternative feed sources.', time: '2 hours ago', action: 'View Alternatives' },
      { severity: 'high', title: 'Cash Flow Warning', desc: 'Projected cash shortfall of ₹8,200 in next 15 days based on current spending pattern.', time: '5 hours ago', action: 'View Forecast' },
      { severity: 'medium', title: 'Loan EMI Reminder', desc: 'NABARD loan EMI of ₹4,500 due in 5 days. Current balance sufficient.', time: '1 day ago', action: 'Set Reminder' },
      { severity: 'medium', title: 'Market Price Fluctuation', desc: 'Milk procurement price may drop 8-12% next month due to seasonal oversupply.', time: '1 day ago', action: 'View Analysis' },
      { severity: 'low', title: 'Digital Payment Milestone', desc: 'You completed 50+ UPI transactions this month. This improves your digital credit score.', time: '2 days ago', action: 'View Score' },
    ];

export const notifications = isNewUser
  ? (onboardingComplete ? [{ type: 'scheme', icon: 'verified', title: 'Onboarding Complete', desc: 'Your digital financial twin has been initialized successfully.', time: 'Just now', unread: true, color: '#2E7D32' }] : [])
  : [
      { type: 'weather', icon: 'thunderstorm', title: 'Heavy Rain Alert', desc: 'IMD forecasts heavy rainfall in Anand district for next 3 days. Protect feed storage.', time: '30 min ago', unread: true, color: '#1565C0' },
      { type: 'market', icon: 'show_chart', title: 'Milk Price Update', desc: 'Amul increased procurement price by ₹2/litre effective tomorrow.', time: '2 hours ago', unread: true, color: '#10B981' },
      { type: 'risk', icon: 'warning', title: 'Risk Level Changed', desc: 'Your business risk level changed from Low to Medium due to feed cost increase.', time: '5 hours ago', unread: false, color: '#F59E0B' },
      { type: 'loan', icon: 'account_balance', title: 'EMI Processed', desc: 'Loan EMI of ₹4,500 successfully debited. Remaining: 14 installments.', time: '1 day ago', unread: false, color: '#8B5CF6' },
      { type: 'scheme', icon: 'verified', title: 'New Scheme Available', desc: 'You are eligible for PM Kisan Samman Nidhi. Apply before Aug 30.', time: '2 days ago', unread: false, color: '#2E7D32' },
    ];

export const documents = isNewUser ? [] : [
  { name: 'Milk Supply Invoice — June', type: 'Invoice', date: 'Jun 30, 2026', status: 'verified', icon: 'receipt_long' },
  { name: 'NABARD Loan Agreement', type: 'Loan Document', date: 'Jan 15, 2026', status: 'verified', icon: 'description' },
  { name: 'Feed Purchase Bill', type: 'Bill', date: 'Jul 12, 2026', status: 'processing', icon: 'receipt' },
  { name: 'Veterinary Certificate', type: 'Certificate', date: 'May 20, 2026', status: 'verified', icon: 'clinical_notes' },
  { name: 'Insurance Policy', type: 'Insurance', date: 'Mar 01, 2026', status: 'pending', icon: 'shield' },
];

window.addTransactionItem = function(type, name, amount) {
  const amountVal = parseFloat(amount) || 0;
  if (amountVal <= 0) return;
  
  const txKey = isNewUser ? 'newTransactions' : 'demoTransactions';
  const revKey = isNewUser ? 'newRevenue' : 'demoRevenue';
  const expKey = isNewUser ? 'newExpenses' : 'demoExpenses';
  const cfKey = isNewUser ? 'newCashflow' : 'demoCashflow';
  
  const currentTransactions = JSON.parse(localStorage.getItem(txKey) || '[]');
  
  const formattedAmount = (type === 'income' ? '+' : '-') + '₹' + amountVal.toLocaleString('en-IN');
  const color = type === 'income' ? 'green' : 'red';
  const icon = type === 'income' ? 'payments' : 'shopping_bag';
  
  currentTransactions.unshift({
    name: name,
    amount: formattedAmount,
    type: type,
    icon: icon,
    date: 'Just now',
    color: color
  });
  
  localStorage.setItem(txKey, JSON.stringify(currentTransactions));
  
  // Calculate new totals
  const defaultRev = isNewUser ? '₹0' : '₹42,580';
  const defaultExp = isNewUser ? '₹0' : '₹14,230';
  
  let rev = parseFloat((localStorage.getItem(revKey) || defaultRev).replace(/[^\d.]/g, '')) || 0;
  let exp = parseFloat((localStorage.getItem(expKey) || defaultExp).replace(/[^\d.]/g, '')) || 0;
  
  if (type === 'income') {
    rev += amountVal;
  } else {
    exp += amountVal;
  }
  
  const profit = rev - exp;
  
  localStorage.setItem(revKey, '₹' + rev.toLocaleString('en-IN'));
  localStorage.setItem(expKey, '₹' + exp.toLocaleString('en-IN'));
  localStorage.setItem(cfKey, '₹' + profit.toLocaleString('en-IN'));
  
  // Re-navigate to dashboard to reflect changes (no full reload)
  import('./router.js').then(({ navigateTo }) => {
    navigateTo('entrepreneur-dashboard', { replace: true });
  });
};

export const nabardData = {
  totalEnterprises: 12847,
  healthy: 8934,
  mediumRisk: 2891,
  highRisk: 1022,
  loanDisbursed: '₹284 Cr',
  recoveryRate: 94.2,
  predictionAccuracy: 91.7,
  states: [
    { name: 'Gujarat', enterprises: 2340, healthy: 78, risk: 'low' },
    { name: 'Maharashtra', enterprises: 3120, healthy: 72, risk: 'medium' },
    { name: 'Rajasthan', enterprises: 1890, healthy: 65, risk: 'medium' },
    { name: 'Madhya Pradesh', enterprises: 2100, healthy: 81, risk: 'low' },
    { name: 'Tamil Nadu', enterprises: 1580, healthy: 85, risk: 'low' },
    { name: 'Karnataka', enterprises: 1817, healthy: 69, risk: 'medium' },
  ],
};

export const impactData = [
  { label: 'Loans Protected', value: 3842, prefix: '', suffix: '', icon: 'shield', color: 'green' },
  { label: 'Businesses Saved', value: 1247, prefix: '', suffix: '', icon: 'store', color: 'blue' },
  { label: 'Risk Reduced', value: 34, prefix: '', suffix: '%', icon: 'trending_down', color: 'green' },
  { label: 'Prediction Accuracy', value: 91.7, prefix: '', suffix: '%', icon: 'psychology', color: 'blue' },
  { label: 'Financial Growth', value: 28, prefix: '', suffix: '%', icon: 'rocket_launch', color: 'gold' },
  { label: 'Economic Impact', value: 142, prefix: '₹', suffix: ' Cr', icon: 'currency_rupee', color: 'green' },
];

export const analyticsData = {
  income: { total: '₹5,12,400', change: '+14.2%' },
  expense: { total: '₹1,71,600', change: '+3.1%' },
  profit: { total: '₹3,40,800', change: '+18.7%' },
  loan: { total: '₹2,50,000', change: '-₹27,000' },
  savings: { total: '₹1,85,000', change: '+₹32,000' },
  categories: [
    { name: 'Milk Sales', value: 62, color: '#2E7D32' },
    { name: 'Feed Cost', value: 18, color: '#EF4444' },
    { name: 'Veterinary', value: 5, color: '#F59E0B' },
    { name: 'Equipment', value: 8, color: '#1565C0' },
    { name: 'Transport', value: 4, color: '#8B5CF6' },
    { name: 'Other', value: 3, color: '#94A3B8' },
  ],
};
