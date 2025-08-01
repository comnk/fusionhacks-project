import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Heart, Lightbulb, TrendingUp, Smile } from 'lucide-react';
import { translateText } from '../translateText';

interface EmotionResult {
  primaryEmotion: string;
  confidence: number;
  insights: string;
  copingTips: string[];
  color: string;
  icon: string;
}

const EmotionDetector: React.FC = () => {
  const [emotionText, setEmotionText] = useState('');
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [language, setLanguage] = useState('en');

  const [uiText, setUiText] = useState({
    headerTitle: 'Emotion Detector',
    headerSubtitle: 'Enter how you feel, and we’ll analyze your emotional state.',
    textareaLabel: 'Describe how you’re feeling',
    textareaPlaceholder: 'e.g. I feel anxious and overwhelmed...',
    submitButton: 'Analyze Emotion',
    loadingMessage: 'Analyzing...',
    supportMessage: 'We care about your mental health ❤️',
    copingTipsTitle: 'Coping Tips',
    reminderTitle: 'Remember',
    reminderText: 'It’s okay to feel what you’re feeling. Emotions are natural.',
    reminderSuggestion: 'Take a deep breath and be kind to yourself.',
    confidence: 'Confidence: {{confidence}}%',
  });

  // Translate static UI text when language changes
  useEffect(() => {
    const translateUI = async () => {
      const keys = Object.keys(uiText) as (keyof typeof uiText)[];
      const values = Object.values(uiText);
      const translatedValues = await Promise.all(
        values.map((text) => translateText(text, language))
      );
      const translatedUI = keys.reduce((acc, key, idx) => {
        acc[key] = translatedValues[idx];
        return acc;
      }, {} as typeof uiText);
      setUiText(translatedUI);
    };

    if (language !== 'en') translateUI();
    else {
      setUiText({
        headerTitle: 'Emotion Detector',
        headerSubtitle: 'Enter how you feel, and we’ll analyze your emotional state.',
        textareaLabel: 'Describe how you’re feeling',
        textareaPlaceholder: 'e.g. I feel anxious and overwhelmed...',
        submitButton: 'Analyze Emotion',
        loadingMessage: 'Analyzing...',
        supportMessage: 'We care about your mental health ❤️',
        copingTipsTitle: 'Coping Tips',
        reminderTitle: 'Remember',
        reminderText: 'It’s okay to feel what you’re feeling. Emotions are natural.',
        reminderSuggestion: 'Take a deep breath and be kind to yourself.',
        confidence: 'Confidence: {{confidence}}%',
      });
    }
  }, [language]);

  const analyzeEmotion = async (emotions: string): Promise<EmotionResult> => {
    try {
      const response = await axios.post<EmotionResult>(
        'https://fusionhacks-project.onrender.com/analyze-emotions',
        {
          emotions,
          language,
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Emotion API error:', error?.response?.data || error.message);
      throw new Error('Unable to analyze emotion.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotionText.trim()) return;

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const analysis = await analyzeEmotion(emotionText);
      setResult(analysis);
      setShowResult(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'from-orange-500 to-red-500',
      blue: 'from-blue-500 to-indigo-500',
      purple: 'from-purple-500 to-pink-500',
      green: 'from-green-500 to-emerald-500',
      red: 'from-red-500 to-pink-500',
      gray: 'from-gray-500 to-slate-500',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-white/20 rounded-xl mr-4">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{uiText.headerTitle}</h2>
              <p className="text-pink-100 text-sm mt-1">Mental Wellness Assistant</p>
            </div>
          </div>
          <p className="text-pink-100 text-lg leading-relaxed">{uiText.headerSubtitle}</p>
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            className="absolute top-4 right-4 bg-white/20 text-white font-semibold px-3 py-1 rounded-xl shadow"
          >
            <option value="en">🇺🇸 English</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="zh">🇨🇳 Chinese</option>
          </select>
        </div>
      </div>

      <div className="p-8 relative">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="emotions" className="block text-gray-800 font-semibold mb-4 text-xl">
              {uiText.textareaLabel}
            </label>
            <textarea
              id="emotions"
              value={emotionText}
              onChange={(e) => setEmotionText(e.target.value)}
              placeholder={`💭 ${uiText.textareaPlaceholder}`}
              className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 resize-none text-lg leading-relaxed shadow-inner bg-gray-50/50 transition-all duration-300"
              rows={5}
              required
            />
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <span className="mr-2">💝</span>
              <span>{uiText.supportMessage}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !emotionText.trim()}
            className="w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="relative z-10 flex items-center">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  <span>{uiText.loadingMessage}</span>
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 mr-3" />
                  <span>{uiText.submitButton}</span>
                </>
              )}
            </div>
          </button>
        </form>

        {result && showResult && (
          <div className="mt-10 space-y-8 animate-fadeIn">
            <div className={`bg-gradient-to-r ${getColorClasses(result.color)} rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-4xl font-bold flex items-center">
                    <span className="text-5xl mr-5 animate-pulse">{result.icon}</span>
                    {result.primaryEmotion}
                  </h3>
                  <div className="text-right">
                    <div className="bg-white/20 rounded-full px-4 py-2">
                      <div className="text-sm font-medium">
                        {uiText.confidence.replace('{{confidence}}', result.confidence.toFixed(1))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mt-6">
                  <p className="text-white leading-relaxed text-xl font-medium">{result.insights}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-100">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center text-2xl">
                <div className="p-2 bg-green-100 rounded-xl mr-4">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                {uiText.copingTipsTitle}
              </h3>
              <div className="space-y-4">
                {result.copingTips.map((tip, index) => (
                  <div key={index} className="flex items-start bg-white/60 rounded-xl p-4 hover:bg-white/80 transition-colors">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0 shadow-lg">
                      {index + 1}
                    </div>
                    <span className="text-gray-800 leading-relaxed text-lg font-medium">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg border border-blue-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center text-2xl">
                <div className="p-2 bg-blue-100 rounded-xl mr-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                {uiText.reminderTitle}
              </h3>
              <div className="bg-white/60 rounded-xl p-6">
                <p className="text-gray-800 leading-relaxed mb-4 text-lg font-medium">
                  {uiText.reminderText}
                </p>
                <div className="flex items-center text-blue-600">
                  <Smile className="w-5 h-5 mr-3" />
                  <span className="text-lg font-medium">{uiText.reminderSuggestion}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-3xl p-8 shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 text-center leading-relaxed font-medium">
                {uiText.supportMessage}
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

export default EmotionDetector;
