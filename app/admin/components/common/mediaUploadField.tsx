import React from 'react';
import { FileUp, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface MediaUploadFieldProps {
  label: string;
  type: string;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => void;
  isDragging: boolean;
  isSubmitting: boolean;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  files: File[];
  removeFile?: (index: number) => void;
}

export default function MediaUploadField({
  label,
  type,
  handleFileUpload,
  isDragging,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  files,
  isSubmitting,
  removeFile
}: MediaUploadFieldProps) {
  return (
    <div>
      <p className="text-sm my-px">{label}</p>

      <div
        className={`bg-white h-40 w-full lg:max-w-[416px] rounded-lg flex items-center justify-center shadow-sm ${isSubmitting ? 'pointer-events-none' : ''} ${
          isDragging
            ? 'border-solid border-[#7065F0]'
            : 'border-dashed border-[#CACACA]'
        } border`}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <label className="w-[90%] h-[85%] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e, type)}
            accept="image/*, video/mp4, video/webm"
            multiple={label === 'Other files'}
            disabled={isSubmitting}
          />
          <span className="w-11 h-11 bg-[#F5F5F5] flex items-center justify-center rounded-full mb-2">
            <FileUp className="text-[#7065F0]" size={24} />
          </span>
          <div className="flex flex-col items-center">
            <p className="text-center text-sm">
              <span className="text-[#7065F0] font-medium hover:underline">
                Click to upload
              </span>{' '}
              or{' '}
              <span className="text-[#7065F0] font-medium hover:underline">
                Drag and drop
              </span>
            </p>
            <small className="text-[#707070] mt-1">
              (Max. file size: 25 MB)
            </small>
          </div>
        </label>
      </div>

      {/* Mobile File List - Hidden on larger screens */}
      {files.length > 0 && (
        <div className="block md:hidden mt-2 w-full">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-md w-full"
            >
              <Label className="text-sm inline-block truncate max-w-[300px] sm:max-w-[320px] md:max-w-[420px]">
                {file.name}
              </Label>
              {removeFile && (
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:bg-red-100 rounded-full p-1"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
