import { useDropzone } from 'react-dropzone';
import { useState, useCallback, useEffect } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';

interface FileUploadProps {
  acceptedFileTypes: { [key: string]: string[] };
  maxSizeMB?: number;
  maxFiles?: number;
  className?: string;
  Child?: React.ReactNode;
  files?: File[]; // controlled prop
  images?: string[]; // controlled prop
  setFiles?: React.Dispatch<React.SetStateAction<File[]>>; // setter from parent
  onFilesChange?: (files: File[]) => void;
}

export const FileUpload = ({
  acceptedFileTypes,
  maxSizeMB = 20,
  maxFiles = undefined,
  className = '',
  Child,
  files: controlledFiles,
  setFiles: setControlledFiles,
  onFilesChange = () => {}
}: FileUploadProps) => {
  const [internalFiles, setInternalFiles] = useState<File[]>([]);
  const [objectUrls, setObjectUrls] = useState<string[]>([]);

  // If parent passes files, use them; otherwise use internal state
  const files = controlledFiles ?? internalFiles;
  const setFiles = setControlledFiles ?? setInternalFiles;

  const isSameFile = (a: File, b: File) =>
    a.name === b.name && a.size === b.size && a.lastModified === b.lastModified;

  const onDrop = useCallback(
    (newFiles: File[]) => {
      setFiles((prevFiles) => {
        const uniqueFiles = newFiles.filter(
          (newFile) =>
            !prevFiles.some((existingFile) => isSameFile(existingFile, newFile))
        );
        const updatedFiles = [...prevFiles, ...uniqueFiles];
        onFilesChange(updatedFiles);
        return updatedFiles;
      });
    },
    [setFiles, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: acceptedFileTypes,
    maxSize: maxSizeMB * 1000000,
    maxFiles,
    onDrop
  });

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (file) => !isSameFile(file, fileToRemove)
      );
      onFilesChange(updatedFiles);
      return updatedFiles;
    });
  };
  useEffect(() => {
    const urls = files
      .filter(
        (file) =>
          file.type.startsWith('image/') || file.type.startsWith('video/')
      )
      .map((file) => URL.createObjectURL(file));

    setObjectUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const fileList = files.map((file, index) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const isPDF = file.type === 'application/pdf';
    const objectUrl = objectUrls[index]; // Use precomputed URL

    return (
      <div className="relative" key={index}>
        <button
          onClick={() => removeFile(file)}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10"
          aria-label="Remove file"
        >
          x
        </button>

        {isImage ? (
          <img
            className="w-full h-[5rem] object-cover rounded-lg bg-gray-100"
            src={objectUrl}
            alt="Uploaded preview"
          />
        ) : isVideo ? (
          <VideoPreview objectUrl={objectUrl} />
        ) : isPDF ? (
          <PDFPreview />
        ) : (
          <div className="w-full h-[5rem] flex items-center justify-center rounded-lg bg-gray-100">
            <span className="text-gray-500">
              {file.type.split('/')[1].toUpperCase()}
            </span>
          </div>
        )}

        <p className="text-xs truncate mt-1">{file.name}</p>
      </div>
    );
  });

  // Cleanup all object URLs
  useEffect(() => {
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [objectUrls]);

  return (
    <div className={`w-full ${className}`}>
      <div
        {...getRootProps({
          'aria-label': 'drag and drop area',
          className: `${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`
        })}
        className="w-full h-[10rem] flex flex-col justify-center items-center gap-y-1 rounded-lg border border-[#B0B0B0] border-dashed cursor-pointer p-3 bg-[#F5F5F5]"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file(s) here...</p>
        ) : Child ? (
          Child
        ) : (
          <>
            <IoCloudUploadOutline size={30} />
            <p className="text-lg font-semibold text-center">
              Drag files here or{' '}
              <span className="text-primaryPurple">click to select</span>
            </p>
            <p className="text-sm text-[#898989]">
              Png, jpeg, Mp4 supported up to 20mb max
            </p>
          </>
        )}
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <div className="w-full grid grid-cols-2 gap-5">{fileList}</div>
        </div>
      )}
    </div>
  );
};

export const PDFPreview = () => {
  return (
    <div className="w-full h-[5rem] rounded-lg bg-gray-100 flex items-center justify-center relative">
      <div className="flex flex-col items-center justify-center">
        <svg
          className="w-8 h-8 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24zm-8 171.8c-20-12.2-33.3-29-42.7-53.8 4.5-18.5 11.6-46.6 6.2-64.2-4.7-29.4-42.4-26.5-47.8-6.8-5 18.3-.4 44.1 8.1 77-11.6 27.6-28.7 64.6-40.8 85.8-.1 0-.1.1-.2.1-27.1 13.9-73.6 44.5-54.5 68 5.6 6.9 16 10 21.5 10 17.9 0 35.7-18 61.1-61.8 25.8-8.5 54.1-19.1 79-23.2 21.7 11.8 47.1 19.5 64 19.5 29.2 0 31.2-32 19.7-43.4-13.9-13.6-54.3-9.7-73.6-7.2zM377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9 37.1 15.8 42.8 9 42.8 9z"
          />
        </svg>
        <span className="text-red-600 text-xs font-medium mt-1">PDF</span>
      </div>
    </div>
  );
};

const VideoPreview = ({ objectUrl }: { objectUrl: string }) => {
  return (
    <div className="w-full h-[5rem] rounded-lg bg-gray-100 overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={objectUrl}
        controls={false}
        muted
        onMouseOver={(e) => e.currentTarget.play()}
        onMouseOut={(e) => {
          e.currentTarget.pause();
          e.currentTarget.currentTime = 0;
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          VIDEO
        </span>
      </div>
    </div>
  );
};
