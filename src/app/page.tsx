// 'use client';

// import { useSession, signIn } from 'next-auth/react';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function HomePage() {
//   const { data: session } = useSession();
//   const [pdfURL, setPdfURL] = useState('');

//   const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file || file.type !== 'application/pdf') return;

//     const formData = new FormData();
//     formData.append('pdf', file);

//     const res = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const blob = await res.blob();
//     const url = URL.createObjectURL(blob);
//     setPdfURL(url);
//   };

//   if (!session) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white">
//         <h1 className="text-3xl font-bold mb-6">Sign in with Google</h1>
//         <button onClick={() => signIn('google')} className="bg-red-600 px-6 py-3 rounded font-semibold">
//           Sign In
//         </button>
//         <button onClick={() => signIn('google')} className="bg-red-600 px-6 py-3 rounded font-semibold">
//         Sign Up
//       </button>
//       </div>
//     );
//   }

//   return (
//     <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-10">
//       <img src="/logo.png" alt="Logo" className="w-40 mb-4" />
//       <h1 className="text-3xl font-bold mb-2">Upload & Preview PDF</h1>
//       <label className="cursor-pointer bg-red-600 px-6 py-3 rounded mb-4">
//         Select PDF file
//         <input type="file" accept="application/pdf" onChange={handleUpload} hidden />
//       </label>
//       {pdfURL && <iframe src={pdfURL} className="w-full h-[500px] border mt-4" />}
//       <Link href="/history" className="text-blue-400 underline text-sm mt-4">View Upload History</Link>
//     </main>
//   );
// }

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import './../styles/global.css';

export default function HomePage() {
  const { data: session } = useSession();
  const [pdfURL, setPdfURL] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    const formData = new FormData();
    formData.append('pdf', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setPdfURL(url);
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-neutral-900 text-white">
        {/* Logo with Animation */}
        <img
          src="/logo/logo-preview.png"
          alt="Logo"
          className="w-55 h-55 mb-1 animate-glitch"
        />
        <h1 className="text-3xl font-bold mb-6">Welcome PDF Sign Checker</h1>
        <div className="flex flex-col w-80">
          <input
            type="text"
            placeholder="Username"
            className="mb-4 px-4 py-2 rounded bg-neutral-800 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 px-4 py-2 rounded bg-neutral-800 text-white"
          />
          <div className="flex justify-between mb-4">
            <Link href="/auth/login">
              <button className="bg-blue-600 px-6 py-3 rounded font-semibold">Login</button>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-grey-600 px-6 py-3 rounded font-semibold">Sign Up</button>
            </Link>
          </div>
          <p className="text-center text-sm text-gray-400 mb-2">Login with</p>
          <div className="flex items-center justify-between mb-4">
            {/* Google Login */}
            <button
              onClick={() => signIn('google')}
              className="bg-neutral-800 p-2 rounded-full"
            >
              <img src="/emoticon/google.png" alt="Google Logo" className="w-6 h-6" />
            </button>
            {/* Microsoft Login */}
            <button
              onClick={() => signIn('microsoft')}
              className="bg-neutral-800 p-2 rounded-full"
            >
              <img src="/emoticon/microsoft.png" alt="Microsoft Logo" className="w-6 h-6" />
            </button>
            {/* GitHub Login */}
            <button
              onClick={() => signIn('github')}
              className="bg-neutral-800 p-2 rounded-full"
            >
              <img src="/emoticon/github.png" alt="GitHub Logo" className="w-6 h-6" />
            </button>
            <Link href="/app/auth/forgot-password">
              <p className="text-blue-400 underline text-sm text-center">Forgot Password?</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-10">
      <img src="/logo.png" alt="Logo" className="w-40 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Upload & Preview PDF</h1>
      <label className="cursor-pointer bg-red-600 px-6 py-3 rounded mb-4">
        Select PDF file
        <input type="file" accept="application/pdf" onChange={handleUpload} hidden />
      </label>
      {pdfURL && <iframe src={pdfURL} className="w-full h-[500px] border mt-4" />}
      <Link href="/history" className="text-blue-400 underline text-sm mt-4">View Upload History</Link>
    </main>
  );
}