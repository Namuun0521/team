import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-8">
          <Skeleton className="h-[360px] w-full rounded-3xl" />

          <div className="rounded-3xl border bg-white p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="space-y-3 flex-1">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-28" />
              </div>
            </div>
            <Skeleton className="h-11 w-36 rounded-xl" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-10 w-56" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-[95%]" />
            <Skeleton className="h-6 w-[90%]" />
            <Skeleton className="h-6 w-[80%]" />
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm space-y-5 h-fit">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-[280px] w-full rounded-2xl" />
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
