import { z } from "zod";

import type { Tables } from "@/types/database.types";

export type Product = Tables<"products">;

export const productSlugSchema = z.object({
  slug: z.string().min(1),
});

export type ProductSlugInput = z.infer<typeof productSlugSchema>;
