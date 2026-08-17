Dựa vào copilot-instructions.md và database schema trong `@database.types.ts`, hãy triển khai các section tiếp theo của trang chủ `src/app/(marketing)/page.tsx` nằm ngay dưới `HeroEditorial`:

### 1. SECTION: DANH MỤC THIẾT BỊ CHỦ LỰC (`src/components/features/home/CategoryGrid.tsx`)

- Tiêu đề section: "02 / DANH MỤC THIẾT BỊ" (Subtitle: "Hệ thống giải pháp thiết bị công nghiệp tiêu chuẩn SUS304").
- Grid 4 cột trên Desktop (2 cột Mobile) tương ứng với 4 nhóm ngành chính:
  1. Bếp Công Nghiệp (Bếp Âu, Bếp Á, Bếp Chiên, Nồi Phở)
  2. Tủ Bảo Quản & Thiết Bị Lạnh (Tủ Đông, Tủ Mát, Bàn Salad Berjaya)
  3. Hệ Thống Tum Hút Mùi & Xử Lý Khói (Gia công theo mặt bằng)
  4. Gia Công Inox Định Hình (Bàn, chậu rửa, giá kệ inox 304)
- Card UI: Ảnh sản phẩm rõ nét, viền `border border-zinc-200 hover:border-zinc-900 transition-all`, hiển thị tên nhóm thiết bị và icon mũi tên xem danh mục.

### 2. SECTION: NĂNG LỰC CƠ KHÍ & TIÊU CHUẨN KỸ THUẬT (`src/components/features/home/TechnicalSpecs.tsx`)

- Background: Nền tối màu `bg-zinc-950 text-white` tạo sự tương phản mạnh mẽ.
- Bố cục 2 cột:
  - Cột trái: Tiêu đề lớn "TIÊU CHUẨN CƠ KHÍ CHÍNH XÁC" kèm đoạn mô tả ngắn về quy trình dập chấn CNC, mối hàn Argon chống oxy hóa và chứng chỉ inox SUS304.
  - Cột phải: Grid 4 ô thông số kỹ thuật dạng Spec Sheet (Mono font cho số liệu):
    - `100%` — Inox SUS304 không gỉ tiêu chuẩn thực phẩm & y tế
    - `0.8 - 1.5mm` — Độ dày phôi inox tiêu chuẩn chịu lực cao
    - `10+ Năm` — Kinh nghiệm thiết kế thi công hệ thống bếp
    - `24/7` — Hỗ trợ kỹ thuật & bảo hành tận chân công trình

### 3. SECTION: DỰ ÁN TIÊU BIỂU (`src/components/features/home/FeaturedProjects.tsx`)

- Tiêu đề: "03 / DỰ ÁN ĐÃ HOÀN THIỆN" (Layout dạng tạp chí kiến trúc).
- Hiển thị 3 công trình lớn:
  1. Dự án Bếp Trung Tâm Chuỗi Nhà Hàng BBQ (Hà Nội)
  2. Hệ Thống Bếp Khách Sạn & Resort 4 Sao (Hải Phòng)
  3. Bếp Ăn Bán Trú & Căn Tin Bệnh Viện Đa Khoa
- Mỗi card dự án gồm: Ảnh chụp thực tế góc rộng, nhãn thông tin (Địa điểm, Hạng mục bàn giao, Thời gian hoàn thiện), nút "Xem hồ sơ công trình →".

### 4. SECTION: CTA BÁO GIÁ NHANH (`src/components/features/home/QuickRfqBanner.tsx`)

- Form nhận tư vấn / báo giá nhanh 1 dòng (Tên, Số điện thoại, Nhu cầu thiết bị) với nút "NHẬN BẢNG GIÁ DỰ ÁN".

### YÊU CẦU KỸ THUẬT:

- Dùng Server Components cho các khối tĩnh.
- Font chữ `font-sans` dứt khoát, số liệu dùng `font-mono`.
- Đảm bảo responsive hoàn hảo, không sinh lỗi type hay code thừa.
