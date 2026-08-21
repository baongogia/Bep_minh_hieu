"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { updateProductInfo } from "@/actions/admin-products";
import type { AdminProduct } from "@/types/admin-product";
import type { Database } from "@/types/database.types";

interface ProductEditModalProps {
  product: AdminProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedProduct: AdminProduct) => void;
}

type ProductStatus = Database["public"]["Enums"]["product_status"];

export function ProductEditModal({
  product,
  isOpen,
  onClose,
  onSuccess,
}: ProductEditModalProps) {
  const [price, setPrice] = useState<string>("");
  const [status, setStatus] = useState<ProductStatus | "">("");
  const [isQuoteOnly, setIsQuoteOnly] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [prevId, setPrevId] = useState<string | null>(null);

  const targetId = isOpen ? product?.id : null;
  if (targetId && targetId !== prevId) {
    setPrevId(targetId);
    setPrice(
      product?.price !== null && product?.price !== undefined
        ? String(product.price)
        : "",
    );
    setStatus(product?.status || "in_stock");
    setIsQuoteOnly(product?.is_quote_only === true);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  if (!isOpen || !product) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const parsedPrice = price === "" ? null : Number(price);

    if (parsedPrice !== null && (isNaN(parsedPrice) || parsedPrice < 0)) {
      setErrorMessage("Giá sản phẩm không hợp lệ.");
      setIsSubmitting(false);
      return;
    }

    try {
      const dataToUpdate = {
        price: isQuoteOnly ? null : parsedPrice,
        status: status === "" ? null : status,
        is_quote_only: isQuoteOnly,
      };

      const result = await updateProductInfo(product.id, dataToUpdate);

      if (!result.ok) {
        setErrorMessage(
          result.error || "Không thể cập nhật thông tin sản phẩm.",
        );
      } else {
        setSuccessMessage("Cập nhật thông tin thành công!");
        onSuccess({
          ...product,
          price: dataToUpdate.price,
          status: dataToUpdate.status,
          is_quote_only: dataToUpdate.is_quote_only,
        });
        setTimeout(() => {
          onClose();
        }, 800);
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-md border border-zinc-200 bg-white p-6 shadow-lg font-sans dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
          <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
            Sửa thông tin sản phẩm
          </h3>
          <button
            onClick={onClose}
            className="rounded-sm p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Tên sản phẩm
            </label>
            <div className="mt-1 text-sm font-medium text-zinc-850 dark:text-zinc-200">
              {product.name}
            </div>
            {product.sku && (
              <span className="font-mono text-[10px] text-zinc-405">
                SKU: {product.sku}
              </span>
            )}
          </div>

          <div className="flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="is_quote_only"
                type="checkbox"
                checked={isQuoteOnly}
                onChange={(e) => setIsQuoteOnly(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 dark:border-zinc-750"
              />
            </div>
            <div className="ml-3 text-xs">
              <label
                htmlFor="is_quote_only"
                className="font-medium text-zinc-700 dark:text-zinc-300"
              >
                Chỉ liên hệ báo giá (Yêu cầu RFQ)
              </label>
              <p className="text-zinc-500">
                Ẩn giá hiển thị trên website và hiển thị &quot;Liên hệ báo
                giá&quot;
              </p>
            </div>
          </div>

          <div className={isQuoteOnly ? "opacity-50 pointer-events-none" : ""}>
            <label
              htmlFor="price"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Giá sản phẩm (VNĐ)
            </label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={isQuoteOnly || isSubmitting}
              className="mt-1 block w-full rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-905 dark:text-zinc-50 dark:focus:border-amber-500"
              placeholder="Nhập giá sản phẩm"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Trạng thái hàng hóa
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProductStatus)}
              disabled={isSubmitting}
              className="mt-1 block w-full rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-905 dark:text-zinc-50"
            >
              <option value="in_stock">Còn hàng (In Stock)</option>
              <option value="out_of_stock">Hết hàng (Out of Stock)</option>
              <option value="made_to_order">
                Sản xuất theo đơn hàng (Made to Order)
              </option>
            </select>
          </div>

          {errorMessage && (
            <div className="rounded-sm bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-455">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="rounded-sm bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-455">
              {successMessage}
            </div>
          )}

          <div className="flex justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-sm border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-1.5 rounded-sm bg-zinc-950 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              {isSubmitting && <Loader2 className="size-3 animate-spin" />}
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
