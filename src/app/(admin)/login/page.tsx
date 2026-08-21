"use client";

import { useState, useTransition } from "react";
import { login } from "@/actions/auth";
import { Loader2, KeyRound } from "lucide-react";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50 px-4 py-12 font-sans dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-sm border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-10 items-center justify-center rounded-sm bg-zinc-950 text-white dark:bg-white dark:text-zinc-950">
            <KeyRound className="size-5" />
          </div>
          <h2 className="mt-6 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Đăng nhập hệ thống
          </h2>
          <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            Khu vực quản trị Bếp Minh Hiếu Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Địa chỉ Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              className="mt-1 block w-full rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
              placeholder="admin@bepminhhieu.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              className="mt-1 block w-full rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50"
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <div className="rounded-sm bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-zinc-950 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {isPending && <Loader2 className="size-3.5 animate-spin" />}
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
