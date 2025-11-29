"use client";

import { useEffect, useMemo, useState } from "react";
import { Api } from "../lib/api";
import type { Restaurant, Filter } from "../types/api";

import { Layout } from "../components/Layout";
import { SidebarFilters } from "../components/SidebarFilters";
import { TopFilterBar } from "../components/TopFilterBar";
import { RestaurantGrid } from "../components/RestaurantGrid";

function getDeliveryBucket(minutes: number): string {
  if (minutes <= 10) return "0-10";
  if (minutes <= 30) return "10-30";
  if (minutes <= 60) return "30-60";
  return "60+";
}

export default function HomePage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>([]);

  const [selectedDeliveryBuckets, setSelectedDeliveryBuckets] = useState<
    string[]
  >([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const [priceRangeMap, setPriceRangeMap] = useState<Record<string, string>>(
    {},
  );
  const [openStatusMap, setOpenStatusMap] = useState<Record<string, boolean>>(
    {},
  );
  const [loading, setLoading] = useState(true);

  function toggleFilter(id: string) {
    setSelectedFilterIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleDeliveryBucket(bucketId: string) {
    setSelectedDeliveryBuckets((prev) =>
      prev.includes(bucketId)
        ? prev.filter((x) => x !== bucketId)
        : [...prev, bucketId],
    );
  }

  function togglePriceRange(range: string) {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((x) => x !== range) : [...prev, range],
    );
  }

  const priceRanges = useMemo(() => {
    const ranges = new Set<string>();
    Object.values(priceRangeMap).forEach((range) => {
      if (range) ranges.add(range);
    });
    return Array.from(ranges);
  }, [priceRangeMap]);

  const filteredRestaurants = useMemo(() => {
    let result = restaurants;

    if (selectedFilterIds.length > 0) {
      result = result.filter((r) =>
        r.filterIds.some((id) => selectedFilterIds.includes(id)),
      );
    }

    if (selectedDeliveryBuckets.length > 0) {
      result = result.filter((r) => {
        const bucket = getDeliveryBucket(r.deliveryTimeMinutes);
        return selectedDeliveryBuckets.includes(bucket);
      });
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter((r) => {
        const range = priceRangeMap[r.priceRangeId];
        if (!range) return false;
        return selectedPriceRanges.includes(range);
      });
    }

    return result;
  }, [
    restaurants,
    selectedFilterIds,
    selectedDeliveryBuckets,
    selectedPriceRanges,
    priceRangeMap,
  ]);

  useEffect(() => {
    async function load() {
      const [r, f] = await Promise.all([
        Api.getRestaurants(),
        Api.getFilters(),
      ]);
      setRestaurants(r);
      setFilters(f);
      setLoading(false);
    }

    load();
  }, []);

  useEffect(() => {
    if (restaurants.length === 0) return;

    let ignore = false;

    async function loadStatus() {
      const entries = await Promise.all(
        restaurants.map(async (r) => {
          try {
            const status = await Api.getOpenStatus(r.id);
            return [r.id, status.is_currently_open] as const;
          } catch {
            return [r.id, true] as const;
          }
        }),
      );

      if (!ignore) {
        setOpenStatusMap(Object.fromEntries(entries));
      }
    }

    loadStatus();

    return () => {
      ignore = true;
    };
  }, [restaurants]);

  useEffect(() => {
    if (restaurants.length === 0) return;

    let ignore = false;

    async function loadPriceRanges() {
      const uniqueIds = Array.from(
        new Set(restaurants.map((r) => r.priceRangeId)),
      );

      const entries = await Promise.all(
        uniqueIds.map(async (id) => {
          try {
            const pr = await Api.getPriceRange(id);
            return [id, pr.range] as const;
          } catch {
            return [id, ""] as const;
          }
        }),
      );

      if (!ignore) {
        setPriceRangeMap(Object.fromEntries(entries));
      }
    }

    loadPriceRanges();

    return () => {
      ignore = true;
    };
  }, [restaurants]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading…
      </main>
    );
  }

  return (
    <Layout>
      <SidebarFilters
        filters={filters}
        selectedFilterIds={selectedFilterIds}
        toggleFilter={toggleFilter}
        selectedDeliveryBuckets={selectedDeliveryBuckets}
        toggleDeliveryBucket={toggleDeliveryBucket}
        priceRanges={priceRanges}
        selectedPriceRanges={selectedPriceRanges}
        togglePriceRange={togglePriceRange}
      />

      <div className="flex-1 min-w-0">
        <TopFilterBar
          filters={filters}
          selectedFilterIds={selectedFilterIds}
          toggleFilter={toggleFilter}
        />

        <h2 className="px-6 mb-6 text-[40px] font-normal tracking-[-0.5px]">
          Restaurants
        </h2>
        <RestaurantGrid
          restaurants={filteredRestaurants}
          openStatusMap={openStatusMap}
        />
      </div>
    </Layout>
  );
}
