'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface GitHubCardProps {
  userData: {
    avatar_url: string;
    name: string;
    login: string;
    followers: number;
    following: number;
    public_repos: number;
    bio: string;
    location?: string;
    blog?: string;
  };
}

export default function GitHubCard({ userData }: GitHubCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40">
          <Image
            src={userData.avatar_url}
            alt={userData.name || userData.login}
            fill
            className="rounded-full object-cover ring-4 ring-blue-500/30 dark:ring-blue-400/30"
            priority
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {userData.name || userData.login}
          </h2>
          <p className="text-blue-600 dark:text-blue-400 mb-4">@{userData.login}</p>
          {userData.bio && (
            <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-md">
              {userData.bio}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {userData.location && (
              <span className="flex items-center text-gray-600 dark:text-gray-300">
                📍 {userData.location}
              </span>
            )}
            {userData.blog && (
              <a
                href={userData.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
              >
                🔗 Website
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-8 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {userData.followers.toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-gray-300">Followers</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {userData.following.toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-gray-300">Following</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-xl">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {userData.public_repos.toLocaleString()}
          </div>
          <div className="text-gray-600 dark:text-gray-300">Repositories</div>
        </div>
      </div>
    </motion.div>
  );
}