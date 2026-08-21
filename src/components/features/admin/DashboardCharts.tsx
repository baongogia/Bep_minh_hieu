"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  FileText,
  FolderTree,
  Construction,
  TrendingUp,
  ArrowUpRight,
  Clock,
  Phone,
} from "lucide-react";
import Link from "next/link";

const monthlyData = [
  { name: "T3", rfqCount: 18 },
  { name: "T4", rfqCount: 24 },
  { name: "T5", rfqCount: 21 },
  { name: "T6", rfqCount: 32 },
  { name: "T7", rfqCount: 28 },
  { name: "T8", rfqCount: 45 },
];

const categoryDistribution = [
  { name: "Thiết bị bếp inox", value: 42, count: 76, color: "#18181b" },
  { name: "Hệ thống hút mùi", value: 24, count: 43, color: "#44403c" },
  { name: "Bàn quầy & Kệ inox", value: 18, count: 32, color: "#78716c" },
  { name: "Thiết bị lạnh & Khác", value: 16, count: 30, color: "#a8a29e" },
];

const recentRFQs = [
  {
    id: "rfq-1",
    customer: "Anh Minh",
    company: "Nhà hàng Phố Bổn",
    phone: "0983***888",
    time: "10 phút trước",
    status: "new",
    statusLabel: "Mới",
  },
  {
    id: "rfq-2",
    customer: "Chị Hương",
    company: "Canteen TH True Milk",
    phone: "0912***456",
    time: "45 phút trước",
    status: "new",
    statusLabel: "Mới",
  },
  {
    id: "rfq-3",
    customer: "Anh Hải",
    company: "Khách sạn Bloom Hàng Bạc",
    phone: "0904***112",
    time: "2 giờ trước",
    status: "in_progress",
    statusLabel: "Đang xử lý",
  },
  {
    id: "rfq-4",
    customer: "Chú Đức",
    company: "Bếp ăn KCN Quế Võ",
    phone: "0977***999",
    time: "5 giờ trước",
    status: "contacted",
    statusLabel: "Đã liên hệ",
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-md border border-stone-800 bg-stone-900 p-2.5 text-xs text-white shadow-xl">
        <p className="font-medium text-stone-300">Tháng {label}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="size-2 rounded-full bg-stone-100" />
          <span className="font-mono font-semibold text-stone-50">
            {payload[0].value} Yêu cầu báo giá
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function DashboardCharts() {
  const metrics = [
    {
      title: "Tổng Sản Phẩm",
      value: "181",
      trend: "+12.5%",
      trendLabel: "so với tháng trước",
      icon: Package,
    },
    {
      title: "Yêu Cầu Báo Giá",
      value: "45",
      trend: "+18.4%",
      trendLabel: "so với tháng trước",
      icon: FileText,
    },
    {
      title: "Danh Mục Sản Phẩm",
      value: "12",
      trend: "+2 mới",
      trendLabel: "đã tối ưu SEO",
      icon: FolderTree,
    },
    {
      title: "Dự Án Thi Công",
      value: "28",
      trend: "+15.0%",
      trendLabel: "hoàn thành năm 2026",
      icon: Construction,
    },
  ];

  return (
    <div className="flex flex-col gap-4 font-sans text-stone-900 dark:text-stone-100">
      {/* 1. 4 KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="group relative flex flex-col justify-between rounded-lg border border-stone-200/80 bg-white p-4 shadow-2xs transition-all hover:border-stone-300 hover:shadow-xs dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                  {metric.title}
                </span>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-stone-100 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300">
                  <Icon className="size-4.5" />
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
                  {metric.value}
                </p>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-200/60 bg-emerald-50/80 px-1.5 py-0.2 font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <TrendingUp className="size-3" />
                    {metric.trend}
                  </span>
                  <span className="text-stone-400 dark:text-stone-500">
                    {metric.trendLabel}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Main Dashboard Content Grid (12 Columns) */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left Column (7/12 - Revenue / Lead Area Chart) */}
        <div className="flex flex-col rounded-lg border border-stone-200/80 bg-white p-5 shadow-2xs dark:border-stone-800 dark:bg-stone-900 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800/80">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                Xu hướng Yêu cầu Báo giá (RFQs)
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Thống kê số lượt gửi báo giá 6 tháng gần nhất
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <span className="size-2 rounded-full bg-stone-900 dark:bg-stone-100" />
              Tổng: 148 RFQs
            </span>
          </div>

          <div className="mt-4 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="rfqGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f5f5f4"
                />
                <XAxis
                  dataKey="name"
                  stroke="#a8a29e"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#a8a29e"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rfqCount"
                  stroke="#18181b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#rfqGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (5/12 - Top Donut & Bottom Recent RFQs) */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Right Top - Category Distribution Donut */}
          <div className="rounded-lg border border-stone-200/80 bg-white p-5 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800/80">
              <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                Tỷ trọng Ngành hàng
              </h3>
              <span className="text-xs text-stone-400">181 sản phẩm</span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="relative size-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={58}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Mini Legend List with Progress Bars */}
              <div className="flex-1 space-y-2 text-xs">
                {categoryDistribution.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {item.name}
                      </span>
                      <span className="font-mono font-semibold text-stone-900 dark:text-stone-100">
                        {item.value}% ({item.count})
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.value}%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Bottom - Recent RFQs Table */}
          <div className="flex flex-col justify-between rounded-lg border border-stone-200/80 bg-white p-5 shadow-2xs dark:border-stone-800 dark:bg-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 dark:border-stone-800/80">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
                  Y/C Báo giá mới nhất
                </h3>
              </div>

              <Link
                href="/admin/rfqs"
                className="inline-flex items-center gap-0.5 text-xs font-semibold text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200"
              >
                Xem tất cả
                <ArrowUpRight className="size-3.5" />
              </Link>
            </div>

            <div className="mt-3 divide-y divide-stone-100 dark:divide-stone-800/60 text-xs">
              {recentRFQs.map((rfq) => (
                <div
                  key={rfq.id}
                  className="flex items-center justify-between py-2.5 transition-colors hover:bg-stone-50/50 dark:hover:bg-stone-800/30"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-stone-900 dark:text-stone-100">
                        {rfq.customer}
                      </span>
                      <span className="text-[11px] text-stone-400">•</span>
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        {rfq.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-stone-400">
                      <span className="flex items-center gap-1">
                        <Phone className="size-3 text-stone-400" />
                        {rfq.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3 text-stone-400" />
                        {rfq.time}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                      rfq.status === "new"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : rfq.status === "in_progress"
                          ? "border-stone-200 bg-stone-100 text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                          : "border-stone-200 bg-stone-50 text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400"
                    }`}
                  >
                    {rfq.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
