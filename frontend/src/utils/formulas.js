// UPSAFE Mathematical Engine (Frontend Implementation)
// Strictly aligned with Equation 1-10 of the research paper

export const ASSET_VALUE = 500000;

export const calculateCVS = (v) => {
    // v: { proximity, exposure, mask_usage, health, awareness, infrastructure }
    const sum = (v.proximity || 3) + (v.exposure || 3) + (v.mask_usage || 3) + 
                (v.health || 3) + (v.awareness || 3) + (v.infrastructure || 3);
    return sum / 6;
};

export const getPRS = (impact, likelihood) => {
    // Table 4 from Research Paper — EXACT mapping
    // Columns: Impact (5=Doomsday, 4=Catastrophic, 3=Moderate, 2=Minor, 1=Insignificant)
    // Rows: Likelihood (5=Almost Certain, 4=Likely, 3=Possible, 2=Unlikely, 1=Rare)
    const matrix = {
        5: { 5: "E", 4: "E", 3: "H", 2: "M", 1: "L" },  // Almost Certain
        4: { 5: "E", 4: "E", 3: "H", 2: "M", 1: "L" },  // Likely
        3: { 5: "E", 4: "H", 3: "M", 2: "L", 1: "L" },  // Possible
        2: { 5: "M", 4: "M", 3: "L", 2: "L", 1: "L" },  // Unlikely
        1: { 5: "L", 4: "L", 3: "L", 2: "L", 1: "L" },  // Rare
    };
    return matrix[likelihood]?.[impact] || "L";
};

export const calculateSLE = (prs) => {
    const ef = { "E": 0.90, "H": 0.65, "M": 0.35, "L": 0.10 };
    return ASSET_VALUE * (ef[prs] || 0.10);
};

export const calculateALE = (sle, prs) => {
    const aro = { "E": 0.95, "H": 0.70, "M": 0.40, "L": 0.15 };
    return sle * (aro[prs] || 0.15);
};

export const getStandardizedRisk = (cityMetrics) => {
    // Uses the "Standardized Individual Profile" from the paper (page 5)
    // V1=3.5, V2=4.0, V3=3.0, V4=2.5, V5=3.0, V6=2.5
    const cvs = (3.5 + 4.0 + 3.0 + 2.5 + 3.0 + 2.5) / 6; // 3.083
    const adjustedLikelihood = cvs > 3.0 ? cityMetrics.base_likelihood + 1 : cityMetrics.base_likelihood;
    const l = Math.min(5, adjustedLikelihood);
    const i = cityMetrics.base_impact;
    
    const prs = getPRS(i, l);
    const sle = calculateSLE(prs);
    const ale = calculateALE(sle, prs);
    
    return { prs, sle, ale, cvs };
};
