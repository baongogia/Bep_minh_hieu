import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  heroContact,
  heroImages,
} from "@/components/features/home/hero-editorial-data";
import { HeroEditorialMiniFooter } from "@/components/features/home/HeroEditorialMiniFooter";

export function HeroEditorial() {
  return (
    <section className="relative overflow-hidden bg-white font-sans">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:py-14 xl:gap-16">
          <div className="relative flex flex-col justify-center">
            <div className="mb-8 flex items-center gap-4">
              <span className="text-xs font-medium tracking-widest text-zinc-500">
                01 / 04
              </span>
              <span className="h-px max-w-16 flex-1 bg-zinc-300" />
            </div>

            <div className="relative isolate mb-8">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-8 -z-10 select-none text-8xl font-extrabold text-zinc-100/80 sm:text-9xl"
              >
                01
              </span>

              <h1 className="relative space-y-2 font-sans">
                <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-400">
                  Tiêu chuẩn thiết bị
                </span>
                <span className="block font-sans text-4xl font-extrabold uppercase tracking-tight text-zinc-950 md:text-5xl">
                  Bếp công nghiệp
                </span>
                <span className="block font-sans text-2xl font-medium uppercase tracking-wide text-zinc-600 md:text-3xl">
                  Chính xác &amp; bền bỉ
                </span>
              </h1>
            </div>

            <p className="max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              Tư vấn thiết kế, sản xuất và thi công hoàn thiện hệ thống thiết bị
              bếp inox 304, tum hút mùi tiêu chuẩn nhà hàng, khách sạn và nhà
              máy.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/san-pham"
                className="inline-flex items-center rounded-sm bg-zinc-950 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
              >
                Xem danh mục thiết bị
              </Link>
              <Link
                href="/du-an"
                className="inline-flex items-center rounded-sm border border-zinc-300 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Dự án đã thi công
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-zinc-500">
              <span>Next</span>
              <span className="text-zinc-300">—</span>
              <span className="inline-flex items-center gap-1 text-zinc-700">
                Preview
                <ArrowRight className="size-3.5" />
              </span>
            </div>

            <div className="absolute -right-2 top-1/2 hidden -translate-y-1/2 lg:block">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-400"
                style={{ writingMode: "vertical-rl" }}
              >
                Hotline: {heroContact.hotline} | Zalo | Email
              </p>
            </div>
          </div>

          <div className="relative min-h-88 pb-16 sm:min-h-112 sm:pb-20 lg:min-h-136 lg:pb-0">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm sm:aspect-5/6 lg:aspect-auto lg:h-full lg:min-h-136">
              <Image
                src={heroImages.main.src}
                alt={heroImages.main.alt}
                fill
                priority
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="absolute bottom-16 right-0 z-10 w-[58%] max-w-xs overflow-hidden border-4 border-white bg-white shadow-2xl sm:max-w-sm lg:bottom-20 lg:right-4 lg:w-[52%]">
              <div className="relative aspect-4/3">
                <Image
                  src={heroImages.detail.src}
                  alt={heroImages.detail.alt}
                  fill
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 45vw, 25vw"
                />
              </div>
              <Link
                href="/san-pham"
                className="flex items-center justify-between bg-zinc-950 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800"
              >
                Chi tiết
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden pb-8 lg:block">
          <Link
            href={`tel:${heroContact.hotline.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-zinc-500"
          >
            <Phone className="size-3.5" />
            Hotline: {heroContact.hotline} | Zalo | Email
          </Link>
        </div>
      </div>

      <HeroEditorialMiniFooter />
    </section>
  );
}
