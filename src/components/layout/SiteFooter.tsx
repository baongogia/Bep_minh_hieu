import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 font-sans text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* 1. Main 4-Column Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Vision (4/12) */}
          <div className="space-y-5 lg:col-span-4">
            <div>
              <Link href="/" className="inline-block">
                <span className="font-serif text-2xl font-bold uppercase tracking-wider text-white">
                  BẾP MINH HIẾU
                </span>
                <span className="text-amber-500">.</span>
              </Link>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-stone-400">
                Giải pháp thiết bị bếp công nghiệp &amp; Gia công Inox chuyên
                dụng
              </p>
            </div>

            <p className="text-xs leading-6 text-stone-400">
              Chuyên tư vấn thiết kế, sản xuất và thi công lắp đặt hoàn thiện hệ
              thống bếp inox 304, tum hút mùi tiêu chuẩn nhà hàng, khách sạn,
              căn tin và nhà máy công nghiệp.
            </p>

            <div className="pt-2">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-stone-500">
                HOTLINE TRỰC TIẾP 24/7
              </span>
              <a
                href="tel:0912212886"
                className="mt-1 inline-flex items-center gap-2 font-mono text-2xl font-bold tracking-tight text-white transition-colors hover:text-amber-400"
              >
                <Phone className="size-5 text-amber-500" />
                0912 212 886
              </a>
            </div>
          </div>

          {/* Column 2: Equipment Categories (2/12) */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone-400">
              DANH MỤC
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {[
                {
                  label: "Bếp Á - Bếp Âu",
                  href: "/san-pham?category=bep-inox",
                },
                {
                  label: "Nồi Nấu & Hấp Cơm",
                  href: "/san-pham?category=bep-inox",
                },
                {
                  label: "Thiết Bị Giữ Nóng",
                  href: "/san-pham?category=ban-quay-ke-inox",
                },
                {
                  label: "Hệ Thống Hút Mùi",
                  href: "/san-pham?category=tum-hut-mui",
                },
                {
                  label: "Bàn Ghế & Giá Kệ Inox",
                  href: "/san-pham?category=ban-quay-ke-inox",
                },
                {
                  label: "Thiết Bị Lạnh",
                  href: "/san-pham?category=thiet-bi-lanh",
                },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block transition-transform duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Projects (2/12) */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-widest text-stone-400">
              NĂNG LỰC DỰ ÁN
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              {[
                { label: "Tư vấn & Thiết kế 2D/3D", href: "/ve-chung-toi" },
                { label: "Sản xuất Inox theo yêu cầu", href: "/ve-chung-toi" },
                { label: "Thi công hệ thống hút khói", href: "/du-an" },
                { label: "Hồ sơ năng lực (Catalog)", href: "/du-an" },
                { label: "Chính sách bảo hành", href: "/lien-he" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block transition-transform duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Factory Info (4/12) */}
          <div className="space-y-4 lg:col-span-4">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-stone-200">
              CÔNG TY TNHH CƠ KHÍ XÂY DỰNG &amp; TM MINH HIẾU
            </h3>

            <div className="space-y-3 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-stone-500" />
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-stone-300 text-[10px]">
                    Văn phòng giao dịch
                  </span>
                  <span>
                    Số 12, ngõ 146 Định Công Hạ, P. Định Công, Q. Hoàng Mai, Hà
                    Nội.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-stone-500" />
                <div>
                  <span className="block font-semibold uppercase tracking-wider text-stone-300 text-[10px]">
                    Trụ sở &amp; Nhà xưởng sản xuất
                  </span>
                  <span>
                    Số 259, ngõ 192 Lê Trọng Tấn, P. Định Công, Q. Hoàng Mai, Hà
                    Nội.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="size-4 shrink-0 text-stone-500" />
                <a
                  href="mailto:hieudv234@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  hieudv234@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="size-4 shrink-0 text-stone-500" />
                <a
                  href="https://bepminhhieu.vn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  bepminhhieu.vn
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Bottom Bar (Bản quyền & Chứng chỉ) */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-stone-800/80 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-stone-500">
            © 2026 BẾP MINH HIẾU. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-2 font-mono text-xs tracking-wider text-stone-400">
            <ShieldCheck className="size-4 text-amber-500" />
            <span>SUS304 INDUSTRIAL STANDARD • ISO 9001:2008</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
