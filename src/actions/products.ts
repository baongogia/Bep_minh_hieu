"use server";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import { productSlugSchema } from "@/types/product";

type ProductsSuccess = { ok: true; data: Tables<"products">[] };
type ProductSuccess = { ok: true; data: Tables<"products"> };
type ActionError = { ok: false; error: string };

export type GetProductsResult = ProductsSuccess | ActionError;
export type GetProductBySlugResult = ProductSuccess | ActionError;

export async function getProducts(): Promise<GetProductsResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

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

  const supabase = await createClient();

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
