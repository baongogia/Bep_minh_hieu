import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            Bếp Minh Hiếu
          </p>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Thiết bị bếp công nghiệp inox cao cấp
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/san-pham"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Sản phẩm
          </Link>
          <Link
            href="/du-an"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Dự án
          </Link>
          <Link
            href="/lien-he"
            className="hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            Liên hệ báo giá
          </Link>
        </div>
      </div>
    </footer>
  );
}
