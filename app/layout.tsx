import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';

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
      <body className={`${bricolage.variable} antialiased`}>
        <ClerkProvider
          localization={{
            userButton: {
              action__manageAccount: 'Profile',
              action__signOut: 'Logout',
            },
          }}
        >
          {children}
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
