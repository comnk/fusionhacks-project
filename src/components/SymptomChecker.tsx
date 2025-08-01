import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Search, AlertTriangle, Home, User } from 'lucide-react';

import '../i18n';

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

  const { t, i18n } = useTranslation('symptoms');

  const analyzeSymptoms = async (symptoms: string): Promise<SymptomResult> => {
    const response = await axios.post<SymptomResult>('http://localhost:8000/analyze-symptoms', {
      symptoms: symptoms,
      language: i18n.language
    });
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
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
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-white/20 rounded-xl mr-4">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{t('header.title')}</h2>
            </div>
          </div>
          <p className="text-emerald-100 text-lg leading-relaxed">{t('header.subtitle')}</p>
        </div>
      </div>

      <div className="p-8 relative">
        <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="symptoms" className="block text-gray-800 font-semibold mb-4 text-xl">
              {t('form.label')}
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={`💭 ${t('form.placeholder')}`}
              className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 resize-none text-lg leading-relaxed shadow-inner bg-gray-50/50 transition-all duration-300"
              rows={5}
              required
            />
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <span className="mr-2">💡</span>
              <span>{t('form.helperText', 'The more details you share, the better I can help you')}</span>
            </div>
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
                  <span>{t('form.loading')}</span>
                </>
              ) : (
                <>
                  <Search className="w-6 h-6 mr-3" />
                  <span>{t('form.button')}</span>
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
                {t('results.conditionsTitle')}
              </h3>
              <div className="space-y-4">
                {result.conditions.map((condition, index) => (
                  <div key={index} className="flex items-center bg-white/60 rounded-xl p-4 hover:bg-white/80 transition-colors">
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
                {t('results.homeCareTitle')}
              </h3>
              <div className="space-y-4">
                {result.homeCare.map((tip, index) => (
                  <div key={index} className="flex items-start bg-white/60 rounded-xl p-4 hover:bg-white/80 transition-colors">
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
                {t('results.seekHelpTitle')}
              </h3>
              <div className="bg-white/60 rounded-xl p-6">
                <p className="text-gray-800 leading-relaxed text-lg font-medium">{result.seekHelp}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-3xl p-8 shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 text-center leading-relaxed font-medium">
                {t('results.disclaimer')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
`;
document.head.appendChild(style);

export default SymptomChecker;
