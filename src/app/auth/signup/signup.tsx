'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const inputClassName = "w-full p-2 mb-3 rounded bg-neutral-700 text-white";

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push('/auth/login');
    } else {
      alert('Signup failed');
    }
  };

return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <div className="bg-neutral-800 p-8 rounded shadow-md w-96 text-white">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={inputClassName}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-neutral-700 text-white"
        />
        <button onClick={handleSignup} className="bg-green-600 w-full py-2 rounded font-semibold">
          Create Account
        </button>
      </div>
    </div>
  );
};
