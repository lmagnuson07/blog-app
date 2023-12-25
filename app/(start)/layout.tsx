import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainNavigation from '@/src/components/layout/main-navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Logan's blog page",
  description: 'Find a lot of great posts that allow you to evolve!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavigation />
      <main className={inter.className}>{children}</main>
      <div id={'notifications'}></div>
    </>
  );
}
