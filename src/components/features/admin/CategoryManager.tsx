"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  FolderTree,
  AlertCircle,
  MoreVertical,
  Edit2,
  Trash2,
  Folder,
} from "lucide-react";
import type { AdminCategory } from "@/actions/admin-categories";
import { deleteCategory } from "@/actions/admin-categories";
import { CategoryDetailDrawer } from "./CategoryDetailDrawer";
import { formatImageUrl } from "@/lib/utils";
import Image from "next/image";

interface CategoryManagerProps {
  initialCategories: AdminCategory[];
}

export function CategoryManager({ initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] =
    useState<AdminCategory[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<AdminCategory | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filter categories by search term
  const filteredCategories = useMemo(() => {
    const term = searchQuery.toLowerCase().trim();
    if (!term) return categories;
    return categories.filter(
      (cat) =>
        (cat.name && cat.name.toLowerCase().includes(term)) ||
        (cat.slug && cat.slug.toLowerCase().includes(term)) ||
        (cat.description && cat.description.toLowerCase().includes(term)),
    );
  }, [categories, searchQuery]);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsDrawerOpen(true);
  };

  const handleRowClick = (cat: AdminCategory) => {
    setSelectedCategory(cat);
    setIsDrawerOpen(true);
  };

  const handleSingleDelete = async (
    id: string,
    name: string,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setActiveMenuId(null);

    if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${name}"?`)) {
      return;
    }

    setErrorMsg(null);

    try {
      const res = await deleteCategory(id);
      if (!res.ok) {
        setErrorMsg(res.error || "Không thể xóa danh mục này.");
      } else {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        if (selectedCategory?.id === id) {
          setIsDrawerOpen(false);
        }
      }
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi xóa danh mục.",
      );
    }
  };

  const handleDrawerSuccess = (updatedCat: AdminCategory, isNew: boolean) => {
    if (isNew) {
      setCategories((prev) => [updatedCat, ...prev]);
    } else {
      setCategories((prev) =>
        prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)),
      );
      if (selectedCategory?.id === updatedCat.id) {
        setSelectedCategory(updatedCat);
      }
    }
  };

  const handleDrawerDeleteSuccess = (deletedId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== deletedId));
  };

  return (
    <div className="space-y-4 font-sans text-stone-900 dark:text-stone-100">
      {/* Sticky Top Bar Toolbar */}
      <div className="sticky top-0 z-20 rounded-md border border-stone-200/80 bg-white/95 p-3 shadow-2xs backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-900/95">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Tìm theo tên hoặc slug danh mục..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border-0 bg-stone-100 py-1.5 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-stone-950 dark:focus:ring-stone-700"
              />
            </div>

            <span className="text-xs text-stone-500">
              Tổng số:{" "}
              <strong className="font-mono text-stone-800 dark:text-stone-200">
                {filteredCategories.length}
              </strong>{" "}
              danh mục
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className="inline-flex items-center justify-center gap-1.5 rounded-md bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
          >
            <Plus className="size-3.5" />
            Thêm danh mục
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-md bg-rose-50 p-3 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">
          <AlertCircle className="size-4 shrink-0 text-rose-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Category Table */}
      <div className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-2xs dark:border-stone-800 dark:bg-stone-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left font-sans text-xs">
            <thead>
              <tr className="border-b border-stone-200/80 bg-stone-50/70 text-[11px] font-semibold tracking-wider text-stone-500 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-400">
                <th className="w-16 px-4 py-3 text-center">Ảnh</th>
                <th className="px-4 py-3">Tên danh mục & Mô tả</th>
                <th className="px-4 py-3">Slug</th>
                <th className="w-24 px-4 py-3 text-center">Thứ tự</th>
                <th className="w-12 px-4 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => {
                  const formattedImg = formatImageUrl(cat.image_url);
                  return (
                    <tr
                      key={cat.id}
                      onClick={() => handleRowClick(cat)}
                      className="group cursor-pointer transition-colors hover:bg-stone-50/70 dark:hover:bg-stone-800/40"
                    >
                      {/* Thumbnail Column */}
                      <td className="px-4 py-2.5">
                        <div className="relative size-12 overflow-hidden rounded-md border border-stone-200/80 bg-stone-100 flex items-center justify-center dark:border-stone-800 dark:bg-stone-800">
                          {formattedImg ? (
                            <Image
                              src={formattedImg}
                              alt={cat.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <Folder className="size-5 text-stone-300 dark:text-stone-600" />
                          )}
                        </div>
                      </td>

                      {/* Name & Description */}
                      <td className="px-4 py-2.5">
                        <div className="space-y-0.5">
                          <p className="font-semibold text-stone-900 group-hover:text-stone-950 dark:text-stone-100 dark:group-hover:text-white">
                            {cat.name}
                          </p>
                          {cat.description && (
                            <p className="line-clamp-1 text-[11px] text-stone-500 dark:text-stone-400">
                              {cat.description}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Slug Column */}
                      <td className="px-4 py-2.5">
                        <span className="inline-block rounded-xs border border-stone-200/60 bg-stone-100 px-2 py-0.5 font-mono text-[11px] text-stone-600 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300">
                          {cat.slug}
                        </span>
                      </td>

                      {/* Sort Order Column */}
                      <td className="px-4 py-2.5 text-center font-mono text-xs text-stone-600 dark:text-stone-400">
                        {cat.sort_order ?? 0}
                      </td>

                      {/* 3-Dot Dropdown Actions */}
                      <td
                        className="px-4 py-2.5 text-right relative"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setActiveMenuId(
                                activeMenuId === cat.id ? null : cat.id,
                              )
                            }
                            className="rounded-md p-1 text-stone-400 opacity-60 transition-opacity hover:bg-stone-100 hover:text-stone-700 group-hover:opacity-100 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                          >
                            <MoreVertical className="size-4" />
                          </button>

                          {activeMenuId === cat.id && (
                            <div
                              className="absolute right-0 top-full z-30 mt-1 w-36 rounded-md border border-stone-200 bg-white p-1 text-xs shadow-lg dark:border-stone-800 dark:bg-stone-900"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  handleRowClick(cat);
                                }}
                                className="flex w-full items-center gap-2 rounded-xs px-2.5 py-1.5 font-medium text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                              >
                                <Edit2 className="size-3.5 text-stone-500" />
                                Chỉnh sửa
                              </button>

                              <button
                                onClick={(e) =>
                                  handleSingleDelete(cat.id, cat.name, e)
                                }
                                className="flex w-full items-center gap-2 rounded-xs px-2.5 py-1.5 font-medium text-rose-600 hover:bg-stone-100 dark:text-rose-400 dark:hover:bg-stone-800"
                              >
                                <Trash2 className="size-3.5" />
                                Xóa
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-stone-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FolderTree className="size-8 text-stone-300 dark:text-stone-700" />
                      <span className="text-xs">
                        Không tìm thấy danh mục nào.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Category Detail Drawer */}
      <CategoryDetailDrawer
        category={selectedCategory}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSuccess={handleDrawerSuccess}
        onDeleteSuccess={handleDrawerDeleteSuccess}
      />
    </div>
  );
}
