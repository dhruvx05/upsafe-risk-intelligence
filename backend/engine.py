import pandas as pd
import numpy as np
import os

class UPSAFEEngine:
    def __init__(self, dataset_path):
        self.df = pd.read_csv(dataset_path)
        self.df['Date'] = pd.to_datetime(self.df['Date'])
        self.cities_data = self._process_cities()

    def _process_cities(self):
        city_groups = self.df.groupby(['State', 'City'])
        cities_summary = {}

        for (state, city), group in city_groups:
            max_aqi = group['AQI'].max()
            avg_aqi = group['AQI'].mean()
            total_days = len(group)
            harmful_days = len(group[group['AQI'] > 200])
            likelihood_pct = (harmful_days / total_days) * 100 if total_days > 0 else 0

            # Calculate base Impact and Likelihood (1-5 Scale)
            impact = self.calculate_impact_level(max_aqi)
            likelihood = self.calculate_likelihood_level(harmful_days / total_days if total_days > 0 else 0)

            cities_summary[city] = {
                "state": state,
                "city": city,
                "max_aqi": round(max_aqi, 1),
                "avg_aqi": round(avg_aqi, 1),
                "likelihood_pct": round(likelihood_pct, 1),
                "harmful_days": harmful_days,
                "total_days": total_days,
                "base_impact": impact,
                "base_likelihood": likelihood,
                "p_harmful": round(harmful_days / total_days, 3) if total_days > 0 else 0
            }
        
        return cities_summary

    def calculate_impact_level(self, max_aqi):
        # Eq. 3 from Research Paper
        if max_aqi <= 50: return 1     # Insignificant
        if max_aqi <= 100: return 2    # Minor
        if max_aqi <= 200: return 3    # Moderate
        if max_aqi <= 400: return 4    # Catastrophic
        return 5                        # Doomsday (AQI > 400)

    def calculate_likelihood_level(self, p_harmful):
        # Eq. 5 from Research Paper (uses proportion, not percentage)
        # p_harmful is already a proportion (0.0 - 1.0)
        if p_harmful >= 0.75: return 5    # Almost Certain
        if p_harmful >= 0.50: return 4    # Likely
        if p_harmful >= 0.25: return 3    # Possible
        if p_harmful >= 0.10: return 2    # Unlikely
        return 1                           # Rare

    def get_prs_matrix(self, impact, likelihood):
        # Table 4 from Research Paper — EXACT mapping
        # Columns: Impact (5=Doomsday, 4=Catastrophic, 3=Moderate, 2=Minor, 1=Insignificant)
        # Rows: Likelihood (5=Almost Certain, 4=Likely, 3=Possible, 2=Unlikely, 1=Rare)
        matrix = {
            5: { 5: "E", 4: "E", 3: "H", 2: "M", 1: "L" }, # Almost Certain
            4: { 5: "E", 4: "E", 3: "H", 2: "M", 1: "L" }, # Likely
            3: { 5: "E", 4: "H", 3: "M", 2: "L", 1: "L" }, # Possible
            2: { 5: "M", 4: "M", 3: "L", 2: "L", 1: "L" }, # Unlikely
            1: { 5: "L", 4: "L", 3: "L", 2: "L", 1: "L" }, # Rare
        }
        return matrix.get(likelihood, {}).get(impact, "L")

    def calculate_financials(self, prs_code):
        # Asset Value (AV) = 5,00,000 INR
        av = 500000
        
        # Exposure Factor (EF)
        ef_map = { "E": 0.90, "H": 0.65, "M": 0.35, "L": 0.10 }
        ef = ef_map.get(prs_code, 0.10)
        sle = av * ef
        
        # Annualized Rate of Occurrence (ARO)
        aro_map = { "E": 0.95, "H": 0.70, "M": 0.40, "L": 0.15 }
        aro = aro_map.get(prs_code, 0.15)
        ale = sle * aro
        
        return int(sle), int(ale)

    def analyze_risk(self, city, user_inputs):
        city_info = self.cities_data.get(city)
        if not city_info:
            return None

        # CVS Calculation
        v1 = user_inputs.get('proximity', 3)
        v2 = user_inputs.get('exposure', 3)
        v3 = user_inputs.get('mask_usage', 3)
        v4 = user_inputs.get('health', 3)
        v5 = user_inputs.get('awareness', 3)
        v6 = user_inputs.get('infrastructure', 3)
        
        cvs = (v1 + v2 + v3 + v4 + v5 + v6) / 6.0
        
        # Likelihood Adjustment
        base_l = city_info['base_likelihood']
        adjusted_l = base_l
        # CVS > 3.0 triggers +1 likelihood shift (Eq. 2)
        if cvs >= 3.0:
            adjusted_l = min(5, base_l + 1)
        
        # PRS Determination
        impact = city_info['base_impact']
        prs_code = self.get_prs_matrix(impact, adjusted_l)
        
        # Financial Risk
        sle, ale = self.calculate_financials(prs_code)
        
        risk_labels = { "E": "Extreme", "H": "High", "M": "Medium", "L": "Low" }

        return {
            "risk_level": risk_labels.get(prs_code, "Low"),
            "prs_code": prs_code,
            "cvs": round(cvs, 3),
            "impact": impact,
            "likelihood": adjusted_l,
            "base_likelihood": base_l,
            "sle": sle,
            "ale": ale,
            "base_metrics": city_info
        }

    def get_city_trends(self, city):
        city_df = self.df[self.df['City'] == city].sort_values('Date')
        return city_df[['Date', 'AQI']].to_dict(orient='records')

    def get_all_summaries(self):
        return list(self.cities_data.values())
