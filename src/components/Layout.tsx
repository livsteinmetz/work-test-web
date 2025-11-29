"use client";

import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="relative min-h-screen bg-offwhite flex">
      <div className="fixed top-6 left-6 z-50">
        <img
          src="/images/munchies-logo.png"
          alt="Munchies"
          className="h-6 md:h-10 w-auto"
        />
      </div>
      <div className="flex w-full pt-[144px] pb-16 gap-6 lg:px-[40px]">
        {children}
      </div>
    </div>
  );
}
