'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/app/admin/components/Layouts';
import { propertyFormSchema } from '@/lib/validations';
import { handleFileUploadOrDropProperty } from '@/lib/handleFileUploadOrDrop';
import { handleLocalStorage } from '@/lib/handleLocalStorage';
import Preview from './components/Preview';
import ListingForm from './components/ListingForm';
import { toast } from 'sonner';
import { fetchLocationCoordinates } from '@/lib/utils';

const initialFormData: PropertyFormData = {
  name: '',
  landSize: '',
  latitude: '',
  longitude: '',
  address: '',
  description: '',
  location: '',
  price: '0',
  rentDuration: 1,
  primaryFile: null,
  otherFiles: [],
  propertyType: 'flat',
  beds: '2',
  baths: '3',
  amenities: []
};

export default function CreateListing() {
  const router = useRouter();
  const [formError, setFormError] = useState<{
    field: string;
    message: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
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
  const STORAGE_KEY = 'property_listing_draft';
  // save to storage on values change
  useEffect(() => {
    const cleanup = handleLocalStorage.save<PropertyFormData>(
      STORAGE_KEY,
      formValues,
      (data) => ({
        ...data,
        primaryFile: null,
        otherFiles: []
      })
    );
    return () => cleanup();
  }, [formValues]);

  // Load from localStorage on component mount
  useEffect(() => {
    handleLocalStorage.load(STORAGE_KEY, setValue);
  }, [setValue]);

  // upload file
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    e.preventDefault();
    if (!e.target?.files?.length) return;
    handleFileUploadOrDropProperty(
      e.target.files,
      type as 'primary' | 'other',
      setValue,
      watch
    );
  };

  // drop file
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: string) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUploadOrDropProperty(
      e.dataTransfer.files,
      type as 'primary' | 'other',
      setValue,
      watch
    );
  };

  // drag file
  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);

    const target = e.currentTarget; //get ref of element with listener
    if (isEntering) {
      target.classList.add('drag-over');
    } else {
      target.classList.remove('drag-over');
    }
  };

  //clear draft: feature thing
  // const clearDraft = () => {
  //   try {
  //     localStorage.removeItem(STORAGE_KEY);
  //     form.reset(initialFormData);
  //     toast.success('Draft cleared successfully');
  //   } catch (error) {
  //     console.error('Error clearing draft:', error);
  //     toast.error('Failed to clear draft');
  //   }
  // };

  // handle draft
  const handleSaveDraft = () => {
    try {
      handleLocalStorage.save(STORAGE_KEY, formValues, (data) => ({
        ...data,
        primaryFile: null,
        otherFiles: []
      }));
      toast.success('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft.');
    }
  };

  // delete file
  const handleImageDelete = (type: 'primary' | 'other', index?: number) => {
    if (confirm('Are you sure you want to delete this file?')) {
      if (type === 'primary') {
        setValue('primaryFile', null);
        toast.success('Primary file removed');
      } else if (type === 'other' && index !== undefined) {
        const currentOtherFiles = watch('otherFiles') || [];
        const updatedFiles = currentOtherFiles.filter((_, i) => i !== index);
        setValue('otherFiles', updatedFiles);
        toast.success('File removed');
      }
    }
  };

  // Fetch location coordinates when address changes
  useEffect(() => {
    const fetchCoordinates = async () => {
      if (formValues.address) {
        const coordinates = await fetchLocationCoordinates(formValues.address);
        console.log('cords: ', coordinates);
        if (coordinates) {
          setValue('latitude', coordinates.latitude);
          setValue('longitude', coordinates.longitude);
        }
      }
    };

    fetchCoordinates();
  }, [formValues.address, setValue]);

  // submit data
  const onSubmit = async (data: PropertyFormData) => {
    try {
      setIsLoading(true);
      setFormError(null);

      if (!data.primaryFile) {
        setFormError({
          field: 'primaryFile',
          message: 'Primary image is required'
        });
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      // appendFormData(data as unknown as Record<string, unknown>, formData);
      // Append other form fields
      formData.append('name', data.name);
      formData.append('address', data.address);
      formData.append('price', data.price.toString());
      formData.append('description', data.description);
      formData.append('beds', data.beds);
      formData.append('location', data.location);
      formData.append('rentDuration', data.rentDuration.toString());
      formData.append('propertyType', data.propertyType);
      formData.append('bathrooms', data.baths);
      formData.append('landSize', data.landSize.toString());
      if (data.longitude)
        formData.append('longitude', data.longitude.toString());
      if (data.latitude) formData.append('latitude', data.latitude.toString());

      // Append amenities as an array
      data.amenities.forEach((amenity) =>
        formData.append('amenities[]', amenity)
      );

      // Append images as files
      formData.append('mainImage', data.primaryFile);
      data.otherFiles?.forEach((file) => {
        formData.append('additionalImages', file);
      });

      // Call the API endpoint
      const response = await fetch('/api/create-listing', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Property created successfully');
        handleLocalStorage.remove(STORAGE_KEY);
        router.push('/admin/property-management');
      } else {
        if (response.status === 401 || response.status === 403) {
          toast.error('Please log in again to continue');
          return;
        }
        throw new Error(result.message || 'Failed to create property listing');
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
    <DashboardLayout title="Create Listing">
      <main className="p-5">
        <Button
          variant="default"
          onClick={() => router.push('/admin/property-management')}
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

        <section className="w-full grid lg:grid-cols-2 gap-20">
          <ListingForm
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onInputChange={setValue}
            handleFileUpload={handleFileUpload}
            onDragOver={(e) => handleDrag(e, true)}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            handleSaveDraft={handleSaveDraft}
            isDragging={isDragging}
            onDrop={handleDrop}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Preview
            watch={watch}
            primaryFile={watch('primaryFile')}
            otherFiles={watch('otherFiles')}
            onImageDelete={handleImageDelete}
            isSubmitting={isSubmitting}
          />
        </section>
      </main>
    </DashboardLayout>
  );
}
