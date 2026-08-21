"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageWithFallbackProps {
  src: string | null;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ProductImageWithFallback({
  src,
  alt,
  fill = true,
  priority = false,
  className,
  sizes,
}: ProductImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-stone-100 dark:bg-stone-800">
        <Image
          src="/logo/Logo.png"
          alt="Bếp Minh Hiếu"
          fill
          className="object-contain p-1.5 opacity-85 transition-opacity hover:opacity-100"
          sizes="100px"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      sizes={sizes}
      className={className}
      onError={() => setError(true)}
    />
  );
}
