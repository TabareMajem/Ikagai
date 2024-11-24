import React, { useState } from 'react';
import { ArrowLeft, Plus, Settings, Users } from 'lucide-react';
import GoalModal from '../components/garden/GoalModal';
import NewGoalModal from '../components/garden/NewGoalModal';
import GardenPlant from '../components/garden/GardenPlant';
import GardenCompanion from '../components/garden/GardenCompanion';
import Navigation from '../components/Navigation';

interface Props {
  onNavigate: (page: 'home' | 'garden') => void;
}

interface Goal {
  id: number;
  title: string;
  progress: number;
  milestones: { text: string; completed: boolean }[];
  plantType: string;
}

const sampleGoals: Goal[] = [
  {
    id: 1,
    title: '毎日30分散歩する',
    progress: 75,
    milestones: [
      { text: '1週間続ける', completed: true },
      { text: '1ヶ月続ける', completed: true },
      { text: '3ヶ月続ける', completed: false },
    ],
    plantType: 'sakura',
  },
  {
    id: 2,
    title: '週2回友達と会う',
    progress: 45,
    milestones: [
      { text: '友達とランチ', completed: true },
      { text: '公園でピクニック', completed: false },
    ],
    plantType: 'pine',
  },
  {
    id: 3,
    title: '新しい趣味を見つける',
    progress: 30,
    milestones: [
      { text: '習字教室に参加', completed: true },
      { text: '作品を完成させる', completed: false },
    ],
    plantType: 'bamboo',
  },
];

export default function DarumaGardenPage({ onNavigate }: Props) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [goals, setGoals] = useState<Goal[]>(sampleGoals);

  const handlePlantGoal = (newGoal: any) => {
    const goal: Goal = {
      id: goals.length + 1,
      title: newGoal.title,
      progress: 0,
      milestones: newGoal.milestones.map((text: string) => ({
        text,
        completed: false,
      })),
      plantType: newGoal.plantType,
    };
    setGoals([...goals, goal]);
    setShowNewGoal(false);
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleToggleMilestone = (goalId: number, milestoneIndex: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newMilestones = [...goal.milestones];
        newMilestones[milestoneIndex].completed = !newMilestones[milestoneIndex].completed;
        
        // Calculate new progress based on completed milestones
        const completedCount = newMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / newMilestones.length) * 100);
        
        return {
          ...goal,
          milestones: newMilestones,
          progress: newProgress,
        };
      }
      return goal;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-green-50 pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-medium text-gray-800">だるまの庭</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Settings className="w-6 h-6 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Users className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Garden Area */}
      <main className="pt-16 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          {/* Garden Scene */}
          <div className="relative h-[calc(100vh-12rem)] bg-gradient-to-b from-transparent to-green-100/50 rounded-2xl overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-100/30 to-transparent" />
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-100/20 rounded-full blur-3xl" />
              <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-100/20 rounded-full blur-3xl" />
            </div>

            {/* Plants */}
            <div className="relative h-full">
              {goals.map((goal, index) => (
                <GardenPlant
                  key={goal.id}
                  goal={goal}
                  position={index}
                  onClick={() => setSelectedGoal(goal)}
                />
              ))}
            </div>

            {/* AI Companion */}
            <GardenCompanion />
          </div>
        </div>
      </main>

      {/* Add New Goal Button */}
      <button 
        onClick={() => setShowNewGoal(true)}
        className="fixed right-6 bottom-24 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Goal Modal */}
      {selectedGoal && (
        <GoalModal
          goal={selectedGoal}
          onClose={() => setSelectedGoal(null)}
          onDelete={handleDeleteGoal}
          onToggleMilestone={handleToggleMilestone}
        />
      )}

      {/* New Goal Modal */}
      {showNewGoal && (
        <NewGoalModal 
          onClose={() => setShowNewGoal(false)}
          onPlant={handlePlantGoal}
        />
      )}

      {/* Navigation */}
      <Navigation currentPage="garden" onNavigate={onNavigate} />
    </div>
  );
}