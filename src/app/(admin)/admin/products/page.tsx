import { getAdminProducts } from "@/actions/admin-products";
import { getAdminCategories } from "@/actions/admin-categories";
import { AdminProductsContainer } from "@/components/features/admin/AdminProductsContainer";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const [productsRes, categoriesRes] = await Promise.all([
    getAdminProducts(),
    getAdminCategories(),
  ]);

  if (!productsRes.ok) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center font-sans">
        <div className="rounded-md border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900">
          <h2 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
            Truy cập bị từ chối
          </h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            {productsRes.error || "Bạn không có quyền truy cập trang quản trị."}
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const categories = categoriesRes.ok ? categoriesRes.data : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            Quản lý sản phẩm
          </h1>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Xem danh sách, lọc theo danh mục, quản lý báo giá và chỉnh sửa thông
            tin kỹ thuật sản phẩm.
          </p>
        </div>

        <AdminProductsContainer
          initialProducts={productsRes.data}
          categories={categories}
        />
      </div>
    </div>
  );
}
