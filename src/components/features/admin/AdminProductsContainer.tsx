"use client";

import type { AdminProduct } from "@/types/admin-product";
import { ProductManager } from "./ProductManager";

interface CategoryOption {
  id: string;
  name: string;
}

interface AdminProductsContainerProps {
  initialProducts: AdminProduct[];
  categories?: CategoryOption[];
}

export function AdminProductsContainer({
  initialProducts,
  categories = [],
}: AdminProductsContainerProps) {
  return (
    <ProductManager initialProducts={initialProducts} categories={categories} />
  );
}
