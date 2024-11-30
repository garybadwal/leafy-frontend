const validAges = [
    "Seedling",
    "Young Plant (1-6 months)",
    "Mature Plant (6+ months)",
    "Established (1+ year)",
    "Unknown",
];

const validHealthStatuses = [
    "Healthy",
    "Sick",
    "Recovering",
    "Wilting",
    "Pest/Disease Affected",
    "Dormant",
];

const validWateringStatuses = [
    "Just Watered",
    "Needs Water",
    "Overwatered",
    "Dry Soil",
    "Moist Soil",
];

const validLightRequirements = [
    "Full Sun (6+ hours of direct sunlight)",
    "Partial Sun (4-6 hours of sunlight)",
    "Shade (2-4 hours of indirect sunlight)",
    "Low Light (indoor/artificial light)",
    "Bright Indirect Light",
];

const validSoilTypes = [
    "Sandy Soil",
    "Loamy Soil",
    "Clay Soil",
    "Peaty Soil",
    "Chalky Soil",
    "Silty Soil",
    "Hydroponic Medium",
    "Mixed/Custom Blend",
];

const validFertilizerTypes = [
    "Organic Compost",
    "Liquid Fertilizer",
    "Granular Fertilizer",
    "Slow-Release Fertilizer",
    "Balanced Fertilizer (e.g., 10-10-10)",
    "Nitrogen-Rich Fertilizer",
    "Phosphorus-Rich Fertilizer",
    "Potassium-Rich Fertilizer",
    "Specialized Plant Fertilizer (e.g., for roses, succulents)",
];

const validFertilizerSchedules = [
    "Weekly",
    "Bi-Weekly",
    "Monthly",
    "Every 2-3 Months",
    "Seasonal",
    "As Needed",
];

const validGrowthStages = [
    "Seedling",
    "Vegetative",
    "Budding",
    "Flowering",
    "Fruiting",
    "Dormant",
];

export function validatePlantData(data) {
    const errors = {};
    let isValid = true;

    if (!data.commonName) {
        isValid = false;
        errors.commonName = ["Common name is required."];
    }

    if (!data.scientificName) {
        isValid = false;
        errors.scientificName = ["Scientific name is required."];
    }

    if (!validAges.includes(data.age)) {
        isValid = false;
        errors.age = ["Invalid age value."];
    }

    if (!validHealthStatuses.includes(data.healthStatus)) {
        isValid = false;
        errors.healthStatus = ["Invalid health status value."];
    }

    if (!validWateringStatuses.includes(data.wateringStatus)) {
        isValid = false;
        errors.wateringStatus = ["Invalid watering status value."];
    }

    if (!validLightRequirements.includes(data.lightRequirements)) {
        isValid = false;
        errors.lightRequirements = ["Invalid light requirements value."];
    }

    if (!validSoilTypes.includes(data.soilType)) {
        isValid = false;
        errors.soilType = ["Invalid soil type value."];
    }

    if (!validFertilizerTypes.includes(data.fertilizerType)) {
        isValid = false;
        errors.fertilizerType = ["Invalid fertilizer type value."];
    }

    if (!validFertilizerSchedules.includes(data.fertilizerSchedule)) {
        isValid = false;
        errors.fertilizerSchedule = ["Invalid fertilizer schedule value."];
    }

    if (!validGrowthStages.includes(data.growthStage)) {
        isValid = false;
        errors.growthStage = ["Invalid growth stage value."];
    }

    if (!data.dateAdded) {
        isValid = false;
        errors.dateAdded = ["Date added is required."];
    }

    if (!data.lastWateredDate) {
        isValid = false;
        errors.dateAdded = ["Last watered date is required."];
    }

    return { isValid, errors };
}
