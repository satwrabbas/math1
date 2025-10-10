
import React, { useState, useMemo } from 'react';
import { type Unit } from '../types';
import LessonItem from './LessonItem';
import { FiChevronDown } from 'react-icons/fi';

const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
    <div
      className="bg-teal-500 dark:bg-teal-400 h-2.5 rounded-full transition-all duration-500"
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

const UnitAccordion: React.FC<{ unit: Unit }> = ({ unit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const progress = useMemo(() => {
    const completed = unit.lessons.filter(l => l.completed).length;
    return unit.lessons.length > 0 ? (completed / unit.lessons.length) * 100 : 0;
  }, [unit.lessons]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-right space-y-2 sm:space-y-0"
      >
        <div className="flex-1">
          <h2 className="text-xl font-bold">{unit.title}</h2>
        </div>
        <div className="w-full sm:w-1/3 flex items-center gap-4">
          <ProgressBar value={progress} />
          <FiChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={24} />
        </div>
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-slate-200 dark:border-slate-700">
          {unit.lessons.map(lesson => (
            <LessonItem key={lesson.id} lesson={lesson} unitId={unit.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitAccordion;
