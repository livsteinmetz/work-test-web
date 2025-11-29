import { RestaurantCard } from "./RestaurantCard";
import type { Restaurant } from "../types/api";

interface Props {
  restaurants: Restaurant[];
  openStatusMap: Record<string, boolean>;
}

export function RestaurantGrid({ restaurants, openStatusMap }: Props) {
  return (
    <div className="w-full px-4 pb-12 sm:px-6">
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
    </div>
  );
}
