import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export type RouteContext = { params: Promise<{ id: string }> };
export async function GET(_: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const token = cookieStore.get('ezyrent_auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!response.ok) {
      // Handle specific auth errors
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { success: false, message: 'Authentication failed' },
          { status: response.status }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch dashboard user' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('error fetching user:', error);
    return NextResponse.json(
      { message: 'Error fetching user', success: false },
      { status: 500 }
    );
  }
}
