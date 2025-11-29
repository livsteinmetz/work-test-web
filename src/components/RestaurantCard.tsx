"use client";

import type { Restaurant } from "../types/api";
import { Card } from "./Card";

interface Props {
  restaurant: Restaurant;
  isOpen?: boolean;
}

export function RestaurantCard({ restaurant, isOpen }: Props) {
  const closed = isOpen === false;

  return (
    <Card
      className={[
        "relative flex flex-col justify-between",
        "p-4",
        "min-h-[202px]",
        closed ? "opacity-60" : "",
      ].join(" ")}
    >
      <div className="mb-6 flex h-[28px] w-[142px] items-center gap-2">
        <span
          className={[
            "inline-flex items-center gap-1",
            "h-[28px] min-w-[63px]",
            "rounded-[88px] border-[0.6px] border-[#0000001A]",
            "pl-[10px] pr-3 py-2",
            "text-[12px] tracking-[-0.5px]",
            "bg-surface",
            "shadow-[-4px_2px_10px_0px_#00000003,-16px_9px_18px_0px_#00000003]",
            closed ? "text-muted" : "text-foreground",
          ].join(" ")}
        >
          <span
            className={
              "h-2 w-2 rounded-full " + (closed ? "bg-[#000000]" : "bg-action")
            }
          />
          {closed ? "Closed" : "Open"}
          {/* To do: add in Opens ____ at ____ message and disabled state. Currently only get boolean open true/false state from api */}
        </span>

        <span
          className={[
            "inline-flex items-center",
            "h-[28px] min-w-[63px]",
            "rounded-[88px] border-[0.6px] border-[#0000001A]",
            "px-3 py-2",
            "text-[12px] tracking-[-0.5px]",
            "bg-surface text-foreground",
            "shadow-[-4px_2px_10px_0px_#00000003,-16px_9px_18px_0px_#00000003]",
          ].join(" ")}
        >
          {restaurant.deliveryTimeMinutes} min
        </span>
      </div>
      {/* To do: add in loading state and fallback for images */}
      <img
        src={restaurant.imageUrl}
        alt=""
        className="
          absolute
          pointer-events-none
          object-contain
          h-[140px] w-[140px] -top-8 -right-8
        "
      />

      <div className="flex items-end justify-between mt-auto pt-4 gap-3">
        <h3 className="text-[20px] md:text-[24px] font-normal tracking-[-0.5px]">
          {restaurant.name}
        </h3>

        <button className="h-[32px] w-[32px] rounded-full bg-action text-white flex items-center justify-center flex-shrink-0">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3672 4.6875C11.3672 4.86458 11.2943 5.02083 11.1484 5.15625L7.11719 9.17969C6.98177 9.3099 6.82812 9.375 6.65625 9.375C6.48438 9.375 6.33854 9.31771 6.21875 9.20312C6.10417 9.08854 6.04688 8.94271 6.04688 8.76562C6.04688 8.68229 6.0599 8.60156 6.08594 8.52344C6.11719 8.44531 6.16146 8.38021 6.21875 8.32812L7.29688 7.21094L9.9375 4.83594L10.0781 5.17188L8 5.32031H0.625C0.4375 5.32031 0.286458 5.26042 0.171875 5.14062C0.0572917 5.02083 0 4.86979 0 4.6875C0 4.50521 0.0572917 4.35417 0.171875 4.23438C0.286458 4.11458 0.4375 4.05469 0.625 4.05469H8L10.0781 4.20312L9.9375 4.54688L7.29688 2.16406L6.21875 1.04688C6.16146 0.994792 6.11719 0.929688 6.08594 0.851562C6.0599 0.773438 6.04688 0.692708 6.04688 0.609375C6.04688 0.432292 6.10417 0.286458 6.21875 0.171875C6.33854 0.0572917 6.48438 0 6.65625 0C6.82812 0 6.98177 0.0651042 7.11719 0.195312L11.1484 4.21875C11.2943 4.35417 11.3672 4.51042 11.3672 4.6875Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </Card>
  );
}
