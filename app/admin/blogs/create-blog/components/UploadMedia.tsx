import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

interface UploadMediaProps {
  selectedFile: File | null | undefined;
  setSelectedFile: (file: File) => void;
  buttonText?: string;
  acceptedFileTypes?: string[];
  isSubmitting: boolean;
}
export default function UploadMedia({
  selectedFile,
  setSelectedFile,
  buttonText = 'Upload Image',
  acceptedFileTypes = ['image/jpeg', 'image/png', 'video/mp4'],
  isSubmitting
}: UploadMediaProps) {
  const [isDragging, setIsDragging] = useState(false);
  // const [itemUrl, setItemUrl] = useState("")

  // useEffect(() => {

  // }, [])
  //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    const validTypes = acceptedFileTypes
      ? acceptedFileTypes
      : ['image/jpeg', 'image/png', 'video/mp4'];
    const maxSize = 25 * 1024 * 1024; // 25MB

    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a JPG, PNG, or MP4 file');
      return;
    }

    if (file.size > maxSize) {
      toast.error('File size must be less than 25MB');
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full  mt-1">
      <div
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-12 
          flex flex-col items-center justify-center
          cursor-pointer transition-all
          ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 bg-white hover:border-gray-400'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isSubmitting}
        />

        <Upload className="w-16 h-16 text-gray-400 mb-4" strokeWidth={1.5} />

        <p className="text-gray-700 text-lg font-medium mb-2">
          Click to Upload or drag and drop
        </p>

        <p className="text-gray-500 text-sm mb-6">
          JPG, PNG, MP4 (Max file size: 25 MB)
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2.5 rounded-2xl transition-colors"
        >
          {buttonText}
        </button>

        {selectedFile && (
          <div className="mt-4 text-sm text-gray-600">
            Selected: {selectedFile.name}
          </div>
        )}
      </div>
    </div>
  );
}
