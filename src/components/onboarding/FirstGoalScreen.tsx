import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Heart, 
  Book, 
  Users, 
  Flower2, 
  TreePine, 
  Sprout,
  Plus,
  Minus,
  Check
} from 'lucide-react';

interface Props {
  onNext: () => void;
}

type GoalStep = 'selection' | 'details' | 'milestones' | 'plant' | 'confirmation';

const predefinedGoals = [
  { id: 'walk', title: '毎日散歩する', icon: Heart, category: 'health' },
  { id: 'hobby', title: '新しい趣味を始める', icon: Book, category: 'personal' },
  { id: 'social', title: '友達と定期的に会う', icon: Users, category: 'social' },
];

const plantTypes = [
  { id: 'sakura', name: '桜', icon: Flower2, color: 'pink' },
  { id: 'pine', name: '松', icon: TreePine, color: 'green' },
  { id: 'bamboo', name: '竹', icon: Sprout, color: 'emerald' },
];

export default function FirstGoalScreen({ onNext }: Props) {
  const [currentStep, setCurrentStep] = useState<GoalStep>('selection');
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [customGoal, setCustomGoal] = useState('');
  const [milestones, setMilestones] = useState(['']);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    if (goalId === 'custom') {
      setCurrentStep('details');
    } else {
      setCurrentStep('milestones');
    }
  };

  const addMilestone = () => {
    if (milestones.length < 5) {
      setMilestones([...milestones, '']);
    }
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = value;
    setMilestones(newMilestones);
  };

  const handlePlantSelect = (plantId: string) => {
    setSelectedPlant(plantId);
    setCurrentStep('confirmation');
  };

  const getStepProgress = () => {
    const steps = ['selection', 'milestones', 'plant', 'confirmation'];
    return ((steps.indexOf(currentStep) + 1) / steps.length) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6"
    >
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getStepProgress()}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-center">
          ステップ {currentStep === 'selection' ? '1' : 
                    currentStep === 'details' ? '2' :
                    currentStep === 'milestones' ? '3' :
                    currentStep === 'plant' ? '4' : '5'} / 5
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Goal Selection Step */}
        {currentStep === 'selection' && (
          <motion.div
            key="selection"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium text-gray-900">
                達成したい目標を選びましょう
              </h2>
              <p className="text-gray-600">
                あなたの最初の目標を選んでください
              </p>
            </div>

            <div className="space-y-4">
              {predefinedGoals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className="w-full flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200"
                >
                  <div className="p-2 bg-gray-100 rounded-full">
                    <goal.icon className="w-6 h-6 text-gray-700" />
                  </div>
                  <span className="text-lg text-gray-900">{goal.title}</span>
                </button>
              ))}
              <button
                onClick={() => handleGoalSelect('custom')}
                className="w-full flex items-center gap-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors border-2 border-indigo-200"
              >
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Plus className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-lg text-indigo-600">自分で入力</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Custom Goal Details Step */}
        {currentStep === 'details' && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium text-gray-900">
                目標を入力してください
              </h2>
              <p className="text-gray-600">
                あなたの目標を具体的に書いてみましょう
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="例：週に2回、公園でヨガをする"
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                onClick={() => setCurrentStep('milestones')}
                disabled={!customGoal.trim()}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Milestones Step */}
        {currentStep === 'milestones' && (
          <motion.div
            key="milestones"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium text-gray-900">
                小さなステップを設定しましょう
              </h2>
              <p className="text-gray-600">
                目標達成までの道のりを分けてみましょう
              </p>
            </div>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={milestone}
                    onChange={(e) => updateMilestone(index, e.target.value)}
                    placeholder={`ステップ ${index + 1}`}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  {milestones.length > 1 && (
                    <button
                      onClick={() => removeMilestone(index)}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {milestones.length < 5 && (
                <button
                  onClick={addMilestone}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  ステップを追加
                </button>
              )}
              <button
                onClick={() => setCurrentStep('plant')}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                次へ
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Plant Selection Step */}
        {currentStep === 'plant' && (
          <motion.div
            key="plant"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-medium text-gray-900">
                あなたの目標を表す植物を選びましょう
              </h2>
              <p className="text-gray-600">
                この植物があなたの成長とともに育っていきます
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {plantTypes.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => handlePlantSelect(plant.id)}
                  className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-200"
                >
                  <plant.icon className={`w-12 h-12 text-${plant.color}-500`} />
                  <span className="text-gray-900">{plant.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Confirmation Step */}
        {currentStep === 'confirmation' && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                目標の設定が完了しました！
              </h2>
              <p className="text-gray-600">
                だるまの庭に新しい芽が出ました。
                <br />
                これから一緒に育てていきましょう。
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              庭を見に行く
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}