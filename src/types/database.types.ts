export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          image_url: string | null;
          name: string;
          parent_id: string | null;
          slug: string;
          sort_order: number | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name: string;
          parent_id?: string | null;
          slug: string;
          sort_order?: number | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name?: string;
          parent_id?: string | null;
          slug?: string;
          sort_order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      products: {
        Row: {
          category_id: string | null;
          created_at: string | null;
          description: string | null;
          gallery_urls: string[] | null;
          id: string;
          is_featured: boolean | null;
          is_quote_only: boolean | null;
          name: string;
          price: number | null;
          sku: string | null;
          slug: string;
          specifications: Json | null;
          status: Database["public"]["Enums"]["product_status"] | null;
          thumbnail_url: string | null;
          updated_at: string | null;
        };
        Insert: {
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          is_featured?: boolean | null;
          is_quote_only?: boolean | null;
          name: string;
          price?: number | null;
          sku?: string | null;
          slug: string;
          specifications?: Json | null;
          status?: Database["public"]["Enums"]["product_status"] | null;
          thumbnail_url?: string | null;
          updated_at?: string | null;
        };
        Update: {
          category_id?: string | null;
          created_at?: string | null;
          description?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          is_featured?: boolean | null;
          is_quote_only?: boolean | null;
          name?: string;
          price?: number | null;
          sku?: string | null;
          slug?: string;
          specifications?: Json | null;
          status?: Database["public"]["Enums"]["product_status"] | null;
          thumbnail_url?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      projects: {
        Row: {
          client_name: string | null;
          completed_at: string | null;
          content: string | null;
          created_at: string | null;
          gallery_urls: string[] | null;
          id: string;
          is_featured: boolean | null;
          location: string | null;
          slug: string;
          thumbnail_url: string | null;
          title: string;
        };
        Insert: {
          client_name?: string | null;
          completed_at?: string | null;
          content?: string | null;
          created_at?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          is_featured?: boolean | null;
          location?: string | null;
          slug: string;
          thumbnail_url?: string | null;
          title: string;
        };
        Update: {
          client_name?: string | null;
          completed_at?: string | null;
          content?: string | null;
          created_at?: string | null;
          gallery_urls?: string[] | null;
          id?: string;
          is_featured?: boolean | null;
          location?: string | null;
          slug?: string;
          thumbnail_url?: string | null;
          title?: string;
        };
        Relationships: [];
      };
      rfq_items: {
        Row: {
          custom_specifications: string | null;
          id: string;
          product_id: string | null;
          product_name: string;
          quantity: number | null;
          rfq_id: string;
        };
        Insert: {
          custom_specifications?: string | null;
          id?: string;
          product_id?: string | null;
          product_name: string;
          quantity?: number | null;
          rfq_id: string;
        };
        Update: {
          custom_specifications?: string | null;
          id?: string;
          product_id?: string | null;
          product_name?: string;
          quantity?: number | null;
          rfq_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "rfq_items_product_id_fkey";
            columns: ["product_id"];
            isOneToOne: false;
            referencedRelation: "products";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "rfq_items_rfq_id_fkey";
            columns: ["rfq_id"];
            isOneToOne: false;
            referencedRelation: "rfq_requests";
            referencedColumns: ["id"];
          },
        ];
      };
      rfq_requests: {
        Row: {
          company_name: string | null;
          created_at: string | null;
          customer_name: string;
          email: string | null;
          id: string;
          notes: string | null;
          phone: string;
          project_location: string | null;
          status: Database["public"]["Enums"]["rfq_status"] | null;
          updated_at: string | null;
        };
        Insert: {
          company_name?: string | null;
          created_at?: string | null;
          customer_name: string;
          email?: string | null;
          id?: string;
          notes?: string | null;
          phone: string;
          project_location?: string | null;
          status?: Database["public"]["Enums"]["rfq_status"] | null;
          updated_at?: string | null;
        };
        Update: {
          company_name?: string | null;
          created_at?: string | null;
          customer_name?: string;
          email?: string | null;
          id?: string;
          notes?: string | null;
          phone?: string;
          project_location?: string | null;
          status?: Database["public"]["Enums"]["rfq_status"] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      product_status: "in_stock" | "out_of_stock" | "made_to_order";
      rfq_status:
        "pending" | "contacted" | "quoted" | "completed" | "cancelled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      product_status: ["in_stock", "out_of_stock", "made_to_order"],
      rfq_status: ["pending", "contacted", "quoted", "completed", "cancelled"],
    },
  },
} as const;
