'use client';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layouts';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogPostFormData, blogPostSchema } from '@/lib/validations';
import { handleLocalStorage } from '@/lib/handleLocalStorage';
import { toast } from 'sonner';
import { handleFileUploadOrDropBlog } from '@/lib/handleFileUploadOrDrop';
import BlogForm from './components/BlogForm';

const initialFormData: BlogPostFormData = {
  title: '',
  content: '',
  image: null,
  video: null,
  tags: []
};
export default function CreateBlog() {
  const router = useRouter();
  const [formError, setFormError] = useState<{
    field: string;
    message: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: initialFormData,
    mode: 'onChange'
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = form;

  const formValues = watch();
  const STORAGE_KEY = 'blog_post_draft';
  useEffect(() => {
    const cleanup = handleLocalStorage.save<BlogPostFormData>(
      STORAGE_KEY,
      formValues,
      (data) => ({
        ...data,
        image: null,
        video: null
      })
    );
    return () => cleanup();
  }, [formValues]);

  useEffect(() => {
    handleLocalStorage.load<BlogPostFormData>(STORAGE_KEY, setValue);
  }, [setValue]);

  const handleSaveDraft = () => {
    try {
      handleLocalStorage.save<BlogPostFormData>(STORAGE_KEY, formValues);
      toast.success('Post saved as draft successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft.');
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: 'image' | 'video'
  ) => {
    // Implementation here
    e.preventDefault();
    setIsDragging(false);
    handleFileUploadOrDropBlog(e.dataTransfer.files, type, setValue);
  };
  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    setIsDragging(isEntering);
    const target = e.currentTarget as HTMLElement;
    if (isEntering) {
      target.classList.add('drag-over');
    } else {
      target.classList.remove('drag-over');
    }
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video'
  ) => {
    // Implementation here
    e.preventDefault();
    if (!e.target?.files?.length) return;
    handleFileUploadOrDropBlog(e.target.files, type, setValue);
  };

  // const handleFileDelete = (type: 'image' | 'video') => {
  //   if (type === 'image') {
  //     setValue('image', null);
  //   } else if (type === 'video') {
  //     setValue('video', null);
  //   }
  //   toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted`);
  // };

  // submit data
  const onSubmit = async (data: BlogPostFormData) => {
    try {
      setIsLoading(true);
      setFormError(null);
      const formData = new FormData();
      // appendFormData(data as unknown as Record<string, unknown>, formData);
      //       if (data.image) {
      //         formData.append('image', data.image);
      //       }
      //       if (data.video) {
      //         formData.append('video', data.video);
      //       }
      // data.tags.forEach((tag) => formData.append('tags[]', tag));
      for (const [key, value] of Object.entries(data)) {
        if (key === 'tags' && Array.isArray(value)) {
          value.forEach((tag) => formData.append('tags[]', tag));
        } else if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      }
      formData.append('status', 'PUBLISHED');
      // Call the API endpoint
      const response = await fetch('/api/create-blog', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Blog post created successfully');
        handleLocalStorage.remove(STORAGE_KEY);
        router.push('/admin/blogs');
      } else {
        if (response.status === 401 || response.status === 403) {
          toast.error('Please log in again to continue');
          return;
        }
        throw new Error(result.message || 'Failed to create blog post');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit form';

      setFormError({
        field: 'submit',
        message: errorMessage
      });

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Blogs">
      <main className="p-4">
        <Button
          variant="default"
          onClick={() => router.push('/admin/blogs')}
          className="capitalize flex items-center space-x-1 bg-[#7065F0] mb-5"
        >
          <MoveLeft />
          <span>Go Back</span>
        </Button>
        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {formError.message}
          </div>
        )}
        <section className="w-full px-6">
          <BlogForm
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            isDragging={isDragging}
            watch={watch}
            handleSaveDraft={handleSaveDraft}
            onDrop={handleDrop}
            onDragOver={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            onDragEnter={(e) => handleDrag(e, true)}
            setValue={setValue}
            onFileUpload={handleFileUpload}
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </section>
      </main>
    </DashboardLayout>
  );
}
