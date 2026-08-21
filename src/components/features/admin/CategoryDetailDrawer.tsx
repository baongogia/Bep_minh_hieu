"use client";

import { useState, useEffect, useRef } from "react";
import { X, Loader2, Save, Trash2, Check, Folder, Upload } from "lucide-react";
import type { AdminCategory } from "@/actions/admin-categories";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/actions/admin-categories";
import { formatImageUrl, slugifyFilename, cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface CategoryDetailDrawerProps {
  category: AdminCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedCategory: AdminCategory, isNew: boolean) => void;
  onDeleteSuccess: (categoryId: string) => void;
}

export function CategoryDetailDrawer({
  category,
  isOpen,
  onClose,
  onSuccess,
  onDeleteSuccess,
}: CategoryDetailDrawerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Retain category data during slide-out exit animation even if parent passes null
  const [displayCategory, setDisplayCategory] = useState<AdminCategory | null>(
    category,
  );

  if (category && category !== displayCategory) {
    setDisplayCategory(category);
  }

  const currentCategory = category || displayCategory;
  const isEditing = Boolean(category?.id);

  const [prevId, setPrevId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    image_url: "",
    description: "",
    sort_order: 0,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manage enter & exit animation state
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;
    if (isOpen) {
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
  }, [isOpen]);

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

  // Sync form state when category prop changes
  const targetId = isOpen ? category?.id || "NEW" : null;
  if (targetId && targetId !== prevId) {
    setPrevId(targetId);
    setFormData({
      name: category?.name || "",
      slug: category?.slug || "",
      image_url: category?.image_url || "",
      description: category?.description || "",
      sort_order: category?.sort_order ?? 0,
    });
    setErrorMsg(null);
    setSaveSuccess(false);
  }

  if (!isMounted) return null;

  const generateSlug = (nameStr: string) => {
    return nameStr
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
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

  // Image Upload Handler
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Vui lòng chọn file hình ảnh (png, jpg, webp, ...).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg("Kích thước ảnh tối đa là 5MB.");
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const ext = file.name.includes(".")
        ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
        : ".jpg";

      const baseSlug = formData.slug || formData.name || "category";
      const cleanSlug = slugifyFilename(baseSlug).replace(/\.[^/.]+$/, "");
      const filePath = `category-${cleanSlug}-${Date.now()}${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`Upload storage thất bại: ${uploadError.message}`);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("products").getPublicUrl(filePath);

      if (!publicUrl) {
        throw new Error("Không lấy được Public URL của ảnh.");
      }

      setFormData((prev) => ({ ...prev, image_url: publicUrl }));
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải ảnh.",
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMsg(null);
    setSaveSuccess(false);

    try {
      const payload = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        image_url: formData.image_url || null,
        description: formData.description || null,
        sort_order: Number(formData.sort_order) || 0,
      };

      if (isEditing && currentCategory) {
        const res = await updateCategory(currentCategory.id, payload);
        if (!res.ok) {
          setErrorMsg(res.error || "Không thể cập nhật danh mục.");
        } else {
          setSaveSuccess(true);
          const updatedCat: AdminCategory = {
            ...currentCategory,
            ...payload,
          };
          onSuccess(updatedCat, false);
          setTimeout(() => setSaveSuccess(false), 1500);
        }
      } else {
        const res = await createCategory(payload);
        if (!res.ok) {
          setErrorMsg(res.error || "Không thể tạo danh mục.");
        } else {
          setSaveSuccess(true);
          onSuccess(res.data, true);
          setTimeout(() => {
            setSaveSuccess(false);
            onClose();
          }, 500);
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Đã xảy ra lỗi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!currentCategory) return;
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa danh mục "${currentCategory.name}"?`,
      )
    ) {
      return;
    }

    setIsDeleting(true);
    setErrorMsg(null);

    try {
      const res = await deleteCategory(currentCategory.id);
      if (!res.ok) {
        setErrorMsg(res.error || "Không thể xóa danh mục này.");
      } else {
        onDeleteSuccess(currentCategory.id);
        onClose();
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Lỗi khi xóa danh mục.");
    } finally {
      setIsDeleting(false);
    }
  };

  const formattedImgUrl = formatImageUrl(formData.image_url);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-stone-950/30 backdrop-blur-xs transition-opacity duration-250 ease-out",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-stone-200 bg-white shadow-2xl transition-transform duration-250 ease-in-out dark:border-stone-800 dark:bg-stone-900",
          isVisible ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4 dark:border-stone-800/80">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-2.5 rounded-full bg-stone-400" />
            <h2 className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-100">
              {isEditing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Drawer Form */}
        <form
          onSubmit={handleSave}
          className="flex flex-1 flex-col overflow-y-auto"
        >
          <div className="space-y-5 p-6">
            {errorMsg && (
              <div className="rounded-md bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
                {errorMsg}
              </div>
            )}

            {/* Thumbnail Upload Section */}
            <div className="flex items-start gap-4 rounded-lg border border-stone-100 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-800/40">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800 flex items-center justify-center">
                {formattedImgUrl ? (
                  <Image
                    src={formattedImgUrl}
                    alt={formData.name || "Category image"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Folder className="size-8 text-stone-300 dark:text-stone-600" />
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">
                  Ảnh đại diện danh mục
                </p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Tải lên ảnh thumbnail danh mục (PNG, JPG, WebP).
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1 rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-700 shadow-2xs hover:bg-stone-50 disabled:opacity-50 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  >
                    {isUploading ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      <Upload className="size-3 text-stone-500" />
                    )}
                    {formData.image_url ? "Thay đổi" : "Tải ảnh"}
                  </button>

                  {formData.image_url && (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, image_url: "" })
                      }
                      className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
                    >
                      Xóa ảnh
                    </button>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Category Name */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                Tên danh mục <span className="text-stone-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder="VD: Bếp công nghiệp Inox"
                className="mt-1.5 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>

            {/* Category Slug */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                Đường dẫn (Slug) <span className="text-stone-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="bep-cong-nghiep-inox"
                className="mt-1.5 w-full rounded-md border border-stone-200 bg-stone-50/70 px-3 py-2 font-mono text-xs text-stone-900 shadow-2xs focus:bg-white focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                Thứ tự hiển thị (Sort order)
              </label>
              <input
                type="number"
                value={formData.sort_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sort_order: Number(e.target.value),
                  })
                }
                placeholder="0"
                className="mt-1.5 w-full max-w-[120px] rounded-md border border-stone-200 bg-white px-3 py-2 font-mono text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[11px] font-semibold tracking-wide text-stone-600 dark:text-stone-400">
                Mô tả ngắn
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Tóm tắt ngắn gọn ngành hàng danh mục này..."
                className="mt-1.5 w-full rounded-md border border-stone-200 bg-white p-3 text-xs text-stone-900 shadow-2xs focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-300 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="mt-auto flex items-center justify-between border-t border-stone-100 bg-stone-50/50 px-6 py-4 dark:border-stone-800 dark:bg-stone-950/60">
            {isEditing ? (
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
                Xóa danh mục
              </button>
            ) : (
              <div />
            )}

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
                {saveSuccess
                  ? "Đã lưu"
                  : isEditing
                    ? "Lưu thay đổi"
                    : "Tạo danh mục"}
              </button>
            </div>
          </div>
        </form>
      </aside>
    </div>
  );
}
