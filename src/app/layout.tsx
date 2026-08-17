import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bếp Minh Hiếu",
    template: "%s | Bếp Minh Hiếu",
  },
  description:
    "Thiết kế, sản xuất và lắp đặt thiết bị bếp công nghiệp inox cao cấp.",
  icons: {
    icon: [
      { url: "/logo/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/Logo.png", sizes: "300x300", type: "image/png" },
    ],
    apple: "/logo/Logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
