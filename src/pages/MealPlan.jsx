import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const mealData = {
  breakfast: {
    name: 'Protein Oatmeal Bowl',
    calories: 400,
    macros: { protein: 25, carbs: 45, fats: 15 },
    ingredients: ['Oats', 'Protein Powder', 'Banana', 'Almond Milk', 'Berries', 'Nuts']
  },
  lunch: {
    name: 'Grilled Chicken Salad',
    calories: 550,
    macros: { protein: 40, carbs: 35, fats: 25 },
    ingredients: ['Chicken Breast', 'Mixed Greens', 'Quinoa', 'Avocado', 'Olive Oil', 'Cherry Tomatoes']
  },
  dinner: {
    name: 'Salmon with Sweet Potato',
    calories: 650,
    macros: { protein: 45, carbs: 50, fats: 30 },
    ingredients: ['Salmon Fillet', 'Sweet Potato', 'Broccoli', 'Brown Rice', 'Olive Oil']
  },
  snacks: {
    name: 'Healthy Snacks',
    calories: 400,
    macros: { protein: 20, carbs: 40, fats: 15 },
    ingredients: ['Greek Yogurt', 'Apple', 'Almonds', 'Protein Bar']
  }
};

const MealPlan = () => {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const totalCalories = Object.values(mealData).reduce((sum, meal) => sum + meal.calories, 0);
  const totalMacros = Object.values(mealData).reduce((sum, meal) => ({
    protein: sum.protein + meal.macros.protein,
    carbs: sum.carbs + meal.macros.carbs,
    fats: sum.fats + meal.macros.fats
  }), { protein: 0, carbs: 0, fats: 0 });

  const macroChartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [totalMacros.protein, totalMacros.carbs, totalMacros.fats],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ]
      }
    ]
  };

  const calorieChartData = {
    labels: Object.keys(mealData).map(meal => meal.charAt(0).toUpperCase() + meal.slice(1)),
    datasets: [
      {
        label: 'Calories',
        data: Object.values(mealData).map(meal => meal.calories),
        backgroundColor: 'rgba(79, 70, 229, 0.8)'
      }
    ]
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 gradient-bg inline-block">
          Meal Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Your personalized nutrition plan to support your fitness goals
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Daily Macro Split</h2>
            <div className="h-64">
              <Pie data={macroChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Calories by Meal</h2>
            <div className="h-64">
              <Bar
                data={calorieChartData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
                }}
              />
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {Object.keys(mealData).map((meal) => (
            <motion.button
              key={meal}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedMeal === meal
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setSelectedMeal(meal)}
            >
              {meal.charAt(0).toUpperCase() + meal.slice(1)}
            </motion.button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="card"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{mealData[selectedMeal].name}</h2>
            <span className="text-lg font-semibold text-primary">
              {mealData[selectedMeal].calories} kcal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={item}>
              <h3 className="text-lg font-semibold mb-3">Macros</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Protein</span>
                  <span className="font-medium">{mealData[selectedMeal].macros.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbs</span>
                  <span className="font-medium">{mealData[selectedMeal].macros.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span>Fats</span>
                  <span className="font-medium">{mealData[selectedMeal].macros.fats}g</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {mealData[selectedMeal].ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary mt-6 w-full"
          >
            Regenerate Meal Plan
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-bold italic text-primary dark:text-secondary">
            "Let food be thy medicine."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MealPlan;