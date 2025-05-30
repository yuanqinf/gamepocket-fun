'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search } from '@/components/Search';

const Navbar = () => {
  const handleSearch = (query: string) => {
    console.log(query);
  };
  return (
    <nav className="navbar">
      {/* left logo */}
      <Link href="/">
        <div className="navbar-logo">
          <Image src="/images/logo.png" alt="Logo" width={56} height={56} />
        </div>
      </Link>
      {/* middle search bar */}
      <div className="flex items-center justify-center gap-8 w-1/2">
        <Search onSearch={handleSearch} />
      </div>
      {/* Right login */}
      <div className="flex justify-end items-center gap-4">
        <Button>
          <p>Login</p>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
