import { FileText } from "lucide-react";
import Link from "next/link";

import type { Product } from "@/types/product";
import { formatImageUrl } from "@/lib/utils";
import { ProductImageWithFallback } from "@/components/ui/ProductImageWithFallback";

type ProductCardProps = {
  product: Product;
};

function formatPriceBadge(
  price: Product["price"],
  isQuoteOnly: Product["is_quote_only"],
) {
  if (isQuoteOnly === true || price === null) {
    return "Liên hệ báo giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = formatImageUrl(product.thumbnail_url);
  const priceLabel = formatPriceBadge(product.price, product.is_quote_only);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xs transition-all hover:-translate-y-0.5 hover:border-stone-800 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600">
      {/* 1:1 Square Image Container */}
      <Link
        href={`/san-pham/${product.slug}`}
        className="block relative aspect-square w-full overflow-hidden bg-stone-50/50 dark:bg-stone-800/40"
      >
        <ProductImageWithFallback
          src={imageUrl}
          alt={product.name}
          fill
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Inox 304 Corner Tag */}
        <span className="absolute left-3 top-3 inline-flex items-center rounded-xs border border-stone-200/80 bg-white/90 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest text-stone-900 shadow-2xs backdrop-blur-xs dark:border-stone-700 dark:bg-stone-900/90 dark:text-stone-100">
          INOX 304
        </span>
      </Link>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-1.5">
          <Link href={`/san-pham/${product.slug}`} className="block">
            <h3 className="h-11 font-serif text-sm font-bold leading-snug text-stone-900 line-clamp-2 transition-colors group-hover:text-stone-700 dark:text-stone-50 dark:group-hover:text-stone-300">
              {product.name}
            </h3>
          </Link>

          {product.sku && (
            <p className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
              SKU: {product.sku}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          {/* Price Badge */}
          <span className="inline-block rounded bg-stone-100 px-2 py-0.5 font-mono text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-300">
            {priceLabel}
          </span>

          {/* Quick RFQ Action Link */}
          <Link
            href={`/lien-he?product=${product.slug}`}
            className="inline-flex items-center gap-1 rounded border border-stone-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-stone-800 shadow-2xs transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200 dark:hover:bg-stone-100 dark:hover:text-stone-900"
          >
            <FileText className="size-3" />
            Báo giá
          </Link>
        </div>
      </div>
    </div>
  );
}
