"use client";

import { useState, useEffect } from "react";
import { X, Loader2, Save, Trash2, Check, ExternalLink } from "lucide-react";
import type { AdminProduct } from "@/types/admin-product";
import { updateProductInfo, deleteProduct } from "@/actions/admin-products";
import { ImageUploader } from "./ImageUploader";
import { ProductImageWithFallback } from "@/components/ui/ProductImageWithFallback";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { formatImageUrl, cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductDetailDrawerProps {
  product: AdminProduct | null;
  isOpen: boolean;
  categories: CategoryOption[];
  onClose: () => void;
  onUpdateSuccess: (updatedProduct: AdminProduct) => void;
  onDeleteSuccess: (productId: string) => void;
}

const statusOptions = [
  { value: "in_stock", label: "Sẵn hàng (In Stock)" },
  { value: "made_to_order", label: "Đặt hàng trước (Made to Order)" },
  { value: "out_of_stock", label: "Tạm hết hàng (Out of Stock)" },
];

export function ProductDetailDrawer({
  product,
  isOpen,
  categories,
  onClose,
  onUpdateSuccess,
  onDeleteSuccess,
}: ProductDetailDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Retain product data during slide-out exit animation even if parent passes null
  const [displayProduct, setDisplayProduct] = useState<AdminProduct | null>(
    product,
  );

  if (product && product !== displayProduct) {
    setDisplayProduct(product);
  }

  const currentProduct = product || displayProduct;

  const [prevId, setPrevId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category_id: "",
    price: "",
    is_quote_only: true,
    status: "in_stock" as "in_stock" | "out_of_stock" | "made_to_order",
    description: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Manage enter & exit animation state
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    if (isOpen && currentProduct) {
      t1 = setTimeout(() => setIsMounted(true), 0);
      t2 = setTimeout(() => setIsVisible(true), 20);
    } else {
      t1 = setTimeout(() => setIsVisible(false), 0);
      t2 = setTimeout(() => setIsMounted(false), 250);
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen, currentProduct]);

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Sync form state when product changes
  if (currentProduct && currentProduct.id !== prevId) {
    setPrevId(currentProduct.id);
    setFormData({
      name: currentProduct.name || "",
      sku: currentProduct.sku || "",
      category_id: currentProduct.category_id || "",
      price: currentProduct.price !== null ? String(currentProduct.price) : "",
      is_quote_only: currentProduct.is_quote_only ?? true,
      status: currentProduct.status || "in_stock",
      description: currentProduct.description || "",
    });
    setErrorMsg(null);
    setSaveSuccess(false);
  }

  if (!isMounted || !currentProduct) return null;

  const categorySelectOptions = [
    { value: "", label: "Chưa phân loại" },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const priceNum =
        formData.price.trim() === "" ? null : Number(formData.price);

      const payload = {
        name: formData.name,
        sku: formData.sku || null,
        category_id: formData.category_id || null,
        price: priceNum,
        is_quote_only: formData.is_quote_only,
        status: formData.status,
        description: formData.description || null,
      };

      const res = await updateProductInfo(currentProduct.id, payload);

      if (!res.ok) {
        setErrorMsg(res.error || "Không thể cập nhật sản phẩm.");
      } else {
        setSaveSuccess(true);
        const selectedCat = categories.find(
          (c) => c.id === formData.category_id,
        );

        const updated: AdminProduct = {
          ...currentProduct,
          ...payload,
          categories: selectedCat ? { name: selectedCat.name } : null,
        };

        onUpdateSuccess(updated);

        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Đã xảy ra lỗi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;
    setIsDeleting(true);
    setErrorMsg(null);

    try {
      const res = await deleteProduct(currentProduct.id);
      if (!res.ok) {
        setErrorMsg(res.error || "Không thể xóa sản phẩm.");
      } else {
        onDeleteSuccess(currentProduct.id);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Lỗi khi xóa.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop with Fade In / Fade Out */}
      <div
        className={cn(
          "fixed inset-0 bg-stone-950/30 backdrop-blur-xs transition-opacity duration-250 ease-out",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Slide-out Panel with Smooth Slide In / Slide Out Animation */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-stone-200 bg-white shadow-2xl transition-transform duration-250 ease-in-out dark:border-stone-800 dark:bg-stone-900",
          isVisible ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 dark:border-stone-800/80">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-2 rounded-full bg-stone-400" />
            <h2 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              Chi tiết sản phẩm
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/san-pham/${currentProduct.slug}`}
              target="_blank"
              title="Xem trên trang bán hàng"
              className="inline-flex items-center gap-1 rounded-md p-1.5 text-xs text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-300"
            >
              <ExternalLink className="size-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Drawer Body Form */}
        <form
          onSubmit={handleSave}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          <div className="space-y-6 p-6">
            {/* Image Preview & Upload Section */}
            <div className="flex items-start gap-4 rounded-lg border border-stone-100 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800">
                <ProductImageWithFallback
                  src={formatImageUrl(currentProduct.thumbnail_url)}
                  alt={currentProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1.5">
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Ảnh đại diện (Thumbnail)
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Tải lên ảnh mới định dạng PNG, JPG, WebP. Tối đa 5MB.
                </p>
                <div className="pt-1">
                  <ImageUploader
                    productId={currentProduct.id}
                    productSlug={currentProduct.slug}
                    currentImageUrl={currentProduct.thumbnail_url}
                    onUploadSuccess={(newUrl) => {
                      onUpdateSuccess({
                        ...currentProduct,
                        thumbnail_url: newUrl,
                      });
                    }}
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-md bg-stone-100 p-3 text-xs font-medium text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                {errorMsg}
              </div>
            )}

            {/* Product Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                  Tên sản phẩm <span className="text-stone-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-stone-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                    Mã SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                    placeholder="VD: BMH-INX-01"
                    className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 font-mono text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-stone-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
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

              {/* Pricing & Status */}
              <div className="space-y-3 rounded-md border border-stone-100 bg-stone-50/50 p-4 dark:border-stone-800/60 dark:bg-stone-950/40">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-stone-700 dark:text-stone-300">
                    Báo giá theo yêu cầu (Quote Only)
                  </label>
                  <input
                    type="checkbox"
                    checked={formData.is_quote_only}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_quote_only: e.target.checked,
                      })
                    }
                    className="size-4 rounded-xs border-stone-300 text-stone-900 focus:ring-stone-400 dark:border-stone-700 dark:bg-stone-900"
                  />
                </div>

                {!formData.is_quote_only && (
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                      Giá niêm yết (VND)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="0"
                      className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 font-mono text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                    Trạng thái kho hàng
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

              {/* Description */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                  Mô tả sản phẩm
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Nhập chi tiết kỹ thuật hoặc thông tin sản phẩm..."
                  className="mt-1.5 w-full rounded-md border border-stone-200 bg-white p-3 text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
                />
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="mt-auto flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-6 py-4 dark:border-stone-800 dark:bg-stone-950/60">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
            >
              {isDeleting ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5 text-stone-500" />
              )}
              Xóa sản phẩm
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-stone-200 bg-white px-3.5 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-1.5 rounded-md bg-stone-900 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-stone-800 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                {isSaving ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : saveSuccess ? (
                  <Check className="size-3.5 text-emerald-400 dark:text-emerald-600" />
                ) : (
                  <Save className="size-3.5" />
                )}
                {saveSuccess ? "Đã lưu" : "Lưu thay đổi"}
              </button>
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}
