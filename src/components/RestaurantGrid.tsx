import { RestaurantCard } from "./RestaurantCard";
import type { Restaurant } from "../types/api";

interface Props {
  restaurants: Restaurant[];
  openStatusMap: Record<string, boolean>;
}

export function RestaurantGrid({
  restaurants = [],
  openStatusMap = {},
}: Props) {
  const hasRestaurants = restaurants.length > 0;

  return (
    <div className="w-full px-4 pb-12 sm:px-6">
      {hasRestaurants ? (
        <div
          className="
          grid gap-6
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
        "
        >
          {restaurants.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              isOpen={openStatusMap[r.id]}
            />
          ))}
        </div>
      ) : (
        <p className="text-[14px] text-black/60">
          Oops! No restaurants to show right now. Check back later.
        </p>
      )}
    </div>
  );
}
