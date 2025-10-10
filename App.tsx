
import React, { useMemo } from 'react';
import useStore from './store/useStore';
import Header from './components/Header';
import UnitAccordion from './components/UnitAccordion';
import AchievementToast from './components/AchievementToast';
import { useAchievements } from './hooks/useAchievements';
import AchievementsList from './components/AchievementsList';

const App: React.FC = () => {
  const units = useStore((state) => state.units);
  const achievements = useStore((state) => state.achievements);
  const currentAchievement = useStore((state) => state.currentAchievement);
  const hideAchievement = useStore((state) => state.hideAchievement);

  useAchievements();
  
  const unlockedAchievement = useMemo(() => {
    if (!currentAchievement) return null;
    return achievements.find(a => a.id === currentAchievement);
  }, [currentAchievement, achievements]);

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-500">
      <div className="container mx-auto p-4 md:p-8 max-w-4xl">
        <Header />
        <main className="mt-8 space-y-4">
          <section aria-labelledby="units-heading">
            <h2 id="units-heading" className="sr-only">الوحدات الدراسية</h2>
            {units.map((unit) => (
              <UnitAccordion key={unit.id} unit={unit} />
            ))}
          </section>
          
          <section aria-labelledby="achievements-heading" className="pt-4">
             <h2 id="achievements-heading" className="sr-only">قائمة الإنجازات</h2>
             <AchievementsList />
          </section>
        </main>
      </div>
      
      <AchievementToast
        achievement={unlockedAchievement}
        onHide={hideAchievement}
      />
    </div>
  );
};

export default App;