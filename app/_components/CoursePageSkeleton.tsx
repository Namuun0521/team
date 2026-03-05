"use client";

import { SkeletonBox } from "./Skeleton";

export const CoursesPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Title */}
        <div className="mb-6">
          <SkeletonBox className="h-10 w-[320px]" />
          <SkeletonBox className="mt-3 h-5 w-[520px]" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar skeleton */}
          <aside className="rounded-xl bg-white p-5 shadow-sm">
            <SkeletonBox className="h-5 w-28" />

            <div className="mt-4 space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2"
                >
                  <SkeletonBox className="h-8 w-8 rounded-lg" />
                  <SkeletonBox className="h-4 w-[160px]" />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <SkeletonBox className="h-5 w-32" />
              <SkeletonBox className="mt-4 h-1 w-full rounded-full" />
              <div className="mt-3 flex items-center justify-between">
                <SkeletonBox className="h-3 w-14" />
                <SkeletonBox className="h-3 w-16" />
              </div>
            </div>

            <div className="mt-8">
              <SkeletonBox className="h-5 w-20" />
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <SkeletonBox className="h-4 w-4 rounded" />
                  <SkeletonBox className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-3">
                  <SkeletonBox className="h-4 w-4 rounded" />
                  <SkeletonBox className="h-4 w-32" />
                </div>
              </div>
            </div>
          </aside>

          {/* Right content skeleton */}
          <section>
            {/* Toolbar skeleton */}
            <div className="mb-5 flex items-center justify-between">
              <SkeletonBox className="h-5 w-32" />
              <SkeletonBox className="h-10 w-44 rounded-lg" />
            </div>

            {/* Grid skeleton */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <SkeletonBox className="h-[160px] w-full rounded-none" />
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <SkeletonBox className="h-7 w-7 rounded-full" />
                      <SkeletonBox className="h-4 w-24" />
                    </div>

                    <SkeletonBox className="mt-3 h-5 w-full" />
                    <SkeletonBox className="mt-2 h-5 w-2/3" />

                    <div className="mt-4 flex items-center gap-2">
                      <SkeletonBox className="h-4 w-24" />
                      <SkeletonBox className="h-4 w-12" />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <SkeletonBox className="h-6 w-24" />
                      <SkeletonBox className="h-9 w-24 rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination skeleton */}
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonBox key={i} className="h-10 w-10 rounded-lg" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
