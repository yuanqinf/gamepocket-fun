import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer'>
          <p>Login</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Please enter your login details.
        </DialogDescription>
        <form>
          <input type='text' placeholder='Username' className='mt-2 p-2 border rounded w-full' />
          <input type='password' placeholder='Password' className='mt-2 p-2 border rounded w-full' />
          <Button type='submit' className='mt-4 w-full'>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Login