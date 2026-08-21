"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { updateProductThumbnail } from "@/actions/admin-products";
import { ProductImageWithFallback } from "@/components/ui/ProductImageWithFallback";
import { formatImageUrl, slugifyFilename } from "@/lib/utils";

interface ImageUploaderProps {
  productId: string;
  productSlug?: string;
  currentImageUrl: string | null;
  onUploadSuccess: (newUrl: string) => void;
}

export function ImageUploader({
  productId,
  productSlug,
  currentImageUrl,
  onUploadSuccess,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedUrl = formatImageUrl(currentImageUrl);

  const handleUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({
        type: "error",
        text: "Vui lòng chọn file hình ảnh (png, jpg, webp, ...).",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Kích thước ảnh tối đa là 5MB.",
      });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const supabase = createClient();

      const ext = file.name.includes(".")
        ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
        : ".jpg";

      const rawBase = productSlug || file.name;
      const cleanSlug = slugifyFilename(rawBase).replace(/\.[^/.]+$/, "");
      const filePath = `${cleanSlug}-${Date.now()}${ext}`;

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

      const dbResult = await updateProductThumbnail(productId, publicUrl);
      if (!dbResult.ok) {
        throw new Error(
          dbResult.error || "Không thể cập nhật thumbnail_url trong DB.",
        );
      }

      setMessage({ type: "success", text: "Tải ảnh thành công!" });
      onUploadSuccess(publicUrl);
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải ảnh.";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && files[0]) {
      handleUpload(files[0]);
    }
  };

  const triggerFileInput = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-1.5 font-sans">
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`group relative flex aspect-square size-14 cursor-pointer items-center justify-center overflow-hidden rounded-md border border-dashed border-stone-300 bg-stone-50 transition-all hover:border-stone-400 hover:bg-stone-100 dark:border-stone-700 dark:bg-stone-800 dark:hover:bg-stone-800/80 ${
          isUploading ? "pointer-events-none border-stone-300 opacity-60" : ""
        }`}
        title="Kéo thả hoặc Click để tải ảnh mới"
      >
        {formattedUrl ? (
          <ProductImageWithFallback
            src={formattedUrl}
            alt="Product preview"
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-40"
          />
        ) : (
          <div className="flex flex-col items-center gap-1 p-1 text-center text-stone-400">
            <ImageIcon className="size-4" />
            <span className="text-[9px] font-medium leading-none">
              Tải ảnh mới
            </span>
          </div>
        )}

        <div
          className={`absolute inset-0 flex items-center justify-center bg-stone-950/40 text-white opacity-0 transition-opacity group-hover:opacity-100 ${
            isUploading ? "bg-stone-950/60 opacity-100" : ""
          }`}
        >
          {isUploading ? (
            <Loader2 className="size-4 animate-spin text-white" />
          ) : (
            <Upload className="size-4 text-white" />
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {message && (
        <p
          className={`text-[9px] font-medium leading-tight max-w-[90px] ${
            message.type === "success"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
