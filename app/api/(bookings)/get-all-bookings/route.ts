import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

interface Booking {
  id: string;
  userId: string;
  propertyId: string;
  paymentId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  tourDate: string;
  tourTime: string;
  tourType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    data: Booking[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('ezyrent_auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);

    const statusFilter = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'tourDate';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? 'desc' : 'asc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/bookings`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const { data: bookingsData }: ApiResponse = await response.json();
    let bookings = bookingsData.data;

    if (!Array.isArray(bookings)) {
      return NextResponse.json(
        { success: false, message: 'Invalid booking data' },
        { status: 500 }
      );
    }

    // 1. Filter by status (optional)
    if (statusFilter) {
      bookings = bookings.filter((b) => b.status === statusFilter);
    }

    // 2. Sort
    bookings.sort((a, b) => {
      const aValue = new Date(a[sortBy as keyof Booking] as string).getTime();
      const bValue = new Date(b[sortBy as keyof Booking] as string).getTime();
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    const totalCount = bookings.length;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    // 3. Paginate
    const start = (page - 1) * limit;
    const paginatedBookings = bookings.slice(start, start + limit);

    // 4. Enrich with property address
    const propertyCache = new Map<string, string>();

    const bookingsWithProperties = await Promise.all(
      paginatedBookings.map(async (item: Booking) => {
        if (!propertyCache.has(item.propertyId)) {
          const propertyRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${item.propertyId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );

          if (!propertyRes.ok) {
            throw new Error(
              `Property API responded with status: ${propertyRes.status}`
            );
          }

          const propertyResJson = await propertyRes.json();
          const location = propertyResJson?.data?.location;
          propertyCache.set(item.propertyId, location || '');
        }

        return {
          ...item,
          propertyAddress: propertyCache.get(item.propertyId)
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: {
        data: bookingsWithProperties,
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
