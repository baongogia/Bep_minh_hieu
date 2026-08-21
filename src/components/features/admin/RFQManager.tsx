"use client";

import { useState } from "react";
import { Eye, FileSpreadsheet } from "lucide-react";
import type { Tables } from "@/types/database.types";
import type { RFQStatus } from "@/types/admin-rfq";
import { RFQDetailsDrawer } from "./RFQDetailsDrawer";

interface RFQManagerProps {
  initialRfqs: Tables<"rfq_requests">[];
}

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  try {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return "—";
  }
}

function StatusBadge({ status }: { status: string | null }) {
  switch (status) {
    case "pending":
      return (
        <span className="inline-flex items-center rounded-sm border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-750 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400">
          Mới
        </span>
      );
    case "contacted":
      return (
        <span className="inline-flex items-center rounded-sm border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-750 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-400">
          Đã liên hệ
        </span>
      );
    case "quoted":
      return (
        <span className="inline-flex items-center rounded-sm border border-orange-200 bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-750 dark:border-orange-900/60 dark:bg-orange-950/40 dark:text-orange-400">
          Đã báo giá
        </span>
      );
    case "completed":
      return (
        <span className="inline-flex items-center rounded-sm border border-zinc-200 bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          Hoàn thành
        </span>
      );
    case "cancelled":
      return (
        <span className="inline-flex items-center rounded-sm border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-750 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400">
          Đã hủy
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center rounded-sm border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
          Không rõ
        </span>
      );
  }
}

export function RFQManager({ initialRfqs }: RFQManagerProps) {
  const [rfqs, setRfqs] = useState<Tables<"rfq_requests">[]>(initialRfqs);
  const [selectedRfqId, setSelectedRfqId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenDrawer = (rfqId: string) => {
    setSelectedRfqId(rfqId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedRfqId(null);
  };

  const handleStatusChange = (rfqId: string, newStatus: RFQStatus) => {
    setRfqs((prev) =>
      prev.map((r) => (r.id === rfqId ? { ...r, status: newStatus } : r)),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-sans text-xs text-zinc-500">
          Tổng số:{" "}
          <span className="font-mono font-semibold">{rfqs.length}</span> yêu cầu
        </div>
      </div>

      <div className="overflow-hidden rounded-sm border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/50 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
                <th className="whitespace-nowrap px-6 py-3.5 w-28">Mã Y/C</th>
                <th className="whitespace-nowrap px-6 py-3.5">Khách hàng</th>
                <th className="whitespace-nowrap px-6 py-3.5 w-44">Ngày gửi</th>
                <th className="whitespace-nowrap px-6 py-3.5 text-center w-28">
                  Trạng thái
                </th>
                <th className="whitespace-nowrap px-6 py-3.5 text-center w-28">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-xs dark:divide-zinc-800">
              {rfqs.length > 0 ? (
                rfqs.map((rfq) => (
                  <tr
                    key={rfq.id}
                    className="hover:bg-zinc-50/40 dark:hover:bg-zinc-900/10"
                  >
                    <td className="px-6 py-4 font-mono font-semibold text-zinc-900 dark:text-zinc-50">
                      #RFQ-{rfq.id.substring(0, 8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-sans font-semibold text-zinc-900 dark:text-zinc-50">
                        {rfq.customer_name}
                      </div>
                      <div className="mt-0.5 font-sans text-[11px] font-semibold text-zinc-700 dark:text-zinc-350">
                        {rfq.phone}
                      </div>
                      {rfq.company_name && (
                        <div className="text-[10px] text-zinc-400 mt-0.5">
                          {rfq.company_name}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono text-zinc-500 dark:text-zinc-400">
                      {formatDate(rfq.created_at)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={rfq.status} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleOpenDrawer(rfq.id)}
                        className="inline-flex items-center gap-1 rounded-sm border border-zinc-200 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                      >
                        <Eye className="size-3" />
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-zinc-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FileSpreadsheet className="size-8 text-zinc-300 dark:text-zinc-700" />
                      <span className="font-sans text-xs">
                        Chưa có yêu cầu báo giá nào.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RFQDetailsDrawer
        rfqId={selectedRfqId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
