
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
  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="w-full p-2.5 sm:p-5 flex justify-between items-center text-right group"
    aria-expanded={isOpen}
  >
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="p-1.5 bg-teal-50 dark:bg-teal-900/30 rounded-full text-teal-600 dark:text-teal-400">
        <FiAward size={18} className="sm:w-6 sm:h-6" />
      </div>
      <div>
        <h2 className="text-sm sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
          قائمة الإنجازات
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
          {unlockedCount} / {totalCount} منجز
        </p>
      </div>
    </div>
    <FiChevronDown 
      className={`text-slate-400 dark:text-slate-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
      size={18} 
    />
  </button>

  {/* التعديل هنا: زيادة max-h وإضافة overflow-y-auto */}
  <div
    className={`transition-all duration-500 ease-in-out ${
      isOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'
    } overflow-y-auto`} 
  >
    <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/20 p-2.5 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
      {achievements.map(ach => (
        <AchievementItem key={ach.id} achievement={ach} />
      ))}
      
      {/* عنصر وهمي في النهاية لضمان وجود مساحة فارغة صغيرة أسفل القائمة في الجوال */}
      <div className="h-2 w-full md:hidden"></div>
    </div>
  </div>
</div>
  );
};

export default AchievementsList;