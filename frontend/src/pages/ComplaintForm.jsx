import { useState } from "react";
import API from "../services/api";

function ComplaintForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    category: "",
    location: ""
  });

  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setLoading(true);

    // 1. Save Complaint
    const complaintRes = await API.post(
      "/complaints",
      formData
    );

    // SUCCESS POPUP
    alert("✅ Complaint Submitted Successfully");

    // 2. AI Analysis
    try {

      const ai = await API.post(
        "/ai/analyze",
        {
          description: formData.description
        }
      );

      setAiResult(ai.data.result);

    } catch (aiError) {

      console.log("AI Error:", aiError);

      setAiResult(
        "AI analysis currently unavailable."
      );
    }

    // Clear Form
    setFormData({
      name: "",
      email: "",
      title: "",
      description: "",
      category: "",
      location: ""
    });

  } catch (error) {

    console.log(error);

    alert("❌ Failed to submit complaint");

  } finally {

    setLoading(false);
  }
};

  return (

    <div className="min-h-screen px-4 py-10">

      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">

        {/* LEFT SIDE FORM */}

        <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-3xl shadow-2xl p-8">

          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            Register Complaint
          </h1>

          <p className="text-slate-400 mb-8">
            Submit your issue and our AI system
            will analyze it automatically.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />

            <input
              type="text"
              name="title"
              placeholder="Complaint Title"
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
            />

            <textarea
              name="description"
              rows="6"
              placeholder="Describe your complaint..."
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400 resize-none"
            />

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="category"
                placeholder="Category"
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-slate-900 text-white border border-slate-600 focus:outline-none focus:border-cyan-400"
              />

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-black font-bold py-4 rounded-2xl text-lg shadow-lg"
            >

              {
                loading
                  ? "Analyzing Complaint..."
                  : "Submit Complaint"
              }

            </button>

          </form>

        </div>

        {/* RIGHT SIDE AI RESULT */}

        <div className="bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-3xl shadow-2xl p-8 flex flex-col">

          <h2 className="text-3xl font-bold text-green-400 mb-4">
            AI Analysis Result
          </h2>

          <p className="text-slate-400 mb-6">
            AI-generated complaint insights
            will appear here.
          </p>

          {
            aiResult ? (

              <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 text-slate-200 whitespace-pre-wrap flex-1 overflow-auto">

                {aiResult}

              </div>

            ) : (

              <div className="flex-1 flex justify-center items-center">

                <div className="text-center">

                  <div className="text-7xl mb-4">
                    🤖
                  </div>

                  <p className="text-slate-400 text-lg">
                    No AI analysis yet
                  </p>

                </div>

              </div>
            )
          }

        </div>

      </div>

    </div>
  );
}

export default ComplaintForm;