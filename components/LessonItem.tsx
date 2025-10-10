import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { type Lesson, type Confidence, ConfidenceLabels } from '../types';
import { FiEdit2, FiSave } from 'react-icons/fi';

const CustomCheckbox: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    className={`w-8 h-8 rounded-lg flex-shrink-0 cursor-pointer flex items-center justify-center border-2 transition-all duration-300 ${
      checked
        ? 'bg-teal-500 border-teal-500'
        : 'bg-transparent border-slate-300 dark:border-slate-600 hover:border-teal-400'
    }`}
  >
    {checked && (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    )}
  </div>
);

const LessonItem: React.FC<{ lesson: Lesson; unitId: string }> = ({ lesson, unitId }) => {
  const toggleLessonComplete = useStore((state) => state.toggleLessonComplete);
  const setConfidence = useStore((state) => state.setConfidence);
  const updateNote = useStore((state) => state.updateNote);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [noteText, setNoteText] = useState(lesson.note);

  useEffect(() => {
    setNoteText(lesson.note);
  }, [lesson.note]);
  
  const handleSaveNote = () => {
    updateNote(unitId, lesson.id, noteText);
    setIsNotesExpanded(false);
  };

  return (
    <div className="p-4 border-b border-slate-200 dark:border-slate-700 last:border-b-0 space-y-4">
      <div className="flex items-center space-x-4 space-x-reverse">
        <CustomCheckbox checked={lesson.completed} onChange={() => toggleLessonComplete(unitId, lesson.id)} />
        <p className={`flex-1 font-semibold ${lesson.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
          {lesson.title}
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4 ms-12">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">الثقة:</span>
          <div className="flex gap-1">
            {(Object.keys(ConfidenceLabels) as Confidence[]).map((level) => (
              <button
                key={level}
                title={ConfidenceLabels[level]}
                onClick={() => setConfidence(unitId, lesson.id, level)}
                className={`text-2xl transition-transform duration-200 hover:scale-125 ${lesson.confidence === level ? 'scale-110' : 'opacity-40 grayscale'}`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => setIsNotesExpanded(!isNotesExpanded)}
          className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-teal-500 dark:hover:text-teal-400 font-medium transition-colors"
        >
          <FiEdit2 />
          {lesson.note ? 'تعديل الملاحظات' : 'إضافة ملاحظات'}
        </button>
      </div>
      
      {isNotesExpanded && (
        <div className="ms-12 space-y-2 animate-fade-in">
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="w-full p-2 rounded-md bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
            rows={3}
            placeholder="اكتب ملاحظاتك هنا..."
          ></textarea>
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            <FiSave />
            حفظ
          </button>
        </div>
      )}
    </div>
  );
};

export default LessonItem;