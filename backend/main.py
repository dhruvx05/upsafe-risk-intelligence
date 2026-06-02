from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List
import os
from engine import UPSAFEEngine

app = FastAPI(title="UPSAFE Research Engine API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Engine
DATASET_PATH = os.path.join(os.path.dirname(__file__), "..", "India_AirQuality_MachineLearning_Dataset.csv")
engine = UPSAFEEngine(DATASET_PATH)

class UserInputs(BaseModel):
    city: str
    exposure: int = 3
    proximity: int = 3
    mask_usage: int = 3
    health: int = 3
    awareness: int = 3
    infrastructure: int = 3

@app.get("/")
def read_root():
    return {"message": "UPSAFE Research Engine API is active"}

@app.get("/cities")
def get_cities():
    return engine.get_all_summaries()

@app.get("/trends/{city}")
def get_trends(city: str):
    trends = engine.get_city_trends(city)
    if not trends:
        raise HTTPException(status_code=404, detail="City not found")
    return trends

@app.post("/analyze")
def analyze_risk(inputs: UserInputs):
    result = engine.analyze_risk(inputs.city, inputs.dict())
    if not result:
        raise HTTPException(status_code=404, detail="City not found")
    
    # Advanced Advisory Logic
    advice_map = {
        "E": [
            "Immediate relocation to filtered indoor space mandatory",
            "N95/FFP3 respirator usage required for any movement",
            "Continuous physiological monitoring for sensitive individuals"
        ],
        "H": [
            "Limit outdoor exposure to absolute minimum",
            "High-grade air filtration required in living spaces",
            "Monitor for respiratory distress or cardiac strain"
        ],
        "M": [
            "Avoid prolonged outdoor physical exertion",
            "General surgical mask or better advised in traffic",
            "Keep indoor zones sealed during peak AQI spikes"
        ],
        "L": [
            "Conditions within acceptable safety thresholds",
            "Regular outdoor activity supported",
            "Continue general health surveillance"
        ]
    }
    
    # Risk Code Definitions (UPSAFE Research Framework)
    risk_code_definitions = {
        "E": {
            "code": "E",
            "label": "Extreme Risk",
            "description": "Critical atmospheric hazard. Air quality poses an immediate and severe threat to human health. Prolonged exposure can cause acute respiratory failure, cardiovascular emergencies, and neurological impairment.",
            "action": "Immediate evacuation to sealed, filtered indoor space. Industrial-grade N95/FFP3 respirators mandatory for any movement. Continuous physiological monitoring required.",
            "ef": 0.90,
            "aro": 0.95,
            "color": "red"
        },
        "H": {
            "code": "H",
            "label": "High Risk",
            "description": "Severe pollution exposure detected. Significant physiological strain is likely without adequate protection. Vulnerable populations (children, elderly, asthmatics) face compounded risk.",
            "action": "Restrict all outdoor movement. Deploy high-grade air filtration indoors. Monitor for respiratory distress or cardiac strain. Alert local emergency services.",
            "ef": 0.65,
            "aro": 0.70,
            "color": "orange"
        },
        "M": {
            "code": "M",
            "label": "Medium Risk",
            "description": "Moderate pollutant concentrations present. Sensitive individuals may experience discomfort including eye irritation, coughing, or mild breathlessness during prolonged outdoor activity.",
            "action": "Limit prolonged outdoor physical exertion. Use surgical masks or better in high-traffic zones. Seal indoor spaces during peak AQI spikes.",
            "ef": 0.35,
            "aro": 0.40,
            "color": "amber"
        },
        "L": {
            "code": "L",
            "label": "Low Risk",
            "description": "Air quality is within acceptable safety parameters. Normal respiratory function is fully supported. No significant health impact expected for general population.",
            "action": "Continue normal activities with standard precautions. Maintain routine health surveillance. No special protective equipment required.",
            "ef": 0.10,
            "aro": 0.15,
            "color": "green"
        }
    }
    
    prs = result['prs_code']
    advice = advice_map.get(prs, advice_map["L"])
    
    return {
        **result,
        "advice": advice,
        "risk_code_definitions": risk_code_definitions,
        "current_code_info": risk_code_definitions.get(prs, risk_code_definitions["L"])
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
