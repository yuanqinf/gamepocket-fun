import AuthForm from '@/components/shared/User/AuthForm';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getUser, logout } from '@/lib/actions/auth';

const Login = async () => {
  const user = await getUser();
  return user ? (
    <Button onClick={logout}>Logout</Button>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md border-gray-800 bg-[#111] p-8 text-white">
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
};

export default Login;
