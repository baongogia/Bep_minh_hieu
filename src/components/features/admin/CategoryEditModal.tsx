"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createCategory, updateCategory } from "@/actions/admin-categories";
import type { Tables } from "@/types/database.types";

interface CategoryEditModalProps {
  category: Tables<"categories"> | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function slugify(text: string): string {
  let str = text.toLowerCase().trim();
  str = str.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, "a");
  str = str.replace(/[éèẻẽẹêếềểễệ]/g, "e");
  str = str.replace(/[íìỉĩị]/g, "i");
  str = str.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, "o");
  str = str.replace(/[úùủũụưứừửữự]/g, "u");
  str = str.replace(/[ýỳỷỹỵ]/g, "y");
  str = str.replace(/đ/g, "d");
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
}

export function CategoryEditModal({
  category,
  isOpen,
  onClose,
  onSuccess,
}: CategoryEditModalProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [prevId, setPrevId] = useState<string | null>(null);

  const targetId = isOpen ? category?.id || "NEW" : null;
  if (targetId && targetId !== prevId) {
    setPrevId(targetId);
    setName(category?.name || "");
    setSlug(category?.slug || "");
    setErrorMsg(null);
    setSuccessMsg(null);
  }

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setSlug(slugify(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setErrorMsg("Vui lòng nhập đầy đủ tên và slug.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      let result;
      if (category) {
        result = await updateCategory(category.id, name, slug);
      } else {
        result = await createCategory(name, slug);
      }

      if (!result.ok) {
        setErrorMsg(result.error || "Có lỗi xảy ra.");
      } else {
        setSuccessMsg(
          category ? "Cập nhật thành công!" : "Tạo danh mục thành công!",
        );
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 800);
      }
    } catch (err) {
      setErrorMsg(
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
            {category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
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
            <label
              htmlFor="category-name"
              className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Tên danh mục
            </label>
            <input
              id="category-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              disabled={isSubmitting}
              required
              className="mt-1 block w-full rounded-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="Ví dụ: Thiết bị bếp công nghiệp"
            />
          </div>

          <div>
            <label
              htmlFor="category-slug"
              className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
            >
              Slug
            </label>
            <input
              id="category-slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              disabled={isSubmitting}
              required
              className="mt-1 block w-full rounded-sm border border-zinc-200 bg-white px-3 py-2 font-mono text-sm text-zinc-900 shadow-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50"
              placeholder="thiet-bi-bep-cong-nghiep"
            />
          </div>

          {errorMsg && (
            <div className="rounded-sm bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="rounded-sm bg-emerald-50 p-3 text-xs text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-450">
              {successMsg}
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
              {category ? "Lưu thay đổi" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
