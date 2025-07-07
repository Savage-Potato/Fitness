import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const schedule = [
  { day: 'Monday', workout: 'Chest Day' },
  { day: 'Tuesday', workout: 'Back Day' },
  { day: 'Wednesday', workout: 'Leg Day' },
  { day: 'Thursday', workout: 'Chest Day' },
  { day: 'Friday', workout: 'Back Day' },
  { day: 'Saturday', workout: 'Leg Day' },
  { day: 'Sunday', workout: 'Rest Day' },
];

const WeeklyTracker = () => {
  const [completedWorkouts, setCompletedWorkouts] = useState(() => {
    const saved = localStorage.getItem('completedWorkouts');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    // Save to localStorage whenever completedWorkouts changes
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  useEffect(() => {
    // Reset tracker at midnight IST every Sunday
    const checkReset = () => {
      const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      const istDate = new Date(now);
      
      if (istDate.getDay() === 0 && istDate.getHours() === 0 && istDate.getMinutes() === 0) {
        setCompletedWorkouts({});
      }
    };

    const interval = setInterval(checkReset, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const toggleWorkout = (day) => {
    setCompletedWorkouts(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 gradient-bg inline-block">
          Weekly Workout Tracker
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your workout progress throughout the week
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        {schedule.map(({ day, workout }) => (
          <motion.div
            key={day}
            variants={item}
            className={`card mb-4 transition-colors duration-200 ${
              completedWorkouts[day] ? 'bg-green-50 dark:bg-green-900/20' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{day}</h3>
                <p className="text-gray-600 dark:text-gray-300">{workout}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWorkout(day)}
                className={`p-2 rounded-full transition-colors duration-200 ${
                  completedWorkouts[day]
                    ? 'text-green-500 bg-green-100 dark:bg-green-900/40'
                    : 'text-gray-400 bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <CheckCircleIcon className="h-8 w-8" />
              </motion.button>
            </div>

            {completedWorkouts[day] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-3 bg-green-100 dark:bg-green-900/40 rounded-lg"
              >
                <p className="text-green-700 dark:text-green-300 font-medium">
                  Workout completed! 💪
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-bold italic text-primary dark:text-secondary">
            "Consistency is the key to success."
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WeeklyTracker;