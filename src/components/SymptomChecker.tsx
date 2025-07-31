import React, { useState } from 'react';
import axios from 'axios';
import { Search, AlertTriangle, Home, User } from 'lucide-react';

interface SymptomResult {
  conditions: string[];
  homeCare: string[];
  seekHelp: string;
}

const SymptomChecker: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const analyzeSymptoms = async (symptoms: string): Promise<SymptomResult> => {
    const response = await axios.post<SymptomResult>('http://localhost:8000/analyze-symptoms', {
      symptoms: symptoms
    });
    return response.data;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const analysis = await analyzeSymptoms(symptoms);
      setResult(analysis);
      setShowResult(true);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-8 text-white">
        <div className="flex items-center mb-2">
          <Search className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">How can I help you feel better?</h2>
        </div>
        <p className="text-emerald-100 text-lg">Tell me what's bothering you, and I'll help you understand what might be going on</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="symptoms" className="block text-gray-800 font-medium mb-4 text-lg">
              What's not feeling right today?
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="I have a headache and feel tired... or my throat is scratchy and I'm coughing... just describe what you're experiencing in your own words."
              className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none text-lg leading-relaxed"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className="w-full bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-500 hover:to-teal-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Looking into this for you...
              </>
            ) : (
              <>
                <Search className="w-6 h-6 mr-3" />
                Help me understand
              </>
            )}
          </button>
        </form>

        {result && showResult && (
          <div className="mt-8 space-y-6">
            {/* Possible Conditions */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-xl">
                <AlertTriangle className="w-6 h-6 mr-3 text-blue-600" />
                This might be what's going on
              </h3>
              <div className="space-y-3">
                {result.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    <span className="text-gray-700 text-lg">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Care */}
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-xl">
                <Home className="w-6 h-6 mr-3 text-green-600" />
                Ways to take care of yourself at home
              </h3>
              <div className="space-y-3">
                {result.homeCare.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 text-lg leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* When to Seek Help */}
            <div className="bg-yellow-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-xl">
                <User className="w-6 h-6 mr-3 text-yellow-600" />
                When it's time to see a doctor
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{result.seekHelp}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-base text-gray-600 text-center leading-relaxed">
                💙 I'm here to help you understand what might be going on, but I'm not a replacement for real medical care. When in doubt, trust your instincts and talk to a healthcare professional who can properly examine you.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;