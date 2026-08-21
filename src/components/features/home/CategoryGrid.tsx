import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/actions/products";
import { formatImageUrl } from "@/lib/utils";

const KITCHEN_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop",
];

export async function CategoryGrid() {
  const res = await getCategories();
  const dbCategories = res.ok && res.data.length > 0 ? res.data : [];

  return (
    <section className="bg-stone-50 font-sans dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-stone-400 dark:text-stone-500">
            02 / DANH MỤC THIẾT BỊ
          </span>
          <span className="h-px max-w-16 flex-1 bg-stone-300 dark:bg-stone-700" />
        </div>

        <div className="relative isolate mb-12 max-w-3xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-8 -z-10 select-none font-mono text-8xl font-extrabold text-stone-200/80 sm:text-9xl dark:text-stone-900/60"
          >
            02
          </span>
          <h2 className="relative font-sans">
            <span className="block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Hệ thống giải pháp thiết bị công nghiệp
            </span>
            <span className="mt-2 block font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-950 md:text-4xl dark:text-stone-50">
              Tiêu chuẩn SUS304
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dbCategories.map((category, index) => {
            const formattedImg = formatImageUrl(category.image_url);
            const fallbackImg =
              KITCHEN_PLACEHOLDERS[index % KITCHEN_PLACEHOLDERS.length];
            const displayImg = formattedImg || fallbackImg;

            return (
              <Link
                key={category.id}
                href={`/san-pham?category=${category.slug}`}
                className="group flex flex-col overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xs transition-all hover:-translate-y-1 hover:border-stone-800 hover:shadow-md dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <Image
                    src={displayImg}
                    alt={category.name}
                    fill
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-sans text-sm font-bold uppercase tracking-wide text-stone-950 transition-colors group-hover:text-stone-700 dark:text-stone-50 dark:group-hover:text-stone-300">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-stone-600 line-clamp-2 dark:text-stone-400">
                      {category.description ||
                        "Gia công chế tạo inox 304 chính xác tiêu chuẩn công nghiệp."}
                    </p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-950 transition-colors group-hover:text-stone-600 dark:text-stone-100 dark:group-hover:text-stone-300">
                    Xem danh mục
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
