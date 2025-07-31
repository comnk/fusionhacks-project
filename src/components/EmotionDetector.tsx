import React, { useState } from 'react';
import axios from 'axios';
import { Heart, Lightbulb, TrendingUp, Smile } from 'lucide-react';

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

  const analyzeEmotion = async (emotions: string): Promise<EmotionResult> => {
    try {
      const response = await axios.post<EmotionResult>('http://localhost:8000/analyze-emotions', {
        emotions
      });
      return response.data;
    } catch (error: any) {
      console.error("Emotion API error:", error?.response?.data || error.message);
      throw new Error("Unable to analyze emotion.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotionText.trim()) return;

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const analysis = await analyzeEmotion(emotionText);
      setResult(analysis);
      setShowResult(true);
    } catch (error) {
      console.error('Error analyzing emotion:', error);
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
      gray: 'from-gray-500 to-slate-500'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-8 text-white">
        <div className="flex items-center mb-2">
          <Heart className="w-8 h-8 mr-3" />
          <h2 className="text-3xl font-bold">How are you feeling?</h2>
        </div>
        <p className="text-pink-100 text-lg">I'm here to listen and help you understand your emotions</p>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="emotions" className="block text-gray-800 font-medium mb-4 text-lg">
              Tell me what's on your heart today...
            </label>
            <textarea
              id="emotions"
              value={emotionText}
              onChange={(e) => setEmotionText(e.target.value)}
              placeholder="I feel overwhelmed with everything going on... or maybe I'm excited about something new... just share whatever is in your heart right now."
              className="w-full p-6 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none text-lg leading-relaxed"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !emotionText.trim()}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 disabled:from-gray-300 disabled:to-gray-300 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                Understanding your feelings...
              </>
            ) : (
              <>
                <Heart className="w-6 h-6 mr-3" />
                Help me understand
              </>
            )}
          </button>
        </form>

        {result && showResult && (
          <div className="mt-8 space-y-6">
            {/* Emotion Result */}
            <div className={`bg-gradient-to-r ${getColorClasses(result.color)} rounded-2xl p-8 text-white shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-3xl font-bold flex items-center">
                  <span className="text-4xl mr-4">{result.icon}</span>
                  {result.primaryEmotion}
                </h3>
                <div className="text-right">
                  <div className="text-sm opacity-90">I'm {result.confidence}% sure</div>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-xl p-5">
                <p className="text-white leading-relaxed text-lg">{result.insights}</p>
              </div>
            </div>

            {/* Coping Tips */}
            <div className="bg-green-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-5 flex items-center text-xl">
                <Lightbulb className="w-6 h-6 mr-3 text-green-600" />
                Some gentle ways to help yourself
              </h3>
              <div className="space-y-3">
                {result.copingTips.map((tip, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 leading-relaxed text-lg">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mood Tracking Suggestion */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center text-xl">
                <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                A gentle reminder
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3 text-lg">
                Checking in with yourself regularly is like giving your heart a warm hug. It helps you understand yourself better.
              </p>
              <div className="flex items-center text-blue-600">
                <Smile className="w-5 h-5 mr-2" />
                <span className="text-base">Maybe try writing down how you feel each day</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-base text-gray-600 text-center leading-relaxed">
                💙 You matter, and your feelings matter. If these difficult emotions stick around, please consider talking to someone who can help - like a counselor or therapist. You deserve support.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionDetector;