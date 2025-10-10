
import React, { useEffect, useState } from 'react';
import { type Achievement } from '../types';
import { FiAward, FiX } from 'react-icons/fi';

const AchievementToast: React.FC<{ achievement: Achievement | null | undefined; onHide: () => void }> = ({ achievement, onHide }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [achievement]);

  const handleClose = () => {
    setVisible(false);
    // Allow animation to finish before clearing the achievement
    setTimeout(() => {
      onHide();
    }, 300);
  };
  
  if (!achievement) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 m-4 md:m-8 max-w-sm w-full bg-white dark:bg-slate-800 shadow-2xl rounded-xl border border-teal-500/30 transition-all duration-300 ease-in-out transform
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
      style={{ direction: 'rtl' }}
    >
      <div className="p-4 flex items-start space-x-4 space-x-reverse">
        <div className="flex-shrink-0 text-teal-500 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/50 p-3 rounded-full">
          <FiAward size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">{achievement.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{achievement.description}</p>
        </div>
        <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <FiX size={20} />
        </button>
      </div>
      <div className="h-1 bg-gradient-to-r from-teal-500 to-cyan-500 animate-progress-bar absolute bottom-0 right-0 rounded-b-xl"></div>
      <style>{`
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-progress-bar {
          animation: progressBar 5s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default AchievementToast;
