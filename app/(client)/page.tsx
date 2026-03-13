"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSection } from "../_components/HeroSection";
import { CoursesGrid } from "../_components/CoursesGrid";

type Course = {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  freelancer?: { user?: { name?: string | null } } | undefined;
};

export default function Home() {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/api/courses")
      .then(async (res) => {
        const data = await res.json();
        setAllCourses(Array.isArray(data) ? data : (data?.courses ?? []));
      })
      .catch(() => setAllCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const newCourses = useMemo(() => allCourses.slice(0, 6), [allCourses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {loading ? (
          <div className="rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
            Ачааллаж байна...
          </div>
        ) : (
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Шинээр нэмэгдсэн үйлчилгээнүүд
              </h2>
            </div>

            {newCourses.length === 0 ? (
              <div className="rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
                Шинэ хичээл олдсонгүй
              </div>
            ) : (
              <CoursesGrid courses={newCourses} />
            )}
          </section>
        )}
      </main>
    </div>
  );
}
