"use client";

import { useState } from "react";
import { X, Loader2, Plus } from "lucide-react";
import { createAdminProduct } from "@/actions/admin-products";
import type { AdminProduct } from "@/types/admin-product";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface CategoryOption {
  id: string;
  name: string;
}

interface CreateProductModalProps {
  isOpen: boolean;
  categories: CategoryOption[];
  onClose: () => void;
  onSuccess: (newProduct: AdminProduct) => void;
}

const statusOptions = [
  { value: "in_stock", label: "Sẵn hàng (In Stock)" },
  { value: "made_to_order", label: "Đặt trước (Made to Order)" },
  { value: "out_of_stock", label: "Tạm hết hàng (Out of Stock)" },
];

export function CreateProductModal({
  isOpen,
  categories,
  onClose,
  onSuccess,
}: CreateProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    category_id: "",
    price: "",
    is_quote_only: true,
    status: "in_stock" as "in_stock" | "out_of_stock" | "made_to_order",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const categorySelectOptions = [
    { value: "", label: "Chưa phân loại" },
    ...categories.map((c) => ({ value: c.id, label: c.name })),
  ];

  const generateSlug = (nameStr: string) => {
    return nameStr
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug:
        prev.slug === "" || prev.slug === generateSlug(prev.name)
          ? generateSlug(val)
          : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const priceNum =
        formData.price.trim() === "" ? null : Number(formData.price);

      const payload = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        sku: formData.sku || null,
        category_id: formData.category_id || null,
        price: priceNum,
        is_quote_only: formData.is_quote_only,
        status: formData.status,
        description: formData.description || null,
      };

      const res = await createAdminProduct(payload);

      if (!res.ok) {
        setErrorMsg(res.error || "Không thể tạo sản phẩm mới.");
      } else {
        onSuccess(res.data);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Lỗi không xác định.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
      <div
        className="fixed inset-0 bg-stone-950/30 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-lg border border-stone-200 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900">
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 dark:border-stone-800/80">
          <h3 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
            Thêm sản phẩm mới
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {errorMsg && (
            <div className="rounded-md bg-stone-100 p-3 text-xs font-medium text-stone-800 dark:bg-stone-800 dark:text-stone-200">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300">
              Tên sản phẩm *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleNameChange}
              placeholder="VD: Bàn inox 3 tầng giá phẳng"
              className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 font-mono text-xs text-stone-900 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                Danh mục
              </label>
              <div className="mt-1.5">
                <CustomSelect
                  options={categorySelectOptions}
                  value={formData.category_id}
                  onChange={(val) =>
                    setFormData({ ...formData, category_id: val })
                  }
                  placeholder="Chưa phân loại"
                  size="md"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
                placeholder="SKU sản phẩm"
                className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 font-mono text-xs text-stone-900 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                Trạng thái
              </label>
              <div className="mt-1.5">
                <CustomSelect
                  options={statusOptions}
                  value={formData.status}
                  onChange={(val) =>
                    setFormData({
                      ...formData,
                      status: val as
                        "in_stock" | "out_of_stock" | "made_to_order",
                    })
                  }
                  size="md"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-stone-100 bg-stone-50 p-3 dark:border-stone-800 dark:bg-stone-800/40">
            <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
              Liên hệ báo giá (Bỏ giá niêm yết)
            </label>
            <input
              type="checkbox"
              checked={formData.is_quote_only}
              onChange={(e) =>
                setFormData({ ...formData, is_quote_only: e.target.checked })
              }
              className="size-4 rounded-xs border-stone-300 text-stone-900 focus:ring-stone-400"
            />
          </div>

          {!formData.is_quote_only && (
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                Giá bán (VND)
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 font-mono text-xs text-stone-900 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              {isSubmitting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Plus className="size-3.5" />
              )}
              Tạo sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
