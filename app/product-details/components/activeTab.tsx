'use client';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import CopyToClipboard from '@/components/CopyToClipboard';
import Image from 'next/image';

import {
  ArrowUp,
  BadgeCheck,
  Bath,
  BedDouble,
  Diamond,
  Mail
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { MdWhatsapp } from 'react-icons/md';

const DynamicHouseMap = dynamic(() => import('@/components/HouseMap'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export const RenderActiveTabContent = ({
  activeTab,
  houseDetails,
  setOpenModal
}: {
  activeTab: string;
  houseDetails: HouseListing;
  setOpenModal: (openModal: boolean) => void;
}) => {
  if (!houseDetails.user) return; // if houseDetails is null
  const handleBook = () => {
    setOpenModal(true);
    window.scrollTo({ top: 90, behavior: 'smooth' });
  };
  switch (activeTab) {
    case 'location':
      return <DynamicHouseMap address={houseDetails?.address} />;

    case 'contact':
      return (
        <div className="!mt-10 space-y-4">
          <div className="flex space-x-4">
            <div className="rounded-full size-[60px]">
              <Image
                src={houseDetails.user.profilePicture || '/john-320x480.webp'}
                width={60}
                height={60}
                alt={`image of ${houseDetails.user?.firstName}`}
                className="rounded-full size-[60px] object-center"
              />
            </div>
            <div className="mb-5">
              <div className="flex items-center space-x-2">
                <p className="text-[#000929] font-medium text-base md:text-[1.5rem] lg:leading-[36px]">
                  {houseDetails.user.firstName} {houseDetails.user.lastName}
                </p>
                {/* {houseDetails.user.verified && ( */}
                <span>
                  <BadgeCheck size={24} fill="#7065F0" stroke="#fafafa" />
                </span>
                {/* )} */}
              </div>
              <div className="flex items-center space-x-2 text-[#000929] font-light lg:leading-[24px] text-sm">
                <span>{houseDetails.user.role || 'Landlord'}</span>
                <span>•</span>
                <span>{houseDetails.user.listings || 1} houses posted</span>
              </div>
            </div>
          </div>

          <Separator className="bg-[#E6E6E6]" />

          {/* Phone */}
          {/* {houseDetails.user.phone && ( */}
          <div className="!my-10 space-y-2 text-[#344054] w-full lg:w-[500px]">
            <div className="w-full flex items-center justify-between">
              <p className="flex items-center space-x-2">
                {/* <Phone size={16} stroke="#344054" /> */}
                <MdWhatsapp size={16} stroke="#344054" />
                {/* <span className="ml-2 text-base">{userInfo.phone}</span> */}
                <span className="ml-2 text-base">{'+234-7067-456-475'}</span>
              </p>
              {/* <CopyToClipboard textToCo"py={userInfo.phone} type="phone" /> */}
              <CopyToClipboard textToCopy={'+234-7067-456-475'} type="phone" />
            </div>
          </div>
          {/* )} */}

          {/* Email */}
          {houseDetails.user.email && (
            <div className="!my-10 space-y-2 text-[#344054] w-full lg:w-[500px]">
              <div className="w-full flex items-center justify-between">
                <p className="flex items-center space-x-2">
                  <Mail size={16} stroke="#344054" />
                  {/* <a href="mailto:ezyrent50@gmail.com" className="ml-2 text-base">{userInfo.email}</a> */}
                  <a
                    href={`mailto:ezyrent50@gmail.com?subject=Inquiry about ${houseDetails.name} at ${houseDetails.address}`}
                    className="ml-2 text-base"
                  >
                    <u>ezyrent50@gmail.com</u>
                  </a>
                </p>
                {/* <CopyToClipboard textToCopy={userInfo.email} type="email" /> */}
                <CopyToClipboard
                  textToCopy={'ezyrent50@gmail.com'}
                  type="email"
                />
              </div>
            </div>
          )}

          <Separator className="bg-[#E6E6E6]" />

          {/* Actions */}
          <div className="!mt-10 lg:!mt-5 flex flex-col space-y-4 md:flex-row md:space-y-0 md:items-center md:justify-between">
            <Button
              onClick={handleBook}
              className="bg-[#7065F0] h-[67px] rounded-[40px] py-3 px-12"
            >
              Book Now
              <ArrowUp className="rotate-[30deg]" />
            </Button>
            <a href="#">
              <Button
                variant="outline"
                className="border-[#7065F0] h-[67px] px-12 py-3 rounded-[40px] text-[#7065F0]"
              >
                Schedule Tour
                <ArrowUp className="rotate-[30deg]" />
              </Button>
            </a>
          </div>
        </div>
      );
    default:
      return (
        <>
          <p className="text-[#212121] text-sm md:text-[1.1rem] font-normal leading-[30.4px]">
            {houseDetails?.description}
          </p>
          <div className="w-full flex justify-between items-center text-gray-700 mt-auto">
            <div className="flex items-center space-x-1">
              <BedDouble className="w-5 h-5 text-[#7065F0]" />
              <span className="capitalize">
                {houseDetails?.beds ?? 0}{' '}
                {houseDetails?.beds === 1 ? 'Bed' : 'Beds'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Bath className="w-5 h-5 text-[#7065F0]" />
              <span className="capitalize">
                {houseDetails?.bathrooms ?? 0}{' '}
                {houseDetails?.bathrooms === 1 ? 'Bath' : 'Baths'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Diamond className="w-5 h-5 text-[#7065F0]" />
              <span>{houseDetails?.landSize}</span>
            </div>
          </div>
        </>
      );
  }
};
