"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSection } from "../_components/HeroSection";
import { Star } from "lucide-react";
import { HowItWorks } from "../_components/HowItWorks";

type Course = {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  avgRating?: number;
  _count?: { reviews: number };
  freelancer?: {
    imageUrl?: string | null;
    user?: { name?: string | null } | null;
  } | null;
};

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}

const CourseCard = ({ c }: { c: Course }) => {
  const router = useRouter();
  const rating = c.avgRating ?? 0;
  const reviewCount = c._count?.reviews ?? 0;

  return (
    <div
      onClick={() => router.push(`/course-details/${c.id}`)}
      className="flex w-60 shrink-0 self-start cursor-pointer flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
    >
      {c.imageUrl ? (
        <img src={c.imageUrl} className="h-32.5 w-full object-cover" />
      ) : (
        <div className="h-32.5 bg-linear-to-br from-gray-100 to-gray-200" />
      )}

      <div className="flex h-42 flex-col overflow-hidden p-4">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <img
            src={c.freelancer?.imageUrl || "/placeholder.png"}
            alt={c.freelancer?.user?.name ?? "Freelancer"}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="truncate font-medium text-gray-700">
            {c.freelancer?.user?.name ?? "Freelancer"}
          </span>
          <span className="inline-flex max-w-fit rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
            {c.category?.replaceAll("_", " ")}
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
          {c.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-10 text-xs leading-5 text-gray-800">
          {c.description || "Тайлбар оруулаагүй байна."}
        </p>

        <div className="mt-auto border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-gray-700">
              <Star
                className={`h-3.5 w-3.5 ${
                  rating > 0
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
              {rating > 0 ? (
                <>
                  <span className="font-medium">{rating}</span>
                  <span className="text-gray-400">({reviewCount})</span>
                </>
              ) : (
                <span className="text-gray-400">Үнэлгээгүй</span>
              )}
            </div>

            <div className="text-right pl-3">
              <div className="text-sm font-semibold text-blue-700">
                {formatMNT(c.price)}₮
              </div>
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
  emptyText = "Үйлчилгээ олдсонгүй",
}: {
  title: string;
  items: Course[];
  emptyText?: string;
}) => {
  const router = useRouter();

  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button
          className="text-sm font-medium cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => router.push("/courses")}
        >
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
  const topRatedCourses = useMemo(
    () =>
      [...allCourses]
        .sort((a, b) => {
          const ratingDiff = (b.avgRating ?? 0) - (a.avgRating ?? 0);
          if (ratingDiff !== 0) return ratingDiff;

          const reviewDiff =
            (b._count?.reviews ?? 0) - (a._count?.reviews ?? 0);
          if (reviewDiff !== 0) return reviewDiff;

          return 0;
        })
        .slice(0, 6),
    [allCourses],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      <main className="mx-auto max-w-6xl px-4 py-6">
        <HowItWorks />
        {loading ? (
          <div className="rounded-xl border bg-white p-10 text-center text-sm text-gray-500">
            Ачааллаж байна...
          </div>
        ) : (
          <>
            <CourseRow
              title="Шинээр нэмэгдсэн үйлчилгээнүүд"
              items={newCourses}
              emptyText="Шинэ үйлчилгээ олдсонгүй"
            />

            <CourseRow
              title="Өндөр үнэлгээтэй үйлчилгээнүүд"
              items={topRatedCourses}
              emptyText="Өндөр үнэлгээтэй үйлчилгээ олдсонгүй"
            />
          </>
        )}
      </main>
    </div>
  );
}
