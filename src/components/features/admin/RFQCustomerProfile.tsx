"use client";

import React from "react";
import { Building, Phone, Mail, MapPin, FileText, Loader2 } from "lucide-react";
import type { RFQDetails, RFQStatus } from "@/types/admin-rfq";

interface RFQCustomerProfileProps {
  rfq: RFQDetails;
  isUpdating: boolean;
  onStatusUpdate: (newStatus: RFQStatus) => void;
}

export function RFQCustomerProfile({
  rfq,
  isUpdating,
  onStatusUpdate,
}: RFQCustomerProfileProps) {
  return (
    <div className="rounded-sm border border-zinc-200 bg-zinc-50/30 p-4 space-y-3.5 dark:border-zinc-800 dark:bg-zinc-900/20 font-sans text-xs">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
            {rfq.customer_name}
          </h4>
          {rfq.company_name && (
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mt-0.5">
              <Building className="size-3.5" />
              <span>{rfq.company_name}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isUpdating && (
            <Loader2 className="size-3.5 animate-spin text-zinc-500" />
          )}
          <select
            value={rfq.status || "pending"}
            disabled={isUpdating}
            onChange={(e) => onStatusUpdate(e.target.value as RFQStatus)}
            className="rounded-sm border border-zinc-200 bg-white px-2 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
          >
            <option value="pending">Mới</option>
            <option value="contacted">Đã liên hệ</option>
            <option value="quoted">Đã báo giá</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs border-t border-zinc-200 pt-3 dark:border-zinc-800/60">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
          <Phone className="size-3.5 text-zinc-400 shrink-0" />
          <span className="font-semibold">{rfq.phone}</span>
        </div>
        {rfq.email && (
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <Mail className="size-3.5 text-zinc-400 shrink-0" />
            <span>{rfq.email}</span>
          </div>
        )}
        {rfq.project_location && (
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 sm:col-span-2 mt-1">
            <MapPin className="size-3.5 text-zinc-400 shrink-0" />
            <span>{rfq.project_location}</span>
          </div>
        )}
      </div>

      {rfq.notes && (
        <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800/60">
          <div className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
            <FileText className="size-3.5 text-zinc-400 mt-0.5 shrink-0" />
            <div className="whitespace-pre-wrap italic font-sans">
              &quot;{rfq.notes}&quot;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
