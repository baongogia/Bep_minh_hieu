export const heroNavItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Thiết bị bếp" },
  { href: "/san-pham", label: "Hệ thống hút mùi" },
  { href: "/du-an", label: "Dự án thi công" },
  { href: "/ve-chung-toi", label: "Về chúng tôi" },
] as const;

export const heroContact = {
  hotline: "0912 212 886",
  email: "hieudv234@gmail.com",
  address: "Định Công, Hoàng Mai, Hà Nội",
  zalo: "https://zalo.me/0912212886",
} as const;

export const heroImages = {
  main: {
    src: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1200&auto=format&fit=crop",
    alt: "Toàn cảnh gian bếp nhà hàng inox sáng bóng",
  },
  detail: {
    src: "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?q=80&w=600&auto=format&fit=crop",
    alt: "Cận cảnh bề mặt inox và đầu bếp chuyên nghiệp",
  },
} as const;
