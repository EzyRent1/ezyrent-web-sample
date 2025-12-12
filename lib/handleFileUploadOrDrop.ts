import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { MAX_FILE_SIZE } from '@/app/admin/constants/property-form';
import { BlogPostFormData } from './validations';

export const handleFileUploadOrDropProperty = (
  files: FileList | File[],
  type: 'primary' | 'other',
  setValue: UseFormSetValue<PropertyFormData>,
  watch: UseFormWatch<PropertyFormData>
) => {
  const validFiles = Array.from(files).filter((file) =>
    file.type.startsWith('image/')
  );

  if (validFiles.length === 0) {
    toast.error('Invalid file type. Please upload only images.');
    return;
  }

  validFiles.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File ${file.name} exceeds 25MB limit`);
      return;
    }

    if (type === 'primary') {
      setValue('primaryFile', file);
    } else {
      const currentOtherFiles = watch('otherFiles') || [];
      if (currentOtherFiles.length < 7) {
        setValue('otherFiles', [...currentOtherFiles, file]);
      } else {
        toast.error('Maximum of 7 additional files allowed');
      }
    }
  });
};

const handleFileUploadOrDropBlog = (
  files: FileList | File[],
  type: 'image' | 'video',
  setValue: UseFormSetValue<BlogPostFormData>
) => {
  const validFiles = Array.from(files).filter((file) =>
    type === 'image'
      ? file.type.startsWith('image/')
      : file.type.startsWith('video/')
  );

  if (validFiles.length === 0) {
    toast.error(`Invalid file type. Please upload only ${type}s.`);
    return;
  }

  validFiles.forEach((file) => {
    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024; // 10MB for images, 50MB for videos
    if (file.size > maxSize) {
      toast.error(
        `File ${file.name} exceeds ${maxSize / (1024 * 1024)}MB limit`
      );
      return;
    }

    if (type === 'image') {
      setValue('image', file);
    } else {
      setValue('video', file);
    }
  });
};

export { handleFileUploadOrDropBlog };
