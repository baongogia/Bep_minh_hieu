import { ConditionalSiteHeader } from "@/components/layout/ConditionalSiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <ConditionalSiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
