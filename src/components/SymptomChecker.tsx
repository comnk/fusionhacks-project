import React, { useState } from 'react';
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

  // Mock symptom analysis (in real app, this would call actual medical APIs)
  const analyzeSymptoms = async (symptoms: string): Promise<SymptomResult> => {
    const lowerSymptoms = symptoms.toLowerCase();
    
    if (lowerSymptoms.includes('headache') && lowerSymptoms.includes('fever')) {
      return {
        conditions: ['Common Cold', 'Flu', 'Viral Infection', 'Tension Headache'],
        homeCare: [
          'Get cozy and rest as much as your body needs - sleep is healing',
          'Sip warm tea, water, or soup throughout the day to stay hydrated',
          'Take gentle pain relief like acetaminophen if needed (follow the bottle)',
          'Try a cool, damp cloth on your forehead - it can be surprisingly soothing',
          'Keep an eye on your temperature, but don\'t obsess over it'
        ],
        seekHelp: 'Please reach out to a doctor if your fever goes above 102°F (39°C), you\'re not feeling better after a week, or if you have a really bad headache, stiff neck, or trouble breathing. Trust your instincts - if something feels seriously wrong, get help.'
      };
    }

    if (lowerSymptoms.includes('cough') || lowerSymptoms.includes('sore throat')) {
      return {
        conditions: ['Common Cold', 'Upper Respiratory Infection', 'Allergies', 'Bronchitis'],
        homeCare: [
          'Warm drinks like tea with honey can be incredibly soothing',
          'Try breathing in steam from a hot shower or bowl of hot water',
          'A spoonful of honey in warm water works wonders for scratchy throats',
          'Stay away from smoke and strong smells that might irritate you more',
          'Listen to your body and rest when you need to'
        ],
        seekHelp: 'Time to see a doctor if your cough hangs around for more than 3 weeks, you cough up blood, breathing becomes difficult, or you develop a high fever. Don\'t wait if you\'re worried.'
      };
    }

    if (lowerSymptoms.includes('stomach') || lowerSymptoms.includes('nausea')) {
      return {
        conditions: ['Gastroenteritis', 'Food Poisoning', 'Indigestion', 'Stress-related Upset'],
        homeCare: [
          'Sip small amounts of water or clear fluids - your body needs gentle hydration',
          'When you feel ready, try bland foods like bananas, rice, applesauce, or toast',
          'Skip dairy, coffee, and greasy foods for now - they might make you feel worse',
          'Rest and give your stomach a break from solid food until you feel better',
          'Ginger tea or ginger ale (flat) can help calm an upset stomach'
        ],
        seekHelp: 'Please get medical help if you become very dehydrated, see blood in your vomit or stool, have severe belly pain, or if you\'re not feeling better after 3 days. Your body is telling you something important.'
      };
    }

    // Generic response for other symptoms
    return {
      conditions: ['Various Possible Conditions', 'Consult Healthcare Provider'],
      homeCare: [
        'Pay attention to how you\'re feeling and notice any changes',
        'Rest is one of the best medicines - don\'t feel guilty about taking it easy',
        'Keep drinking water throughout the day',
        'Eat nourishing foods when you feel up to it',
        'Try some gentle relaxation - stress can make everything feel worse'
      ],
      seekHelp: 'It\'s always okay to check in with a healthcare professional, especially if your symptoms stick around or get worse. They\'re there to help, and you know your body best.'
    };
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