// BAR API using Langame
import { API_TOKEN, BASE_URL } from '@/app/lib/langame';

export interface LangameBarItem {
    id: number;
    name: string;
    price: number;
    stock: number;
    category?: string;
}

export async function getBarItems(): Promise<LangameBarItem[]> {
    if (!API_TOKEN || !BASE_URL) {
        console.error('[Langame] Missing API configuration');
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}/bar/items?page=1&page_limit=100`, {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_TOKEN
            },
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            throw new Error(`Langame API error: ${response.status}`);
        }

        const data = await response.json();

        // Parse response structure (adjust based on actual API response)
        const items = Array.isArray(data) ? data : data.data || [];

        return items
            .filter((item: any) => item.stock > 0) // Only available items
            .map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                stock: item.stock,
                category: item.category || 'Напитки'
            }));
    } catch (error) {
        console.error('[Langame] Failed to fetch bar items:', error);
        return [];
    }
}

export async function reserveBarItem(itemId: number): Promise<boolean> {
    if (!API_TOKEN || !BASE_URL) return false;

    try {
        const response = await fetch(`${BASE_URL}/bar/reserve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': API_TOKEN
            },
            body: JSON.stringify({ item_id: itemId })
        });

        return response.ok;
    } catch (error) {
        console.error('[Langame] Failed to reserve item:', error);
        return false;
    }
}
