"use client";

import { useRef, useState } from "react";

interface FileUploadClientProps {
  onFileUpload: (fileId: number, fileUrl: string, fileName: string) => void;
  onError?: (error: string) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  buttonText?: string;
  className?: string;
}

export default function FileUploadClient({
  onFileUpload,
  onError = () => {},
  acceptedFileTypes = "image/*",
  maxSizeMB = 5,
  buttonText = "Choose File",
  className = "",
}: FileUploadClientProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      const errorMsg = `File size must be less than ${maxSizeMB}MB`;
      onError(errorMsg);
      return;
    }
    if (
      acceptedFileTypes !== "*" &&
      !selectedFile.type.match(acceptedFileTypes)
    ) {
      const errorMsg = `Please select a valid file type (${acceptedFileTypes})`;
      onError(errorMsg);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      onError("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading file:", file.name);
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const next = prev + Math.random() * 10;
          return next > 90 ? 90 : next;
        });
      }, 300);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      clearInterval(progressInterval);
      setUploadProgress(100);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Upload error:", errorData);
        throw new Error(
          errorData.error || `Upload failed with status ${response.status}`
        );
      }
      const result = await response.json();
      console.log("Upload success response:", result);
      if (!result.success || !result.data) {
        throw new Error("Invalid response format from server");
      }
      const uploadedFile = Array.isArray(result.data)
        ? result.data[0]
        : result.data;
      console.log("Uploaded file data:", uploadedFile);
      onFileUpload(uploadedFile.id, uploadedFile.url, uploadedFile.name);
      setTimeout(() => {
        setFile(null);
        setUploading(false);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 1000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "File upload failed";
      console.error("Upload error:", errorMessage);
      onError(errorMessage);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleClick = () => {
    if (uploading) return;
    if (!file) {
      fileInputRef.current?.click();
    } else {
      handleUpload();
    }
  };

  const resetFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
        disabled={uploading}
        aria-label="File upload"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleClick}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-busy={uploading ? "true" : "false"}
        >
          {!file ? buttonText : uploading ? "Uploading..." : "Upload File"}
        </button>

        {file && !uploading && (
          <button
            type="button"
            onClick={resetFile}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Remove selected file"
          >
            ×
          </button>
        )}

        {file && (
          <span className="text-sm text-gray-600 truncate max-w-xs">
            {file.name}
          </span>
        )}
      </div>

      {uploading && (
        <div
          className="mt-2 w-full"
          role="progressbar"
          aria-valuenow={Math.round(uploadProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1 text-right">
            {Math.round(uploadProgress)}%
          </p>
        </div>
      )}
    </div>
  );
}
