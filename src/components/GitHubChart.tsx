'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

interface GitHubChartProps {
  followers: number;
  following: number;
  public_repos: number;
}

export default function GitHubChart({ followers, following, public_repos }: GitHubChartProps) {
  const isDark = 'dark';

  const data = [
    { name: 'Followers', value: followers, color: isDark ? '#60a5fa' : '#2563eb' },
    { name: 'Following', value: following, color: isDark ? '#4ade80' : '#16a34a' },
    { name: 'Repositories', value: public_repos, color: isDark ? '#c084fc' : '#9333ea' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-90"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Statistics</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke={isDark ? '#e5e7eb' : '#4b5563'}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={isDark ? '#e5e7eb' : '#4b5563'}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? '#1f2937' : 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                color: isDark ? '#e5e7eb' : '#1f2937',
              }}
            />
            <Bar
              dataKey="value"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-current text-blue-500 dark:text-blue-400"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}