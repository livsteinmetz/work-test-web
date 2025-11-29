export type ErrorResponse = {
  error: boolean;
  reason: string;
};

export interface FilterApi {
  id: string;
  name: string;
  image_url?: string | null;
  imageUrl?: string | null;
}

export interface RestaurantApi {
  id: string;
  name: string;
  rating: number;
  filter_ids: string[];
  image_url?: string | null;
  imageUrl?: string | null;
  delivery_time_minutes: number;
  price_range_id: string;
}

export type RestaurantsResponse = {
  restaurants: RestaurantApi[];
};

export type FiltersResponse = {
  filters: FilterApi[];
};

export type OpenStatus = {
  restaurant_id: string;
  is_currently_open: boolean;
};

export type PriceRange = {
  id: string;
  range: string;
};

export type Filter = {
  id: string;
  name: string;
  imageUrl: string;
};

export type Restaurant = {
  id: string;
  name: string;
  rating: number;
  filterIds: string[];
  imageUrl: string;
  deliveryTimeMinutes: number;
  priceRangeId: string;
};
