import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
