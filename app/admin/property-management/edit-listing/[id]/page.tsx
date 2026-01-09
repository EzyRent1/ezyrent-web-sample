'use client';

import React, { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/app/admin/components/Layouts';
import { propertyFormSchema } from '@/lib/validations';
import { handleFileUploadOrDropProperty } from '@/lib/handleFileUploadOrDrop';
// import { handleLocalStorage } from '@/lib/handleLocalStorage';
import { toast } from 'sonner';
import ListingForm from '../../create-listing/components/ListingForm';
import Preview from '../../create-listing/components/Preview';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCleanImageUrl } from '@/lib/getCleanImageUrl';

interface EditListingProps {
  params: Promise<{ id: string }>;
}

const defaultValues: PropertyFormData = {
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

export default function EditListing({ params }: EditListingProps) {
  const router = useRouter();
  const [formError, setFormError] = useState<{
    field: string;
    message: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get the id using React.use()
  const { id } = use(params);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    mode: 'onChange',
    defaultValues // Add default values here
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting }
  } = form;

  // Fetch the property data
  useEffect(() => {
    if (!id) return;

    async function fetchPropertyData() {
      try {
        const response = await fetch(`/api/fetch-one-listing?id=${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch property data');
        }

        const data = await response.json();

        // Extract the actual data from the response
        const propertyData = data.data;

        // Set the form data
        const formData = {
          ...defaultValues,
          ...propertyData,
          primaryFile: propertyData.mainImage
            ? getCleanImageUrl(propertyData.mainImage)
            : null,
          otherFiles:
            propertyData.additionalImages?.map(getCleanImageUrl) || [],
          // Ensure all required fields are present
          name: propertyData.name || '',
          price: propertyData.price?.toString() || '',
          landSize: propertyData.landSize || '',
          rentDuration: propertyData.rentDuration || 'Monthly',
          propertyType: propertyData.propertyType || '',
          beds: propertyData.beds?.toString() || '',
          baths: propertyData.baths?.toString() || '',
          amenities: propertyData.amenities || [],
          address: propertyData.address || '',
          location: propertyData.location || '',
          description: propertyData.description || ''
        };

        console.log({
          data: propertyData,
          image: propertyData.mainImage,
          additionalImages: propertyData.additionalImages
        });

        reset(formData);
      } catch (error) {
        console.error('Error fetching property data:', error);
        toast.error('Failed to load property data');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPropertyData();
  }, [id, reset]);

  // upload file
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'other'
  ) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files?.length) return;

    handleFileUploadOrDropProperty(files, type, setValue, watch);
  };

  // handle file drop
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: 'primary' | 'other'
  ) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUploadOrDropProperty(e.dataTransfer.files, type, setValue, watch);
  };

  // handle file drag
  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
    e.currentTarget.classList.toggle('drag-over', isEntering);
  };

  // handle delete image
  const handleImageDelete = (type: 'primary' | 'other', index?: number) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    if (type === 'primary') {
      setValue('primaryFile', null);
      toast.success('Primary file removed');
    } else if (type === 'other' && index !== undefined) {
      const currentFiles = watch('otherFiles') || [];
      setValue(
        'otherFiles',
        currentFiles.filter((_, i) => i !== index)
      );
      toast.success('File removed');
    }
  };

  // handle form submit
  const onSubmit = async (data: PropertyFormData) => {
    try {
      setIsLoading(true);
      setFormError(null);

      if (!data.primaryFile) {
        setFormError({
          field: 'primaryFile',
          message: 'Primary image is required'
        });
        return;
      }

      const formData = new FormData();
      formData.append('id', id); // Add the property ID to the form data

      // Append form fields
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'amenities') {
          value.forEach((amenity: string) =>
            formData.append('amenities[]', amenity)
          );
        } else if (key === 'primaryFile') {
          formData.append('mainImage', value);
        } else if (key === 'otherFiles') {
          value?.forEach((file: File) =>
            formData.append('additionalImages', file)
          );
        } else if (value != null) {
          formData.append(key, value.toString());
        }
      });

      const response = await fetch('/api/edit-listing', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update property listing');
      }

      toast.success('Property updated successfully');
      router.push('/admin/property-management');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit form';
      setFormError({ field: 'submit', message: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout title="Edit Listing">
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
            isDragging={isDragging}
            onDrop={handleDrop}
            isLoading={isLoading}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
            reset={reset}
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
