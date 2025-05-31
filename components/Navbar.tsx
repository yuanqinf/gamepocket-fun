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
      <Link href="/">
        <div className="navbar-logo">
          <Image src="/images/logo.png" alt="Logo" width={56} height={56} />
        </div>
      </Link>
      <div className="search">
        <Search onSearch={handleSearch} />
      </div>
      <div className="login">
        <Button>
          <p>Login</p>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
