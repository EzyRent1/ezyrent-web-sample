import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import NumberLabel from '../../../components/common/label';
import { UseFormWatch } from 'react-hook-form';
import { useNumberWithCommas } from '@/hooks/useNumberWithComa';
import MediaPreview from './mediaPreview';
import MediaModal from './mediaModal';

interface PreviewProps {
  watch: UseFormWatch<PropertyFormData>;
  primaryFile: File | null;
  otherFiles: File[];
  onImageDelete: (type: 'primary' | 'other', index: number) => void;
  isSubmitting: boolean;
}

export default function Preview({
  watch,
  primaryFile,
  otherFiles,
  onImageDelete,
  isSubmitting
}: PreviewProps) {
  const [expandedOtherFile, setExpandedOtherFile] = useState<string | null>(
    null
  );
  const [primaryFileUrl, setPrimaryFileUrl] = useState<string>('');
  const [otherFileUrls, setOtherFileUrls] = useState<string[]>([]);
  const formValues = watch();

  // Create and manage object URLs
  useEffect(() => {
    // Create primary file URL
    if (primaryFile) {
      try {
        const url = URL.createObjectURL(primaryFile);
        setPrimaryFileUrl(url);
        return () => {
          URL.revokeObjectURL(url);
        };
      } catch (error) {
        console.error('Error creating primary file URL:', error);
      }
    } else {
      setPrimaryFileUrl('');
    }
  }, [primaryFile]);

  // Create and manage other file URLs
  useEffect(() => {
    const urls: string[] = [];

    otherFiles?.forEach((file) => {
      try {
        const url = URL.createObjectURL(file);
        urls.push(url);
      } catch (error) {
        console.error('Error creating object URL:', error);
        urls.push(''); // Push empty string as placeholder for failed URL
      }
    });

    setOtherFileUrls(urls);

    // Cleanup function
    return () => {
      urls.forEach((url) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [otherFiles]);

  return (
    <aside className="hidden lg:block w-full max-w-[520px]">
      <h2 className="text-[#000929] text-[1.25rem] font-medium capitalize">
        property listing preview
      </h2>

      {/* Name */}
      <div className="mt-10 w-full relative">
        <h3 className="text-[#000929] text-xl font-medium capitalize mb-3">
          name
        </h3>
        <Input
          value={formValues.name}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />
        <NumberLabel
          minValue={formValues.name?.length || 0}
          maxValue={150}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* Main Image */}
      <div className="mt-10">
        <h3 className="text-[#000929] text-xl font-medium capitalize mb-3">
          Main Image
        </h3>
        <div className="relative w-full min-h-[200px] max-h-[300px] overflow-y-hidden rounded-[16px] bg-white shadow-md shadow-[#000000]/35 p-4">
          {primaryFile && primaryFileUrl ? (
            <MediaPreview
              src={primaryFileUrl}
              onClick={() => setExpandedOtherFile(primaryFileUrl)}
              onDelete={() => onImageDelete('primary', 0)}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="col-span-3 flex items-center justify-center h-full">
              <p className="text-gray-400">Add the main image</p>
            </div>
          )}
        </div>
        <NumberLabel
          minValue={primaryFile ? 1 : 0}
          maxValue={1}
          className="w-fit text-[0.75rem] ml-auto mt-2"
        />
      </div>

      {/* Other Files */}
      <div className="mt-10">
        <h3 className="text-[#000929] text-xl font-medium capitalize mb-3">
          Other files
        </h3>
        <div className="relative w-full min-h-[200px] max-h-[350px] overflow-y-auto rounded-[16px] bg-white shadow-md shadow-[#000000]/35 p-4">
          <div className="grid grid-cols-[repeat(3,_minmax(0,_150px))] gap-4">
            {otherFiles && otherFiles.length > 0 ? (
              otherFiles.map((file, index) => (
                <MediaPreview
                  key={index}
                  src={otherFileUrls[index]}
                  onClick={() => setExpandedOtherFile(otherFileUrls[index])}
                  onDelete={() => onImageDelete('other', index)}
                  isSubmitting={isSubmitting}
                />
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center h-full">
                <p className="text-gray-400">Add up to 7 images</p>
              </div>
            )}
          </div>
        </div>
        <NumberLabel
          minValue={otherFiles && otherFiles.length}
          maxValue={7}
          className="w-fit text-[0.75rem] ml-auto mt-2"
        />
      </div>

      {/* Price */}
      <div className="capitalize flex items-center text-xl space-x-3 mt-10">
        <h3 className="text-[#000929] text-xl font-medium">price</h3>
        <div className="flex items-center space-x-px">
          <span className="flex items-center line-through decoration-double">
            N
          </span>
          <span>
            {useNumberWithCommas(formValues.price?.toString() || '0')}
          </span>
        </div>
      </div>

      {/* Land size */}
      <div className="capitalize flex items-center text-xl space-x-3 mt-10">
        <h3 className="text-[#000929] text-xl font-medium">room size</h3>
        <div className="flex items-center space-x-px">
          <Input
            value={formValues.landSize}
            disabled
            className="read-only flex items-center mr-1"
          />
          <span className="text-base">
            m<sup className="sups">2</sup>
          </span>
        </div>
      </div>

      {/* Duration, Building Type */}
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium">Duration</h3>
          <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 capitalize">
            {formValues.rentDuration}{' '}
            {formValues.rentDuration === 1 ? 'Year' : 'Years'}
          </div>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium capitalize">
            Building Type
          </h3>
          <div className="capitalize mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3">
            {formValues.propertyType}
          </div>
        </div>
      </div>

      {/* Beds, Baths */}
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium">Beds</h3>
          <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 capitalize">
            {formValues.beds} {formValues.beds === '1' ? 'bed' : 'beds'}
          </div>
        </div>

        <div className="mt-10 w-full">
          <h3 className="text-[#000929] text-xl font-medium">Baths</h3>
          <div className="mt-1 block w-fit rounded-md border border-gray-300 bg-[#F7F7F7] py-2 px-3 capitalize">
            {formValues.baths} {formValues.baths === '1' ? 'bath' : 'baths'}
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-10 w-full">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          amenities
        </h3>
        <div className="flex items-center flex-wrap gap-2 text-sm">
          {formValues.amenities?.map((amenity) => (
            <span
              key={amenity}
              className="mt-1 rounded-md border border-[#E6E6E6] bg-[#F7F7F7] py-2 px-3"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Address */}
      <div className="mt-10 w-full relative">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          address
        </h3>
        <Input
          value={formValues.address}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />
        <NumberLabel
          minValue={formValues.address?.length || 0}
          maxValue={150}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* Location */}
      <div className="mt-10 w-full relative">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          location
        </h3>
        <Input
          value={formValues.location}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />
        <NumberLabel
          minValue={formValues.location?.length || 0}
          maxValue={150}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* Description */}
      <div className="mt-10 w-full relative">
        <h3 className="text-[#000929] text-xl font-medium capitalize">
          description
        </h3>
        <Textarea
          value={formValues.description}
          disabled
          className="border border-[#E6E6E6] focus-visible:ring-0 focus-visible:outline-0 w-full"
        />
        <NumberLabel
          minValue={formValues.description?.length || 0}
          maxValue={1500}
          className="text-[0.75rem] w-fit mt-2"
        />
      </div>

      {/* Image Modal */}
      {expandedOtherFile && (
        <MediaModal
          expandedOtherFile={expandedOtherFile}
          setExpandedOtherFile={setExpandedOtherFile}
          files={otherFileUrls}
        />
      )}
    </aside>
  );
}
