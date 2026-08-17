import { Phone } from "lucide-react";
import Link from "next/link";

import { heroContact } from "@/components/features/home/hero-editorial-data";

export function HeroEditorialMiniFooter() {
  return (
    <div className="border-t border-zinc-800 bg-zinc-950 font-sans">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-8 py-6 text-white md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-1">
          <p className="font-sans text-sm font-semibold uppercase tracking-wider text-white">
            BẾP MINH HIẾU
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            Giải pháp thiết bị bếp &amp; gia công Inox toàn diện — thiết kế,
            sản xuất và thi công trọn gói cho nhà hàng, khách sạn, nhà máy.
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 text-sm text-zinc-300 md:items-end md:text-right">
          <Link
            href={`tel:${heroContact.hotline.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-zinc-200"
          >
            <Phone className="size-3.5 shrink-0" />
            {heroContact.hotline}
          </Link>
          <Link
            href={`mailto:${heroContact.email}`}
            className="transition-colors hover:text-white"
          >
            {heroContact.email}
          </Link>
          <p className="text-zinc-400">{heroContact.address}</p>
        </div>
      </div>
    </div>
  );
}
