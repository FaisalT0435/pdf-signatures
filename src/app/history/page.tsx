'use client';

import { useEffect, useState } from 'react';

export default function HistoryPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/history')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div className="p-10 bg-neutral-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Upload History</h1>
      <ul className="space-y-2">
        {logs.map((log: any) => (
          <li key={log.id} className="bg-neutral-800 p-3 rounded">
            <p><strong>Filename:</strong> {log.filename}</p>
            <p><strong>Signature:</strong> {log.has_signature ? 'Original' : 'Edited'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}