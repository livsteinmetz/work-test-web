"use client";

import type { Filter } from "../types/api";
import { Card } from "./Card";

interface SidebarFiltersProps {
  filters: Filter[];
  selectedFilterIds: string[];
  toggleFilter: (id: string) => void;
  selectedDeliveryBuckets: string[];
  toggleDeliveryBucket: (bucketId: string) => void;
  priceRanges: string[];
  selectedPriceRanges: string[];
  togglePriceRange: (range: string) => void;
}

export const DELIVERY_OPTIONS = [
  { id: "0-10", label: "0-10 min" },
  { id: "10-30", label: "10-30 min" },
  { id: "30-60", label: "30-60 min" },
  { id: "60+", label: "1 hour+" },
];

export const SECTION_TITLE_CLASS =
  "uppercase text-[12px] font-semibold tracking-[-0.5px] text-black/40 mb-2";

export const CHIP_BASE_CLASS = [
  "inline-flex items-center justify-center",
  "min-w-fit h-[31px]",
  "rounded-[8px] border-[0.6px]",
  "px-3 py-2",
  "tracking-[-0.5px]",
  "transition",
].join(" ");

export const CHIP_ACTIVE_CLASS = "bg-selected text-white border-black";
export const CHIP_INACTIVE_CLASS = "bg-surface text-black border-[#0000001A]";

export function SidebarFilters({
  filters,
  selectedFilterIds,
  toggleFilter,
  selectedDeliveryBuckets,
  toggleDeliveryBucket,
  priceRanges,
  selectedPriceRanges,
  togglePriceRange,
}: SidebarFiltersProps) {
  return (
    <aside className="hidden lg:block w-[239px] py-4 pt-12">
      <Card className="h-[764px] rounded-[10px] flex flex-col gap-8 p-6">
        {/* Title */}
        <h2 className="text-[24px] font-normal tracking-[-0.5px] mb-2">
          Filter
        </h2>

        {/* FOOD CATEGORY */}
        <div>
          <h3 className={SECTION_TITLE_CLASS}>Food category</h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const active = selectedFilterIds.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggleFilter(f.id)}
                  className={[
                    CHIP_BASE_CLASS,
                    "text-[14px]",
                    active ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS,
                  ].join(" ")}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* DELIVERY TIME */}
        <div>
          <h3 className={SECTION_TITLE_CLASS}>Delivery time</h3>
          <div className="flex flex-wrap gap-2">
            {DELIVERY_OPTIONS.map((opt) => {
              const active = selectedDeliveryBuckets.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => toggleDeliveryBucket(opt.id)}
                  className={[
                    CHIP_BASE_CLASS,
                    "text-[12px]",
                    active ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS,
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* PRICE RANGE */}
        <div>
          <h3 className={SECTION_TITLE_CLASS}>Price range</h3>
          <div className="flex flex-wrap gap-2">
            {priceRanges.map((range) => {
              const active = selectedPriceRanges.includes(range);
              return (
                <button
                  key={range}
                  onClick={() => togglePriceRange(range)}
                  className={[
                    CHIP_BASE_CLASS,
                    "text-[12px]",
                    active ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS,
                  ].join(" ")}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>
      </Card>
    </aside>
  );
}
