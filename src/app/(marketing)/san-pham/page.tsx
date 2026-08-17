import type { Metadata } from "next";

import { getCategories, getProducts } from "@/actions/products";
import { CategoryTabs } from "@/components/features/products/CategoryTabs";
import { ProductList } from "@/components/features/products/ProductList";
import type { Tables } from "@/types/database.types";

export const metadata: Metadata = {
  title: "Catalog Thiết Bị | Bếp Minh Hiếu",
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
    <div className="bg-zinc-50 font-sans dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-medium tracking-widest text-zinc-500 dark:text-zinc-400">
              CATALOG SẢN PHẨM
            </span>
            <span className="h-px max-w-16 flex-1 bg-zinc-300 dark:bg-zinc-700" />
          </div>

          <div className="relative isolate max-w-4xl">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-10 -z-10 select-none text-8xl font-extrabold text-zinc-100/70 sm:text-9xl dark:text-zinc-900/60"
            >
              SP
            </span>
            <h1 className="relative font-sans">
              <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Bếp Minh Hiếu — Technical Catalog
              </span>
              <span className="mt-2 block font-sans text-3xl font-extrabold uppercase tracking-tight text-zinc-950 md:text-4xl dark:text-zinc-50">
                Catalog Thiết Bị Bếp &amp; Inox Công Nghiệp
              </span>
            </h1>
            <p className="relative mt-5 max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-400 sm:text-base">
              Toàn bộ thiết bị được sản xuất từ inox SUS304 tiêu chuẩn, bảo hành
              chính hãng và hỗ trợ lắp đặt trọn gói cho nhà hàng, khách sạn,
              bệnh viện &amp; nhà máy.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <CategoryTabs categories={categories} currentSlug={categorySlug} />

        <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <p>
            Hiển thị{" "}
            <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
              {products.length}
            </span>{" "}
            sản phẩm
            {activeCategoryName ? (
              <>
                {" "}
                trong nhóm{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {activeCategoryName}
                </span>
              </>
            ) : null}
          </p>
        </div>

        {hasFetchError ? (
          <div className="mt-8 rounded-sm border border-red-200 bg-red-50 px-6 py-8 dark:border-red-900 dark:bg-red-950/30">
            <p className="font-medium text-red-800 dark:text-red-300">
              Không thể tải catalog sản phẩm
            </p>
            <p className="mt-2 text-sm text-red-700 dark:text-red-400">
              {errorMessage}
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <ProductList
              products={products}
              categoryName={activeCategoryName}
            />
          </div>
        )}
      </section>
    </div>
  );
}
