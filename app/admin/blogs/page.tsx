'use client';
import React from 'react';
import DashboardLayout from '../components/Layouts';

import Blogs from '../components/blogs';
import { useRouter } from 'next/navigation';

export default function BlogsPage() {
  const router = useRouter();
  return (
    <DashboardLayout
      title="Blogs"
      btnTitle="Create Blog"
      handleClick={() => router.push('/admin/blogs/create-blog')}
    >
      <Blogs />
    </DashboardLayout>
  );
}
