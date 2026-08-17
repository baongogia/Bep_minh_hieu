import { Package } from "lucide-react";
import Link from "next/link";

type ProductEmptyStateProps = {
  categoryName?: string | null;
};

export function ProductEmptyState({ categoryName }: ProductEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-zinc-300 bg-white px-6 py-20 text-center dark:border-zinc-700 dark:bg-zinc-950">
      <div className="flex size-14 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
        <Package className="size-6" />
      </div>

      <h3 className="mt-6 font-sans text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
        {categoryName
          ? `Chưa có sản phẩm trong nhóm "${categoryName}"`
          : "Chưa có sản phẩm trong catalog"}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        Danh mục thiết bị đang được cập nhật. Quý khách vui lòng{" "}
        <Link
          href="/lien-he"
          className="font-medium text-zinc-900 underline underline-offset-2 hover:text-zinc-700 dark:text-zinc-50 dark:hover:text-zinc-200"
        >
          liên hệ trực tiếp
        </Link>{" "}
        để được tư vấn &amp; báo giá nhanh nhất theo nhu cầu dự án.
      </p>

      <Link
        href="/lien-he"
        className="mt-8 inline-flex items-center gap-1.5 rounded-sm bg-zinc-950 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        Gửi yêu cầu báo giá
      </Link>
    </div>
  );
}
