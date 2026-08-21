"use server";

import { createClient } from "@/lib/supabase/server";
import type { Database, Tables } from "@/types/database.types";

export type AdminCategory = Tables<"categories">;

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  image_url?: string | null;
  description?: string | null;
  sort_order?: number | null;
}

export interface UpdateCategoryPayload {
  name?: string;
  slug?: string;
  image_url?: string | null;
  description?: string | null;
  sort_order?: number | null;
}

export async function getAdminCategories(): Promise<
  { ok: true; data: AdminCategory[] } | { ok: false; error: string }
> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return {
        ok: false,
        error: "Bạn cần đăng nhập để thực hiện hành động này.",
      };
    }

    const { data, error } = await supabase
      .from("categories")
      .select(
        "id, name, slug, image_url, description, sort_order, parent_id, created_at",
      )
      .order("sort_order", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true, data: data || [] };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function createCategory(
  payload: CreateCategoryPayload | string,
  slugParam?: string,
): Promise<{ ok: true; data: AdminCategory } | { ok: false; error: string }> {
  try {
    const input: CreateCategoryPayload =
      typeof payload === "string"
        ? { name: payload, slug: slugParam || "" }
        : payload;

    if (
      !input.name ||
      !input.name.trim() ||
      !input.slug ||
      !input.slug.trim()
    ) {
      return { ok: false, error: "Vui lòng nhập đầy đủ tên và slug danh mục." };
    }

    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return {
        ok: false,
        error: "Bạn cần đăng nhập để thực hiện hành động này.",
      };
    }

    const { data, error } = await supabase
      .from("categories")
      .insert({
        name: input.name.trim(),
        slug: input.slug.trim(),
        image_url: input.image_url ?? null,
        description: input.description ?? null,
        sort_order: input.sort_order ?? 0,
      })
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug danh mục này đã tồn tại." };
      }
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function updateCategory(
  id: string,
  payload: UpdateCategoryPayload | string,
  slugParam?: string,
): Promise<{ ok: true; data?: AdminCategory } | { ok: false; error: string }> {
  try {
    const input: UpdateCategoryPayload =
      typeof payload === "string"
        ? { name: payload, slug: slugParam || "" }
        : payload;

    if (input.name !== undefined && !input.name.trim()) {
      return { ok: false, error: "Tên danh mục không được để trống." };
    }
    if (input.slug !== undefined && !input.slug.trim()) {
      return { ok: false, error: "Slug danh mục không được để trống." };
    }

    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return {
        ok: false,
        error: "Bạn cần đăng nhập để thực hiện hành động này.",
      };
    }

    const updateFields: Database["public"]["Tables"]["categories"]["Update"] =
      {};
    if (input.name !== undefined) updateFields.name = input.name.trim();
    if (input.slug !== undefined) updateFields.slug = input.slug.trim();
    if (input.image_url !== undefined) updateFields.image_url = input.image_url;
    if (input.description !== undefined)
      updateFields.description = input.description;
    if (input.sort_order !== undefined)
      updateFields.sort_order = input.sort_order;

    const { data, error } = await supabase
      .from("categories")
      .update(updateFields)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (error.code === "23505") {
        return { ok: false, error: "Slug danh mục này đã tồn tại." };
      }
      return { ok: false, error: error.message };
    }

    return { ok: true, data };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function deleteCategory(
  id: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session) {
      return {
        ok: false,
        error: "Bạn cần đăng nhập để thực hiện hành động này.",
      };
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      if (error.code === "23503") {
        return {
          ok: false,
          error:
            "Không thể xóa danh mục này vì đang có sản phẩm thuộc danh mục.",
        };
      }
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}
