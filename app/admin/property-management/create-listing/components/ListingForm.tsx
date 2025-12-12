import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CloudUpload, Save } from 'lucide-react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import {
  amenityOptions,
  bathOptions,
  bedOptions,
  MAX_ADDRESS_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  propertyTypes,
  rentDurations
} from '@/app/admin/constants/property-form';
import { Checkbox } from '@/components/ui/checkbox';
import MediaUploadField from '../../../components/common/mediaUploadField';
import { Label } from '@/components/ui/label';
import SelectionButton from '../../../components/common/selectionButton';
import FormError from '../../../components/common/FormError';
import NumberLabel from '../../../components/common/label';
import ErrorSummary from './ErrorSummary';
import RenderSelectionSection from './renderSelection';
import AddressAutocomplete from '@/components/LocationSearchInput';

interface ListingFormProps {
  control: Control<PropertyFormData>;
  errors: FieldErrors<PropertyFormData>;
  watch: UseFormWatch<PropertyFormData>;
  setValue: UseFormSetValue<PropertyFormData>;
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'other'
  ) => void;
  handleSaveDraft?: () => void;
  onInputChange: (field: keyof PropertyFormData, value: string) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (
    e: React.DragEvent<HTMLDivElement>,
    type: 'primary' | 'other'
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
  isDragging: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  reset?: UseFormReset<PropertyFormData>;
}

export default function ListingForm({
  control,
  errors,
  watch,
  setValue,
  handleFileUpload,
  handleSaveDraft,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onInputChange,
  onSubmit,
  isDragging,
  isLoading,
  isSubmitting
}: ListingFormProps) {
  const removePrimaryFile = () => {
    setValue('primaryFile', null);
  };

  const removeOtherFile = (index: number) => {
    const currentOtherFiles = watch('otherFiles') || [];
    const updatedFiles = currentOtherFiles.filter((_, i) => i !== index);
    setValue('otherFiles', updatedFiles);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Common input styles based on submission state
  const getInputStyles = () => {
    return `bg-[#F7F7F7] border border-[#E6E6E6] focus-visible:ring-1 focus-visible:ring-[#7065F0] ${
      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
    }`;
  };

  return (
    <aside className="max-w-lg flex flex-col space-y-8 bg-gradient-to-b from-neutral-50 to-white/70 rounded-lg">
      <h2 className="text-[#000929] text-[1.25rem] font-medium capitalize">
        Property Listing Form
      </h2>

      <ErrorSummary errors={errors} />
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col !mt-10 space-y-10"
      >
        {/* Property name */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">Name</h2>
          <div className="relative">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onInputChange('name', e.target.value);
                  }}
                  className={`${getInputStyles()} pr-14`}
                  placeholder="Enter property name"
                  aria-label="Property name"
                  disabled={isSubmitting}
                />
              )}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('address')?.length || 0}
                maxValue={MAX_ADDRESS_LENGTH}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              <FormError message={errors.name?.message} />
            </div>
          </div>
        </section>

        {/* Property images */}
        <section aria-label="Image Upload">
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Add Images
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            {/* primary file */}
            <div>
              <MediaUploadField
                label="Primary file"
                type="primary"
                handleFileUpload={(e) => handleFileUpload(e, 'primary')}
                isDragging={isDragging}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'primary')}
                files={
                  watch('primaryFile')
                    ? [watch('primaryFile')].filter(
                        (file): file is File => file !== null
                      )
                    : []
                }
                removeFile={removePrimaryFile}
                isSubmitting={isSubmitting}
              />
              <div className="mt-2 flex items-center space-x-5">
                <FormError message={errors.otherFiles?.message} />
              </div>
            </div>
            {/* other files */}
            <div>
              <MediaUploadField
                label="Other files"
                type="other"
                handleFileUpload={(e) => handleFileUpload(e, 'other')}
                isDragging={isDragging}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, 'other')}
                files={watch('otherFiles') || []}
                removeFile={removeOtherFile}
                isSubmitting={isSubmitting}
              />
              <div className="mt-2 flex items-center space-x-5">
                <FormError message={errors.otherFiles?.message} />
              </div>
            </div>
          </div>
        </section>

        {/* Price */}
        <section className="w-full md:w-[200px] h-auto">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Price</h2>
          <Controller
            name="price"
            control={control}
            rules={{
              required: 'Price is required',
              validate: (value) => {
                if (isNaN(Number(value))) return 'Price must be a valid number';
                if (value.toString().startsWith('0'))
                  return 'Price cannot start with 0';
                if (Number(value) === 0) return 'Price cannot be 0';
                return true;
              }
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min={0}
                step={0.01}
                className={getInputStyles()}
                placeholder="Enter property price"
                disabled={isSubmitting}
              />
            )}
          />
          <div className="mt-2">
            <FormError message={errors.price?.message} />
          </div>
        </section>

        {/* Land size */}
        <section className="w-full md:w-[250px] h-auto">
          <h2 className="text-[#000929] text-xl font-medium mb-3">Room Size</h2>
          <Controller
            name="landSize"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                className={getInputStyles()}
                placeholder="Enter room size e.g 152x152"
                disabled={isSubmitting}
              />
            )}
          />
          <div className="mt-2">
            <FormError message={errors.landSize?.message} />
          </div>
        </section>

        {/* rentDuration */}
        <section className="w-full md:w-[200px] h-auto">
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Rent duration
          </h2>
          <Controller
            name="rentDuration"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className={`w-full rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 shadow-sm focus:border-[#7065F0] focus:outline-none focus:ring-1 focus:ring-[#7065F0] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isSubmitting}
              >
                {rentDurations.map((rentDuration) => (
                  <option key={rentDuration} value={rentDuration}>
                    {rentDuration}
                  </option>
                ))}
              </select>
            )}
          />
          <div className="mt-2">
            <FormError message={errors.rentDuration?.message} />
          </div>
        </section>

        {/* Building type */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Building Type
          </h2>
          <Controller
            name="propertyType"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
                {propertyTypes.map((type) => (
                  <SelectionButton
                    {...field}
                    key={type}
                    label={type}
                    selected={field.value === type}
                    onClick={() => field.onChange(type)}
                    isSubmitting={isSubmitting}
                  />
                ))}
              </div>
            )}
          />
          <div className="mt-2">
            <FormError message={errors.propertyType?.message} />
          </div>
        </section>

        {/* Beds and baths */}
        {[
          {
            label: 'No. of Beds',
            options: bedOptions,
            fieldName: 'beds' as keyof PropertyFormData
          },
          {
            label: 'No. of Baths',
            options: bathOptions,
            fieldName: 'baths' as keyof PropertyFormData
          }
        ].map(({ label, options, fieldName }, index) => (
          <React.Fragment key={`${fieldName}-${index}`}>
            {RenderSelectionSection({
              errors,
              control,
              label,
              options,
              fieldName,
              isSubmitting
            })}
          </React.Fragment>
        ))}

        {/* Amenities */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">Amenities</h2>
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <div className="mt-2 grid grid-cols-2 lg:grid-cols-3 gap-5">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      {...field}
                      id={`preview-${amenity}`}
                      checked={field.value?.includes(amenity)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...(field.value || []), amenity]
                          : (field.value || []).filter(
                              (item) => item !== amenity
                            );
                        field.onChange(newValue);
                      }}
                      disabled={isSubmitting}
                      className={
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }
                    />
                    <Label
                      htmlFor={`preview-${amenity}`}
                      className={
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          />
          <div className="mt-2">
            <FormError message={errors.amenities?.message} />
          </div>
        </section>

        {/* Address */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">Address</h2>
          <div className="relative">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <AddressAutocomplete
                  field={field}
                  onInputChange={onInputChange}
                  getInputStyles={getInputStyles}
                  isSubmitting={isSubmitting}
                />
              )}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('address')?.length || 0}
                maxValue={100}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              <FormError message={errors.address?.message} />
            </div>
          </div>
        </section>

        {/* location */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">location</h2>
          <div className="relative">
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onInputChange('location', e.target.value);
                  }}
                  className={`${getInputStyles()} pr-14`}
                  placeholder="Enter property location"
                  aria-label="Property location"
                  disabled={isSubmitting}
                />
              )}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('location')?.length || 0}
                maxValue={MAX_ADDRESS_LENGTH}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              <FormError message={errors.location?.message} />
            </div>
          </div>
        </section>

        {/* Description */}
        <section>
          <h2 className="text-[#000929] text-xl font-medium mb-3">
            Description
          </h2>
          <div className="relative">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onInputChange('description', e.target.value);
                  }}
                  className={`${getInputStyles()} pr-14 min-h-[150px]`}
                  placeholder="Describe the property"
                  aria-label="Property description"
                  disabled={isSubmitting}
                />
              )}
            />
            <div className="mt-2 flex items-center space-x-5">
              <NumberLabel
                minValue={watch('description')?.length || 0}
                maxValue={MAX_DESCRIPTION_LENGTH}
                className="bg-[#F7F7F7] text-xs w-fit"
              />
              <FormError message={errors.description?.message} />
            </div>
          </div>
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
              disabled={isLoading || isSubmitting}
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
            disabled={isLoading || isSubmitting}
          >
            <span>{isLoading ? 'Uploading...' : 'upload'}</span>
            <CloudUpload
              size={18}
              className={`${isLoading ? 'animate-smoothBounce' : ''}`}
            />
          </Button>
        </section>
      </form>
    </aside>
  );
}
