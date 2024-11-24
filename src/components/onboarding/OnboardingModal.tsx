import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import IntroductionScreen from './IntroductionScreen';
import RegistrationScreen from './RegistrationScreen';
import ProfileSetupScreen from './ProfileSetupScreen';
import DarumaGardenIntroScreen from './DarumaGardenIntroScreen';
import FirstGoalScreen from './FirstGoalScreen';
import HomeScreenTutorial from './HomeScreenTutorial';
import KeyFeaturesIntro from './KeyFeaturesIntro';
import AccessibilityTutorial from './AccessibilityTutorial';
import CompletionScreen from './CompletionScreen';
import VolunteerIntroScreen from './volunteer/VolunteerIntroScreen';
import VolunteerTrainingScreen from './volunteer/VolunteerTrainingScreen';
import VolunteerProfileScreen from './volunteer/VolunteerProfileScreen';
import VolunteerGuidelinesScreen from './volunteer/VolunteerGuidelinesScreen';
import VolunteerDashboardIntro from './volunteer/VolunteerDashboardIntro';

interface Props {
  onComplete: (userType: 'elder' | 'volunteer') => void;
}

export default function OnboardingModal({ onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [userType, setUserType] = useState<'elder' | 'volunteer' | null>(null);

  const totalSteps = userType === 'volunteer' ? 7 : 10;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      if (userType) {
        onComplete(userType);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowSkipConfirm(true);
  };

  const handleUserTypeSelect = (type: 'elder' | 'volunteer') => {
    setUserType(type);
    handleNext();
  };

  const renderContent = () => {
    if (currentStep === 0) {
      return <WelcomeScreen key="welcome" onNext={handleUserTypeSelect} />;
    }

    if (userType === 'volunteer') {
      switch (currentStep) {
        case 1:
          return <VolunteerIntroScreen key="volunteer-intro" onNext={handleNext} />;
        case 2:
          return <RegistrationScreen key="volunteer-registration" onNext={handleNext} onBack={handleBack} />;
        case 3:
          return <VolunteerProfileScreen key="volunteer-profile" onNext={handleNext} onBack={handleBack} />;
        case 4:
          return <VolunteerTrainingScreen key="volunteer-training" onNext={handleNext} onBack={handleBack} />;
        case 5:
          return <VolunteerGuidelinesScreen key="volunteer-guidelines" onNext={handleNext} onBack={handleBack} />;
        case 6:
          return <VolunteerDashboardIntro key="volunteer-dashboard" onComplete={() => onComplete('volunteer')} />;
        default:
          return null;
      }
    }

    switch (currentStep) {
      case 1:
        return <IntroductionScreen key="intro" onNext={handleNext} />;
      case 2:
        return <RegistrationScreen key="registration" onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ProfileSetupScreen key="profile" onNext={handleNext} onSkip={handleNext} />;
      case 4:
        return <DarumaGardenIntroScreen key="garden" onNext={handleNext} />;
      case 5:
        return <FirstGoalScreen key="goal" onNext={handleNext} />;
      case 6:
        return <HomeScreenTutorial key="tutorial" onNext={handleNext} />;
      case 7:
        return <KeyFeaturesIntro key="features" onNext={handleNext} onBack={handleBack} />;
      case 8:
        return <AccessibilityTutorial key="accessibility" onNext={handleNext} />;
      case 9:
        return <CompletionScreen key="completion" onComplete={() => onComplete('elder')} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Skip Button */}
        {currentStep < totalSteps - 1 && currentStep > 0 && (
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full z-20"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="h-1 bg-gray-100">
            <motion.div
              className="h-full bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Skip Confirmation Modal */}
      <AnimatePresence>
        {showSkipConfirm && (
          <motion.div
            key="skip-confirm"
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSkipConfirm(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-sm mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                チュートリアルをスキップしますか？
              </h3>
              <p className="text-gray-600 mb-6">
                基本的な操作方法は「設定」から後でも確認できます。
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSkipConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={() => onComplete(userType || 'elder')}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  スキップ
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}