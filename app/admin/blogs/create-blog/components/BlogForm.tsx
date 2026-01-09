import {
  MAX_CONTENT_LENGTH,
  MAX_TITLE_LENGTH,
  TAG_OPTIONS
} from '@/app/admin/constants/blog-form';
import ErrorSummary from '@/app/admin/property-management/create-listing/components/ErrorSummary';
import FormError from '@/app/admin/components/common/FormError';
import NumberLabel from '@/app/admin/components/common/label';
import { Input } from '@/components/ui/input';
import { BlogPostFormData } from '@/lib/validations';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import ContentEditor from './contenEditor';
import UploadMedia from './UploadMedia';
import { Button } from '@/components/ui/button';
import { CloudUpload, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface BlogFormProps {
  control: Control<BlogPostFormData>;
  errors: FieldErrors<BlogPostFormData>;
  isSubmitting: boolean;
  isDragging: boolean;
  isLoading: boolean;
  setValue: UseFormSetValue<BlogPostFormData>;
  handleSaveDraft: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, type: 'image' | 'video') => void;
  onSubmit: (e: React.FormEvent) => void;
  onFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video'
  ) => void;
  watch: UseFormWatch<BlogPostFormData>;
}

export default function BlogForm({
  control,
  errors,
  isSubmitting,
  setValue,
  handleSaveDraft,
  onSubmit,
  watch
}: BlogFormProps) {
  // Common input styles based on submission state
  const getInputStyles = () => {
    return `bg-[#F7F7F7] border border-[#E6E6E6] focus-visible:ring-1 focus-visible:ring-[#7065F0] ${
      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
    }`;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-20">
      {/* left */}
      <aside className=" basis-[60%] p-4 flex flex-col space-y-5 bg-gradient-to-b bg-white rounded-lg">
        <div className="space-y-3">
          <h2 className="text-[#000929] text-[1.25rem] font-medium capitalize">
            Blog Post Details
          </h2>
          <p className="text-sm text-[#666666]">
            Compose catchy and educative information, such as the name and
            description
          </p>
        </div>

        <ErrorSummary errors={errors} />
        <div className="flex flex-col space-y-6">
          <section>
            <label
              htmlFor="title"
              className="text-[#000929] text-lg font-medium mb-3"
            >
              Title
            </label>
            <div className="relative">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setValue('title', e.target.value);
                    }}
                    id="title"
                    className={`${getInputStyles()} pr-14`}
                    placeholder="Enter title of the blog"
                    aria-label="Blog title"
                    disabled={isSubmitting}
                  />
                )}
              />

              <div className="mt-2 flex items-center space-x-5">
                <NumberLabel
                  minValue={watch('title')?.length || 0}
                  maxValue={MAX_TITLE_LENGTH}
                  className="bg-[#F7F7F7] text-xs w-fit"
                />
                <FormError message={errors.title?.message} />
              </div>
            </div>
          </section>

          {/* file upload */}
          <section>
            <label
              htmlFor="uploadMedia"
              className="text-[#000929] text-lg font-medium mb-3"
            >
              Upload Media
            </label>
            <UploadMedia
              isSubmitting={isSubmitting}
              buttonText="Upload Video"
              selectedFile={watch('video')}
              acceptedFileTypes={['video/mp4']}
              setSelectedFile={(file) => {
                setValue('video', file);
              }}
            />
            <div className="mt-2">
              <FormError message={errors.video?.message} />
            </div>
          </section>

          <section>
            <ContentEditor
              content={watch('content')}
              onChange={(content) => setValue('content', content)}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('content')?.length || 0}
                maxValue={MAX_CONTENT_LENGTH}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              <FormError message={errors.content?.message} />
            </div>
          </section>
        </div>
      </aside>

      {/* right */}
      <aside className=" flex flex-col gap-5 basis-[40%]">
        {/* file upload */}
        <section>
          <label
            htmlFor="uploadMedia"
            className="text-[#000929] text-lg font-medium mb-3"
          >
            Blog Cover
          </label>
          <UploadMedia
            isSubmitting={isSubmitting}
            selectedFile={watch('image')}
            setSelectedFile={(file) => {
              setValue('image', file);
            }}
            buttonText="Upload Image"
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
          />
          <div className="mt-2">
            <FormError message={errors.image?.message} />
          </div>
        </section>

        <section className="mb-8">
          <label
            htmlFor="uploadMedia"
            className="text-[#000929] text-lg font-medium mb-3"
          >
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 md:grid-cols-3  gap-4 mt-2">
                {TAG_OPTIONS.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      {...field}
                      id={`preview-${option}`}
                      checked={field.value?.includes(option)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), option]
                          : (field.value || []).filter(
                              (item) => item !== option
                            );
                        field.onChange(newValue);
                      }}
                      disabled={isSubmitting}
                      className={
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }
                    />
                    <Label
                      htmlFor={`preview-${option}`}
                      className={
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          />
        </section>

        {/* Action buttons */}
        <section className="flex items-center justify-center gap-6 pt-4">
          {handleSaveDraft && (
            <Button
              type="button"
              onClick={handleSaveDraft}
              className={`w-full flex items-center gap-2 h-12 lg:text-[1.1rem] bg-white text-[#037F4A] shadow-sm hover:bg-[#F5FFF9] border border-[#037F4A] transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Save draft"
              disabled={isSubmitting}
            >
              <span>Save</span>
              <Save size={18} />
            </Button>
          )}

          {/* save */}
          <Button
            type="submit"
            className={`w-full capitalize flex items-center gap-2 h-12 lg:text-[1.1rem] bg-[#7065F0] hover:bg-[#5B52C5] transition-colors disabled:cursor-not-allowed"
            aria-label="Upload listing ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            aria-label="Submit form"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Uploading...' : 'upload'}</span>
            <CloudUpload
              size={18}
              className={`${isSubmitting ? 'animate-smoothBounce' : ''}`}
            />
          </Button>
        </section>
      </aside>
    </form>
  );
}
