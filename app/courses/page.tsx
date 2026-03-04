"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CoursesGrid } from "../_components/CoursesGrid";
import { CoursesToolbar } from "../_components/CoursesToolbar";
import { CoursesSidebar } from "../_components/CoursesSidebar";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  freelancer?: { user?: { name?: string } };
};

const SUBCATS: Record<string, string[]> = {
  Дизайн: [
    "График дизайн",
    "Вэб дизайн",
    "UI/UX Дизайн",
    "Интерьер",
    "Анимейшн",
  ],
  Маркетинг: ["SMM", "Контент", "SEO", "Брэндинг"],
  Фитнес: ["Йог", "Бясалгал", "Хүч", "Кардио"],
  Хөгжүүлэгч: ["Frontend", "Backend", "Mobile", "AI/ML"],
  Ерөнхий_эрдэм: ["Математик", "Физик", "Хими", "Биологи"],
  Хэл_сурах: ["Англи", "Япон", "Солонгос", "Хятад"],
};

type Sort = "new" | "priceAsc" | "priceDesc";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI states
  const [activeSub, setActiveSub] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("new");

  useEffect(() => {
    setLoading(true);
    setError(null);

    const url = category
      ? `/api/courses?category=${encodeURIComponent(category)}`
      : "/api/courses";

    fetch(url)
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          setCourses([]);
          setError(data?.message ?? "Алдаа гарлаа");
          return;
        }

        if (Array.isArray(data)) setCourses(data);
        else if (Array.isArray(data?.courses)) setCourses(data.courses);
        else {
          setCourses([]);
          setError("API буруу форматтай дата буцаалаа");
        }
      })
      .catch(() => {
        setCourses([]);
        setError("Network алдаа гарлаа");
      })
      .finally(() => setLoading(false));
  }, [category]);

  const heading = useMemo(() => {
    if (!category) return "Бүх хичээлүүд";
    return category.replaceAll("_", " ");
  }, [category]);

  const subtitle = useMemo(() => {
    if (!category) return "Бүх төрлийн сургалт, үйлчилгээ";
    return `${heading} чиглэлээрх бүх төрлийн сургалт, үйлчилгээ`;
  }, [category, heading]);

  const subcats = useMemo(
    () => (category ? (SUBCATS[category] ?? []) : []),
    [category],
  );

  const visibleCourses = useMemo(() => {
    const arr = [...courses];

    if (sort === "priceAsc") arr.sort((a, b) => a.price - b.price);
    if (sort === "priceDesc") arr.sort((a, b) => b.price - a.price);

    // activeSub filter (дараа нь бодитоор хийнэ)
    // одоогоор UI л, data дээр subcategory байхгүй тул шүүхгүй.

    return arr;
  }, [courses, sort, activeSub]);

  if (loading)
    return <div className="mx-auto max-w-6xl px-4 py-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
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
          />

          <section>
            <CoursesToolbar
              total={visibleCourses.length}
              sort={sort}
              setSort={setSort}
            />

            <CoursesGrid courses={visibleCourses} />

            {!error && visibleCourses.length === 0 && (
              <p className="mt-10 text-gray-500">
                Энэ ангилалд хичээл олдсонгүй.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
