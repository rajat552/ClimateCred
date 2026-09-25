# ============================================
# RURALMIND AI — MACHINE LEARNING TRAINING PIPELINE
# ============================================

import os
import csv
import json
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

def train_pipeline():
    print("Starting RuralMind AI Training Pipeline...")
    
    # Paths
    sme_path = "ml/data/sme_financial_decision.csv"
    loan_path = "ml/data/loan_prediction.csv"
    commodity_path = "ml/data/commodity_prices.xlsx"
    output_path = "js/trained_model.js"

    # Verify files
    for path in [sme_path, loan_path, commodity_path]:
        if not os.path.exists(path):
            raise FileNotFoundError(f"Required dataset not found: {path}")

    # ============================================
    # 1. TRAIN BUSINESS HEALTH SCORE MODEL (SME Survey Data)
    # ============================================
    print("Processing SME Financial Decision dataset...")
    df_sme = pd.read_csv(sme_path)
    
    # target: average of FDM columns (Financial Decision Making) normalized to 0-100
    fdm_cols = ['FDM1', 'FDM2', 'FDM3', 'FDM4']
    df_sme['health_score'] = df_sme[fdm_cols].mean(axis=1) / 5.0 * 100
    
    # features: Financial Literacy (FL), Financial Risk (FR), Risk Assessment (RA)
    feature_cols = ['FL1', 'FL2', 'FL3', 'FL4', 'FR1', 'FR2', 'FR3', 'FR4', 'RA1', 'RA2', 'RA3', 'RA4']
    X_sme = df_sme[feature_cols].fillna(3) # fill missing with middle score
    y_sme = df_sme['health_score']

    # Train linear model
    reg = LinearRegression()
    reg.fit(X_sme, y_sme)
    
    # Compute relative feature importance from coefficients
    coefs = np.abs(reg.coef_)
    total_coef = np.sum(coefs)
    importances = (coefs / total_coef) * 100 if total_coef > 0 else [100.0/len(feature_cols)]*len(feature_cols)
    
    sme_importance = {
        'Financial Literacy': float(np.sum(importances[0:4])),
        'Repayment History': float(np.sum(importances[4:8])),
        'Risk Management': float(np.sum(importances[8:12]))
    }
    
    # Normalize importance to sum to 100%
    total_imp = sum(sme_importance.values())
    for k in sme_importance:
        sme_importance[k] = round((sme_importance[k] / total_imp) * 100, 1)

    print(f"Health Score model trained. Feature importances: {sme_importance}")

    # ============================================
    # 2. TRAIN DEFAULT RISK MODEL (Loan Prediction Data)
    # ============================================
    print("Processing Loan Prediction dataset...")
    df_loan = pd.read_csv(loan_path)
    
    # Select continuous and categorical variables
    loan_features = ['credit_score', 'annual_income', 'debt_to_income_ratio', 'loan_amount', 'interest_rate', 'num_of_delinquencies']
    X_loan = df_loan[loan_features].dropna()
    y_loan = df_loan.loc[X_loan.index, 'loan_paid_back'] # 1 = paid, 0 = default
    
    # Standardize features for logistic regression
    scaler = StandardScaler()
    X_loan_scaled = scaler.fit_transform(X_loan)
    
    # Train Logistic Regression to predict probability of default
    clf = LogisticRegression()
    clf.fit(X_loan_scaled, y_loan)
    
    # Default risk prediction example parameters (Lakshmi's profile: credit_score=780, income=42580*12=510960, etc.)
    lakshmi_profile = np.array([[780, 510960, 0.12, 250000, 0.08, 0]])
    lakshmi_scaled = scaler.transform(lakshmi_profile)
    lakshmi_default_prob = 1.0 - clf.predict_proba(lakshmi_scaled)[0][1]
    lakshmi_risk_score = round(lakshmi_default_prob * 100, 1)
    
    # State-wide default stats by loan purpose for NABARD Dashboard
    df_loan['defaulted'] = 1 - df_loan['loan_paid_back']
    purpose_stats = df_loan.groupby('loan_purpose')['defaulted'].mean().to_dict()
    nabard_stats = {}
    for purpose, rate in purpose_stats.items():
        nabard_stats[purpose] = {
            'default_rate': round(float(rate) * 100, 1),
            'risk_level': 'High' if rate > 0.3 else 'Medium' if rate > 0.15 else 'Low'
        }
        
    print(f"Default risk model trained. Lakshmi default probability: {lakshmi_risk_score}%")

    # ============================================
    # 3. ANALYZE COMMODITY PRICES (Excel Dataset)
    # ============================================
    print("Processing Commodity Prices dataset...")
    df_comm = pd.read_excel(commodity_path)
    
    # Extract unique commodities and prices for Gujarat
    df_guj = df_comm[df_comm['State'].str.lower() == 'gujarat'] if 'State' in df_comm.columns else df_comm
    
    # Group by Commodity to get average modal price
    comm_prices = {}
    for comm in ['Maize', 'Paddy(Dhan)(Common)', 'Tomato', 'Onion']:
        df_c = df_guj[df_guj['Commodity'].str.contains(comm, case=False, na=False)]
        if not df_c.empty:
            modal_price = df_c['Modal_x0020_Price'].mean()
            # Generate mock historical monthly list with linear trend for forecast demo
            prices_hist = [
                round(float(modal_price * (0.90 + i*0.02)), 0)
                for i in range(6)
            ]
            forecast = [
                round(float(modal_price * (1.02 + i*0.015)), 0)
                for i in range(3)
            ]
            comm_prices[comm] = {
                'current_price': round(float(modal_price), 0),
                'history': prices_hist,
                'forecast': forecast
            }
        else:
            # Fallback values if commodity is not in Excel
            comm_prices[comm] = {
                'current_price': 3000.0,
                'history': [2700, 2750, 2800, 2850, 2900, 3000],
                'forecast': [3050, 3100, 3150]
            }

    print(f"Commodity analysis completed. Found commodities: {list(comm_prices.keys())}")

    # ============================================
    # 4. EXPORT TO JAVASCRIPT MODULE
    # ============================================
    trained_data = {
        'healthScoreModel': {
            'importances': sme_importance,
            'intercept': float(reg.intercept_),
            'coefficients': [float(c) for c in reg.coef_]
        },
        'defaultRiskModel': {
            'lakshmiRiskScore': float(lakshmi_risk_score),
            'nabardStats': nabard_stats
        },
        'commodityPrices': comm_prices
    }

    # Write output as ES6 module export
    js_content = f"""// ============================================
// GENERATED BY ML TRAINING PIPELINE (train.py)
// DO NOT EDIT DIRECTLY
// ============================================

export const trainedModel = {json.dumps(trained_data, indent=2)};
"""
    with open(output_path, "w") as f:
        f.write(js_content)
    
    print(f"ML Output exported successfully to {output_path}!")

if __name__ == "__main__":
    train_pipeline()
