'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

interface GitHubChartProps {
  followers: number;
  following: number;
  public_repos: number;
}

export default function GitHubChart({ followers, following, public_repos }: GitHubChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && document.documentElement.classList.contains('dark');

  const data = [
    {
      name: 'Followers',
      value: followers,
      color: '#60a5fa',
      darkColor: '#3b82f6',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24"
          style={{ color: isDark ? '#3b82f6' : '#60a5fa' }}>
          <path d="M16.5,6.5A4.5,4.5,0,1,1,12,2,4.5,4.5,0,0,1,16.5,6.5M9,13.75A3.75,3.75,0,0,0,5.25,17.5v1.25A1.25,1.25,0,0,0,6.5,20h11A1.25,1.25,0,0,0,18.75,18.75V17.5A3.75,3.75,0,0,0,15,13.75Z" />
        </svg>
      )
    },
    {
      name: 'Following',
      value: following,
      color: '#4ade80',
      darkColor: '#22c55e',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" style={{ color: isDark ? '#3b82f6' : '#60a5fa' }}>
          <path d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z" />
        </svg>
      )
    },
    {
      name: 'Repositories',
      value: public_repos,
      color: '#c084fc',
      darkColor: '#a855f7',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" style={{ color: isDark ? '#3b82f6' : '#60a5fa' }}>
          <path d="M4,2H20A2,2 0 0,1 22,4V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V4A2,2 0 0,1 4,2M4,4V18H20V4H4M8,6H16A2,2 0 0,1 18,8V12A2,2 0 0,1 16,14H8A2,2 0 0,1 6,12V8A2,2 0 0,1 8,6M8,8V12H16V8H8Z" />
        </svg>
      )
    },
  ];

  const getHighestValue = () => {
    const max = Math.max(followers, following, public_repos);
    return Math.ceil(max * 1.2); // Add 20% padding to the top
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-semibold flex items-center gap-2">
              <span style={{ color: isDark ? data.darkColor : data.color }}>
                {data.icon}
              </span>
              {data.name}
            </span>
          </div>
          <div className="text-3xl font-bold" style={{ color: isDark ? data.darkColor : data.color }}>
            {data.value.toLocaleString()}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm bg-opacity-90"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
        </svg>
        GitHub Activity
      </h3>

      <div className="flex flex-col md:flex-row md:justify-between mb-6 space-y-4 md:space-y-0">
        {data.map((item, index) => (
          <motion.div
            key={item.name}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center space-x-4 shadow-md cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              borderLeft: `4px solid ${isDark ? item.darkColor : item.color}`,
            }}
          >
            <div className="rounded-full p-3" style={{ backgroundColor: isDark ? item.darkColor : item.color, opacity: 0.2 }}>
              <div className="text-black dark:text-white" style={{ color: isDark ? item.darkColor : item.color }}>
                {item.icon}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{item.name}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value.toLocaleString()}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barGap={8}
          >
            <XAxis
              dataKey="name"
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#374151' : '#e5e7eb', strokeWidth: 1 }}
              tick={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              stroke={isDark ? '#9ca3af' : '#6b7280'}
              tickLine={false}
              axisLine={{ stroke: isDark ? '#374151' : '#e5e7eb', strokeWidth: 1 }}
              tickFormatter={(value) => value.toLocaleString()}
              domain={[0, getHighestValue()]}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? 'rgba(55, 65, 81, 0.4)' : 'rgba(243, 244, 246, 0.6)' }} />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={isDark ? entry.darkColor : entry.color}
                  fillOpacity={hoveredIndex === index ? 1 : 0.7}
                  stroke={hoveredIndex === index ? (isDark ? '#fff' : '#000') : 'none'}
                  strokeWidth={hoveredIndex === index ? 1 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Stats based on public GitHub profile data
        </p>
      </div>
    </motion.div>
  );
}