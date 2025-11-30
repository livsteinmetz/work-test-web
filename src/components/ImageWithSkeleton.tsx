"use client";

import React, { useState } from "react";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}

export function ImageWithSkeleton({
  src,
  alt,
  className = "",
  imgClassName = "",
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${!loaded || failed ? "relative" : ""} ${className}`}>
      {!loaded && !failed && <div className="absolute inset-0 animate-pulse" />}

      {!failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`
            transition-opacity duration-300
            ${loaded ? "opacity-100" : "opacity-0"}
            ${imgClassName}
          `}
        />
      )}

      {failed && null}
    </div>
  );
}
