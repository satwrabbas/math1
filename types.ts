export type Confidence = '🤔' | '😐' | '😊' | '😎';

export const ConfidenceLabels: Record<Confidence, string> = {
  '🤔': 'غير واثق',
  '😐': 'مقبول',
  '😊': 'جيد',
  '😎': 'متقن تماماً'
};

export const confidenceToValue: Record<Confidence, number> = {
  '🤔': 1,
  '😐': 2,
  '😊': 3,
  '😎': 4,
};


export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  xpValue: number;
  confidence: Confidence;
  note: string;
}

export interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface AppState {
  units: Unit[];
  achievements: Achievement[];
  currentAchievement: string | null;
  toggleLessonComplete: (unitId: string, lessonId: string) => void;
  setConfidence: (unitId: string, lessonId: string, confidence: Confidence) => void;
  updateNote: (unitId: string, lessonId: string, note: string) => void;
  unlockAchievement: (achievementId: string) => void;
  showAchievement: (achievementId: string) => void;
  hideAchievement: () => void;
}