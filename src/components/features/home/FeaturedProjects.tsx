import { ArrowRight, MapPin, Package, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Bếp Trung Tâm Chuỗi Nhà Hàng BBQ",
    location: "Hà Nội",
    scope: "Thiết kế, sản xuất & lắp đặt 12 công đoạn bếp",
    duration: "45 ngày",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    href: "/du-an",
  },
  {
    title: "Hệ Thống Bếp Khách Sạn & Resort 4 Sao",
    location: "Hải Phòng",
    scope: "Bếp buffet, bếp a la carte, tum hút mùi công suất lớn",
    duration: "60 ngày",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    href: "/du-an",
  },
  {
    title: "Bếp Ăn Bán Trú & Căn Tin Bệnh Viện Đa Khoa",
    location: "Hà Nội",
    scope: "Nồi công nghiệp, tủ giữ nóng, bàn phục vụ 500 suất",
    duration: "30 ngày",
    image:
      "https://images.unsplash.com/photo-1580442151529-313817f7ddb5?q=80&w=1200&auto=format&fit=crop",
    href: "/du-an",
  },
] as const;

export function FeaturedProjects() {
  return (
    <section className="bg-zinc-50 font-sans dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4">
          <span className="text-xs font-medium tracking-widest text-zinc-500 dark:text-zinc-400">
            03 / DỰ ÁN ĐÃ HOÀN THIỆN
          </span>
          <span className="h-px max-w-16 flex-1 bg-zinc-300 dark:bg-zinc-700" />
        </div>

        <div className="relative isolate mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="relative max-w-3xl">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-8 -z-10 select-none text-8xl font-extrabold text-zinc-100/80 sm:text-9xl dark:text-zinc-900/60"
            >
              03
            </span>
            <h2 className="relative font-sans">
              <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Tạp chí kiến trúc &amp; thi công
              </span>
              <span className="mt-2 block font-sans text-3xl font-extrabold uppercase tracking-tight text-zinc-950 md:text-4xl dark:text-zinc-50">
                Dự án tiêu biểu
              </span>
            </h2>
          </div>
          <Link
            href="/du-an"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-950 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300"
          >
            Xem toàn bộ hồ sơ
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group flex flex-col overflow-hidden bg-white dark:bg-zinc-950"
            >
              <div
                className={`relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 ${
                  index === 0
                    ? "aspect-[4/5]"
                    : index === 1
                      ? "aspect-[4/5]"
                      : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-950 shadow-sm backdrop-blur-sm">
                    <span className="font-mono">0{index + 1}</span>
                    <span className="h-3 w-px bg-zinc-300" />
                    <span>Hoàn thiện</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-5 border border-zinc-200 border-t-0 p-6 dark:border-zinc-800">
                <h3 className="font-sans text-lg font-bold uppercase tracking-tight leading-tight text-zinc-950 dark:text-zinc-50">
                  {project.title}
                </h3>

                <div className="space-y-2.5 border-t border-zinc-100 pt-4 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        Địa điểm
                      </span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {project.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Package className="mt-0.5 size-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        Hạng mục bàn giao
                      </span>
                      <span className="font-medium leading-5 text-zinc-800 dark:text-zinc-200">
                        {project.scope}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Calendar className="mt-0.5 size-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" />
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                        Thời gian hoàn thiện
                      </span>
                      <span className="font-medium text-zinc-800 dark:text-zinc-200">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={project.href}
                  className="mt-auto inline-flex items-center justify-between border-t border-zinc-100 pt-4 text-xs font-semibold uppercase tracking-wider text-zinc-950 transition-colors hover:text-zinc-600 dark:border-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-300"
                >
                  Xem hồ sơ công trình
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
