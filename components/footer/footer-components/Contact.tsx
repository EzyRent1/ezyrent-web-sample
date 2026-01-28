import { cn } from '@/lib/utils';
import { Mail, Phone } from 'lucide-react';
import React, { ElementType } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

interface Contact {
  title: string;
  name: string;
  icon: ElementType;
}

const ContactItems: Contact[] = [
  // {
  //   title: 'address',
  //   name: '4234 Adetounbo Ademola str, Victoria Island, Lagos. ',
  //   icon: MapPin
  // },
  {
    title: 'phone 1',
    name: '+234-8127-518-838',
    icon: Phone
  },

  {
    title: 'phone 2',
    name: '+234-7067-456-475',
    icon: Phone
  },
  {
    title: 'whatsapp',
    name: 'https://wa.link/v7j5ie',
    icon: FaWhatsapp
  },
  {
    title: 'email',
    name: 'info@ezyrent.org',
    icon: Mail
  }
];

export default function Contact() {
  return (
    <div className="max-w-[300px] flex flex-col space-y-4">
      <p className="capitalize text-xl font-[500]">contacts</p>
      <div className="flex flex-col space-y-4">
        {ContactItems.map((item, index) => {
          const Icon = item.icon;
          const href = item.name.includes('@')
            ? `mailto:${item.name}`
            : item.name.match(/^\+?[\d\s-]+$/) // Allows digits, spaces, and dashes
              ? `tel:${item.name.replace(/[\s-]+/g, '')}` // Removes spaces and dashes for tel link
              : item.name; // Assume it's a URL or other link

          return (
            <a
              key={index}
              target={href.startsWith('http') ? '_blank' : undefined}
              href={href}
              className={cn(
                'w-fit grid grid-cols-[32px_1fr]    text-[#475467]',
                href
                  ? 'hover:text-opacity-65 transition-colors duration-150 ease-in-out'
                  : ''
              )}
              rel="noreferrer"
            >
              <Icon
                size={14}
                fill={'#475467'}
                stroke={'#f1f1f1'}
                className="h-5 w-5"
              />
              <span
                className={cn(
                  'w-full first-letter:capitalize text-sm md:text-base',
                  item.title !== 'email' && ' capitalize'
                )}
              >
                {item.name}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
