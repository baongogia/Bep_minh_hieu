"use server";

import { createClient } from "@/lib/supabase/server";
import {
  updateProductInfoSchema,
  type UpdateProductInfoInput,
  type AdminProduct,
} from "@/types/admin-product";

export async function getAdminProducts(): Promise<
  { ok: true; data: AdminProduct[] } | { ok: false; error: string }
> {
  try {
    const supabase = await createClient();

    // Check user session
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();
    if (authError || !session) {
      return {
        ok: false,
        error: "Bạn cần đăng nhập để truy cập trang quản trị.",
      };
    }

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        category_id,
        created_at,
        description,
        gallery_urls,
        id,
        is_featured,
        is_quote_only,
        name,
        price,
        sku,
        slug,
        specifications,
        status,
        thumbnail_url,
        updated_at,
        categories:category_id (
          name
        )
      `,
      )
      .order("name", { ascending: true });

    if (error) {
      return { ok: false, error: error.message };
    }

    const typedData: AdminProduct[] = (data || []).map((item) => {
      const categoriesRaw = item.categories;
      let categoryObj: { name: string } | null = null;

      if (Array.isArray(categoriesRaw)) {
        if (categoriesRaw.length > 0 && categoriesRaw[0]) {
          categoryObj = { name: String(categoriesRaw[0].name) };
        }
      } else if (categoriesRaw && typeof categoriesRaw === "object") {
        categoryObj = { name: String(categoriesRaw.name) };
      }

      return {
        category_id: item.category_id,
        created_at: item.created_at,
        description: item.description,
        gallery_urls: item.gallery_urls,
        id: item.id,
        is_featured: item.is_featured,
        is_quote_only: item.is_quote_only,
        name: item.name,
        price: item.price,
        sku: item.sku,
        slug: item.slug,
        specifications: item.specifications,
        status: item.status,
        thumbnail_url: item.thumbnail_url,
        updated_at: item.updated_at,
        categories: categoryObj,
      };
    });

    return { ok: true, data: typedData };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function updateProductThumbnail(
  productId: string,
  imageUrl: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const supabase = await createClient();

    // Check user session
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

    const { error } = await supabase
      .from("products")
      .update({ thumbnail_url: imageUrl })
      .eq("id", productId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function updateProductInfo(
  productId: string,
  data: UpdateProductInfoInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const parsed = updateProductInfoSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ.",
      };
    }

    const supabase = await createClient();

    // Check user session
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

    const { error } = await supabase
      .from("products")
      .update(parsed.data)
      .eq("id", productId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function deleteProduct(
  productId: string,
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

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function bulkDeleteProducts(
  productIds: string[],
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (!productIds || productIds.length === 0) {
      return { ok: true };
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

    const { error } = await supabase
      .from("products")
      .delete()
      .in("id", productIds);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function bulkUpdateProductCategory(
  productIds: string[],
  categoryId: string | null,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (!productIds || productIds.length === 0) {
      return { ok: true };
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

    const { error } = await supabase
      .from("products")
      .update({ category_id: categoryId })
      .in("id", productIds);

    if (error) {
      return { ok: false, error: error.message };
    }

    return { ok: true };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function createAdminProduct(
  data: unknown,
): Promise<{ ok: true; data: AdminProduct } | { ok: false; error: string }> {
  try {
    const { createProductSchema } = await import("@/types/admin-product");
    const parsed = createProductSchema.safeParse(data);
    if (!parsed.success) {
      return {
        ok: false,
        error: parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ.",
      };
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

    const { data: newProd, error } = await supabase
      .from("products")
      .insert(parsed.data)
      .select(
        `
        category_id,
        created_at,
        description,
        gallery_urls,
        id,
        is_featured,
        is_quote_only,
        name,
        price,
        sku,
        slug,
        specifications,
        status,
        thumbnail_url,
        updated_at,
        categories:category_id (
          name
        )
      `,
      )
      .single();

    if (error || !newProd) {
      return { ok: false, error: error?.message || "Không thể tạo sản phẩm." };
    }

    const categoriesRaw = newProd.categories;
    let categoryObj: { name: string } | null = null;
    if (
      Array.isArray(categoriesRaw) &&
      categoriesRaw.length > 0 &&
      categoriesRaw[0]
    ) {
      categoryObj = { name: String(categoriesRaw[0].name) };
    } else if (categoriesRaw && typeof categoriesRaw === "object") {
      categoryObj = { name: String(categoriesRaw.name) };
    }

    const typedData: AdminProduct = {
      ...newProd,
      categories: categoryObj,
    };

    return { ok: true, data: typedData };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}
