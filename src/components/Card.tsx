"use client";

import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={
        "bg-surface rounded-[8px] border-[0.6px] border-[#0000001A] " +
        "shadow-[-4px_2px_10px_0px_#00000003] " +
        "shadow-[-16px_9px_18px_0px_#00000003] " +
        "overflow-hidden " +
        className
      }
    >
      {children}
    </div>
  );
}
