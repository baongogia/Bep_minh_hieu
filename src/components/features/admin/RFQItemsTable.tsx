"use client";

import React from "react";
import Image from "next/image";
import type { RFQItemWithProduct } from "@/types/admin-rfq";

interface RFQItemsTableProps {
  items: RFQItemWithProduct[];
}

export function RFQItemsTable({ items }: RFQItemsTableProps) {
  return (
    <div className="space-y-3 font-sans">
      <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Danh sách thiết bị yêu cầu ({items.length})
      </h4>

      <div className="rounded-sm border border-zinc-200 overflow-hidden dark:border-zinc-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50/50 font-bold uppercase text-[9px] tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50">
              <th className="px-4 py-2.5 w-16">Ảnh</th>
              <th className="px-4 py-2.5">Sản phẩm</th>
              <th className="px-4 py-2.5 text-center w-20">SL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {items.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-4 py-3">
                  <div className="relative aspect-square w-10 overflow-hidden rounded bg-zinc-50 border border-zinc-100 dark:bg-zinc-900 dark:border-zinc-800">
                    {item.thumbnail_url ? (
                      <Image
                        src={item.thumbnail_url}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[8px] text-zinc-400">
                        No image
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.product_name}
                  </div>
                  {item.sku && (
                    <div className="font-mono text-[9px] text-zinc-400 mt-0.5">
                      SKU: {item.sku}
                    </div>
                  )}
                  {item.custom_specifications && (
                    <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 p-1.5 rounded-sm italic">
                      Spec yêu cầu: {item.custom_specifications}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-center font-mono font-bold text-zinc-800 dark:text-zinc-300">
                  {item.quantity || 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
