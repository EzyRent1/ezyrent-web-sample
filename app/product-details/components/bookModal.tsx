'use client';

import MaxWidthWrapper from '@/app/maxWidthWrapper';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import React, { useEffect, useState } from 'react';
import { MdWhatsapp } from 'react-icons/md';
import { IconType } from 'react-icons/lib';

interface costumerCare {
  label: string;
  icon: string | IconType;
  title: string;
  placeholder: string;
}

interface socialMedia {
  label: string;
  icon: string;
  title: string;
  placeholder: string;
  href: string;
}

const costumerCare: costumerCare[] = [
  {
    label: 'phone',
    icon: MdWhatsapp,
    title: 'WhatsApp Number',
    placeholder: '+234-7067-456-475'
  },
  {
    label: 'email',
    icon: 'email.svg',
    title: 'Email Address',
    placeholder: 'info@ezyrent.org'
  }
];

const socialMedia: socialMedia[] = [
  {
    label: 'instagram',
    icon: 'instagram.svg',
    title: 'Instagram',
    href: 'https://www.instagram.com/ezy_rent_hq?igsh=MWN3cXBtNHY1dzFvZA==',
    placeholder: '@ezy_rent_hq'
  },
  {
    label: 'twitter',
    icon: 'TwitterX.svg',
    title: 'X',
    href: 'https://x.com/ezy_rent',
    placeholder: '@ezy_rent'
  },
  {
    label: 'facebook',
    icon: 'facebook.svg',
    title: 'Facebook',
    href: 'https://www.facebook.com/share/1HGaec4Hkb/?mibextid=LQQJ4d',
    placeholder: '@ezyrent'
  }
];

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => alert('Text copied to clipboard!'))
    .catch(() => alert('Failed to copy text.'));
};

export default function ContactModal({
  openModal,
  setOpenModal
}: {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!openModal || !mounted) return null;

  return createPortal(
    <section className=" pt-10 bg-black   bg-opacity-70 flex justify-center items-center z-100 inset-0 ">
      <MaxWidthWrapper className=" max-w-[90%] md:max-w-[880px]  bg-[#FFFFFF] p-6  md:p-[80px] mb-10 rounded-[60px]">
        <button
          onClick={() => setOpenModal(false)}
          className="hover:text-gray-600 w-full font-bold mt-2 text-xl text-[#7065F0] flex justify-end items-end"
        >
          <svg
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            />
          </svg>
        </button>
        <div className="text-center flex flex-col justify-between mb-16">
          <h1 className="text-[#000929] text-[20px]  md:text-[32px]  font-bold">
            Customer Service!
          </h1>
          <p className="text-[#667085] text-[16px] md:text-[20px]">
            You can get in touch with us through below platforms.
          </p>
          <p className="text-[#667085] text-[16px] md:text-[20px]">
            Our Team will reach out to you as soon as possible!
          </p>
        </div>
        <div className="flex-col md:flex md:flex-row  justify-between md:gap-10 md:px-10">
          <div>
            <h2 className="text-[#475467]  text-[16px] mb-3">Customer Care</h2>
            {costumerCare.map((item, index) => (
              <div key={index} className="flex  items-center gap-5 mb-4">
                <div className="flex w-[200px] items-center gap-4">
                  {item.icon && typeof item.icon === 'string' ? (
                    <Image
                      className="w-8 h-8 object-contain"
                      src={`/social-icon/modal/${item.icon}`}
                      width={24}
                      height={24}
                      alt={`${item.label} svg`}
                    />
                  ) : (
                    <item.icon className="w-8 h-8" />
                  )}

                  <div className="text-[14px]">
                    <p className="text-[#98A2B3]">{item.title}</p>
                    <p className="text-[#101828] font-semibold">
                      {item.placeholder}
                    </p>
                  </div>
                </div>
                <Image
                  onClick={() => copyToClipboard(item.placeholder)}
                  className="w-5 h-5 object-contain cursor-pointer"
                  src="/social-icon/modal/copy.svg"
                  width={24}
                  height={24}
                  alt={`copy ${item.label}`}
                />
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-[#475467] text-[16px]  mb-3">Social Media</h2>
            {socialMedia.map((item, index) => (
              <div key={index} className="flex items-center gap-10 mb-4">
                <div className="flex items-center md:gap-4 gap-6 mr-4">
                  <Image
                    className="w-6 h-6 md:w-8 md:h-8 object-contain"
                    src={`/social-icon/modal/${item.icon}`}
                    width={24}
                    height={24}
                    alt={`${item.label} svg`}
                  />
                  <div className="text-[14px]">
                    <p className="text-[#98A2B3]">{item.title}</p>
                    <p className="text-[#101828] font-semibold">
                      {item.placeholder}
                    </p>
                  </div>
                </div>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    className="w-5 h-5 object-contain cursor-pointer self-end"
                    src="/social-icon/modal/link.svg"
                    width={24}
                    height={24}
                    alt={`copy ${item.label}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>,
    document.body
  );
}
