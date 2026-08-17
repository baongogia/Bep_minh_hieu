import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Bếp Công Nghiệp",
    description: "Bếp Âu, Bếp Á, Bếp Chiên, Nồi Phở",
    image:
      "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop",
    href: "/san-pham",
  },
  {
    title: "Tủ Bảo Quản & Thiết Bị Lạnh",
    description: "Tủ Đông, Tủ Mát, Bàn Salad Berjaya",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
    href: "/san-pham",
  },
  {
    title: "Hệ Thống Tum Hút Mùi & Xử Lý Khói",
    description: "Gia công theo mặt bằng",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
    href: "/san-pham",
  },
  {
    title: "Gia Công Inox Định Hình",
    description: "Bàn, chậu rửa, giá kệ inox 304",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=800&auto=format&fit=crop",
    href: "/san-pham",
  },
] as const;

export function CategoryGrid() {
  return (
    <section className="bg-zinc-50 font-sans dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs font-medium tracking-widest text-zinc-500 dark:text-zinc-400">
            02 / DANH MỤC THIẾT BỊ
          </span>
          <span className="h-px max-w-16 flex-1 bg-zinc-300 dark:bg-zinc-700" />
        </div>

        <div className="relative isolate mb-12 max-w-3xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-8 -z-10 select-none text-8xl font-extrabold text-zinc-100/80 sm:text-9xl dark:text-zinc-900/60"
          >
            02
          </span>
          <h2 className="relative font-sans">
            <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Hệ thống giải pháp thiết bị công nghiệp
            </span>
            <span className="mt-2 block font-sans text-3xl font-extrabold uppercase tracking-tight text-zinc-950 md:text-4xl dark:text-zinc-50">
              Tiêu chuẩn SUS304
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white transition-all hover:-translate-y-0.5 hover:border-zinc-900 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-50"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-zinc-950 dark:text-zinc-50">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {category.description}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 transition-colors group-hover:text-zinc-600 dark:text-zinc-50 dark:group-hover:text-zinc-300">
                  Xem danh mục
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
