import React from "react";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Cài đặt hệ thống
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Cấu hình các thông tin liên hệ, logo, SEO và cài đặt chung cho
            website.
          </p>
        </div>
        <div className="rounded-sm border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Tính năng đang được phát triển...
          </p>
        </div>
      </div>
    </div>
  );
}
