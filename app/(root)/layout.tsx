import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import TopBar from '@/components/shared/TopBar';
import LeftSideBar from '@/components/shared/LeftSideBar';
import BottomBar from '@/components/shared/BottomBar';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fullstack Next.js ToDo app',
  description: 'A fullstack ToDo app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TopBar />
            <main className='flex flex-row'>
              <LeftSideBar />
              <section className="main-container">
                <div className="w-full max-4xl">{children}</div>
              </section>
            </main>
            <BottomBar />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
