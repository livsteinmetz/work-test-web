import {
  FiltersResponse,
  FilterApi,
  RestaurantApi,
  RestaurantsResponse,
  Filter,
  Restaurant,
  PriceRange,
  OpenStatus,
} from "../types/api";

const API_ORIGIN = "https://work-test-web-2024-eze6j4scpq-lz.a.run.app";
const BASE_URL = `${API_ORIGIN}/api`;

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("API Error:", res.status, text);
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}

function resolveImageUrl(raw: string | undefined | null): string {
  if (!raw) return "";

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  if (raw.startsWith("/")) {
    return `${API_ORIGIN}${raw}`;
  }

  return `${API_ORIGIN}/${raw}`;
}

function mapFilter(api: FilterApi): Filter {
  const rawImage = api.image_url ?? api.imageUrl ?? undefined;

  return {
    id: api.id,
    name: api.name,
    imageUrl: resolveImageUrl(rawImage),
  };
}

function mapRestaurant(api: RestaurantApi): Restaurant {
  const rawImage = api.image_url ?? api.imageUrl ?? undefined;

  return {
    id: api.id,
    name: api.name,
    rating: api.rating,
    filterIds: api.filter_ids,
    imageUrl: resolveImageUrl(rawImage),
    deliveryTimeMinutes: api.delivery_time_minutes,
    priceRangeId: api.price_range_id,
  };
}

export const Api = {
  async getRestaurants(): Promise<Restaurant[]> {
    const data = await getJson<RestaurantsResponse>("/restaurants");
    return data.restaurants.map(mapRestaurant);
  },

  async getFilters(): Promise<Filter[]> {
    const data = await getJson<FiltersResponse>("/filter");
    return data.filters.map(mapFilter);
  },

  async getOpenStatus(restaurantId: string): Promise<OpenStatus> {
    return getJson<OpenStatus>(`/open/${restaurantId}`);
  },

  async getPriceRange(priceRangeId: string): Promise<PriceRange> {
    return getJson<PriceRange>(`/price-range/${priceRangeId}`);
  },
};
