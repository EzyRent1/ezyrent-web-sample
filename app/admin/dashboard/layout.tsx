import { generateMetadata } from '@/lib/metadata';
import React from 'react';

export const metadata = generateMetadata({
  title: 'Admin Dashboard',
  description: 'Manage users and properties',
  path: '/admin/dashboard'
});
export default function AdminDashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <section className="w-full">{children}</section>;
}
