Dựa vào quy chuẩn trong .traerules và database schema trong `@database.types.ts`, hãy triển khai trang Catalog Thiết Bị tại `src/app/(marketing)/san-pham/page.tsx`:

### 1. DATA FETCHING & SERVER COMPONENT:

- Fetch danh mục từ bảng `categories` và danh sách sản phẩm từ bảng `products` qua Supabase Server Client (`src/lib/supabase/server.ts`).
- Hỗ trợ lọc theo `category` qua Search Params trên URL (ví dụ: `/san-pham?category=bep-a`).

### 2. GIAO DIỆN & BỐ CỤC (Technical Catalog - B2B Clean):

- **Header Section:**
  - Tiêu đề: "CATALOG THIẾT BỊ BẾP & INOX CÔNG NGHIỆP"
  - Subtitle: "Toàn bộ thiết bị được sản xuất từ inox SUS304 tiêu chuẩn, bảo hành chính hãng và hỗ trợ lắp đặt trọn gói."
- **Thanh Filter & Danh mục:**
  - Danh sách tab danh mục dạng pill hoặc underline tối giản: "Tất cả", "Bếp Á - Bếp Âu", "Hệ Thống Hút Mùi", "Thiết Bị Lạnh & Tủ Bảo Quản", "Gia Công Inox".
- **Lưới Sản Phẩm (Product Grid - 3 hoặc 4 cột):**
  - Mỗi thẻ sản phẩm gồm:
    - Ảnh thiết bị rõ nét, tỉ lệ 4:3 hoặc 1:1 có hiệu ứng zoom nhẹ khi hover.
    - Tag chất liệu: `Inox 304` hoặc `Made to Order`.
    - Tên sản phẩm (`font-semibold text-zinc-900 line-clamp-2`).
    - Mã SKU (`font-mono text-xs text-zinc-500`).
    - Giá: Hiển thị giá định dạng VNĐ nếu có, hoặc chữ "Liên hệ báo giá" nổi bật nếu `price: null` hoặc `is_quote_only: true`.
    - Nút hành động: Nút "Yêu cầu báo giá" và nút "Chi tiết kỹ thuật →".

### 3. EMPTY & LOADING STATES:

- Tạo `src/app/(marketing)/san-pham/loading.tsx` với Skeleton Grid chuẩn chỉnh.
- Xử lý Empty State gọn gàng khi danh mục chưa có sản phẩm.

### YÊU CẦU KỸ THUẬT:

- Tách nhỏ các component con vào `src/components/features/products/`.
- Type-safe hoàn toàn, không dùng `any`, tuân thủ Server Components mặc định.
