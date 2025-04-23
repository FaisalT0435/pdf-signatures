'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';

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
        <h1 className="text-3xl font-bold mb-6">Sign in with Google</h1>
        <button onClick={() => signIn('google')} className="bg-red-600 px-6 py-3 rounded font-semibold">
          Sign In
        </button>
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