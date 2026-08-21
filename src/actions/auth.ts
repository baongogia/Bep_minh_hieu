"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(
  formData: FormData,
): Promise<{ error?: string } | void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Vui lòng nhập đầy đủ email và mật khẩu." };
  }

  let redirectPath: string | null = null;

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    redirectPath = "/admin/products";
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Đã xảy ra lỗi không mong muốn.";
    return { error: message };
  }

  if (redirectPath) {
    redirect(redirectPath);
  }
}
