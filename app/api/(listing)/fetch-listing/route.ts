import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get URL search params
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || '{}';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '1000000');
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    // Validate parameters
    if (page < 1) return new Response('Invalid page number', { status: 400 });
    if (limit < 1 || limit > 100)
      return new Response('Invalid limit value', { status: 400 });
    if (minPrice < 0 || maxPrice < 0 || minPrice > maxPrice)
      return new Response('Invalid price range', { status: 400 });

    // Parse filter JSON safely
    let parsedFilter;
    try {
      parsedFilter = JSON.parse(filter);
    } catch (error) {
      console.log('error parsing filter: ', error);
      return new Response('Invalid filter JSON', { status: 400 });
    }

    // Construct query parameters
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      // ...(minPrice >= 0 && { minPrice: minPrice.toString() }),
      // ...(maxPrice >= 0 && { maxPrice: maxPrice.toString() }),
      ...(sortBy && { sortBy }),
      ...(sortOrder && { sortOrder }),
      ...(latitude && { userLatitude: latitude }),
      ...(longitude && { userLongitude: longitude })
    });

    // Add parsed filters to query params
    for (const [key, value] of Object.entries(parsedFilter)) {
      queryParams.append(key, value as string);
    }

    const hasLocation = !!latitude && !!longitude;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/properties${hasLocation ? '/location' : ''}?${queryParams}`;

    // Fetch data from your API
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
