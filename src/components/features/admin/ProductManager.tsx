"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Plus,
  Trash2,
  MoreVertical,
  Edit2,
  FolderInput,
  CheckSquare,
  Square,
  MinusSquare,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import type { AdminProduct } from "@/types/admin-product";
import {
  bulkDeleteProducts,
  bulkUpdateProductCategory,
  deleteProduct,
} from "@/actions/admin-products";
import { ProductDetailDrawer } from "./ProductDetailDrawer";
import { CreateProductModal } from "./CreateProductModal";
import { ProductImageWithFallback } from "@/components/ui/ProductImageWithFallback";
import { formatImageUrl } from "@/lib/utils";
import { CustomSelect, type SelectOption } from "@/components/ui/CustomSelect";

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductManagerProps {
  initialProducts: AdminProduct[];
  categories?: CategoryOption[];
}

export function ProductManager({
  initialProducts,
  categories = [],
}: ProductManagerProps) {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Row Selection (Bulk Actions)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Active Dropdown Menu
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Drawer & Modal State
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(
    null,
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Bulk Actions Loading State
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [isBulkCategoryUpdating, setIsBulkCategoryUpdating] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Extract unique category options from products if not explicitly passed
  const categoryOptions = useMemo(() => {
    if (categories.length > 0) return categories;

    const map = new Map<string, string>();
    products.forEach((p) => {
      if (p.category_id && p.categories?.name) {
        map.set(p.category_id, p.categories.name);
      }
    });

    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [categories, products]);

  const categoryFilterOptions: SelectOption[] = useMemo(() => {
    return [
      { value: "", label: `Tất cả danh mục (${products.length})` },
      ...categoryOptions.map((c) => ({ value: c.id, label: c.name })),
    ];
  }, [categoryOptions, products.length]);

  const bulkCategoryOptions: SelectOption[] = useMemo(() => {
    return [
      { value: "", label: "Đổi danh mục hàng loạt..." },
      ...categoryOptions.map((c) => ({ value: c.id, label: c.name })),
    ];
  }, [categoryOptions]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const term = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !term ||
        (product.name && product.name.toLowerCase().includes(term)) ||
        (product.sku && product.sku.toLowerCase().includes(term));

      const matchesCategory =
        !selectedCategory || product.category_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Bulk selection calculations
  const allFilteredIds = useMemo(
    () => filteredProducts.map((p) => p.id),
    [filteredProducts],
  );

  const isAllSelected =
    allFilteredIds.length > 0 &&
    allFilteredIds.every((id) => selectedIds.includes(id));

  const isSomeSelected =
    selectedIds.length > 0 &&
    !isAllSelected &&
    allFilteredIds.some((id) => selectedIds.includes(id));

  const handleSelectAllToggle = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allFilteredIds);
    }
  };

  const handleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // Bulk Delete Handler
  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedIds.length} sản phẩm đã chọn?`,
      )
    ) {
      return;
    }

    setIsBulkDeleting(true);
    setErrorMsg(null);

    try {
      const res = await bulkDeleteProducts(selectedIds);
      if (!res.ok) {
        setErrorMsg(res.error || "Không thể xóa các sản phẩm đã chọn.");
      } else {
        setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
        setSelectedIds([]);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Lỗi khi xóa.");
    } finally {
      setIsBulkDeleting(false);
    }
  };

  // Bulk Category Update Handler
  const handleBulkCategoryChange = async (targetCatId: string) => {
    if (!targetCatId) return;

    setIsBulkCategoryUpdating(true);
    setErrorMsg(null);

    try {
      const res = await bulkUpdateProductCategory(selectedIds, targetCatId);
      if (!res.ok) {
        setErrorMsg(res.error || "Không thể chuyển danh mục.");
      } else {
        const catName =
          categoryOptions.find((c) => c.id === targetCatId)?.name || "";

        setProducts((prev) =>
          prev.map((p) =>
            selectedIds.includes(p.id)
              ? {
                  ...p,
                  category_id: targetCatId,
                  categories: catName ? { name: catName } : p.categories,
                }
              : p,
          ),
        );
        setSelectedIds([]);
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Lỗi khi đổi danh mục.");
    } finally {
      setIsBulkCategoryUpdating(false);
    }
  };

  // Single Row Handlers
  const handleRowClick = (product: AdminProduct) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleSingleDelete = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveMenuId(null);

    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      const res = await deleteProduct(productId);
      if (!res.ok) {
        setErrorMsg(res.error || "Không thể xóa sản phẩm.");
      } else {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        if (selectedProduct?.id === productId) {
          setIsDrawerOpen(false);
        }
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Lỗi khi xóa.");
    }
  };

  const handleUpdateSuccess = (updatedProduct: AdminProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    if (selectedProduct?.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
  };

  const handleCreateSuccess = (newProduct: AdminProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Format Status Badge
  const renderStatusBadge = (
    status: AdminProduct["status"],
    isQuoteOnly: boolean | null,
    price: number | null,
  ) => {
    if (isQuoteOnly === true || price === null) {
      return (
        <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300">
          Liên hệ báo giá
        </span>
      );
    }

    if (status === "made_to_order") {
      return (
        <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-[11px] font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
          Đặt làm theo yêu cầu
        </span>
      );
    }

    if (status === "out_of_stock") {
      return (
        <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-100/60 px-2.5 py-0.5 text-[11px] font-medium text-stone-400 dark:border-stone-800 dark:text-stone-500">
          Tạm hết hàng
        </span>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-[11px] font-medium text-stone-700 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-200">
        Sẵn hàng
      </span>
    );
  };

  return (
    <div className="space-y-4 font-sans text-stone-900 dark:text-stone-100">
      {/* Sticky Top Toolbar */}
      <div className="sticky top-0 z-20 rounded-md border border-stone-200/80 bg-white/95 p-3 shadow-2xs backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-900/95">
        {selectedIds.length > 0 ? (
          /* Transform Toolbar to Bulk Action Bar */
          <div className="flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                Đã chọn {selectedIds.length} sản phẩm
              </span>
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs font-medium text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
              >
                Bỏ chọn
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* Custom Bulk Category Change */}
              <div className="flex items-center gap-1">
                <FolderInput className="size-3.5 text-stone-500" />
                <CustomSelect
                  options={bulkCategoryOptions}
                  value=""
                  disabled={isBulkCategoryUpdating}
                  onChange={(val) => {
                    if (val) handleBulkCategoryChange(val);
                  }}
                  placeholder="Đổi danh mục hàng loạt..."
                />
              </div>

              {/* Bulk Delete */}
              <button
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="inline-flex items-center gap-1.5 rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
              >
                {isBulkDeleting ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
                Xóa {selectedIds.length} mục
              </button>
            </div>
          </div>
        ) : (
          /* Normal Search & Filter Toolbar */
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-3">
              {/* Compact Borderless Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên hoặc SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-md border-0 bg-stone-100 py-1.5 pl-9 pr-3 text-xs text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-300 dark:bg-stone-800 dark:text-stone-100 dark:placeholder-stone-500 dark:focus:bg-stone-950 dark:focus:ring-stone-700"
                />
              </div>

              {/* Custom Category Filter Dropdown */}
              <CustomSelect
                options={categoryFilterOptions}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                placeholder="Tất cả danh mục"
              />
            </div>

            {/* Action Button: Add Product */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-md bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200"
            >
              <Plus className="size-3.5" />
              Thêm sản phẩm
            </button>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-md bg-stone-100 p-3 text-xs text-stone-800 dark:bg-stone-800 dark:text-stone-200">
          <AlertCircle className="size-4 shrink-0 text-stone-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Table Container */}
      <div className="overflow-hidden rounded-md border border-stone-200/80 bg-white shadow-2xs dark:border-stone-800/80 dark:bg-stone-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50/70 text-[11px] font-semibold tracking-wide text-stone-500 dark:border-stone-800/80 dark:bg-stone-950/40 dark:text-stone-400">
                <th className="w-10 px-3 py-2.5 text-center">
                  <button
                    onClick={handleSelectAllToggle}
                    className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                    title={isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
                  >
                    {isAllSelected ? (
                      <CheckSquare className="size-4 text-stone-900 dark:text-stone-100" />
                    ) : isSomeSelected ? (
                      <MinusSquare className="size-4 text-stone-700 dark:text-stone-300" />
                    ) : (
                      <Square className="size-4" />
                    )}
                  </button>
                </th>
                <th className="w-14 px-2 py-2.5">Ảnh</th>
                <th className="px-4 py-2.5">Tên sản phẩm &amp; SKU</th>
                <th className="px-4 py-2.5">Danh mục</th>
                <th className="px-4 py-2.5 text-right font-mono">Giá (VND)</th>
                <th className="px-4 py-2.5 text-center">Trạng thái</th>
                <th className="w-12 px-3 py-2.5 text-right"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stone-100 text-xs dark:divide-stone-800/60">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => {
                  const isSelected = selectedIds.includes(product.id);
                  const imageUrl = formatImageUrl(product.thumbnail_url);

                  return (
                    <tr
                      key={product.id}
                      onClick={() => handleRowClick(product)}
                      className={`group cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-stone-100/60 dark:bg-stone-800/40"
                          : "hover:bg-stone-50/80 dark:hover:bg-stone-800/30"
                      }`}
                    >
                      {/* Checkbox */}
                      <td
                        className="px-3 py-2.5 text-center"
                        onClick={(e) => handleSelectRow(product.id, e)}
                      >
                        <button className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200">
                          {isSelected ? (
                            <CheckSquare className="size-4 text-stone-900 dark:text-stone-100" />
                          ) : (
                            <Square className="size-4 opacity-40 group-hover:opacity-100" />
                          )}
                        </button>
                      </td>

                      {/* Image Box */}
                      <td className="px-2 py-2.5">
                        <div className="relative size-9 overflow-hidden rounded-md border border-stone-200/80 bg-stone-100 dark:border-stone-800 dark:bg-stone-800">
                          <ProductImageWithFallback
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>

                      {/* Name & SKU */}
                      <td className="px-4 py-2.5">
                        <div className="font-semibold text-stone-900 group-hover:text-stone-950 dark:text-stone-100 dark:group-hover:text-white">
                          {product.name}
                        </div>
                        {product.sku && (
                          <div className="font-mono text-[10px] text-stone-400 dark:text-stone-500">
                            SKU · {product.sku}
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-2.5 text-stone-600 dark:text-stone-400">
                        {product.categories?.name || (
                          <span className="text-stone-400 italic">
                            Chưa phân loại
                          </span>
                        )}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-2.5 text-right font-mono font-medium text-stone-800 dark:text-stone-200">
                        {product.is_quote_only || product.price === null ? (
                          <span className="text-[11px] text-stone-400 dark:text-stone-500 font-sans">
                            Liên hệ
                          </span>
                        ) : (
                          new Intl.NumberFormat("vi-VN").format(product.price)
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="px-4 py-2.5 text-center">
                        {renderStatusBadge(
                          product.status,
                          product.is_quote_only,
                          product.price,
                        )}
                      </td>

                      {/* Row Actions (3-Dot Dropdown Menu) */}
                      <td
                        className="relative px-3 py-2.5 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(
                              activeMenuId === product.id ? null : product.id,
                            );
                          }}
                          className="rounded-md p-1 text-stone-400 opacity-60 hover:bg-stone-200/60 hover:text-stone-700 group-hover:opacity-100 dark:hover:bg-stone-800 dark:hover:text-stone-200"
                        >
                          <MoreVertical className="size-4" />
                        </button>

                        {/* Dropdown Popup */}
                        {activeMenuId === product.id && (
                          <div className="absolute right-3 top-9 z-30 w-36 rounded-md border border-stone-200 bg-white p-1 text-left shadow-lg animate-in fade-in zoom-in-95 duration-100 dark:border-stone-800 dark:bg-stone-900">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                handleRowClick(product);
                              }}
                              className="flex w-full items-center gap-2 rounded-xs px-2.5 py-1.5 text-xs text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                            >
                              <Edit2 className="size-3.5" />
                              Chỉnh sửa
                            </button>

                            <button
                              onClick={(e) => handleSingleDelete(product.id, e)}
                              className="flex w-full items-center gap-2 rounded-xs px-2.5 py-1.5 text-xs text-stone-700 hover:bg-stone-100 dark:text-stone-300 dark:hover:bg-stone-800"
                            >
                              <Trash2 className="size-3.5 text-stone-400" />
                              Xóa sản phẩm
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-stone-400"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <ImageIcon className="size-8 text-stone-300 dark:text-stone-700" />
                      <span className="text-xs">
                        Không tìm thấy sản phẩm nào.
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Product Detail Drawer */}
      <ProductDetailDrawer
        product={selectedProduct}
        isOpen={isDrawerOpen}
        categories={categoryOptions}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateSuccess={handleUpdateSuccess}
        onDeleteSuccess={(deletedId) => {
          setProducts((prev) => prev.filter((p) => p.id !== deletedId));
          setIsDrawerOpen(false);
        }}
      />

      {/* Create Product Modal */}
      <CreateProductModal
        isOpen={isCreateModalOpen}
        categories={categoryOptions}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
