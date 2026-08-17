import { HeroEditorial } from "@/components/features/home/HeroEditorial";
import { CategoryGrid } from "@/components/features/home/CategoryGrid";
import { TechnicalSpecs } from "@/components/features/home/TechnicalSpecs";
import { FeaturedProjects } from "@/components/features/home/FeaturedProjects";
import { QuickRfqBanner } from "@/components/features/home/QuickRfqBanner";

export default function HomePage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950">
      <HeroEditorial />
      <CategoryGrid />
      <TechnicalSpecs />
      <FeaturedProjects />
      <QuickRfqBanner />
    </div>
  );
}
