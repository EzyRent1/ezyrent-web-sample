import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import UserPage from '../../components/users/userDetails';
import { cookies } from 'next/headers';

function LoadingSkeleton() {
  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 animate-pulse">
      <div className="h-6 bg-gray-300 mb-4 rounded"></div>
      <div className="h-4 bg-gray-300 mb-2 rounded"></div>
      <div className="h-5 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}

async function getUserById(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const cookieStore = await cookies();
  const token = cookieStore.get('ezyrent_auth_token')?.value;

  const res = await fetch(`${baseUrl}/admin/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) {
    // Handle different error scenarios

    if (res.status === 404) {
      return null;
    }

    throw new Error('Failed to fetch user');
  }
  const data = await res.json();
  return data;
}

async function UserDetails({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  if (!id) {
    console.error('User ID is not provided');
    return notFound(); // Shows 404 page if ID is not provided
  }
  const data = await getUserById(id);
  if (!data) {
    console.error(`User with ID ${id} not found`);
    return notFound(); // Shows 404 page if user not found
  }

  const user = data.data;

  return <UserPage user={user} />;
}

// Page Component
export default function UserDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <UserDetails params={params} />
    </Suspense>
  );
}
