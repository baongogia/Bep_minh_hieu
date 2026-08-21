"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ProductEmptyState } from "./ProductEmptyState";

type ProductListProps = {
  products: Product[];
  categoryName?: string | null;
};

const PAGE_SIZE = 16;

export function ProductList({ products, categoryName }: ProductListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);

  // Filter products by search term (name or SKU)
  const filteredProducts = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return products;
    return products.filter(
      (p) =>
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.sku && p.sku.toLowerCase().includes(term)) ||
        (p.description && p.description.toLowerCase().includes(term)),
    );
  }, [products, searchQuery]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayLimit);
  }, [filteredProducts, displayLimit]);

  const hasMore = filteredProducts.length > displayLimit;

  const handleLoadMore = () => {
    setDisplayLimit((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Search & Results Counter Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-stone-200/80 pb-4 dark:border-stone-800">
        <div className="text-xs text-stone-500 dark:text-stone-400">
          Hiển thị{" "}
          <strong className="font-mono text-stone-900 dark:text-stone-100">
            {visibleProducts.length}
          </strong>{" "}
          / <span className="font-mono">{filteredProducts.length}</span> sản
          phẩm
          {categoryName ? (
            <>
              {" "}
              trong nhóm{" "}
              <span className="font-semibold text-stone-800 dark:text-stone-200">
                {categoryName}
              </span>
            </>
          ) : null}
        </div>

        {/* Quick Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Tìm theo tên máy móc, SKU..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDisplayLimit(PAGE_SIZE); // reset limit on new search query
            }}
            className="w-full rounded-md border border-stone-200 bg-white py-1.5 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100 dark:placeholder-stone-500"
          />
        </div>
      </div>

      {/* Main Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <ProductEmptyState categoryName={categoryName} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="pt-8 flex flex-col items-center justify-center gap-2">
              <button
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 rounded-md border border-stone-300 bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800 shadow-2xs transition-all hover:border-stone-900 hover:text-stone-950 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:border-stone-400 dark:hover:text-white"
              >
                Tải thêm sản phẩm
              </button>
              <span className="font-mono text-[11px] text-stone-400">
                Còn lại {filteredProducts.length - visibleProducts.length} sản
                phẩm
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}
