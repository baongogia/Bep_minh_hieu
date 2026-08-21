import Link from "next/link";
import type { Tables } from "@/types/database.types";
import { cn } from "@/lib/utils";

type Category = Tables<"categories">;

type CategoryTabsProps = {
  categories: Category[];
  currentSlug: string | null;
};

type TabItem = {
  slug: string | null;
  label: string;
};

function buildTabList(categories: Category[]): TabItem[] {
  const base: TabItem[] = [{ slug: null, label: "Tất cả thiết bị" }];

  const fromDb = categories.map((c): TabItem => ({
    slug: c.slug,
    label: c.name,
  }));

  return [...base, ...fromDb];
}

export function CategoryTabs({ categories, currentSlug }: CategoryTabsProps) {
  const tabs = buildTabList(categories);

  return (
    <div className="relative w-full">
      {/* Scrollable Pill Container */}
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto whitespace-nowrap py-1 pr-14">
        {tabs.map((tab) => {
          const isActive = tab.slug === currentSlug;
          const href =
            tab.slug === null ? "/san-pham" : `/san-pham?category=${tab.slug}`;

          return (
            <Link
              key={tab.slug ?? "__all__"}
              href={href}
              className={cn(
                "inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider transition-all",
                isActive
                  ? "bg-stone-900 text-white shadow-2xs dark:bg-stone-100 dark:text-stone-900"
                  : "bg-white text-stone-600 hover:bg-stone-100 hover:text-stone-950 dark:bg-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100 border border-stone-200/80 dark:border-stone-800",
              )}
              prefetch={false}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Fade Gradient Overlay on right edge */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-stone-50 via-stone-50/80 to-transparent dark:from-stone-950 dark:via-stone-950/80" />
    </div>
  );
}
