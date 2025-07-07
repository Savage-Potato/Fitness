import { motion } from 'framer-motion';
import { useState } from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';

const workoutData = {
  chest: {
    title: 'Chest Day (Chest + Biceps)',
    exercises: [
      { name: 'Pushups', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
      { name: 'Bench Press', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
      { name: 'Inclined Chest Press', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=8iPEnn-ltC8' },
      { name: 'Declined Chest Press', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=LfyQBUKR8SE' },
      { name: 'Pec Dec Fly', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=WxDaaFVXFyU' },
      { name: 'Barbell Bicep Curl', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=LY1V6UbRHFM' },
      { name: 'Hammer Curl', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=zC3nLlEvin4' },
      { name: 'Preacher Curl', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=fIWP-FRFNU0' },
      { name: 'Forearms Exercises', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=0XS0j1Gtobw' },
    ]
  },
  back: {
    title: 'Back Day (Back + Shoulders)',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
      { name: 'Lat Pulldown', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
      { name: 'Seated Cable Rows', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=GZbfZ033f74' },
      { name: 'Bent Over Barbell Rows', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=9efgcAjQe7E' },
      { name: 'Front Raises', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=sxyu_sCyVw4' },
      { name: 'Face Pulls', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=rep-qVOkqgk' },
      { name: 'Shrugs', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=cJRVVxmytaM' },
      { name: 'Dumbbell Lateral Raises', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
      { name: 'Overhead Barbell Press', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
    ]
  },
  legs: {
    title: 'Leg Day (Legs + Core)',
    exercises: [
      { name: 'Barbell Back Squats', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=SW_C1A-rejs' },
      { name: 'Leg Press', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
      { name: 'Leg Extension', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=YyvSfVjQeL0' },
      { name: 'Leg Curl', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs' },
      { name: 'Walking Lunges', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=L8fvypPrzzs' },
      { name: 'Plank', sets: 3, reps: '1 min', video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c' },
      { name: 'Crunches', sets: 3, reps: 12, video: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
      { name: 'Russian Twists', sets: 3, reps: 20, video: 'https://www.youtube.com/watch?v=wkD8rjkodUI' },
    ]
  }
};

const WorkoutPlan = () => {
  const [selectedWorkout, setSelectedWorkout] = useState('chest');

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
          Workout Plan
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Follow this structured workout plan to achieve your fitness goals
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-4 mb-8">
          {Object.keys(workoutData).map((type) => (
            <motion.button
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                selectedWorkout === type
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => setSelectedWorkout(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)} Day
            </motion.button>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="card"
        >
          <h2 className="text-2xl font-bold mb-6">{workoutData[selectedWorkout].title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workoutData[selectedWorkout].exercises.map((exercise, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{exercise.name}</h3>
                  <a
                    href={exercise.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors duration-200"
                  >
                    <PlayCircleIcon className="h-6 w-6" />
                  </a>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {exercise.sets} sets × {exercise.reps} {typeof exercise.reps === 'number' ? 'reps' : ''}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-2xl font-bold italic text-primary dark:text-secondary">
            "Your only limit is you."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkoutPlan;