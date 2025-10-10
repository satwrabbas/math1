
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type AppState } from '../types';
import { initialUnits, initialAchievements } from '../data/curriculum';

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      units: initialUnits,
      achievements: initialAchievements,
      currentAchievement: null,
      
      toggleLessonComplete: (unitId, lessonId) => {
        set((state) => ({
          units: state.units.map((unit) =>
            unit.id === unitId
              ? {
                  ...unit,
                  lessons: unit.lessons.map((lesson) =>
                    lesson.id === lessonId
                      ? { ...lesson, completed: !lesson.completed }
                      : lesson
                  ),
                }
              : unit
          ),
        }));
      },

      setConfidence: (unitId, lessonId, confidence) => {
         set((state) => ({
          units: state.units.map((unit) =>
            unit.id === unitId
              ? {
                  ...unit,
                  lessons: unit.lessons.map((lesson) =>
                    lesson.id === lessonId
                      ? { ...lesson, confidence }
                      : lesson
                  ),
                }
              : unit
          ),
        }));
      },

      updateNote: (unitId, lessonId, note) => {
         set((state) => ({
          units: state.units.map((unit) =>
            unit.id === unitId
              ? {
                  ...unit,
                  lessons: unit.lessons.map((lesson) =>
                    lesson.id === lessonId
                      ? { ...lesson, note }
                      : lesson
                  ),
                }
              : unit
          ),
        }));
      },

      unlockAchievement: (achievementId) => {
        const achievement = get().achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
          set(state => ({
            achievements: state.achievements.map(a => 
              a.id === achievementId ? { ...a, unlocked: true } : a
            ),
          }));
          get().showAchievement(achievementId);
        }
      },
      
      showAchievement: (achievementId) => set({ currentAchievement: achievementId }),
      hideAchievement: () => set({ currentAchievement: null }),
    }),
    {
      name: 'algebra-quest-progress',
    }
  )
);

export default useStore;