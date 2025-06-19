import { z } from 'zod';

// Define form schema with conditional validation
export const formSchema = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z.string(),
    // Hidden field to track form mode
    _isSignUp: z.boolean().optional(),
  })
  .refine(
    (data) => {
      // Only require password if in signup mode
      if (data._isSignUp && (!data.password || data.password.length < 8)) {
        return false;
      }
      return true;
    },
    {
      message: 'Password must be at least 8 characters.',
      path: ['password'], // Path to the field that has the error
    },
  );

// Define types for better type safety
export type FormSchema = z.infer<typeof formSchema>;
