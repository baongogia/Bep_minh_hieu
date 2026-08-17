import { z } from "zod";

export const rfqItemSchema = z.object({
  product_name: z.string().min(1, "Vui lòng nhập tên sản phẩm"),
  product_id: z.string().uuid().nullable().optional(),
  quantity: z.number().int().positive().optional(),
  custom_specifications: z.string().optional(),
});

export const rfqFormSchema = z.object({
  customer_name: z.string().min(1, "Vui lòng nhập họ tên"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  email: z.union([z.literal(""), z.email("Email không hợp lệ")]).optional(),
  company_name: z.string().optional(),
  project_location: z.string().optional(),
  notes: z.string().optional(),
  items: z.array(rfqItemSchema).min(1, "Cần ít nhất một sản phẩm"),
});

export type RfqFormInput = z.infer<typeof rfqFormSchema>;
