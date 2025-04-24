'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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
        {/* Input Email and Password */}
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
          className={inputClassName}
        />
        <button
          onClick={handleSignup}
          className="bg-green-600 w-full py-2 rounded font-semibold mb-4 hover:bg-green-700"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="text-center text-gray-400 my-4">or sign up with</div>

        {/* Social Signup Options */}
        <div className="flex justify-between">
          {/* Google Signup */}
          <button
            onClick={() => signIn('google')}
            className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600"
          >
            <img src="/emoticon/google.png" alt="Google Logo" className="w-6 h-6" />
          </button>
          {/* Microsoft Signup */}
          <button
            onClick={() => signIn('microsoft')}
            className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600"
          >
            <img src="/emoticon/microsoft.png" alt="Microsoft Logo" className="w-6 h-6" />
          </button>
          {/* GitHub Signup */}
          <button
            onClick={() => signIn('github')}
            className="bg-neutral-700 p-2 rounded-full hover:bg-neutral-600"
          >
            <img src="/emoticon/github.png" alt="GitHub Logo" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}