'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Validate inputs
  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Provide more user-friendly error messages
      if (error.message.includes('Invalid login credentials')) {
        return { error: 'Incorrect email or password' };
      }
      return { error: error.message };
    }

    if (data?.user) {
      // Successful login with user data
      return {
        success: true,
        user: {
          email: data.user.email,
          id: data.user.id,
        },
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Login error:', err);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error, data: userData } = await supabase.auth.signUp(data);

  if (error) {
    // Handle specific error cases
    if (error.message.includes('User already registered')) {
      return {
        error: 'This email is already registered. Please sign in instead.',
      };
    }
    return { error: error.message };
  }

  // Check if email confirmation is required
  if (userData?.user) {
    // If identities array is empty, it means the user needs to confirm their email
    if (userData.user.identities?.length === 0) {
      return {
        error: 'This email is already registered.',
      };
    }

    // If we have an email but no confirmation was sent, it might be a duplicate
    if (userData.user.email && !userData.session) {
      return {
        success: true,
        message: 'Account created. You can now sign in.',
      };
    }
  }

  // If no confirmation required, redirect to home
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return data.user;
}
