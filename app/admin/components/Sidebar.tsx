'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siderbarItems } from '../constants';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, X } from 'lucide-react';
import { useWindowResizer } from '@/hooks/useWindowResizer';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SidebarPropsType {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

export default function Sidebar({
  setIsMobileMenuOpen,
  isMobileMenuOpen
}: SidebarPropsType) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const { windowWidth } = useWindowResizer();
  const router = useRouter();

  useEffect(() => {
    menuRefs.current = new Array(siderbarItems.length + 2).fill(null);
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement | HTMLButtonElement>,
    index: number
  ) => {
    const keys = ['ArrowDown', 'ArrowUp', 'Enter'];
    if (!keys.includes(event.key)) return;

    const maxIndex = siderbarItems.length + 2;

    if (event.key === 'Enter') {
      event.currentTarget.click();
      return;
    }

    event.preventDefault();
    const nextIndex =
      event.key === 'ArrowDown'
        ? (index + 1) % maxIndex
        : (index - 1 + maxIndex) % maxIndex;

    const nextElement = menuRefs.current[nextIndex];
    if (nextElement) {
      nextElement.focus();
    }
  };

  // Custom link styles
  const getItemStyles = (
    isActive: boolean,
    isLinkHovered: boolean,
    isSidebarHovered?: boolean
  ) => {
    return `
      ${isActive || isLinkHovered ? 'bg-[#7065F0] text-white' : 'text-[#000929] hover:text-[#7065F0]'} 
      ${windowWidth < 1024 || isSidebarHovered ? 'rounded-[8px]' : ''} 
      my-5 flex items-center font-medium text-[1.125rem] px-4 py-3 w-fit transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7065F0] focus:ring-offset-2
    `;
  };

  // logout
  const handleLogout = async () => {
    try {
      // Ask for confirmation before logging out
      const userConfirmed = confirm('Do you want to logout?');

      if (userConfirmed) {
        const response = await fetch('/api/logout', { method: 'GET' });

        if (response.ok) {
          // Show a success message
          toast.success('You have logged out successfully.');

          // Redirect the user to the home or login page
          router.push('/');
        } else {
          const data = await response.json();
          console.error('Logout failed:', data.message);
          toast.error('Failed to log out. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseEnter={() => windowWidth >= 1024 && setIsSidebarHovered(true)}
        onMouseLeave={() => windowWidth >= 1024 && setIsSidebarHovered(false)}
        className={`fixed lg:sticky flex flex-col items-center top-0 z-20 h-screen bg-white border-r shadow-md
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'left-0' : '-left-full'}
          lg:left-0
          ${windowWidth < 1024 || isSidebarHovered ? 'w-60' : 'w-16'}
          flex flex-col overflow-y-auto custom-scrollbar`}
        role="navigation"
        aria-label="Main Sidebar"
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          className="lg:hidden absolute top-10 right-4 z-50 p-2 rounded-md bg-white shadow-md"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="size-6" />
        </Button>

        {/* Logo Section */}
        <div
          className={`${windowWidth < 1024 || isSidebarHovered ? 'pl-8' : 'pl-5'} sticky top-0 w-full flex items-center bg-white py-12 z-40`}
        >
          <div className="w-fit">
            <Link href="/admin/dashboard" aria-label="Go to homepage">
              {windowWidth < 1024 || isSidebarHovered ? (
                windowWidth >= 1024 ? (
                  <Image
                    src="/logo/LeftNav.png"
                    width={117}
                    height={32}
                    alt="EzyRent Logo"
                  />
                ) : (
                  <Image
                    src="/logo/LeftNav.png"
                    width={117}
                    height={32}
                    alt="EzyRent Logo"
                    className="!w-[120px]"
                  />
                )
              ) : (
                <Image
                  src="/logo/Logo.png"
                  width={30}
                  height={30}
                  alt="EzyRent Logo"
                />
              )}
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="w-[200px] mx-auto flex-1">
          <ul role="menu">
            {siderbarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              const isLinkHovered = hoveredItem === index;

              return (
                <li key={item.title} role="menuitem">
                  <Link
                    href={item.href}
                    className={getItemStyles(
                      isActive,
                      isLinkHovered,
                      windowWidth < 1024 || isSidebarHovered
                    )}
                    aria-label={`Navigate to ${item.title}`}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                    ref={(el) => {
                      menuRefs.current[index] = el;
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                  >
                    <div className="w-10">
                      <Icon
                        className={`size-6 transition-transform duration-300 ${
                          windowWidth < 1024 || isSidebarHovered
                            ? 'scale-100'
                            : 'scale-100'
                        }`}
                      />
                    </div>
                    <span
                      className={`capitalize whitespace-nowrap overflow-hidden transition-all duration-300 ${
                        windowWidth < 1024 || isSidebarHovered
                          ? 'w-auto opacity-100'
                          : 'w-0 opacity-0'
                      }`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}

            {/* Settings Link */}
            <li role="menuitem" className="mt-20">
              <Link
                href="/settings"
                className={getItemStyles(
                  pathname === '/settings',
                  hoveredItem === -1,
                  windowWidth < 1024 || isSidebarHovered
                )}
                aria-label="Navigate to Settings"
                aria-current={pathname === '/settings' ? 'page' : undefined}
                onMouseEnter={() => setHoveredItem(-1)}
                onMouseLeave={() => setHoveredItem(null)}
                ref={(el) => {
                  if (el) {
                    menuRefs.current[siderbarItems.length] = el;
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, siderbarItems.length)}
              >
                <div className="w-10">
                  <Settings className="size-6" />
                </div>
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                    windowWidth < 1024 || isSidebarHovered
                      ? 'w-auto opacity-100'
                      : 'w-0 opacity-0'
                  }`}
                >
                  Settings
                </span>
              </Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-5">
            <Button
              variant="ghost"
              className={`text-red-500 hover:bg-red-50 my-5 flex items-center font-medium text-[1.125rem] px-4 py-3 w-fit transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1`}
              aria-label="Logout"
              onClick={handleLogout}
              ref={(el) => {
                if (el) {
                  menuRefs.current[siderbarItems.length + 1] =
                    el as unknown as HTMLAnchorElement;
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, siderbarItems.length + 1)}
            >
              <div className="w-10">
                <LogOut className="size-6" />
              </div>
              <span
                className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                  windowWidth < 1024 || isSidebarHovered
                    ? 'w-auto opacity-100'
                    : 'w-0 opacity-0'
                }`}
              >
                Logout
              </span>
            </Button>
          </div>
        </nav>
      </aside>
    </>
  );
}
