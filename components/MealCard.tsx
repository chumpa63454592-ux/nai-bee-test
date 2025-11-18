
import React from 'react';
import type { DailyMeal } from '../types';

interface MealCardProps {
  meal: DailyMeal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  // Use a consistent seed for picsum to get the same image for the same dish name
  const imageSeed = meal.dishName.replace(/\s+/g, '');
  const imageUrl = `https://picsum.photos/seed/${imageSeed}/400/300`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        <img
          src={imageUrl}
          alt={meal.dishName}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-2 left-2 bg-teal-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
          พฤศจิกายน {meal.day}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-slate-800 mb-2 truncate" title={meal.dishName}>
          {meal.dishName}
        </h3>
        <p className="text-slate-600 text-sm flex-grow">
          {meal.description}
        </p>
      </div>
    </div>
  );
};

export default MealCard;
