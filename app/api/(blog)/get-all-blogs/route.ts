import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('ezyrent_auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/all`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to fetch blogs'
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      {
        success: true,
        message: 'Blogs retrieved successfully',
        data: data.data
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
