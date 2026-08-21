import type { Database, Tables } from "./database.types";

export type RFQStatus = Database["public"]["Enums"]["rfq_status"];

export interface RFQItemWithProduct {
  id: string;
  product_id: string | null;
  product_name: string;
  quantity: number | null;
  custom_specifications: string | null;
  sku: string | null;
  thumbnail_url: string | null;
}

export interface RFQDetails extends Tables<"rfq_requests"> {
  items: RFQItemWithProduct[];
}
