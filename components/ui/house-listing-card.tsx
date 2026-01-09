'use client';

import Image from 'next/image';
import { CardContent, CardFooter, CardTitle } from './card';
import { Bath, BedDouble, Pencil, Trash2 } from 'lucide-react';
import PopularLabel from '../PopularLabel';
import Link from 'next/link';
import Naira from './naira';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function HouseListingCard({
  isAdmin,
  id,
  name,
  address,
  mainImage,
  additionalImages,
  rentDuration,
  beds,
  bathrooms,
  latitude,
  longitude,
  landSize,
  price,
  popular,
  description,
  createdAt,
  location,
  propertyType,
  amenities,
  postedBy,
  updatedAt
}: HouseListing) {
  const router = useRouter();

  const handleCardClick = () => {
    const cardDetails = {
      isAdmin,
      id,
      name,
      address,
      mainImage,
      additionalImages,
      rentDuration,
      beds,
      bathrooms,
      latitude,
      longitude,
      landSize,
      price,
      popular,
      description,
      createdAt,
      location,
      propertyType,
      amenities,
      postedBy,
      updatedAt
    };
    localStorage.setItem('selectedHouse', JSON.stringify(cardDetails));
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Prevent card click
    router.push(`/admin/property-management/edit-listing/${id}`);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Prevent card click

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this listing?'
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch('/api/delete-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Failed to delete the listing');
      }

      toast.success('Listing deleted successfully!');
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Error deleting listing. Please try again.');
    }
  };

  return (
    <Link
      href={`/product-details/${id}`}
      passHref
      className="w-full max-w-[400px] rounded-lg shadow-md relative cursor-pointer group"
      onClick={handleCardClick}
    >
      {popular && (
        <PopularLabel
          text={popular}
          className="-ml-3 absolute z-[3] top-[40%]"
        />
      )}
      <div className="h-48 w-full rounded-t-lg overflow-hidden">
        <Image
          src={mainImage}
          width={352}
          height={200}
          sizes="(max-width: 640px) 100vw, 352px"
          loading="lazy"
          decoding="async"
          alt={`Image of a house located at ${address}.`}
          className="w-full object-cover h-full transition duration-150 ease-in-out group-hover:scale-[1.05]"
        />
        {isAdmin && (
          <div className="absolute top-2 right-2 flex space-x-2 z-5">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <CardContent className="mt-5 p-4 flex flex-col space-y-2">
        <div className="flex items-center">
          <p className="flex items-center text-2xl text-[#7065F0] font-[800] leading-9">
            <Naira /> {price.toLocaleString()}
            <span className="ml-1 text-[#000929] text-[1rem] font-[400]">
              / year
            </span>
          </p>
        </div>
        <CardTitle className="text-2xl font-[700] -tracking-[1px] leading-9">
          {name}
        </CardTitle>
        <p className="text-gray-500 text-sm">{address}</p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="bg-[#F0EFFB] h-[1.5px]"></div>
        <div className="w-full flex justify-between items-center text-gray-700">
          <div className="flex items-center space-x-1">
            <BedDouble className="w-5 h-5 text-[#7065F0]" />
            <span className="capitalize">
              {beds} {beds > 1 ? 'Beds' : 'Bed'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Bath className="w-5 h-5 text-[#7065F0]" />
            <span className="capitalize">
              {bathrooms} {bathrooms > 1 ? 'Baths' : 'Bath'}
            </span>
          </div>
        </div>
      </CardFooter>
    </Link>
  );
}
