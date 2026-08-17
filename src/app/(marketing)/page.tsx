import { HeroEditorial } from "@/components/features/home/HeroEditorial";

export default function HomePage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <HeroEditorial />

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
