import { NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

const LANGAME_API_URL = 'https://cyberx165.langame-pr.ru/public_api/goods/list';
const API_KEY = '8aa9ebc8ca8a59b89929185b1ae9e848';
const CLUB_ID = 1;

export async function GET() {
  try {
    const response = await axios.get(LANGAME_API_URL, {
      params: {
        club_id: CLUB_ID,
      },
      headers: {
        'X-API-KEY': API_KEY,
      },
    });

    // Filter goods with count > 0 and sort/group them if needed
    // Assuming the API returns a list of items.
    const goods = response.data;

    // Check if the response is an array or has a specific structure
    // Since I can't see the exact response structure yet, I will assume it returns a list directly or in a 'data' field.
    // I'll return what I get, but filtering count > 0 is requested.

    let items = Array.isArray(goods) ? goods : (goods.data || []);

    if (Array.isArray(items)) {
       items = items.filter((item: any) => item.count > 0);
    }

    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Error fetching goods:', error.message);
    return NextResponse.json({ error: 'Failed to fetch goods' }, { status: 500 });
  }
}
