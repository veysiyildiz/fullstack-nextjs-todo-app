import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Fullstack Next.js ToDo app',
  description: 'A fullstack ToDo app built with Next.js',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
    children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}