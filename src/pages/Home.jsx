import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'lose',
    activityLevel: 'low'
  });

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setPlan({
        calories: 2000,
        macros: {
          protein: 150,
          carbs: 200,
          fats: 67
        }
      });
      setLoading(false);
    }, 1500);
  };

  const chartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [150, 200, 67],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)'
        ]
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mesh-bg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16 wave-bg"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-4xl sm:text-6xl font-bold mb-6 animate-float"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <span className="gradient-bg">Transform Your Life</span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-pulse-soft shimmer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Your journey to a healthier lifestyle starts here. Get personalized fitness and nutrition plans tailored just for you.
        </motion.p>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        className="max-w-md mx-auto mb-16"
        variants={itemVariants}
      >
        <motion.form
          className="card backdrop-blur-md bg-white/40 dark:bg-dark/40"
          onSubmit={handleSubmit}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">Age</label>
            <input
              type="number"
              className="input-field"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">Gender</label>
            <select
              className="input-field"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">Height (cm)</label>
            <input
              type="number"
              className="input-field"
              value={formData.height}
              onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <input
              type="number"
              className="input-field"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">Fitness Goal</label>
            <select
              className="input-field"
              value={formData.goal}
              onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            >
              <option value="lose">Lose Weight</option>
              <option value="gain">Gain Muscle</option>
              <option value="maintain">Maintain</option>
            </select>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2">Activity Level</label>
            <select
              className="input-field"
              value={formData.activityLevel}
              onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </motion.div>

          <motion.button
            type="submit"
            className="btn-primary w-full"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            variants={itemVariants}
          >
            {loading ? (
              <motion.div
                className="flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Generating Plan...
              </motion.div>
            ) : 'Get Your Plan'}
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Plan Display */}
      <AnimatePresence mode='wait'>
        {plan && (
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div 
              className="card backdrop-blur-md bg-white/40 dark:bg-dark/40 wave-bg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.h2 
                className="text-2xl font-bold mb-6 text-center gradient-bg animate-pulse-soft"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Your Personalized Plan
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="animate-float"
                >
                  <h3 className="text-xl font-semibold mb-4">Daily Targets</h3>
                  <motion.p 
                    className="text-lg mb-2"
                    whileHover={{ scale: 1.05, x: 10, color: '#4F46E5' }}
                  >
                    Calories: <span className="font-bold">{plan.calories}</span> kcal
                  </motion.p>
                  <motion.p 
                    className="text-lg mb-2"
                    whileHover={{ scale: 1.05, x: 10, color: '#10B981' }}
                  >
                    Protein: <span className="font-bold">{plan.macros.protein}</span>g
                  </motion.p>
                  <motion.p 
                    className="text-lg mb-2"
                    whileHover={{ scale: 1.05, x: 10, color: '#F59E0B' }}
                  >
                    Carbs: <span className="font-bold">{plan.macros.carbs}</span>g
                  </motion.p>
                  <motion.p 
                    className="text-lg mb-2"
                    whileHover={{ scale: 1.05, x: 10, color: '#EF4444' }}
                  >
                    Fats: <span className="font-bold">{plan.macros.fats}</span>g
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="animate-float"
                >
                  <h3 className="text-xl font-semibold mb-4">Macro Split</h3>
                  <div className="w-full h-64">
                    <Pie data={chartData} options={{ maintainAspectRatio: false }} />
                  </div>
                </motion.div>
              </div>
              <motion.div 
                className="mt-6 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.button
                  className="btn-secondary"
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPlan(null)}
                >
                  Regenerate Plan
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Motivational Quote */}
      <motion.div
        className="text-center mt-16 shimmer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.p 
          className="text-2xl font-bold italic gradient-bg animate-float"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          "Push harder than yesterday if you want a different tomorrow."
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Home;