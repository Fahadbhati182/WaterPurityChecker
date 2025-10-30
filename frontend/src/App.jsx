import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AquaCheck from "./components/AquaCheck";
import WaterPurityResults from "./components/WaterPurityResults";
import axios from "axios";
import Loading from "./components/Loading";
import { GoogleGenerativeAI } from "@google/generative-ai"; // ✅ correct import

// axios.defaults.baseURL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [formData, setFormData] = useState({
    ph: 7.0,
    tds: 90,
    turbidity: 20,
    temperature: 27,
    color: "colorless",
    smell: "none",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ph, tds, turbidity, temperature, color, smell, image } = formData;

    const prompt = `
      You are an expert water quality analyst.

      Analyze the following water data:

      - pH: ${ph}
      - TDS: ${tds} ppm
      - Turbidity: ${turbidity} NTU
      - Temperature: ${temperature}°C
      - Color: ${color || "not specified"}
      - Smell: ${smell || "not specified"}
      - Image URL: ${image || "none"}

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

    try {
      setLoading(true);

      // ✅ Initialize Gemini client (uses your environment key)
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

      // ✅ Use Gemini 2.5 Flash
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // ✅ Generate the content
      const result = await model.generateContent(prompt);
      const textResponse = result.response.text();
      console.log("Gemini text response:", textResponse);

      // ✅ Parse the JSON
      const cleaned = textResponse
        .replace(/```json/i, "")
        .replace(/```/g, "")
        .trim();

      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch (err) {
        console.error("Invalid JSON from Gemini:", textResponse);
        throw new Error("Gemini returned invalid JSON");
      }

      console.log("Gemini text response:", parsed);

      // ✅ Build structured response
      const resStructure = {
        ph,
        tds,
        turbidity,
        temperature,
        color,
        smell,
        image,
        aiResult: {
          purity: parsed.purity ?? 0,
          classification: parsed.classification ?? "Unknown",
          explanation: parsed.explanation ?? "No explanation provided.",
          suggestions: parsed.suggestions ?? "No suggestions provided.",
        },
      };

      setAiResult(resStructure);
      setIsOpen(true);
    } catch (error) {
      console.error("Error during Gemini processing:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f7f8] font-display text-[#333333] overflow-hidden">
      <Header setIsOpen={setIsOpen} />
      {isOpen && aiResult ? (
        <WaterPurityResults report={aiResult} />
      ) : (
        <AquaCheck
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
