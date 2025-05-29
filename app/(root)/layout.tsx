import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <nav className="bg-black h-16 flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-white text-3xl font-bold">
            gamepocket.fun
          </h1>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/" className="text-white text-lg hover:text-white/70">
                Home
              </Link>
            </li>
            <li>
              <Link href="/explore" className="text-white text-lg hover:text-white/70">
                Explore
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </main>
  );
}
