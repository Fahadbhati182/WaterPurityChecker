import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AquaCheck from "./components/AquaCheck";
import WaterPurityResults from "./components/WaterPurityResults";
import axios from "axios";
import Loading from "./components/Loading";

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL ||"http://localhost:8080";


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

  // Normalize AI result to ensure purity & status are consistent
  const normalizeAiResult = (aiResult) => {
    const purityNum = Number(aiResult.purity);
    let classification = "Unsafe";

    if (purityNum >= 90) classification = "Safe";
    else if (purityNum >= 50) classification = "Needs treatment";
    else classification = "Unsafe";

    return {
      ...aiResult,
      purity: `${purityNum}%`,
      status: classification, // override AI output
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    try {
      setLoading(true);
      const res = await axios.post("/api/water-purity/check-purity", {
        ...formData,
      });
      console.log(res);

      if (res.data.success) {
        const normalizedResult = normalizeAiResult(res.data.aiResult.aiResult);
        setAiResult({
          ...formData,
          aiResult: normalizedResult,
        });
        setIsOpen(true);
      } else {
        console.error("AI result not successful:", res.data);
      }
    } catch (error) {
      console.error(error);
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
