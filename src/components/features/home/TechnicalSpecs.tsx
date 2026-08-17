const specs = [
  {
    value: "100%",
    label: "Inox SUS304 không gỉ tiêu chuẩn thực phẩm & y tế",
  },
  {
    value: "0.8 – 1.5mm",
    label: "Độ dày phôi inox tiêu chuẩn chịu lực cao",
  },
  {
    value: "10+ Năm",
    label: "Kinh nghiệm thiết kế thi công hệ thống bếp",
  },
  {
    value: "24/7",
    label: "Hỗ trợ kỹ thuật & bảo hành tận chân công trình",
  },
] as const;

export function TechnicalSpecs() {
  return (
    <section className="bg-zinc-950 font-sans text-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex flex-col justify-center">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs font-medium tracking-widest text-zinc-500">
                NĂNG LỰC CƠ KHÍ
              </span>
              <span className="h-px max-w-16 flex-1 bg-zinc-700" />
            </div>

            <div className="relative isolate mb-8">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-10 -z-10 select-none text-8xl font-extrabold text-white/5 sm:text-9xl"
              >
                03
              </span>
              <h2 className="relative font-sans">
                <span className="block text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Tiêu chuẩn chế tạo
                </span>
                <span className="mt-2 block font-sans text-3xl font-extrabold uppercase tracking-tight md:text-5xl">
                  Tiêu chuẩn cơ khí chính xác
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
              Mọi sản phẩm đều trải qua quy trình dập chấn CNC, mối hàn Argon
              chống oxy hóa và được kiểm định vật liệu bằng chứng chỉ inox
              SUS304 tiêu chuẩn Nhật Bản – đảm bảo độ bền, độ bóng bề mặt và an
              toàn vệ sinh thực phẩm trong suốt vòng đời sử dụng.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-col gap-4 rounded-sm border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold leading-none tracking-tight text-white md:text-4xl">
                    {spec.value}
                  </span>
                </div>
                <p className="text-xs font-medium uppercase leading-5 tracking-wider text-zinc-400">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
