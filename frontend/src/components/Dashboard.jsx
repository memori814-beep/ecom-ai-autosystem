// frontend/src/components/Dashboard.jsx
import React, { useState } from "react";
import { Brain, Image, DollarSign, Home, X } from "lucide-react";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://127.0.0.1:8000/predict"; // backend FastAPI URL

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
      setResult(data.prediction || "No response received.");
    } catch (err) {
      setResult("⚠️ Server not responding. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const models = [
    {
      name: "Text Intelligence",
      icon: <Brain size={22} />,
      desc: "Analyze or generate text with AI.",
    },
    {
      name: "Image Analyzer",
      icon: <Image size={22} />,
      desc: "Process and classify uploaded images.",
    },
    {
      name: "Pricing Predictor",
      icon: <DollarSign size={22} />,
      desc: "Predict or optimize product prices.",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col">
        <div className="text-xl font-bold px-6 py-4 border-b border-gray-700">
          Ecom-AI
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <Home size={18} /> <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <Brain size={18} /> <span>Models</span>
          </a>
          <a href="#" className="flex items-center space-x-2 hover:text-blue-400">
            <DollarSign size={18} /> <span>Pricing</span>
          </a>
        </nav>
        <div className="p-4 text-sm border-t border-gray-700">© 2025 Ecom-AI</div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + New Prediction
          </button>
        </header>

        {/* Model Cards */}
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto">
          {models.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-blue-600">{m.icon}</div>
                <h2 className="text-lg font-semibold">{m.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-3">{m.desc}</p>
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
              >
                Try Model
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* Prediction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              🔮 AI Prediction
            </h2>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type something for AI to predict..."
              className="w-full border rounded-md p-2 mb-3 focus:outline-blue-500"
            />
            <button
              onClick={handlePredict}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>

            {result && (
              <div className="mt-4 bg-gray-100 p-3 rounded-md text-sm text-gray-800">
                <strong>Result:</strong> {result}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
