"use server";

import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/types/database.types";
import type {
  RFQDetails,
  RFQItemWithProduct,
  RFQStatus,
} from "@/types/admin-rfq";

export async function getRFQs(): Promise<
  { ok: true; data: Tables<"rfq_requests">[] } | { ok: false; error: string }
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
      .from("rfq_requests")
      .select("*")
      .order("created_at", { ascending: false });

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

export async function getRFQDetails(
  rfqId: string,
): Promise<{ ok: true; data: RFQDetails } | { ok: false; error: string }> {
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

    const { data: rfq, error: rfqError } = await supabase
      .from("rfq_requests")
      .select("*")
      .eq("id", rfqId)
      .maybeSingle();

    if (rfqError) {
      return { ok: false, error: rfqError.message };
    }

    if (!rfq) {
      return { ok: false, error: "Không tìm thấy yêu cầu báo giá." };
    }

    const { data: itemsData, error: itemsError } = await supabase
      .from("rfq_items")
      .select(
        `
        id,
        product_id,
        product_name,
        quantity,
        custom_specifications,
        products:product_id (
          sku,
          thumbnail_url
        )
      `,
      )
      .eq("rfq_id", rfqId);

    if (itemsError) {
      return { ok: false, error: itemsError.message };
    }

    const items: RFQItemWithProduct[] = (itemsData || []).map((item) => {
      const productRaw = item.products;
      let sku: string | null = null;
      let thumbnail_url: string | null = null;

      if (Array.isArray(productRaw)) {
        if (productRaw.length > 0 && productRaw[0]) {
          sku = productRaw[0].sku;
          thumbnail_url = productRaw[0].thumbnail_url;
        }
      } else if (productRaw && typeof productRaw === "object") {
        sku = productRaw.sku;
        thumbnail_url = productRaw.thumbnail_url;
      }

      return {
        id: item.id,
        product_id: item.product_id,
        product_name: item.product_name,
        quantity: item.quantity,
        custom_specifications: item.custom_specifications,
        sku,
        thumbnail_url,
      };
    });

    return {
      ok: true,
      data: {
        ...rfq,
        items,
      },
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { ok: false, error: message };
  }
}

export async function updateRFQStatus(
  rfqId: string,
  status: RFQStatus,
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
      .from("rfq_requests")
      .update({ status })
      .eq("id", rfqId);

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
