'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { navbarMenu, navbarMenuAuth } from '@/config/navMenu';
import Image from 'next/image';
import Link from 'next/link';
import DropdownMenu from '../DropdownMenu';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

import { Menu } from 'lucide-react';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden lg:block ">
        <div className=" mx-auto px-2 md:px-8 w-full flex items-center justify-between">
          {/* Left Section: Logo and Navigation Links */}
          <div className="">
            {/* Logo */}
            <Link href={'/'} className="flex-shrink-0">
              <Image
                src={'/logo/LeftNav.png'}
                alt="EzyRent logo"
                priority
                width={134}
                height={40}
                className="w-[134px] h-[40px]"
              />
            </Link>
          </div>
          <div className="capitalize font-[500] leading-6 text-[#000929]">
            {/* Menu Links */}
            <div className="flex items-center space-x-12">
              {navbarMenu.map((item, index) => (
                <div key={item.label + index} className="relative">
                  {item.dropdown ? (
                    <DropdownMenu items={item.dropdown} label={item.label} />
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'hover:text-[#7065F0] transition-colors',
                        pathname === item.href && 'text-[#7065F0]'
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Authentication Links and menu */}
          <div className="">
            <div className="md:hidden">
              <Menu />
            </div>
            {/* nav auth */}
            <div className="flex items-center space-x-12 ml-auto">
              {navbarMenuAuth.map((navbarAuth, index) => (
                <Link key={navbarAuth.label + index} href={navbarAuth.href}>
                  <Button
                    variant={
                      navbarAuth.label === 'sign up' ? 'default' : 'ghost'
                    }
                    className={cn(
                      'capitalize h-10 transition-colors',
                      navbarAuth.label && 'border-[#7065F0] ',
                      navbarAuth.label === 'sign up'
                        ? 'rounded-full bg-[#7065F0]'
                        : 'hover:text-[#7065F0] transition-colors'
                    )}
                  >
                    {navbarAuth.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
