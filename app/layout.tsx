import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Game Pocket | Discover, Collect & Compare Video Games',
  description:
    'Explore The Game Pocket — a collectible card-style video game encyclopedia. Search trending games, view hex stat charts, AI-generated summaries, and build your personal collection.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bricolage.variable} antialiased`}>{children}</body>
    </html>
  );
}
