import { z } from "zod";
import type { Tables } from "./database.types";

export const updateProductInfoSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự").optional(),
  sku: z.string().nullable().optional(),
  category_id: z.string().uuid("Danh mục không hợp lệ").nullable().optional(),
  price: z
    .number({
      message: "Giá sản phẩm phải là một số",
    })
    .nonnegative("Giá sản phẩm không được là số âm")
    .nullable()
    .optional(),
  status: z
    .enum(["in_stock", "out_of_stock", "made_to_order"] as const, {
      message: "Trạng thái không hợp lệ",
    })
    .nullable()
    .optional(),
  is_quote_only: z.boolean().nullable().optional(),
  description: z.string().nullable().optional(),
});

export type UpdateProductInfoInput = z.infer<typeof updateProductInfoSchema>;

export const createProductSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự"),
  slug: z.string().min(2, "Slug không được để trống"),
  sku: z.string().nullable().optional(),
  category_id: z.string().uuid("Danh mục không hợp lệ").nullable().optional(),
  price: z
    .number()
    .nonnegative("Giá không được là số âm")
    .nullable()
    .optional(),
  is_quote_only: z.boolean().default(true),
  status: z
    .enum(["in_stock", "out_of_stock", "made_to_order"] as const)
    .default("in_stock"),
  description: z.string().nullable().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export type AdminProduct = Tables<"products"> & {
  categories: {
    name: string;
  } | null;
};
