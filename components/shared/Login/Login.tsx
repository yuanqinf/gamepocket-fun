'use client';
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import AuthView from './AuthView';

/**
 * Login component that provides both login and signup functionality
 * Uses React Hook Form with Zod validation
 */
const Login = () => {
  // State for toggling between login and signup views
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md border-gray-800 bg-[#111] p-8 text-white">
        <AuthView isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
      </DialogContent>
    </Dialog>
  );
};

export default Login;
