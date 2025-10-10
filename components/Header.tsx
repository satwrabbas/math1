
import React, { useMemo } from 'react';
import useStore from '../store/useStore';
import { confidenceToValue } from '../types';
import { FiBookOpen, FiStar, FiBarChart2 } from 'react-icons/fi';

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 flex items-center space-x-4 space-x-reverse">
    <div className="bg-teal-500/20 text-teal-500 dark:bg-teal-400/20 dark:text-teal-400 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{value}</p>
    </div>
  </div>
);

const CircularProgress: React.FC<{ progress: number; size: number; strokeWidth: number }> = ({ progress, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="absolute" width={size} height={size}>
        <circle
          className="text-slate-300 dark:text-slate-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-teal-500 dark:text-teal-400 transition-all duration-1000 ease-in-out"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ strokeDasharray: circumference, strokeDashoffset: offset }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="text-center">
        <span className="text-3xl font-extrabold text-slate-700 dark:text-slate-100">{Math.round(progress)}%</span>
        <p className="text-xs text-slate-500 dark:text-slate-400">الإنجاز الكلي</p>
      </div>
    </div>
  );
};


const Header: React.FC = () => {
  const units = useStore((state) => state.units);

  const stats = useMemo(() => {
    const allLessons = units.flatMap(u => u.lessons);
    if (allLessons.length === 0) {
      return {
        totalXp: 0,
        currentXp: 0,
        completedLessonsCount: 0,
        averageConfidence: 0,
        progressPercentage: 0,
      };
    }
    
    const completedLessons = allLessons.filter(l => l.completed);
    
    const totalXp = allLessons.reduce((sum, lesson) => sum + lesson.xpValue, 0);
    const currentXp = completedLessons.reduce((sum, lesson) => sum + lesson.xpValue, 0);
    const completedLessonsCount = completedLessons.length;
    
    const totalConfidence = allLessons.reduce((sum, lesson) => sum + confidenceToValue[lesson.confidence], 0);
    const averageConfidence = (totalConfidence / (allLessons.length * 4)) * 100;
    
    const progressPercentage = totalXp > 0 ? (currentXp / totalXp) * 100 : 0;

    return { totalXp, currentXp, completedLessonsCount, averageConfidence, progressPercentage };
  }, [units]);

  return (
    <header className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white">رحلة إتقان الجبر</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="md:col-span-1 flex justify-center p-4">
           <CircularProgress progress={stats.progressPercentage} size={160} strokeWidth={12} />
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard icon={<FiBookOpen size={22} />} label="الدروس المنجزة" value={stats.completedLessonsCount} />
          <StatCard icon={<FiStar size={22} />} label="مجموع نقاط الخبرة" value={`${stats.currentXp} / ${stats.totalXp}`} />
          <StatCard icon={<FiBarChart2 size={22} />} label="متوسط الثقة" value={`${Math.round(stats.averageConfidence)}%`} />
        </div>
      </div>
    </header>
  );
};

export default Header;