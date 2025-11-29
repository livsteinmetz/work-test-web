"use client";

import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-offwhite text-black">

      {/* Consistent Header */}
      <header className="w-full px-6 pt-12 flex items-center gap-2">
        <img
          src="/images/munchies-logo.png"
          alt="Munchies"
         className="h-6 md:h-10 w-auto"
        />
      </header>

      {/* Page Content */}
      <main className="flex w-full pb-16 gap-6 lg:px-[40px]">
        {children}
      </main>
    </div>
  );
}
