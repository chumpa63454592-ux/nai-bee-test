import React, { useState, useEffect, useCallback } from 'react';
import { getMealPlan } from './services/geminiService';
import type { DailyMeal } from './types';
import Header from './components/Header';
import MealCard from './components/MealCard';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [meals, setMeals] = useState<DailyMeal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMealPlan = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const mealPlan = await getMealPlan();
      // Sort by day to ensure correct order
      const sortedMeals = mealPlan.sort((a, b) => a.day - b.day);
      setMeals(sortedMeals);
    } catch (err) {
      console.error('Failed to generate meal plan:', err);
      setError('ไม่สามารถสร้างตารางอาหารได้ โปรดลองอีกครั้งในภายหลัง (Failed to generate meal plan. Please try again later.)');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMealPlan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-10">
          <LoadingSpinner />
          <p className="mt-4 text-lg text-slate-600">กำลังจัดเตรียมเมนูอาหารกลางวัน... (Preparing your lunch menu...)</p>
          <p className="text-sm text-slate-500">โปรดรอสักครู่ (Please wait a moment)</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center mt-10 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <h2 className="text-xl font-bold">เกิดข้อผิดพลาด (An Error Occurred)</h2>
          <p>{error}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.day} meal={meal} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center py-4 text-slate-500 text-sm">
        <p>Generated with Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
