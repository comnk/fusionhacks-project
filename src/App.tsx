import React, { useState } from 'react';
import { Heart, Brain, Shield, ArrowLeft, Sparkles, Users, Clock } from 'lucide-react';
import SymptomChecker from './components/SymptomChecker';
import EmotionDetector from './components/EmotionDetector';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'symptoms' | 'emotions'>('home');

  const renderHome = () => (
    <div 
      className="min-h-screen px-4 py-8 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(147, 51, 234, 0.2) 100%), url('https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Government & Mental Health Resources - Left Side */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 space-y-4 hidden lg:block">
        <div className="text-center mb-6 pr-4">
          <h3 className="text-white font-bold text-sm bg-blue-600/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
           Official Resources
          </h3>
        </div>
        
        {/* CDC */}
        <a 
          href="https://www.cdc.gov/healthyweight/index.html" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="CDC - Centers for Disease Control"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🏥
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-blue-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            CDC Health Info
          </div>
        </a>
                
        {/* ecdc */}
        <a 
          href="https://www.ecdc.europa.eu/en" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-pink-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="ECDC - European Centre for Disease Prevention and Control "
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🧑‍⚕️
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-blue-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
           ECDC - European Centre for Disease Prevention and Control
          </div>
        </a>
        
        <a 
          href="https://www.paho.org/en" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-orange-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="PAHO - pan american health organization  "
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            ❤️‍🩹
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-blue-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          PAHO - pan american health organization 
          </div>
        </a>

        <a 
          href="https://www.healthdata.org/research-analysis/gbd-publications" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="GBD - Global Burden of Disease"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            😃
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-blue-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          GBD - Global Burden of Disease
          </div>

        </a>
                <a 
          href="https://www.nationalacademies.org/hmd/health-and-medicine-division" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="National Academies of Sciences, Engineering, and Medicine – Health and Medicine Division"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🫵
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-blue-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          National Academies of Sciences, Engineering, and Medicine 
          </div>
        </a>
       <a 
          href="https://www.apha.org/membership?gad_source=1&gad_campaignid=21009428146&gbraid=0AAAAADuQWwue12k5WvIAbzDf4Vc95jnRq&gclid=CjwKCAjwy7HEBhBJEiwA5hQNoomupmusjw34Z5sjD3BT-lm7yQgkoiLpU2itBFlKnRx6YwSUTKC8thoCSxQQAvD_BwE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-yellow-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="APHA - American Public Health Association"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🙏
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-blue-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          APHA - American Public Health Association
          </div>
        </a>
        

        {/* NIH */}
        <a 
          href="https://www.nih.gov/health-information" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-green-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="NIH - National Institutes of Health"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🔬
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-green-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            NIH Health Info
          </div>
        </a>

        {/* WHO */}
        <a 
          href="https://www.who.int/health-topics" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-indigo-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="WHO - World Health Organization"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🌍
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-indigo-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            WHO Health Topics
          </div>
        </a>

        {/* FDA */}
        <a 
          href="https://www.fda.gov/consumers" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-purple-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="FDA - Food and Drug Administration"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            💊
          </div>
          <div className="absolute left-20 top-1/2 transform -translate-y-1/2 bg-purple-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            FDA Consumer Info
          </div>
        </a>
      </div>
      

<div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-20 space-y-4 hidden lg:block">
  <div className="text-center mb-6">
    <h3 className="text-white font-bold text-sm bg-pink-600/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
      Mental
    </h3>
  </div>
  

        {/* NIMH */}
        <a 
          href="https://www.nimh.nih.gov/health" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="NIMH - National Institute of Mental Health"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🧠
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-pink-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            NIMH Mental Health
          </div>
        </a>


        {/* SAMHSA */}
        <a 
  href="https://findtreatment.gov/" 
  target="_blank" 
  rel="noopener noreferrer"
  className="block w-16 h-16 bg-teal-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
  title="SAMHSA - Substance Abuse and Mental Health Services"
>
  <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
    🤝
  </div>
  <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-teal-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
    SAMHSA Help
  </div>
</a>

        {/* Mental Health America */}
        <a 
          href="https://www.mhanational.org/mental-health-screening-tools" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-orange-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="Mental Health America"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            💚
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-emerald-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            Mental Health America
          </div>
        </a>

        {/* Mental Health Europe */}
        <a 
          href="https://www.mentalhealtheurope.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-yellow-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="Mental Health Europe"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🫂
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-emerald-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          Mental Health Europe
          </div>
        </a>
{/* Beyond Blue (Australia) */}
        <a 
          href="https://www.beyondblue.org.au/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-purple-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="Beyond Blue (Australia)"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🛖
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-emerald-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          Beyond Blue (Australia)
          </div>
        </a>

        {/* Mind (UK)*/}
        <a 
          href="https://www.mind.org.uk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="Mind (UK)"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🤞
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-emerald-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          Mind (UK)
          </div>
        </a>
                {/* HeadsUpGuys (Canada)*/}
        <a 
          href="https://www.mind.org.uk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-blue-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="HeadsUpGuys (Canada)"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
          🩶
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-emerald-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
          HeadsUpGuys (Canada)
          </div>
        </a>

        {/* Crisis Text Line */}
        <a 
          href="https://www.crisistextline.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-red-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="Crisis Text Line - Text HOME to 741741"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            🆘
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-red-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            Crisis Text Line
          </div>
        </a>
        

        {/* 988 Suicide & Crisis Lifeline */}
        <a 
          href="https://988lifeline.org/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-16 h-16 bg-orange-600/90 backdrop-blur-sm rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group relative"
          title="988 Suicide & Crisis Lifeline"
        >
          <div className="flex items-center justify-center w-full h-full text-white text-2xl font-bold">
            📞
          </div>
          <div className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-orange-600/95 backdrop-blur-sm text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium shadow-lg">
            988 Crisis Lifeline
          </div>
        </a>
      </div>
      <div className="max-w-md mx-auto">

        

{/* Header */}
<div className="text-center mb-12 relative">
  <div className="w-full bg-white/98 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/40 group relative overflow-hidden">

    {/* Hover Background Layer */}
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-50 to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Content Layer */}
    <div className="relative z-10">
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <Shield className="w-16 h-16 text-purple-600 mr-3" />
          <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            HealthGuard AI
          </h1>
        </div>
      </div>
      <p className="text-gray-700 text-xl leading-relaxed font-medium">
        Your compassionate AI companion for physical and emotional wellness
      </p>
      <div className="flex items-center justify-center mt-4 text-sm text-black-500">
        <span>FusionHacks2 Project</span>
      </div>
    </div>
  </div>
</div>





        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          <button
            onClick={() => setActiveView('symptoms')}
            className="w-full bg-white/98 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/40 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-red-100 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">Physical Health</h2>
                  <p className="text-sm text-gray-500">Symptom Analysis & Care</p>
                </div>
              </div>
              <p className="text-gray-600 text-left leading-relaxed text-lg">
                Describe what's bothering you and get personalized insights on possible conditions, gentle home care tips, and clear guidance on when to seek professional help.
              </p>
              <div className="flex items-center mt-4 text-sm text-black-500">
                <div className="flex -space-x-2">
                </div>
                <span className="ml-3">Instant analysis • Evidence-based advice</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setActiveView('emotions')}
            className="w-full bg-white/98 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/40 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">Mental Wellness</h2>
                  <p className="text-sm text-gray-500">Emotion Analysis & Support</p>
                </div>
              </div>
              <p className="text-gray-600 text-left leading-relaxed text-lg">
                Share what's in your heart and receive compassionate emotional insights with personalized coping strategies to support your mental well-being.
              </p>
              <div className="flex items-center mt-4 text-sm text-black-500">
                <div className="flex -space-x-2">
                </div>
                <span className="ml-3">AI-powered insights • Therapeutic techniques</span>
              </div>
            </div>
          </button>
        </div>
        
{/* Benefits */}
<div
  className="w-full 
    bg-white/98 hover:bg-white 
    backdrop-blur-md 
    rounded-3xl p-8 shadow-2xl 
    hover:shadow-3xl hover:-translate-y-2 
    transition-all duration-500 
    border border-white/40 
    group relative overflow-hidden"
>
  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
    Why Choose HealthGuard AI?
  </h3>

  <div className="space-y-4">
    <div className="flex items-start group">
      <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
      <p className="text-gray-700 text-lg">Complete privacy - no sign-up or personal data storage</p>
    </div>
    <div className="flex items-start group">
      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
      <p className="text-gray-700 text-lg">Always free with reliable, evidence-based health resources</p>
    </div>
    <div className="flex items-start group">
      <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
      <p className="text-gray-700 text-lg">Instant results on any device, anywhere, anytime</p>
    </div>
    <div className="flex items-start group">
      <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mt-2 mr-4 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
      <p className="text-gray-700 text-lg">Dual health insights - physical and emotional wellness combined</p>
    </div>
  </div>
</div>
</div>
</div>
  );
  

  const renderBackButton = () => (
    <button
      onClick={() => setActiveView('home')}
      className="flex items-center bg-white/95 backdrop-blur-md text-blue-600 hover:text-blue-700 transition-all duration-300 mb-8 px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl border border-white/40"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      <span className="font-medium">Back to Home</span>
    </button>
  );

  if (activeView === 'symptoms') {
    return (
      <div 
        className="min-h-screen px-4 py-8 relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%), url('https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-md mx-auto">
          {renderBackButton()}
          <SymptomChecker />
        </div>
      </div>
    );
  }

  if (activeView === 'emotions') {
    return (
      <div 
        className="min-h-screen px-4 py-8 relative"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(219, 39, 119, 0.1) 100%), url('https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
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