import React, { useState } from 'react';
import { Heart, Brain, Shield, ArrowLeft } from 'lucide-react';
import SymptomChecker from './components/SymptomChecker';
import EmotionDetector from './components/EmotionDetector';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'symptoms' | 'emotions'>('home');

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">HealthGuard AI</h1>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your smart health companion for physical and emotional wellness
          </p>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => setActiveView('symptoms')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center mb-3">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Symptom Checker</h2>
            </div>
            <p className="text-gray-600 text-left leading-relaxed">
              Enter your symptoms and get insights on possible conditions, home care tips, and when to seek medical help.
            </p>
          </button>

          <button
            onClick={() => setActiveView('emotions')}
            className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
          >
            <div className="flex items-center mb-3">
              <Brain className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Emotion Detector</h2>
            </div>
            <p className="text-gray-600 text-left leading-relaxed">
              Analyze your emotions and get personalized insights with helpful coping strategies for better mental health.
            </p>
          </button>
        </div>


        {/* Disclaimer */}
        <div className="mt-8 text-center">
        </div>
      </div>
    </div>
  );
        {/* Benefits */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Why Choose HealthGuard AI?</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">Complete privacy - no sign-up or data storage</p>
            </div>
            <div className="flex items-start">f
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">Always ree with reliable health resources</p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <p className="text-gray-600">Instant results on any device</p>
            </div>
          </div>
        </div>

  const renderBackButton = () => (
    <button
      onClick={() => setActiveView('home')}
      className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Home
    </button>
  );

  if (activeView === 'symptoms') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          {renderBackButton()}
          <SymptomChecker />
        </div>
      </div>
    );
  }

  if (activeView === 'emotions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-8">
        <div className="max-w-md mx-auto">
          {renderBackButton()}
          <EmotionDetector />
        </div>
      </div>
    );
  }

  return renderHome();
}

export default App;