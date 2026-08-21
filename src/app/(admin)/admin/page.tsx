import React from "react";
import { DashboardCharts } from "@/components/features/admin/DashboardCharts";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
              Tổng quan Dashboard
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Theo dõi yêu cầu báo giá, phân tích ngành hàng và hoạt động kinh
              doanh B2B Bếp Minh Hiếu.
            </p>
          </div>
        </div>

        <DashboardCharts />
      </div>
    </div>
  );
}
