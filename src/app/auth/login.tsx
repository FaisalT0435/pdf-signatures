'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="bg-neutral-800 p-8 rounded shadow-md w-96 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-neutral-700 text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-neutral-700 text-white"
        />
        <button onClick={handleLogin} className="bg-red-600 w-full py-2 rounded mb-2 font-semibold">
          Login
        </button>
        <button onClick={() => signIn('google')} className="bg-blue-600 w-full py-2 rounded mb-2 font-semibold">
          Login with Google
        </button>
        <div className="flex justify-between text-sm mt-2">
          <Link href="/auth/signup" className="text-blue-400">Sign up</Link>
          <Link href="#" className="text-gray-400">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
