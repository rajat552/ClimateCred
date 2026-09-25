# 🌱 RuralMind AI
### Predict • Explain • Prevent • Prosper
> **AI-Powered Digital Financial Twin for Rural Micro Enterprises**

🌐 **Live Demo:** [https://ruralmind.vercel.app](https://ruralmind.vercel.app)

RuralMind AI is a state-of-the-art web application designed to help rural entrepreneurs and financial institutions (like NABARD Officers) monitor, simulate, and improve the creditworthiness and business health of micro-enterprises.

The app uses machine learning and advanced financial twin modeling to translate the raw transactional data and external factors (like climate and market prices) into actionable, explainable insights.

---

## 🚀 Key Features

### 1. 👥 Role-Based Portals
*   **Entrepreneur Mode (e.g., Lakshmi Devi's Dairy Farm):** Live dashboard showing revenue, expenses, cash flow, and financial health score. Real-time updates, custom transaction logging, and access to an AI Mentor.
*   **NABARD Officer Mode (e.g., Rajesh Kumar):** District-level overview tracking recovery rates, AI accuracy, and village-by-village risk profiles using interactive heatmaps.

### 2. 🛡️ Digital Financial Twin
*   A real-time health indicator score (0-100) calculated from financial stability, payment history, and risk mitigation strategies using linear regression.
*   Shows live indicator status sync and health trends over time.

### 3. 🔮 Real-Time What-If Scenario Simulator
*   Allows entrepreneurs to slide parameters (milk price, rainfall, market demand, monthly expenses, active loans) to dynamically compute future profit margins, cash flow, and risk scores.
*   Includes instant AI-generated recommendation cards explaining the outcome.

### 4. 💬 AI Business Mentor & Scheme Portal
*   Integrating Google Gemini API to offer localized support, cost reduction strategies, and eligibility match for government subsidies (e.g., Rashtriya Gokul Mission, NABARD DEDS).

### 5. 🌙 Modern, Premium UX
*   **Dark Mode Support:** Smooth custom styling transitions, persisted locally.
*   **Toast Notifications:** Real-time feedback for transactional actions.
*   **Slide-up Modals:** Elegant form sheets replacing default browser prompts.
*   **Interactive Onboarding:** Survey assessing Financial Literacy, Repayment History, and Risk Mitigation to compute Day 1 health.

---

## 🛠️ Technology Stack

*   **Frontend Core:** HTML5, Vanilla JavaScript (ES6 modules, Single Page Application Router)
*   **Styling:** Premium Vanilla CSS variables, glassmorphism, responsive desktop sidebar layout, and custom animations
*   **Charts:** Chart.js (Forecast line charts, Category donut charts, State-wise bar charts)
*   **AI Integration:** Google AI Studio (Gemini Flash model)
*   **Weather Service:** OpenWeather Map API (Climate-risk integration)
*   **Machine Learning (ML):** Python-based training pipeline (`scikit-learn` linear regression and default risk models)

---

## 📦 Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and configure your credentials:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### 4. Run Locally
Start the Vite development server:
```bash
npm run dev
```
Open **http://localhost:3000** in your browser.

---

## 🧠 Machine Learning Engine
The ML directory contains the Python scripts to train the regression coefficients and default risk models:
*   `ml/train.py`: Preprocesses data, trains the scikit-learn models, and serializes the coefficients directly into `js/trained_model.js` for instant local execution.

---

Developed with ❤️ for rural micro-entrepreneurs.
