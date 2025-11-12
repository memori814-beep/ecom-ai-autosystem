// frontend/src/components/Predict.jsx
import React, { useState } from "react";

function Predict() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/predict"; // backend port same rakho

  const handlePredict = async () => {
    if (!input.trim()) {
      alert("Please enter something!");
      return;
    }

    setLoading(true);
    setResult("");
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await resp.json();
      setResult(data.prediction || "No response");
    } catch (err) {
      setResult("⚠️ Server not responding. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">AI Reseller Predictor 🚀</h1>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type text (e.g., 'price model' or 'image classifier')"
        />

        <button
          onClick={handlePredict}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {result && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <strong className="block">Result:</strong>
            <span className="text-sm">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Predict;
