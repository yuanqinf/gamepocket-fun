import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Catalog.Games | Discover, Track & Compare Video Games',
  description:
    'Catalog.Games is your trusted hub for video game discovery and comparison. Explore trending titles, get accurate insights, and see 100% authentic ratings from real players.',
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
