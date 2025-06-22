'use client';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const ClerkAuth = () => {
  return (
    <>
      <SignedOut>
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link href={'/profile'}>
          <Button>Profile</Button>
        </Link>
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
        />
      </SignedIn>
    </>
  );
};

export default ClerkAuth;
