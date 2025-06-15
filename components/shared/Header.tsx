'use client';
import Image from 'next/image';
import Link from 'next/link';
import Search from '@/components/shared/Search';
import Login from '@/components/shared/Login';

const Header = () => {
  const handleSearch = (query: string) => {
    console.log(query);
  };
  return (
    <nav className="header">
      <Link href="/">
        <div className="header-logo">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={56}
            height={56}
            className="block md:hidden"
          />
          <Image
            src="/images/logo_with_title.png"
            alt="Catalog.Games Logo"
            width={64}
            height={64}
            className="hidden md:block"
          />
        </div>
      </Link>
      <div className="flex w-1/2 items-center justify-center gap-8">
        <Search onSearch={handleSearch} />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Login />
      </div>
    </nav>
  );
};

export default Header;
