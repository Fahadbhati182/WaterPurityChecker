import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import Report from "../models/Report.model.js";

export const generateAiSuggestions = async (req, res) => {
  try {
    const { ph, tds, turbidity, temperature, color, smell } = req.body;

    if (!ph || !tds || !turbidity || !temperature || (!color && !smell)) {
      return res.status(400).json({ message: "All parameters are required." });
    }

    let uploadImgUrl = null;
    if (req.file?.path) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path);
      uploadImgUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // delete local copy
    }

    // Create structured prompt
    const prompt = `
        You are an expert water quality analyst.

        Analyze the following water data:

        - pH: ${ph}
        - TDS: ${tds} ppm
        - Turbidity: ${turbidity} NTU
        - Temperature: ${temperature}°C
        - Color: ${color || "not specified"}
        - Smell: ${smell || "not specified"}
        - Image URL: ${uploadImgUrl || "none"}

        Return ONLY a JSON object with EXACT keys:

        {
          "purity": <numeric value 0-100>,
          "classification": "<Safe | Unsafe | Needs treatment>",
          "explanation": "<3-4 sentences reasoning>",
          "suggestions": "<brief advice to improve quality>"
        }

        Strict Rules:

        1. Purity MUST be a number, not a string, not a percentage symbol.
        2. Classification MUST strictly follow numeric purity:
          - purity >= 90 → "Safe"
          - 50 <= purity < 90 → "Needs treatment"
          - purity < 50 → "Unsafe"
        3. Explanation must reference pH, TDS, turbidity, color, smell, and image.
        4. Suggestions must be actionable.
        5. Do NOT return any text outside JSON.
        6. Under NO circumstances should a purity < 50 return "Safe".
`;

    const aires = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": `${process.env.GOOGLE_AI_API_KEY}`,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const aiResponse = await aires.json();
    console.log(aiResponse);
    const textResponse = aiResponse.candidates[0].content.parts[0].text;

    let aiResult;
    try {
      const cleaned = textResponse
        .replace(/```json/i, "")
        .replace(/```/g, "")
        .trim();
      aiResult = JSON.parse(cleaned);
    } catch (err) {
      console.error("Invalid JSON from AI:", textResponse);
      throw new Error("AI returned invalid JSON.");
    }

    if (!aiResult || aiResult.error) {
      throw new Error("Failed to get valid response from AI");
    }

    const report = await Report.create({
      ph,
      tds,
      turbidity,
      temperature,
      color: color || "not specified",
      smell: smell || "not specified",
      image: uploadImgUrl,
      aiResult: {
        purity: aiResult.purity,
        classification: aiResult.classification,
        explanation: aiResult.explanation,
        suggestions: aiResult.suggestions,
      },
    });

    return res.status(200).json({
      success: true,
      message: "AI suggestions generated successfully.",
      aiResult: report,
    });
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
