import type { Product } from "@/types/product";

import { ProductCard } from "./ProductCard";
import { ProductEmptyState } from "./ProductEmptyState";

type ProductListProps = {
  products: Product[];
  categoryName?: string | null;
};

export function ProductList({ products, categoryName }: ProductListProps) {
  if (products.length === 0) {
    return <ProductEmptyState categoryName={categoryName} />;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
