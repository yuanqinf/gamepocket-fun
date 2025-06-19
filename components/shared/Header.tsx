import Link from 'next/link';
import Image from 'next/image';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Search from '@/components/shared/search';
import Login from '@/components/shared/User/Login';

const AuthenticationSection = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button className="cursor-pointer">
            <p>Login</p>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: '40px',
                height: '40px',
                '&:hover': {
                  scale: 1.1,
                  transition: 'all 0.2s ease-in-out',
                },
              },
            },
          }}
          userProfileUrl="/profile"
          userProfileMode="navigation"
        />
      </SignedIn>
    </>
  );
};

const Header = async () => {
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
        <Search />
      </div>
      <div className="flex items-center justify-end gap-4">
        <Login />
        {/* <AuthenticationSection /> */}
      </div>
    </nav>
  );
};

export default Header;
