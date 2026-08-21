"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { getRFQDetails, updateRFQStatus } from "@/actions/admin-rfqs";
import type { RFQDetails, RFQStatus } from "@/types/admin-rfq";
import { RFQCustomerProfile } from "./RFQCustomerProfile";
import { RFQItemsTable } from "./RFQItemsTable";

interface RFQDetailsDrawerProps {
  rfqId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (rfqId: string, newStatus: RFQStatus) => void;
}

export function RFQDetailsDrawer({
  rfqId,
  isOpen,
  onClose,
  onStatusChange,
}: RFQDetailsDrawerProps) {
  const [rfq, setRfq] = useState<RFQDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && rfqId) {
      const loadDetails = async () => {
        setIsLoading(true);
        setErrorMsg(null);
        setRfq(null);
        try {
          const result = await getRFQDetails(rfqId);
          if (result.ok) {
            setRfq(result.data);
          } else {
            setErrorMsg(result.error || "Không thể tải chi tiết yêu cầu.");
          }
        } catch (err) {
          setErrorMsg(
            err instanceof Error ? err.message : "Đã xảy ra lỗi kết nối.",
          );
        } finally {
          setIsLoading(false);
        }
      };
      loadDetails();
    }
  }, [rfqId, isOpen]);

  if (!isOpen) return null;

  const handleStatusUpdate = async (newStatus: RFQStatus) => {
    if (!rfq) return;
    setIsUpdating(true);
    setErrorMsg(null);
    try {
      const result = await updateRFQStatus(rfq.id, newStatus);
      if (result.ok) {
        setRfq((prev) => (prev ? { ...prev, status: newStatus } : null));
        onStatusChange(rfq.id, newStatus);
      } else {
        setErrorMsg(result.error || "Không thể cập nhật trạng thái.");
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Đã xảy ra lỗi cập nhật.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative flex h-full w-full max-w-xl flex-col border-l border-zinc-200 bg-white font-sans shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-none items-center justify-between border-b border-zinc-200 p-5 dark:border-zinc-800">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
              Chi tiết Yêu cầu Báo giá
            </h3>
            {rfqId && (
              <span className="font-mono text-xs text-zinc-500">
                #RFQ-{rfqId.substring(0, 8).toUpperCase()}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-sm p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="size-6 animate-spin text-zinc-500" />
            </div>
          ) : errorMsg ? (
            <div className="rounded-sm bg-rose-50 p-4 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
              {errorMsg}
            </div>
          ) : rfq ? (
            <>
              <RFQCustomerProfile
                rfq={rfq}
                isUpdating={isUpdating}
                onStatusUpdate={handleStatusUpdate}
              />
              <RFQItemsTable items={rfq.items} />
            </>
          ) : (
            <div className="text-center text-zinc-500 text-xs py-8">
              Không tìm thấy thông tin.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
