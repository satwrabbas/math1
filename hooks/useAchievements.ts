
import { useEffect } from 'react';
import useStore from '../store/useStore';

export const useAchievements = () => {
  const unlockAchievement = useStore((state) => state.unlockAchievement);
  const units = useStore((state) => state.units);

  useEffect(() => {
    const allLessons = units.flatMap(u => u.lessons);
    const totalLessonsCount = allLessons.length;
    if (totalLessonsCount === 0) return;

    const completedLessons = allLessons.filter(l => l.completed);
    const completedLessonsCount = completedLessons.length;

    // Achievement: First Step
    if (completedLessonsCount >= 1) {
      unlockAchievement('first_step');
    }

    // Achievement: 5 Lessons
    if (completedLessonsCount >= 5) {
      unlockAchievement('five_lessons');
    }

    // Achievement: 10 Lessons
    if (completedLessonsCount >= 10) {
      unlockAchievement('ten_lessons');
    }

    // Achievement: First Note
    if (allLessons.some(l => l.note.trim() !== '')) {
      unlockAchievement('first_note');
    }

    // Achievement: Unit Completion
    units.forEach(unit => {
      if (unit.lessons.every(l => l.completed)) {
        unlockAchievement(`${unit.id}_conqueror`);
      }
    });

    // Achievement: Halfway There
    const totalXp = allLessons.reduce((sum, lesson) => sum + lesson.xpValue, 0);
    if (totalXp > 0) {
      const currentXp = completedLessons.reduce((sum, lesson) => sum + lesson.xpValue, 0);
      if (currentXp >= totalXp / 2) {
        unlockAchievement('halfway');
      }
    }

    // Achievement: Algebra Expert
    if (completedLessonsCount === totalLessonsCount) {
      unlockAchievement('expert');
    }
  }, [units, unlockAchievement]);
};