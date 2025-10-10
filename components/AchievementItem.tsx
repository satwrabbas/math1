
import React from 'react';
import { type Achievement } from '../types';
import { FiAward, FiLock } from 'react-icons/fi';

const AchievementItem: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
  const isUnlocked = achievement.unlocked;

  return (
    <div className={`p-4 rounded-lg flex items-start gap-4 transition-all duration-300 ${
      isUnlocked ? 'bg-teal-500/10' : 'bg-slate-100 dark:bg-slate-700/50'
    }`}>
      <div className={`flex-shrink-0 p-3 rounded-full ${
        isUnlocked ? 'bg-teal-500/20 text-teal-500' : 'bg-slate-200 dark:bg-slate-600 text-slate-400 dark:text-slate-500'
      }`}>
        {isUnlocked ? <FiAward size={22} /> : <FiLock size={22} />}
      </div>
      <div className="flex-1">
        <h3 className={`font-bold ${
          isUnlocked ? 'text-slate-800 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400'
        }`}>
          {achievement.title}
        </h3>
        <p className={`text-sm ${
          isUnlocked ? 'text-slate-600 dark:text-slate-300' : 'text-slate-400 dark:text-slate-500'
        }`}>
          {achievement.description}
        </p>
      </div>
    </div>
  );
};

export default AchievementItem;