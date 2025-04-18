'use client';

import { useState } from 'react';
import GitHubCalendar from '@/components/GitHubCalendar';
import GitHubCard from '@/components/GitHubCard';
import GitHubChart from '@/components/GitHubChart';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string;
  location?: string;
  blog?: string;
}

export default function Home() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGitHubData = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (err: any) {
      setError(err.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchGitHubData();
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            GitHub Analyzer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore GitHub profiles with charts and insights
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., jaydip-satani"
            className="w-full sm:w-2/3 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            aria-label="GitHub username"
          />
          <button
            onClick={fetchGitHubData}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              'Analyze'
            )}
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-red-600 dark:text-red-400 text-center mb-4 bg-red-100 dark:bg-red-900/40 p-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        {userData && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <GitHubCard userData={userData} />
            <GitHubChart
              followers={userData.followers}
              following={userData.following}
              public_repos={userData.public_repos}
            />
            <GitHubCalendar username={userData.login} />
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          Made with ❤️ by{' '}
          <Link
            href="https://jaydipsatani.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Jaydip Satani
          </Link>{' '}
          &middot; GIT-SPECT &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
