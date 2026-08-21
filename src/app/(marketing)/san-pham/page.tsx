import type { Metadata } from "next";

import { getCategories, getProducts } from "@/actions/products";
import { CategoryTabs } from "@/components/features/products/CategoryTabs";
import { ProductList } from "@/components/features/products/ProductList";
import type { Tables } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Catalog Thiết Bị Bếp & Inox | Bếp Minh Hiếu",
  description:
    "Catalog thiết bị bếp & inox công nghiệp SUS304: Bếp Á - Âu, hệ thống hút mùi, tủ bảo quản, gia công inox theo yêu cầu. Bảo hành & lắp đặt trọn gói.",
};

type ProductsPageProps = PageProps<"/san-pham">;

function findCategoryName(
  categories: Tables<"categories">[],
  slug: string | null,
): string | null {
  if (!slug) return null;
  const found = categories.find((c) => c.slug === slug);
  return found?.name ?? null;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug =
    typeof params?.category === "string" && params.category.length > 0
      ? params.category
      : null;

  const [categoriesResult, productsResult] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug }),
  ]);

  const categories = categoriesResult.ok ? categoriesResult.data : [];
  const activeCategoryName = categoriesResult.ok
    ? findCategoryName(categories, categorySlug)
    : null;

  const hasFetchError = !categoriesResult.ok || !productsResult.ok;
  const errorMessage = !categoriesResult.ok
    ? categoriesResult.error
    : !productsResult.ok
      ? productsResult.error
      : null;

  const products = productsResult.ok ? productsResult.data : [];

  return (
    <div className="bg-stone-50 font-sans text-stone-900 dark:bg-stone-950 dark:text-stone-100">
      {/* Header Banner */}
      <section className="border-b border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900">
        <div className="mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs font-semibold tracking-widest text-stone-400 dark:text-stone-500">
              TECHNICAL CATALOG
            </span>
            <span className="h-px max-w-16 flex-1 bg-stone-300 dark:bg-stone-700" />
          </div>

          <div className="relative isolate max-w-4xl">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-10 -z-10 select-none font-mono text-8xl font-extrabold text-stone-100 sm:text-9xl dark:text-stone-800/40"
            >
              CATALOG
            </span>
            <h1 className="relative font-sans">
              <span className="block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
                Bếp Minh Hiếu — Chế tạo chuẩn SUS304
              </span>
              <span className="mt-2 block font-serif text-3xl font-extrabold uppercase tracking-tight text-stone-950 md:text-4xl dark:text-stone-50">
                Catalog Thiết Bị Bếp &amp; Inox Công Nghiệp
              </span>
            </h1>
            <p className="relative mt-4 max-w-2xl text-sm leading-7 text-stone-600 dark:text-stone-400">
              Toàn bộ thiết bị được sản xuất từ inox SUS304 tiêu chuẩn, bảo hành
              chính hãng và hỗ trợ lắp đặt trọn gói cho nhà hàng, khách sạn,
              bệnh viện &amp; nhà máy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filter Tabs & Product Catalog Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-6">
        <CategoryTabs categories={categories} currentSlug={categorySlug} />

        {hasFetchError ? (
          <div className="rounded-md border border-rose-200 bg-rose-50 p-6 text-xs text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-400">
            <p className="font-semibold">Không thể tải catalog sản phẩm</p>
            <p className="mt-1">{errorMessage}</p>
          </div>
        ) : (
          <ProductList products={products} categoryName={activeCategoryName} />
        )}
      </section>
    </div>
  );
}
