'use client';

import GitHubCalendarLib from 'react-github-calendar';
import { motion } from 'framer-motion';

interface GitHubCalendarProps {
  username: string;
}

export default function GitHubCalendar({ username }: GitHubCalendarProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-12 max-w-3xl mx-auto rounded-2xl border border-gray-200/50 dark:border-gray-700/50 bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 p-8 backdrop-blur-sm"
    >
      <motion.div 
        variants={itemVariants}
        className="mb-6"
      >
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent text-center">
          Contribution Graph
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
          Full GitHub contribution history
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="relative group"
      >
        <div className="overflow-x-auto 
          scrollbar-thin 
          scrollbar-thumb-gray-400 
          dark:scrollbar-thumb-gray-600 
          scrollbar-track-transparent
          hover:scrollbar-thumb-gray-500
          dark:hover:scrollbar-thumb-gray-500
          p-6 
          bg-gray-50/80 
          dark:bg-gray-800/50 
          rounded-xl 
          scroll-smooth 
          backdrop-blur-sm 
          shadow-inner
          transition-all
          duration-300"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(156 163 175) transparent'
          }}
        >
          <GitHubCalendarLib
            username={username}
            colorScheme="dark"
            fontSize={14}
            blockSize={12}
            blockMargin={5}
            blockRadius={3}
            labels={{
              totalCount: '{{count}} contributions',
            }}
            style={{
              color: '#ffffff',
            }}
          />
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-12 bg-gradient-to-t from-gray-50/80 dark:from-gray-800/50 to-transparent pointer-events-none rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-8 flex flex-wrap justify-center gap-4"
      >
        {[
          { label: 'No activity', color: '#161b22' },
          { label: 'Low', color: '#0e4429' },
          { label: 'Medium', color: '#006d32' },
          { label: 'High', color: '#26a641' },
          { label: 'Very high', color: '#39d353' }
        ].map((item, index) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-3 bg-gray-50/30 dark:bg-gray-800/30 px-4 py-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span 
              className="w-4 h-4 rounded-sm shadow-sm" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 dark:text-gray-200 font-medium whitespace-nowrap">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}