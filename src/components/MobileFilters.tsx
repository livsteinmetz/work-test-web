"use client";

import {
  DELIVERY_OPTIONS,
  SECTION_TITLE_CLASS,
  CHIP_BASE_CLASS,
  CHIP_ACTIVE_CLASS,
  CHIP_INACTIVE_CLASS,
} from "./SidebarFilters";

interface MobileDeliveryFilterBarProps {
  selectedDeliveryBuckets: string[];
  toggleDeliveryBucket: (bucketId: string) => void;
}

export function MobileDeliveryFilterBar({
  selectedDeliveryBuckets,
  toggleDeliveryBucket,
}: MobileDeliveryFilterBarProps) {
  return (
    // Mobile-only
    <section className="lg:hidden px-6 pt-4 pb-2 bg-offwhite">
      <h3 className={`${SECTION_TITLE_CLASS} mb-3`}>Delivery time</h3>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1">
        {DELIVERY_OPTIONS.map((opt) => {
          const active = selectedDeliveryBuckets.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => toggleDeliveryBucket(opt.id)}
              className={[
                CHIP_BASE_CLASS,
                "text-[12px]",
                // make chips stay on one line in the horizontal scroll
                "shrink-0",
                active ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS,
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
