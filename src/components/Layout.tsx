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
          className="h-10 w-auto"
        />
      </div>

      <div className="flex w-full gap-10 px-[40px] pt-[144px] pb-16">
        {children}
      </div>
    </div>
  );
}
