"use client";

import type { Filter } from "../types/api";
import { Card } from "./Card";
import { ImageWithSkeleton } from "./ImageWithSkeleton";

interface Props {
  filters: Filter[];
  selectedFilterIds: string[];
  toggleFilter: (id: string) => void;
}

export function TopFilterBar({
  filters,
  selectedFilterIds,
  toggleFilter,
}: Props) {
  return (
    <div className="w-full bg-offwhite px-6 py-4 md:pt-12 overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {filters.map((f) => {
          const active = selectedFilterIds.includes(f.id);

          return (
            <Card
              key={f.id}
              className={[
                "relative w-[160px] h-[80px] flex-shrink-0 cursor-pointer transition",
                active
                  ? "bg-selected text-white border-selected"
                  : "bg-surface text-foreground",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => toggleFilter(f.id)}
                className="relative h-full w-full bg-transparent text-left"
              >
                <span
                  className="
                    absolute
                    top-4 left-3
                    w-[77px]
                    text-[14px] font-normal tracking-[-0.5px]
                  "
                >
                  {f.name}
                </span>

                <ImageWithSkeleton
                  src={f.imageUrl}
                  alt={f.name}
                  className="
                    absolute
                    top-0 left-[90px]
                    h-[80px] w-[80px]
                    object-contain
                  "
                />
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
