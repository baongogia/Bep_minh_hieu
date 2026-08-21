import Link from "next/link";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions/products";
import { ProductSpecTable } from "@/components/features/products/ProductSpecTable";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatImageUrl } from "@/lib/utils";
import { ProductImageWithFallback } from "@/components/ui/ProductImageWithFallback";

type ProductDetailPageProps = PageProps<"/san-pham/[slug]">;

function formatPrice(price: number | null) {
  if (price === null) {
    return "Liên hệ báo giá";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const result = await getProductBySlug(slug);

  if (!result.ok) {
    notFound();
  }

  const product = result.data;
  const imageUrl = formatImageUrl(product.thumbnail_url);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        href="/san-pham"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Quay lại danh sách
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <ProductImageWithFallback
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
            {product.sku ?? "Chưa có mã SKU"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-lg font-medium text-amber-700 dark:text-amber-500">
            {formatPrice(product.price)}
          </p>

          {product.description ? (
            <p className="mt-6 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
          ) : null}

          <Link
            href={`/lien-he?product=${product.slug}`}
            className={cn(buttonVariants(), "mt-8 inline-flex")}
          >
            Nhận báo giá
          </Link>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Thông số kỹ thuật
        </h2>
        <div className="mt-4">
          <ProductSpecTable specifications={product.specifications} />
        </div>
      </section>
    </div>
  );
}
