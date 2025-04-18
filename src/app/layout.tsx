// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import DynamicFavicon from '../components/DynamicFavicon'; // Import the client-side component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Git Spect',
  description: 'Analyze GitHub profiles with beautiful visualizations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicons for light and dark mode */}
        <link id="favicon-light" rel="icon" href="/favicon-dark.ico" />
        <link id="favicon-dark" rel="icon" href="/favicon-light.ico" />

        {/* Metadata */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Analyze GitHub profiles with beautiful visualizations" />
        <meta name="title" content="Git Spect" />

        {/* Optionally, you can add other meta tags, fonts, or links */}
      </head>
      <body className={inter.className}>
        {/* Insert the DynamicFavicon component */}
        <DynamicFavicon />
        {children}
      </body>
    </html>
  );
}
