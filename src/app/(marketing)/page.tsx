import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700 dark:text-amber-500">
            Thiết bị bếp công nghiệp
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Giải pháp inox cao cấp cho bếp nhà hàng, khách sạn, căng tin
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Bếp Minh Hiếu cung cấp thiết kế, sản xuất và lắp đặt thiết bị bếp
            công nghiệp theo quy mô dự án. Báo giá linh hoạt theo cấu hình và
            thi công thực tế.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/san-pham"
              className="rounded-md bg-amber-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-500"
            >
              Xem sản phẩm
            </Link>
            <Link
              href="/lien-he"
              className="rounded-md border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Thiết kế theo mặt bằng",
              description: "Tối ưu quy trình nấu nướng và luồng vận hành bếp.",
            },
            {
              title: "Gia công inox chuẩn công nghiệp",
              description:
                "Vật liệu bền bỉ, dễ vệ sinh, phù hợp môi trường B2B.",
            },
            {
              title: "Thi công trọn gói",
              description: "Từ sản xuất đến lắp đặt và bàn giao vận hành.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-md border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            >
              <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
