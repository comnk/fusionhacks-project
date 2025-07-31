import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Search, AlertTriangle, Home, User } from 'lucide-react';

import '../i18n';
import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';

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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-400 to-teal-400 p-8 text-white">
        <div className="flex items-center mb-2">
          <Search className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">{t('header.title')}</h2>
        </div>
        <p className="text-emerald-100 text-lg">{t('header.subtitle')}</p>
        <LanguageSwitcher />
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="symptoms" className="block text-gray-800 font-medium mb-4 text-lg">
              {t('form.label')}
            </label>
            <textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder={t('form.placeholder')}
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
                {t('form.loading')}
              </>
            ) : (
              <>
                <Search className="w-6 h-6 mr-3" />
                {t('form.button')}
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
                {t('results.conditionsTitle')}
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
                {t('results.homeCareTitle')}
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
                {t('results.seekHelpTitle')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">{result.seekHelp}</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-base text-gray-600 text-center leading-relaxed">
                {t('results.disclaimer')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
