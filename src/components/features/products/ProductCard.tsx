import { ArrowRight, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

function formatPrice(
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

function getMaterialTag(status: Product["status"]): {
  label: string;
  className: string;
} {
  if (status === "made_to_order") {
    return {
      label: "Made to Order",
      className:
        "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-400",
    };
  }

  return {
    label: "Inox 304",
    className:
      "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const tag = getMaterialTag(product.status);
  const isQuoteOnly = product.is_quote_only === true || product.price === null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {product.thumbnail_url ? (
          <Image
            src={product.thumbnail_url}
            alt={product.name}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500 dark:text-zinc-400">
            Chưa có ảnh
          </div>
        )}

        <span
          className={cn(
            "absolute left-3 top-3 inline-flex items-center rounded-sm border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
            tag.className,
          )}
        >
          {tag.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-zinc-100 p-5 dark:border-zinc-800/60">
        <div className="space-y-2">
          <h3 className="font-sans line-clamp-2 text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h3>
          {product.sku ? (
            <p className="font-mono text-[11px] tracking-wide text-zinc-500 dark:text-zinc-400">
              SKU · {product.sku}
            </p>
          ) : null}
        </div>

        <p
          className={cn(
            "font-mono text-sm font-bold",
            isQuoteOnly
              ? "text-amber-700 dark:text-amber-500"
              : "text-zinc-950 dark:text-zinc-50",
          )}
        >
          {formatPrice(product.price, product.is_quote_only)}
        </p>

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link
            href={`/lien-he?product=${product.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm bg-zinc-950 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            <FileText className="size-3.5" />
            Yêu cầu báo giá
          </Link>
          <Link
            href={`/san-pham/${product.slug}`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-sm border border-zinc-200 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
          >
            Chi tiết kỹ thuật
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
