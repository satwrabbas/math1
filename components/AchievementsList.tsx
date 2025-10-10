
import React, { useState } from 'react';
import useStore from '../store/useStore';
import { FiChevronDown, FiAward } from 'react-icons/fi';
import AchievementItem from './AchievementItem';

const AchievementsList: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const achievements = useStore((state) => state.achievements);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center text-right"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <FiAward className="text-teal-500 dark:text-teal-400" size={24} />
          <div>
            <h2 className="text-xl font-bold">قائمة الإنجازات</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{unlockedCount} / {totalCount} منجز</p>
          </div>
        </div>
        <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={24} />
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => (
            <AchievementItem key={ach.id} achievement={ach} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsList;