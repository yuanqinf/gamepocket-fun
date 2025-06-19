import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

const ClerkAuth = () => {
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

export default ClerkAuth;
