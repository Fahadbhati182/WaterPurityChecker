const prompt = `
  Analyze the following water data:
  - pH: ${ph}
  - TDS: ${tds} ppm
  - Turbidity: ${turbidity} NTU
  - Temperature: ${temperature}°C
  - Color/Smell: ${color || smell || "not specified"}

  Return:
  1. Purity percentage
  2. Classification (Safe / Unsafe / Needs treatment)
  3. Explanation of reasoning
  4. Suggestions to purify if needed
  `;
    
  // Call AI API (OpenAI, Gemini, etc.)
  const response = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "user", content: prompt }],
  });