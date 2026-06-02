# UPSAFE: Personal Risk Surveillance & Assessment System

[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Pandas](https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white)](https://pandas.pydata.org/)
[![Numpy](https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white)](https://numpy.org/)

An advanced, data-driven framework and interactive platform designed to assess, monitor, and mitigate individual health risks associated with ambient air pollution in major Indian cities. 

---

## 🔍 Project Overview: What, Why & How

### 1. WHAT is UPSAFE?
* **In Simple Words:** UPSAFE is a smart health safety advisor for air pollution. Instead of just telling you the general city air quality (which is the same for everyone), it asks about your daily habits (like how long you spend outside, if you wear a mask, or if you have asthma) and calculates a **personalized risk score** showing how dangerous the air actually is *for you*, along with tailored medical advice.
* **In Technical Terms:** UPSAFE is a Quantitative Risk Assessment (QRA) platform. It merges historical ambient air quality datasets (PM2.5, PM10, AQI) with real-time user-inputted physiological and behavioral factors. It outputs a composite Personal Risk Surveillance (PRS) classification and calculates health-related financial liabilities (Single Loss Expectancy and Annualized Loss Expectancy) using industrial risk compliance models (ISO 31000).

---

### 2. WHY do we need it?
* **In Simple Words:** Air pollution affects everyone differently. A young athlete running outdoors and an elderly person with a heart condition sitting indoors face completely different dangers even if they live in the same city. Standard weather apps only show the city's AQI. UPSAFE is needed to bridge this gap by calculating individual exposure risk so people can take the right protective measures at the right time.
* **In Technical Terms:** Standard environmental monitoring lacks personalization. Public health policies and AQI reports utilize general thresholds that fail to account for individual vulnerability variables. By failing to integrate behavioral modifiers (e.g., respirator usage, exposure duration) and physiological baselines (e.g., chronic comorbidities), traditional models lead to either over-protection fatigue or under-protection exposure. UPSAFE solves this by introducing a localized, personalized risk calculation pipeline.

---

### 3. HOW does it work?
* **In Simple Words:** 
  1. The app reads historical air quality data for your selected city in India.
  2. You adjust sliders indicating your exposure, mask usage, and health conditions.
  3. The app calculates your vulnerability score and combines it with the city's air quality data.
  4. It displays your personalized risk category (Low, Medium, High, or Extreme), lists emergency actions, shows how much money you might spend on health issues due to exposure, and visualizes pollution trends on a map.
* **In Technical Terms:**
  1. **Data Ingestion:** Reads environmental records from a multi-city Indian air quality dataset.
  2. **Vulnerability Assessment:** Computes a Cumulative Vulnerability Score (CVS) as the mathematical average of six behavioral/physiological variables.
  3. **Likelihood Adjustment:** If the CVS $\ge 3.0$, the baseline likelihood of harmful exposure is incremented ($L_{adj} = L_{base} + 1$).
  4. **Risk Matrix Mapping:** Maps the adjusted likelihood and maximum AQI impact level against a 5x5 risk evaluation matrix to determine the final Personal Risk Surveillance (PRS) tier (Low, Medium, High, Extreme).
  5. **Financial Exposure:** Quantifies financial impact by applying the Exposure Factor (EF) of the risk tier to a benchmark Asset Value (representing annual healthcare capital) to compute Single Loss Expectancy (SLE) and Annualized Loss Expectancy (ALE).

---

## 🔬 Scientific Methodology & Formulas

### 1. Cumulative Vulnerability Score (CVS)
The CVS aggregates individual behavior and environmental proximity into a single safety metric (ranging from 1.0 to 5.0):

$$\text{CVS} = \frac{\sum_{i=1}^{n} V_i}{n}$$

Where $V_i$ represents risk parameters:
- **Proximity** to high-pollution zones (e.g., traffic)
- **Exposure** duration outdoors
- **Mask Usage** frequency and grade
- **Health** status (pre-existing respiratory/cardiovascular issues)
- **Awareness** level
- **Infrastructure** (availability of indoor air purifiers)

### 2. Likelihood Adjustment
A CVS score $\ge 3.0$ triggers a $+1$ shift in environmental hazard likelihood, reflecting how personal vulnerability compounds external air quality risks.

### 3. Personal Risk Surveillance (PRS) Matrix
The system maps the adjusted likelihood and environmental impact (calculated from maximum AQI levels) into a 4-tier risk classification:
* **E**: Extreme Risk (Critical atmospheric hazard, immediate threat)
* **H**: High Risk (Severe physiological strain, restrict movement)
* **M**: Medium Risk (Moderate exposure, limit physical exertion)
* **L**: Low Risk (Safe conditions, normal activity)

### 4. Financial Risk Quantification (SLE & ALE)
We model potential health-related financial losses using Quantitative Risk Analysis:
- **Single Loss Expectancy (SLE):** Calculated as $\text{Asset Value (AV)} \times \text{Exposure Factor (EF)}$ (where AV is benchmarked at $500,000$ INR).
- **Annualized Loss Expectancy (ALE):** Calculated as $\text{SLE} \times \text{Annualized Rate of Occurrence (ARO)}$.

---

## 🛠️ Tech Stack

### Backend
- **Framework:** FastAPI
- **Data Processing:** Pandas, NumPy
- **Server:** Uvicorn
- **Validation:** Pydantic

### Frontend
- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **Charts:** Recharts (responsive SVG charts)
- **Maps:** Leaflet & React-Leaflet
- **Icons:** Lucide React

---

## ⚡ Quickstart Guide

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### 1. Run the Backend API
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   python main.py
   ```
   The backend will be available at `http://localhost:8000`.

### 2. Run the Frontend Dashboard
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📊 Dataset Reference
The system utilizes historical air quality data from the `India_AirQuality_MachineLearning_Dataset.csv` containing records of AQI, PM2.5, PM10, and other pollutant levels in major Indian cities.
