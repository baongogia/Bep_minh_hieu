"use client";

import { ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";

import { submitRfq } from "@/actions/rfq";

export function QuickRfqBanner() {
  const [formState, setFormState] = useState<"idle" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const form = event.currentTarget;

    startTransition(async () => {
      const result = await submitRfq({
        customer_name: String(formData.get("customer_name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        items: [
          {
            product_name: String(formData.get("product_name") ?? ""),
            quantity: 1,
          },
        ],
      });

      if (!result.ok) {
        setErrorMessage(result.error);
        return;
      }

      setFormState("success");
      form.reset();
    });
  }

  return (
    <section className="border-t border-zinc-200 bg-zinc-50 font-sans dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-stone-400 dark:text-stone-500">
            04 / BÁO GIÁ NHANH
          </span>
          <span className="h-px max-w-16 flex-1 bg-stone-300 dark:bg-stone-700" />
        </div>

        <div className="relative isolate mb-12 max-w-4xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-8 -z-10 select-none font-mono text-8xl font-extrabold text-stone-200/80 sm:text-9xl dark:text-stone-900/60"
          >
            04
          </span>
          <h2 className="relative font-sans">
            <span className="block text-xs font-semibold uppercase tracking-widest text-stone-500 dark:text-stone-400">
              Gửi yêu cầu trong vòng 60 giây
            </span>
            <span className="mt-2 block font-sans text-3xl font-extrabold uppercase tracking-tight text-stone-950 md:text-4xl dark:text-stone-50">
              Nhận bảng giá dự án
            </span>
          </h2>
        </div>

        <div className="overflow-hidden rounded-sm border border-zinc-900 bg-white dark:border-zinc-50 dark:bg-zinc-900">
          {formState === "success" ? (
            <div className="flex flex-col items-start gap-3 bg-zinc-950 px-6 py-10 text-white sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-10">
              <div>
                <p className="font-sans text-lg font-bold uppercase tracking-tight">
                  Đã gửi yêu cầu thành công
                </p>
                <p className="mt-1 text-sm text-zinc-400">
                  Kỹ sư Bếp Minh Hiếu sẽ liên hệ &amp; báo giá chi tiết trong
                  vòng 2 giờ làm việc.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormState("idle")}
                className="inline-flex items-center gap-1.5 border border-white/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-white hover:text-zinc-950"
              >
                Gửi yêu cầu khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
              <div className="flex flex-1 flex-col gap-px border-0 border-zinc-900 lg:flex-row lg:border-r dark:border-zinc-50">
                <label className="group flex flex-1 flex-col justify-center gap-1 border-b border-zinc-200 px-5 py-4 focus-within:bg-zinc-50 dark:border-zinc-800 dark:focus-within:bg-zinc-950 lg:border-b-0 lg:border-r">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Họ tên *
                  </span>
                  <input
                    name="customer_name"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-transparent p-0 text-sm font-medium text-zinc-950 placeholder:text-zinc-300 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-600"
                  />
                </label>
                <label className="group flex flex-1 flex-col justify-center gap-1 border-b border-zinc-200 px-5 py-4 focus-within:bg-zinc-50 dark:border-zinc-800 dark:focus-within:bg-zinc-950 lg:border-b-0 lg:border-r">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Số điện thoại *
                  </span>
                  <input
                    name="phone"
                    required
                    placeholder="09xx xxx xxx"
                    className="w-full bg-transparent p-0 font-mono text-sm font-medium text-zinc-950 placeholder:text-zinc-300 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-600"
                  />
                </label>
                <label className="group flex flex-1 flex-col justify-center gap-1 px-5 py-4 focus-within:bg-zinc-50 dark:focus-within:bg-zinc-950">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Nhu cầu thiết bị *
                  </span>
                  <input
                    name="product_name"
                    required
                    placeholder="Ví dụ: Bếp chiên 2 khoang + Tủ đông 500L"
                    className="w-full bg-transparent p-0 text-sm font-medium text-zinc-950 placeholder:text-zinc-300 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-600"
                  />
                </label>
              </div>

              <div className="flex items-stretch">
                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex w-full items-center justify-center gap-2 bg-zinc-950 px-6 py-5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70 lg:w-auto lg:px-8 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100"
                >
                  {isPending ? "Đang gửi..." : "Nhận bảng giá dự án"}
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            </form>
          )}
        </div>

        {errorMessage ? (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        ) : null}

        <p className="mt-5 text-xs text-zinc-500 dark:text-zinc-400">
          * Thông tin của bạn sẽ được bảo mật. Báo giá hoàn toàn miễn phí trong
          vòng 2 giờ làm việc.
        </p>
      </div>
    </section>
  );
}
