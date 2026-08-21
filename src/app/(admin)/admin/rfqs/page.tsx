import { getRFQs } from "@/actions/admin-rfqs";
import { RFQManager } from "@/components/features/admin/RFQManager";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RfqsPage() {
  const result = await getRFQs();

  if (!result.ok) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center font-sans">
        <div className="rounded-sm border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Truy cập bị từ chối
          </h2>
          <p className="mt-2 text-sm text-zinc-650 dark:text-zinc-400">
            {result.error || "Bạn không có quyền truy cập trang quản trị."}
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex rounded-sm bg-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Yêu cầu báo giá
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Quản lý và xử lý các yêu cầu báo giá từ khách hàng.
          </p>
        </div>

        <RFQManager initialRfqs={result.data} />
      </div>
    </div>
  );
}
