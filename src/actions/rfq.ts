"use server";

import { createClient } from "@/lib/supabase/server";
import { rfqFormSchema, type RfqFormInput } from "@/types/rfq";

type RfqSuccess = { ok: true };
type RfqError = {
  ok: false;
  error: string;
  fieldErrors?: Partial<Record<keyof RfqFormInput, string[]>>;
};

export type SubmitRfqResult = RfqSuccess | RfqError;

export async function submitRfq(input: RfqFormInput): Promise<SubmitRfqResult> {
  const parsed = rfqFormSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: "Dữ liệu không hợp lệ",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const {
    customer_name,
    phone,
    email,
    company_name,
    project_location,
    notes,
    items,
  } = parsed.data;

  const { data: rfq, error: rfqError } = await supabase
    .from("rfq_requests")
    .insert({
      customer_name,
      phone,
      email: email || null,
      company_name: company_name || null,
      project_location: project_location || null,
      notes: notes || null,
    })
    .select("id")
    .single();

  if (rfqError || !rfq) {
    return {
      ok: false,
      error: rfqError?.message ?? "Không thể tạo yêu cầu báo giá",
    };
  }

  const { error: itemsError } = await supabase.from("rfq_items").insert(
    items.map((item) => ({
      rfq_id: rfq.id,
      product_name: item.product_name,
      product_id: item.product_id ?? null,
      quantity: item.quantity ?? null,
      custom_specifications: item.custom_specifications ?? null,
    })),
  );

  if (itemsError) {
    return { ok: false, error: itemsError.message };
  }

  return { ok: true };
}
