import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#18181B] border border-white/5",
        className
      )}
      {...props}
    />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Skeleton className="aspect-[2/3] w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4 rounded" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-10 rounded" />
        <Skeleton className="h-3 w-14 rounded" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full aspect-[16/9] max-h-[70vh] relative rounded-2xl overflow-hidden bg-[#111114]">
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-10 left-8 md:left-14 flex flex-col gap-4 max-w-lg">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-10 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
