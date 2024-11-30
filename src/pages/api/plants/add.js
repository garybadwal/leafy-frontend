import { createClient } from "@/lib/supabase/server";
import { validatePlantData } from "@/lib/validation";
import { createAPIResponse } from "@/lib/config";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json(createAPIResponse({ status: 405, message: "Method not allowed" }));
    }

    const supabase = await createClient(req);
    const plantData = req.body;

    // Get the current user session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return res.status(401).json(createAPIResponse({ status: 401, message: "Unauthorized: User not logged in" }));
    }

    // Validate the plant data
    const { isValid, errors } = validatePlantData(plantData);

    if (!isValid) {
        return res.status(400).json(createAPIResponse({ status: 400, message: "Validation error", data: errors }));
    }

    // Add created_at and updated_at fields
    const now = new Date().toISOString();
    const dataToInsert = {
        user: user.id, // Use the UID of the logged-in user
        common_name: plantData.commonName,
        scientific_name: plantData.scientificName,
        date_added: plantData.dateAdded,
        age: plantData.age,
        health_status: plantData.healthStatus,
        watering_status: plantData.wateringStatus,
        light_requirements: plantData.lightRequirements,
        soil_type: plantData.soilType,
        fertilizer_type: plantData.fertilizerType,
        fertilizer_schedule: plantData.fertilizerSchedule,
        growth_stage: plantData.growthStage,
        last_watered_date: plantData.lastWateredDate,
        created_at: now,
        updated_at: now,
    };

    // Insert the data into the Supabase table
    const { error } = await supabase.from("plants").insert(dataToInsert);

    if (error) {
        return res.status(500).json(createAPIResponse({ status: 500, message: "Failed to save plant information" }));
    }

    return res.status(201).json(createAPIResponse({ status: 201, message: "Plant information saved successfully" }));
}