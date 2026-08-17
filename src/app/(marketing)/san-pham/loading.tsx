import { cn } from "@/lib/utils";

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-800",
        className,
      )}
    />
  );
}

function ProductCardSkeleton({ keySeed }: { keySeed: number }) {
  return (
    <article
      key={keySeed}
      className="flex flex-col overflow-hidden rounded-sm border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900" />
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-zinc-100 p-5 dark:border-zinc-800/60">
        <div className="space-y-2.5">
          <SkeletonLine className="h-4 w-1/3" />
          <SkeletonLine className="h-4 w-5/6" />
          <SkeletonLine className="h-4 w-2/3" />
          <SkeletonLine className="mt-3 h-3 w-24" />
        </div>

        <SkeletonLine className="h-5 w-32" />

        <div className="mt-auto flex flex-col gap-2 pt-2">
          <SkeletonLine className="h-9 w-full rounded-sm" />
          <SkeletonLine className="h-9 w-full rounded-sm" />
        </div>
      </div>
    </article>
  );
}

export default function ProductsLoading() {
  const cardSeeds = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="bg-zinc-50 font-sans dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-10 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4">
            <SkeletonLine className="h-3 w-36" />
            <div className="h-px max-w-16 flex-1 bg-zinc-300 dark:bg-zinc-700" />
          </div>
          <div className="space-y-4">
            <SkeletonLine className="h-3 w-72" />
            <SkeletonLine className="h-10 w-[85%] max-w-3xl" />
            <SkeletonLine className="mt-5 h-4 w-2/3 max-w-2xl" />
            <SkeletonLine className="h-4 w-1/2 max-w-xl" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonLine key={i} className="h-9 w-24 rounded-sm" />
          ))}
        </div>

        <div className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cardSeeds.map((seed) => (
              <ProductCardSkeleton keySeed={seed} key={seed} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
