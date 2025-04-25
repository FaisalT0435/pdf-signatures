'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Generate preview URL
      const preview = URL.createObjectURL(selectedFile);
      setPreviewURL(preview);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) return alert('Please select a file to upload.');

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    // Update progress bar
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete);
      }
    };

    // Handle response
    xhr.onload = () => {
      if (xhr.status === 200) {
        alert('File uploaded successfully!');
        setProgress(0); // Reset progress bar
        router.push('/history'); // Redirect to history page
      } else {
        alert('File upload failed.');
        setProgress(0); // Reset progress bar
      }
    };

    xhr.onerror = () => {
      alert('An error occurred during the upload.');
      setProgress(0); // Reset progress bar
    };

    xhr.send(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload & Preview PDF</h1>

      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* Preview PDF */}
      {previewURL && (
        <div className="w-full max-w-md mt-4">
          <h2 className="text-lg font-bold mb-2">Preview</h2>
          <iframe
            src={previewURL}
            className="w-full h-[300px] border"
            title="PDF Preview"
          />
        </div>
      )}

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Upload
        </button>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="w-full max-w-md bg-gray-700 rounded mt-4">
          <div
            className="bg-green-500 text-xs font-medium text-center p-1 leading-none rounded"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}
    </div>
  );
}