"use server";

import { createPublicClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import { productSlugSchema } from "@/types/product";

type ProductsSuccess = { ok: true; data: Tables<"products">[] };
type ProductSuccess = { ok: true; data: Tables<"products"> };
type CategoriesSuccess = { ok: true; data: Tables<"categories">[] };
type ActionError = { ok: false; error: string };

export type GetProductsResult = ProductsSuccess | ActionError;
export type GetProductBySlugResult = ProductSuccess | ActionError;
export type GetCategoriesResult = CategoriesSuccess | ActionError;

export type GetProductsOptions = {
  categorySlug?: string | null;
};

export async function getCategories(): Promise<GetCategoriesResult> {
  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true, nullsFirst: false })
    .order("name");

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: data ?? [] };
}

export async function getProducts(
  options: GetProductsOptions = {},
): Promise<GetProductsResult> {
  const { categorySlug } = options;
  const supabase = createPublicClient();

  let query = supabase.from("products").select("*");

  if (categorySlug) {
    const { data: categoryRows, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", categorySlug)
      .limit(1);

    if (categoryError) {
      return { ok: false, error: categoryError.message };
    }

    const categoryId = categoryRows?.[0]?.id;
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    } else {
      return { ok: true, data: [] };
    }
  }

  const { data, error } = await query.order("name");

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, data: data ?? [] };
}

export async function getProductBySlug(
  slug: string,
): Promise<GetProductBySlugResult> {
  const parsed = productSlugSchema.safeParse({ slug });

  if (!parsed.success) {
    return { ok: false, error: "Slug không hợp lệ" };
  }

  const supabase = createPublicClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", parsed.data.slug)
    .maybeSingle();

  if (error) {
    return { ok: false, error: error.message };
  }

  if (!data) {
    return { ok: false, error: "Không tìm thấy sản phẩm" };
  }

  return { ok: true, data };
}
