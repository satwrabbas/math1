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
<div className="group p-3 sm:p-4 border-b border-dashed border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
  {/* الصف العلوي: العنوان وصندوق الاختيار */}
  <div className="flex items-start gap-3">
    {/* منع انكماش صندوق الاختيار */}
    <div className="flex-shrink-0 mt-0.5">
      <CustomCheckbox 
        checked={lesson.completed} 
        onChange={() => toggleLessonComplete(unitId, lesson.id)} 
      />
    </div>
    
    <p 
      className={`flex-1 text-sm sm:text-base font-semibold leading-snug transition-colors ${
        lesson.completed 
          ? 'line-through text-slate-400 dark:text-slate-500' 
          : 'text-slate-700 dark:text-slate-200'
      }`}
    >
      {lesson.title}
    </p>
  </div>
  
  {/* الصف السفلي: التحكم بالملاحظات ومستوى الثقة */}
  {/* ms-8 تعني هامش من البداية بمقدار 2rem لمحاذاة العناصر تحت النص وليس تحت الـ Checkbox */}
  <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 mt-2 ms-8 sm:ms-9">
    
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-slate-400 dark:text-slate-500">الثقة:</span>
      <div className="flex gap-1">
        {(Object.keys(ConfidenceLabels) as Confidence[]).map((level) => (
          <button
            key={level}
            title={ConfidenceLabels[level]}
            onClick={() => setConfidence(unitId, lesson.id, level)}
            // تصغير الإيموجي من 2xl إلى text-lg للجوال
            className={`text-lg sm:text-xl transition-transform duration-200 hover:scale-125 focus:outline-none ${
              lesson.confidence === level ? 'scale-110' : 'opacity-30 grayscale hover:opacity-100 hover:grayscale-0'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
    
    <button
      onClick={() => setIsNotesExpanded(!isNotesExpanded)}
      className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 dark:text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 font-medium transition-colors"
    >
      <FiEdit2 size={12} /> {/* تصغير أيقونة القلم */}
      <span>{lesson.note ? 'تعديل' : 'ملاحظة'}</span>
    </button>
  </div>
  
  {/* منطقة كتابة الملاحظات */}
  {isNotesExpanded && (
    <div className="mt-3 ms-8 sm:ms-9 animate-fade-in space-y-2">
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        className="w-full p-2 text-xs sm:text-sm rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/50 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition resize-none placeholder-slate-400"
        rows={2}
        placeholder="اكتب ملاحظاتك هنا..."
      ></textarea>
      <div className="flex justify-end">
        <button
          onClick={handleSaveNote}
          className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded text-xs font-semibold shadow-sm transition-colors flex items-center gap-1"
        >
          <FiSave size={12} />
          حفظ
        </button>
      </div>
    </div>
  )}
</div>
  );
};

export default LessonItem;