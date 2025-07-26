import React, { useState } from 'react';
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

  // Mock emotion analysis (in real app, this would call Hugging Face Emotion API)
  const analyzeEmotion = async (text: string): Promise<EmotionResult> => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('stress') || lowerText.includes('overwhelmed') || lowerText.includes('pressure')) {
      return {
        primaryEmotion: 'Stress',
        confidence: 85,
        insights: 'I can sense you\'re feeling stressed right now. That\'s completely normal - we all go through tough times. The good news is there are gentle ways to help yourself feel better.',
        copingTips: [
          'Take 3 slow, deep breaths - in through your nose, out through your mouth',
          'Step away for just 5 minutes and do something you enjoy',
          'Try gently rolling your shoulders and stretching your neck',
          'Go for a short walk, even if it\'s just around the room',
          'Write down what\'s bothering you - sometimes getting it out helps'
        ],
        color: 'orange',
        icon: '😰'
      };
    }

    if (lowerText.includes('sad') || lowerText.includes('down') || lowerText.includes('depressed')) {
      return {
        primaryEmotion: 'Sadness',
        confidence: 78,
        insights: 'I hear that you\'re feeling sad, and I want you to know that\'s okay. Your feelings matter, and it\'s brave of you to acknowledge them. This difficult moment won\'t last forever.',
        copingTips: [
          'Call or text someone who cares about you - you don\'t have to face this alone',
          'Do one small thing that usually makes you smile, even for a moment',
          'Think of 3 things you\'re grateful for today, no matter how small',
          'Open a window or step outside - fresh air can be surprisingly healing',
          'Write about your feelings without judging yourself'
        ],
        color: 'blue',
        icon: '😢'
      };
    }

    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous')) {
      return {
        primaryEmotion: 'Anxiety',
        confidence: 82,
        insights: 'I can feel the worry in your words. Anxiety is your mind trying to keep you safe, but sometimes it gets a bit too protective. Let\'s find some gentle ways to calm those racing thoughts.',
        copingTips: [
          'Look around and name 5 things you can see, 4 you can hear, 3 you can touch',
          'Breathe in for 4 counts, hold for 7, breathe out for 8 - repeat 3 times',
          'Ask yourself: "Is this worry based on facts or fears?"',
          'Focus on just one thing you can control right now',
          'Try a 5-minute guided meditation or gentle stretching'
        ],
        color: 'purple',
        icon: '😟'
      };
    }

    if (lowerText.includes('happy') || lowerText.includes('excited') || lowerText.includes('joy')) {
      return {
        primaryEmotion: 'Joy',
        confidence: 90,
        insights: 'Your happiness is shining through your words! I love seeing this. These beautiful moments are precious - let\'s help you soak up all the good feelings.',
        copingTips: [
          'Take a moment to really feel this happiness - breathe it in deeply',
          'Share your joy with someone special - happiness grows when shared',
          'Remember what created this feeling so you can return to it later',
          'Do more of what makes your heart light up like this',
          'Think about how you can sprinkle more of these moments into your days'
        ],
        color: 'green',
        icon: '😊'
      };
    }

    if (lowerText.includes('angry') || lowerText.includes('frustrated') || lowerText.includes('mad')) {
      return {
        primaryEmotion: 'Anger',
        confidence: 88,
        insights: 'I can feel the fire in your words. Anger usually means something important to you has been hurt or threatened. Your feelings are valid - let\'s find healthy ways to honor them.',
        copingTips: [
          'Before you react, take 10 slow breaths - give your heart time to slow down',
          'Move your body - do jumping jacks, punch a pillow, or go for a brisk walk',
          'Write out everything you\'re feeling - don\'t hold back, let it all out',
          'When you feel the heat rising, pause and count to 10 slowly',
          'Ask yourself: "What do I really need right now that I\'m not getting?"'
        ],
        color: 'red',
        icon: '😠'
      };
    }

    // Default response for mixed or unclear emotions
    return {
      primaryEmotion: 'Mixed Emotions',
      confidence: 65,
      insights: 'I can sense you\'re feeling a lot of different things right now. That\'s so human and completely normal - our hearts are big enough to hold many feelings at once.',
      copingTips: [
        'Give yourself permission to feel confused - it\'s okay not to have it all figured out',
        'Try to stay in this moment instead of worrying about tomorrow',
        'Be as kind to yourself as you would be to your best friend',
        'Talk to someone who listens without trying to fix everything',
        'Remember: feelings are like weather - they change and pass through'
      ],
      color: 'gray',
      icon: '🤔'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotionText.trim()) return;

    setLoading(true);
    try {
      // Simulate API delay
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