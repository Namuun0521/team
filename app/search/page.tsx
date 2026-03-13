"use client";

import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const SearchSkeleton = () => (
    <div className="flex gap-3 p-3 w-full">
      <Skeleton className="w-12 h-12 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  );

  const handleSearch = async (value: string) => {
    setQuery(value);

    if (!value) {
      setCourses([]);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/courses/search?q=${value}`);
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Search error:", error);
      setCourses([]);
    }

    setLoading(false);
  };

  return (
    <div className="relative hidden lg:block lg:w-90 xl:w-100">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

      <input
        type="text"
        value={query}
        placeholder="Хичээл хайх..."
        onChange={(e) => handleSearch(e.target.value)}
        onBlur={() => setTimeout(() => setCourses([]), 200)}
        className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      {query && (
        <div className="absolute top-12 p-3 w-120 bg-white shadow-lg rounded-lg border z-50 max-h-64 overflow-y-auto">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => <SearchSkeleton key={i} />)}

          {!loading && courses.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-4">
              Хичээл олдсонгүй
            </div>
          )}

          {!loading &&
            courses.map((course) => (
              <div
                key={course.id}
                className="flex p-2 border-b justify-between items-center"
              >
                <div className="flex gap-2">
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}

                  <div>
                    <p className="text-sm font-bold">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.price}₮</p>
                  </div>
                </div>

                <p
                  onClick={() => {
                    setCourses([]);
                    setQuery("");
                    router.push(`/course-details/${course.id}`);
                  }}
                  className="flex items-center text-xs font-semibold text-blue-600 gap-1 rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
                >
                  Хичээл үзэх
                  <ChevronRight size={14} />
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
