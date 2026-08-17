import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: Product["price"]) {
  if (price === null) {
    return "Liên hệ báo giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Chưa có ảnh
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h3>
          {product.sku ? (
            <p className="mt-1 font-mono text-xs text-zinc-500">
              {product.sku}
            </p>
          ) : null}
        </div>

        <p className="font-mono text-sm font-medium text-amber-700 dark:text-amber-500">
          {formatPrice(product.price)}
        </p>

        <Link
          href={`/san-pham/${product.slug}`}
          className="mt-auto text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
        >
          Xem chi tiết →
        </Link>
      </div>
    </article>
  );
}
