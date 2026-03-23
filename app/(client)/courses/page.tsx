"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CoursesGrid } from "../../_components/CoursesGrid";
import { CoursesToolbar } from "../../_components/CoursesToolbar";
import { CoursesSidebar } from "../../_components/CoursesSidebar";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  avgRating?: number;
  imageUrl?: string | null;
  _count?: { reviews: number };
  freelancer?: { user?: { name?: string } };
};

type Sort = "new" | "priceAsc" | "priceDesc";

const ITEMS_PER_PAGE = 9;
const PRICE_MIN = 0;
const PRICE_MAX = 500000;

function matchesRatingBand(rating: number, selectedRating: number) {
  if (selectedRating === 5) return rating === 5;
  return rating >= selectedRating && rating < selectedRating + 1;
}

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("new");
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    PRICE_MAX,
  ]);
  const [minRating, setMinRating] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = category
      ? `/api/courses?category=${encodeURIComponent(category)}`
      : "/api/courses";

    const fetchData = fetch(url)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setCourses([]);
          setError(data?.message ?? "Алдаа гарлаа");
          return;
        }
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data?.courses)) {
          setCourses(data.courses);
        } else {
          setCourses([]);
          setError("API буруу форматтай дата буцаалаа");
        }
      })
      .catch(() => {
        setCourses([]);
        setError("Network алдаа гарлаа");
      });

    const minDelay = new Promise((resolve) => setTimeout(resolve, 1500));
    Promise.all([fetchData, minDelay]).finally(() => setLoading(false));
  }, [category]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort, activeSub, priceRange, minRating]);

  const heading = useMemo(() => {
    if (!category) return "Бүх хичээлүүд";
    return category.replaceAll("_", " ");
  }, [category]);

  const subtitle = useMemo(() => {
    if (!category) return "Бүх төрлийн сургалт, үйлчилгээ";
    return `${heading} чиглэлээрх бүх төрлийн сургалт, үйлчилгээ`;
  }, [category, heading]);

  const subcats: string[] = [];

  const visibleCourses = useMemo(() => {
    let arr = [...courses];

    if (activeSub) {
      arr = arr.filter((course) => {
        const title = course.title?.toLowerCase() || "";
        const description = course.description?.toLowerCase() || "";
        const sub = activeSub.toLowerCase();
        return title.includes(sub) || description.includes(sub);
      });
    }

    arr = arr.filter(
      (course) =>
        course.price >= priceRange[0] && course.price <= priceRange[1],
    );

    if (minRating !== null) {
      arr = arr.filter((course) =>
        matchesRatingBand(course.avgRating ?? 0, minRating),
      );
    }

    if (sort === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [courses, sort, activeSub, priceRange, minRating]);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleCourses.length / ITEMS_PER_PAGE),
  );

  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return visibleCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [visibleCourses, currentPage]);

  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages],
  );

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <p className="mt-4 text-sm text-gray-500">
          Хичээлүүдийг ачааллаж байна...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900">{heading}</h1>
          <p className="mt-2 text-gray-500">{subtitle}</p>
        </div>

        {error && (
          <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <CoursesSidebar
            categoryLabel={heading}
            subcats={subcats}
            activeSub={activeSub}
            onSelectSub={setActiveSub}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            priceMin={PRICE_MIN}
            priceMax={PRICE_MAX}
            minRating={minRating}
            onRatingChange={setMinRating}
          />

          <section>
            <CoursesToolbar
              total={visibleCourses.length}
              sort={sort}
              setSort={setSort}
            />

            <CoursesGrid courses={paginatedCourses} />

            {!error && visibleCourses.length === 0 && (
              <p className="mt-10 text-gray-500">
                Энэ ангилалд хичээл олдсонгүй.
              </p>
            )}

            {!error && visibleCourses.length > 0 && totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-4">
                <div className="text-sm text-gray-500">
                  {currentPage} / {totalPages} хуудас
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back
                  </Button>

                  {pageNumbers.map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      className={`min-w-10 rounded-xl ${
                        currentPage === page
                          ? "bg-[#135BEC] text-white hover:bg-blue-700"
                          : ""
                      }`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
