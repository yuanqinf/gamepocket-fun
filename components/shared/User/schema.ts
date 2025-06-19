import { z } from 'zod';

// Define form schema with validation
export const formSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Please enter a valid email address.',
      }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, { message: 'Password is required' }),
    // Hidden field to track form mode
    _isSignUp: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Add additional validation for signup mode
    if (data._isSignUp && data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 8,
        type: 'string',
        inclusive: true,
        message: 'Password must be at least 8 characters.',
        path: ['password'],
      });
    }
  });

// Define types for better type safety
export type FormSchema = z.infer<typeof formSchema>;
