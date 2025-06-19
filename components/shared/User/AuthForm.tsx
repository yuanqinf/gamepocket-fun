'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { login, signup } from '@/lib/actions/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogTitle } from '@/components/ui/dialog';
import { formSchema, FormSchema } from '@/components/shared/User/schema';

/**
 * AuthForm - Component that handles the form logic
 * and renders the appropriate view based on login/signup state
 */
const AuthForm = () => {
  // State for toggling between login and signup views
  const [isSignUp, setIsSignUp] = useState(false);
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = !isSignUp;

  // Setup form with schema validation
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      _isSignUp: isSignUp,
    },
    mode: 'onBlur', // Validate when user leaves the field
  });

  // State for loading during form submission
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission
  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      setError(null);

      // Create FormData object for server actions
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      if (isLogin) {
        // await login(formData);
        await login(formData);
      } else {
        await signup(formData);
      }
      // If successful, the server action will redirect
      // This code will only run if the redirect fails
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Authentication failed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when switching between login and signup
  const handleAuthToggle = () => {
    const newIsSignUp = !isSignUp;
    form.reset({
      email: '',
      password: '',
      _isSignUp: newIsSignUp,
    });
    setIsSignUp(newIsSignUp);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Logo */}
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={64}
        height={64}
        className="m-0"
      />

      {/* Title */}
      <DialogTitle className="text-center text-2xl font-bold">
        {isLogin ? 'Sign in to Catalog.Games' : 'Create your account'}
      </DialogTitle>

      {/* Welcome message */}
      <p className="text-center text-gray-400">
        {isLogin
          ? 'Welcome back! Please sign in to continue'
          : 'Welcome! Please fill in the details to get started.'}
      </p>

      {/* Google Sign In Button */}
      <Button
        variant="outline"
        className="w-full gap-2 border-gray-700 bg-transparent py-6 hover:bg-gray-900"
      >
        <Image src="/icons/google.png" alt="Google" width={20} height={20} />
        <span>Continue with Google</span>
      </Button>

      {/* Divider */}
      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-grow bg-gray-700"></div>
        <span className="text-gray-400">or</span>
        <div className="h-px flex-grow bg-gray-700"></div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-400">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    className="auth-input font-[Inter]"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* Password field - only shown on signup */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-gray-400">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="auth-input pr-10 font-[Inter]"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="link"
                      size="icon"
                      className="absolute inset-y-0 right-0 h-full cursor-pointer pr-3 text-gray-400 transition-transform hover:scale-110"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="default"
            className="w-full bg-white py-6 text-black hover:bg-gray-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {isLogin ? 'Signing in...' : 'Creating account...'}
              </span>
            ) : (
              <>{isLogin ? 'Sign in' : 'Create account'}</>
            )}
          </Button>

          {/* Error message */}
          {error && (
            <div className="mt-2 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
              {error}
            </div>
          )}
        </form>
      </Form>

      {/* Account toggle link */}
      <div className="text-center text-gray-400">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Button
          variant="link"
          onClick={handleAuthToggle}
          className="p-0 font-[Inter] text-white"
        >
          {isLogin ? 'Sign up' : 'Sign in'}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
