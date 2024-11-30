import { formidable } from "formidable";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createAPIResponse } from "@/lib/config";

export const config = {
    api: {
        bodyParser: false,
    },
};

// Helper function to format the image as a generative part
function fileToGenerativePart(path, mimeType) {
    return {
        inlineData: {
            data: Buffer.from(fs.readFileSync(path)).toString("base64"),
            mimeType,
        },
    };
}

const handler = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json(createAPIResponse({ status: 405, message: "Method not allowed" }));
    }

    try {
        const form = formidable();
        const [fields, files] = await form.parse(req);

        // Get the first file from the 'image' field
        const file = files.image?.[0];

        if (!file) {
            return res.status(400).json(createAPIResponse({ status: 400, message: "No image file provided" }));
        }

        // Initialize the Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Prepare the prompt with choices
        const prompt = `
      You are an expert plant identification assistant.
      Based on the provided plant image, return the following details in strict JSON format.
      For each field, select a value only from the specified options:

      {
        "commonName": "Provide a common name for the plant (any valid plant name).",
        "scientificName": "Provide a scientific name for the plant (optional).",
        "age": "One of: 'Seedling', 'Young Plant (1–6 months)', 'Mature Plant (6+ months)', 'Established (1+ year)', 'Unknown'.",
        "healthStatus": "One of: 'Healthy', 'Sick', 'Recovering', 'Wilting', 'Pest/Disease Affected', 'Dormant'.",
        "wateringStatus": "One of: 'Just Watered', 'Needs Water', 'Overwatered', 'Dry Soil', 'Moist Soil'.",
        "lightRequirements": "One of: 'Full Sun (6+ hours of direct sunlight)', 'Partial Sun (4–6 hours of sunlight)', 'Shade (2–4 hours of indirect sunlight)', 'Low Light (indoor/artificial light)', 'Bright Indirect Light'.",
        "soilType": "One of: 'Sandy Soil', 'Loamy Soil', 'Clay Soil', 'Peaty Soil', 'Chalky Soil', 'Silty Soil', 'Hydroponic Medium', 'Mixed/Custom Blend'.",
        "fertilizerType": "One of: 'Organic Compost', 'Liquid Fertilizer', 'Granular Fertilizer', 'Slow-Release Fertilizer', 'Balanced Fertilizer (e.g., 10-10-10)', 'Nitrogen-Rich Fertilizer', 'Phosphorus-Rich Fertilizer', 'Potassium-Rich Fertilizer', 'Specialized Plant Fertilizer (e.g., for roses, succulents)'.",
        "fertilizerSchedule": "One of: 'Weekly', 'Bi-Weekly', 'Monthly', 'Every 2–3 Months', 'Seasonal', 'As Needed'.",
        "growthStage": "One of: 'Seedling', 'Vegetative', 'Budding', 'Flowering', 'Fruiting', 'Dormant'.",
      }
      
      Only respond in the specified JSON format. Do not include additional explanations or text outside of the JSON.
    `;

        // Format the image for Gemini
        const imagePart = fileToGenerativePart(file.filepath, file.mimetype);

        // Send the prompt and image to Gemini with retry logic
        let result;
        let attempts = 0;
        const maxAttempts = 3;
        const waitTime = 30000; // 30 seconds in milliseconds

        do {
            try {
                result = await model.generateContent([prompt, imagePart]);
                break; // If successful, exit the loop
            } catch (error) {
                attempts++;

                if (error.status === 503) {
                    if (attempts < maxAttempts) {
                        console.log(`Attempt ${attempts}: Service unavailable, waiting 30 seconds...`);
                        await new Promise(resolve => setTimeout(resolve, waitTime));
                        continue;
                    }
                }
                // If it's not a 503 error or we've exceeded max attempts, throw the error
                throw error;
            }
        } while (attempts < maxAttempts);
        const responseData = result.response.text();

        console.log('Raw response:', responseData);

        // Clean the response by removing markdown code blocks and any extra characters
        const cleanedResponse = responseData
            .replace(/```json\n?/g, '')  // Remove opening ```json
            .replace(/\n?```/g, '')      // Remove closing ```
            .replace(/^[\s\n]+/, '')     // Remove leading whitespace/newlines
            .replace(/[\s\n]+$/, '')     // Remove trailing whitespace/newlines
            .replace(/`/g, '')           // Remove any stray backticks
            .trim();                     // Final trim of whitespace

        console.log('Cleaned response:', cleanedResponse);

        // Validate and parse the JSON response
        try {
            const jsonResponse = JSON.parse(cleanedResponse);
            return res.status(200).json(createAPIResponse({ status: 200, message: "Plant identified successfully", data: jsonResponse }));
        } catch (parseError) {
            console.error('Parse error:', parseError);
            return res.status(500).json(createAPIResponse({ status: 500, message: "Invalid response format from Gemini. Ensure the prompt restricts output to JSON.", data: { responseData, cleanedResponse, parseError: parseError.message } }));
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json(createAPIResponse({ status: 500, message: "Error processing the request." }));
    }
};

export default handler;
