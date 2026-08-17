"use client";

import { useState, useTransition } from "react";

import { submitRfq } from "@/actions/rfq";
import { Button } from "@/components/ui/button";

type FormState = "idle" | "success";

export function RfqForm() {
  const [formState, setFormState] = useState<FormState>("idle");
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
        email: String(formData.get("email") ?? ""),
        company_name: String(formData.get("company_name") ?? "") || undefined,
        project_location:
          String(formData.get("project_location") ?? "") || undefined,
        notes: String(formData.get("notes") ?? "") || undefined,
        items: [
          {
            product_name: String(formData.get("product_name") ?? ""),
            quantity: Number(formData.get("quantity") ?? 1) || 1,
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

  if (formState === "success") {
    return (
      <div className="rounded-md border border-zinc-200 bg-zinc-50 px-6 py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="font-medium text-zinc-900 dark:text-zinc-50">
          Đã gửi yêu cầu báo giá
        </p>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => setFormState("idle")}
        >
          Gửi yêu cầu khác
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Họ tên *
          </span>
          <input
            name="customer_name"
            required
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Số điện thoại *
          </span>
          <input
            name="phone"
            required
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Email
          </span>
          <input
            name="email"
            type="email"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Công ty
          </span>
          <input
            name="company_name"
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Sản phẩm quan tâm *
          </span>
          <input
            name="product_name"
            required
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
            Số lượng
          </span>
          <input
            name="quantity"
            type="number"
            min={1}
            defaultValue={1}
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Ghi chú
        </span>
        <textarea
          name="notes"
          rows={4}
          className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>

      {errorMessage ? (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Đang gửi..." : "Gửi yêu cầu báo giá"}
      </Button>
    </form>
  );
}
