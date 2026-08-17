import { getProducts } from "@/actions/products";
import { ProductList } from "@/components/features/products/ProductList";

export default async function ProductsPage() {
  const result = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sản phẩm
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Danh mục thiết bị bếp công nghiệp. Giá có thể để trống — vui lòng liên
          hệ báo giá theo cấu hình dự án.
        </p>
      </div>

      {!result.ok ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-6 py-8 dark:border-red-900 dark:bg-red-950/30">
          <p className="font-medium text-red-800 dark:text-red-300">
            Không thể tải danh sách sản phẩm
          </p>
          <p className="mt-2 text-sm text-red-700 dark:text-red-400">
            {result.error}
          </p>
        </div>
      ) : (
        <ProductList products={result.data} />
      )}
    </div>
  );
}
