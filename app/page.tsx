"use client";

import { useEffect, useMemo, useState } from "react";
import { HeroSection } from "./_components/HeroSection";

type Course = {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  price: number;
  freelancer?: { user?: { name?: string | null } | null } | null;
};

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}

const CourseCard = ({ c }: { c: Course }) => {
  return (
    <div className="w-[240px] shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="h-[130px] bg-gradient-to-br from-gray-100 to-gray-200" />

      <div className="p-4">
        <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
          {c.category?.replaceAll("_", " ")}
        </span>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {c.title}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100">
            👤
          </span>
          <span>{c.freelancer?.user?.name ?? "Нэргүй багш"}</span>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-700">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">4.9</span>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold text-blue-700">
              {formatMNT(c.price)}₮
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseRow = ({
  title,
  items,
  emptyText = "Хичээл олдсонгүй",
}: {
  title: string;
  items: Course[];
  emptyText?: string;
}) => {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Бүгдийг үзэх →
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
          {emptyText}
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map((c) => (
            <CourseCard key={c.id} c={c} />
          ))}
        </div>
      )}
    </section>
  );
};

const CTA = () => {
  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-2xl bg-blue-600 px-10 py-12 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-2xl bg-white/10" />
        <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-2xl bg-white/10" />

        <h3 className="text-3xl font-bold leading-tight">
          Та өөрийн ур чадвараараа орлого
          <br />
          олохыг хүсэж байна уу?
        </h3>

        <p className="mt-4 max-w-2xl text-white/80">
          Манай платформд нэгдэж, өөрийн хичээл болон үйлчилгээгээ санал болгоод
          Монголын шилдэг залуучуудын нэг болоорой.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-white/90">
            Freelancer болох
          </button>
          <button className="rounded-lg border border-white/60 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </section>
  );
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

  const suggestedCourses = useMemo(() => allCourses.slice(0, 6), [allCourses]);
  const newCourses = useMemo(() => allCourses.slice(6, 12), [allCourses]);

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <main className="mx-auto max-w-6xl px-4 py-6">
        {loading ? (
          <div className="rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
            Ачааллаж байна...
          </div>
        ) : (
          <>
            <CourseRow
              title="Санал болгож буй хичээлүүд"
              items={suggestedCourses}
              emptyText="Санал болгож буй хичээл олдсонгүй"
            />
            <CourseRow
              title="Шинээр нэмэгдсэн үйлчилгээнүүд"
              items={newCourses}
              emptyText="Шинэ хичээл олдсонгүй"
            />
          </>
        )}

        <CTA />
      </main>
    </div>
  );
}
