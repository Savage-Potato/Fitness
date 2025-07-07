import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.span 
                className="text-2xl font-bold gradient-bg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                FitLife
              </motion.span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <CustomNavLink to="/">Home</CustomNavLink>
              <CustomNavLink to="/workout-plan">Workout Plan</CustomNavLink>
              <CustomNavLink to="/meal-plan">Meal Plan</CustomNavLink>
              <CustomNavLink to="/weekly-tracker">Weekly Tracker</CustomNavLink>
            </div>
          </div>
          <div className="flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const CustomNavLink = ({ to, children }) => (
  <Link
    to={to}
    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors duration-200"
  >
    <motion.span
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      {children}
    </motion.span>
  </Link>
);

export default Navbar;