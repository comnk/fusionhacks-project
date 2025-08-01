import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, AlertTriangle, Home, User } from 'lucide-react';
import { translateText } from '../translateText'; // import the helper

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
  const [language, setLanguage] = useState('en');

  // Translatable UI strings
  const [translatedUI, setTranslatedUI] = useState({
    title: 'Symptom Checker',
    subtitle: "Enter your symptoms and we'll help you understand what might be going on.",
    describeSymptoms: 'Describe your symptoms',
    analyze: 'Analyze',
    analyzing: 'Analyzing...',
    possibleConditions: 'Possible Conditions',
    homeCareTips: 'Home Care Tips',
    seekHelpTitle: 'When to Seek Help',
  });

  // Translate static UI strings when language changes
  useEffect(() => {
    const translateUI = async () => {
      const keys = Object.keys(translatedUI) as (keyof typeof translatedUI)[];
      const values = Object.values(translatedUI);
      const translatedValues = await Promise.all(values.map((text) => translateText(text, language)));
      const newTranslatedUI = keys.reduce((acc, key, idx) => {
        acc[key] = translatedValues[idx];
        return acc;
      }, {} as typeof translatedUI);
      setTranslatedUI(newTranslatedUI);
    };

    if (language !== 'en') {
      translateUI();
    } else {
      // reset to English
      setTranslatedUI({
        title: 'Symptom Checker',
        subtitle: "Enter your symptoms and we'll help you understand what might be going on.",
        describeSymptoms: 'Describe your symptoms',
        analyze: 'Analyze',
        analyzing: 'Analyzing...',
        possibleConditions: 'Possible Conditions',
        homeCareTips: 'Home Care Tips',
        seekHelpTitle: 'When to Seek Help',
      });
    }
  }, [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      const response = await axios.post<SymptomResult>(
        'https://fusionhacks-project.onrender.com/analyze-symptoms',
        { symptoms, language }
      );
      setResult(response.data);
      setShowResult(true);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="absolute top-4 right-4 z-30">
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="bg-white/95 backdrop-blur-sm text-gray-800 font-semibold px-4 py-2 rounded-xl shadow-lg border border-white/30 hover:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="zh">🇨🇳 Chinese</option>
          </select>
        </div>
        <div className="relative z-10 pt-12">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-white/20 rounded-xl mr-4">
              <Search className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold">{translatedUI.title}</h2>
          </div>
          <p className="text-emerald-100 text-lg leading-relaxed">
            {translatedUI.subtitle}
          </p>
        </div>
      </div>

      <div className="p-8 relative">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="symptoms" className="block text-gray-800 font-semibold mb-4 text-xl">
              {translatedUI.describeSymptoms}
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="💭 e.g., headache, sore throat, fatigue"
              className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 resize-none text-lg leading-relaxed shadow-inner bg-gray-50/50 transition-all duration-300"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !symptoms.trim()}
            className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="relative z-10 flex items-center">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span>{translatedUI.analyzing}</span>
                </>
              ) : (
                <>
                  <Search className="w-6 h-6 mr-3" />
                  <span>{translatedUI.analyze}</span>
                </>
              )}
            </div>
          </button>
        </form>

        {result && showResult && (
          <div className="mt-10 space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-100">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center text-2xl">
                <div className="p-2 bg-blue-100 rounded-xl mr-4">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                {translatedUI.possibleConditions}
              </h3>
              <div className="space-y-4">
                {result.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center bg-white/60 rounded-xl p-4">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-4 flex-shrink-0"></div>
                    <span className="text-gray-800 text-lg font-medium">{condition}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-100">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center text-2xl">
                <div className="p-2 bg-green-100 rounded-xl mr-4">
                  <Home className="w-6 h-6 text-green-600" />
                </div>
                {translatedUI.homeCareTips}
              </h3>
              <div className="space-y-4">
                {result.homeCare.map((tip, index) => (
                  <div key={index} className="flex items-start bg-white/60 rounded-xl p-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 text-lg leading-relaxed font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-yellow-100">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center text-2xl">
                <div className="p-2 bg-yellow-100 rounded-xl mr-4">
                  <User className="w-6 h-6 text-yellow-600" />
                </div>
                {translatedUI.seekHelpTitle}
              </h3>
              <div className="bg-white/60 rounded-xl p-6">
                <p className="text-gray-800 leading-relaxed text-lg font-medium">{result.seekHelp}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
