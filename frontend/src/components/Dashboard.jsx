import React, { useState } from "react";
import { Brain, Image, DollarSign, Home, X } from "lucide-react";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // ⭐ FINAL BACKEND URL
  const API_URL = "https://ecom-ai-autosystem.onrender.com/checkout";

  // ⭐ FINAL PREDICT FUNCTION — sends real checkout JSON
  const handlePredict = async () => {
    if (!input.trim()) {
      alert("Please enter product URL or ID!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const payload = {
        product_id: "123",
        product_url: input,
        qty: 1,
        supplier_price: 250,
        customer_price: 399,
        commission_pct: 20,
        fixed_fee: 0,
      };

      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();

      if (!resp.ok) {
        setResult({ error: data.detail || "Unknown error" });
      } else {
        setResult({ success: data });
      }
    } catch (err) {
      setResult({ error: "⚠️ Server not responding. Make sure backend is running." });
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Model cards
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

      {/* Main Area */}
      <main className="flex-1 flex flex-col">

        {/* Top Bar */}
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
        <section className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {models.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-200"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-blue-600">{m.icon}</div>
                <h2 className="text-lg font-semibold">{m.name}</h2>
              </div>
              <p className="text-sm text-gray-600 mb-3">{m.desc}</p>

              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Try Model
              </button>
            </div>
          ))}

        </section>

        {/* Prediction Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">

              {/* Close button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-center">🤖 AI Prediction</h2>

              {/* Input box */}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter Product URL…"
                className="w-full border rounded-md p-2 mb-3 focus:outline-blue-500"
              />

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                {loading ? "Predicting..." : "Predict"}
              </button>

              {/* RESULT BOX */}
              {result && (
                <div
                  className={`mt-4 p-4 rounded-md text-sm border ${
                    result.error
                      ? "bg-red-100 border-red-400 text-red-700"
                      : "bg-green-100 border-green-400 text-green-700"
                  }`}
                >
                  <strong>{result.error ? "Error:" : "Success:"}</strong>
                  <pre className="whitespace-pre-wrap mt-2 text-sm">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
