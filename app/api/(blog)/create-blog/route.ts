import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
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
    // Parse the incoming FormData
    const formData = await req.formData();

    // Make the API call to your backend with auth token
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific auth errors
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { success: false, message: 'Authentication failed' },
          { status: response.status }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: errorData.message || 'Failed to create blog post'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
