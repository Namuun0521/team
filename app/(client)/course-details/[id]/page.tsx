"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Star, UserRound, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

type CourseData = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  avgRating: number;
  freelancer: {
    id: string;
    userId: string;
    bio: string | null;
    skills: string | null;
    imageUrl: string | null;
    user: { name: string | null };
  };
  _count: { bookings: number; reviews: number };
};

const CAT_LABEL: Record<string, string> = {
  Дизайн: "DESIGN COURSE",
  ХӨГЖҮҮЛЭГЧ: "DEVELOPMENT COURSE",
  Хэл_сурах: "LANGUAGE COURSE",
  Маркетинг: "MARKETING COURSE",
  Фитнес: "FITNESS COURSE",
  Ерөнхий_эрдэм: "GENERAL COURSE",
  Бусад: "OTHER",
};

function formatPrice(n: number) {
  return n.toLocaleString("mn-MN");
}

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { user } = useUser();

  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/courses/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Олдсонгүй");
        }

        setCourse(data);
      } catch (e) {
        const message = e instanceof Error ? e.message : "Алдаа гарлаа";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleBook = async () => {
    if (!course) return;

    setBooking(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Алдаа");
      }

      setBooked(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Захиалга илгээхэд алдаа гарлаа";
      alert(message);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb]">
        <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb]">
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">
            {error || "Хичээл олдсонгүй"}
          </p>
          <Link
            href="/courses"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
          >
            Хичээлүүд рүү буцах
          </Link>
        </div>
      </div>
    );
  }

  const instructorName = course.freelancer.user.name || "Freelancer";
  const rating = course.avgRating || 4.9;
  const reviewCount = course._count.reviews;
  const categoryLabel = CAT_LABEL[course.category] || course.category;
  const fallbackImg =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
  const heroImage = course.imageUrl || fallbackImg;
  const skillLabel = course.freelancer.skills
    ? course.freelancer.skills.split(",")[0]
    : "Мэргэжилтэн";
  const isOwner = user?.id === course.freelancer.userId;

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-6 text-sm text-[#94A3B8]">
          <Link href="/" className="hover:text-blue-600">
            Нүүр
          </Link>
          <span className="mx-1">&gt;</span>
          <Link href="/courses" className="hover:text-blue-600">
            Сургалт
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="font-medium text-[#0F172A]">{course.title}</span>
        </div>

        <div className="space-y-8">
          <div className="relative min-h-[340px] overflow-hidden rounded-3xl">
            <img
              src={heroImage}
              alt={course.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 flex min-h-[340px] h-full flex-col justify-end p-8 text-white">
              <span className="mb-4 inline-flex w-fit rounded-full bg-blue-600/80 px-4 py-1.5 text-xs font-semibold tracking-wide">
                {categoryLabel}
              </span>
              <h1 className="max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
            <div>
              <p className="text-sm text-slate-500">Нэг цагийн үнэ</p>
              <p className="mt-1 text-3xl font-bold text-blue-600">
                {formatPrice(course.price)}₮
              </p>
            </div>
            {isOwner ? (
              <span className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-500">
                Миний хичээл
              </span>
            ) : booked ? (
              <div className="flex items-center gap-2 font-semibold text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                Захиалга илгээгдлээ!
              </div>
            ) : (
              <Button
                onClick={handleBook}
                disabled={booking}
                className="h-12 rounded-xl bg-[#135BEC] px-8 text-base font-semibold text-white hover:bg-[#0f4fd4]"
              >
                {booking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {booking ? "Илгээж байна..." : "Захиалах"}
              </Button>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100">
                {course.freelancer.imageUrl ? (
                  <img
                    src={course.freelancer.imageUrl}
                    alt={instructorName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-8 w-8 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {instructorName}
                </h2>
                <p className="text-sm text-slate-500">{skillLabel}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-slate-400">
                    ({reviewCount} үнэлгээ)
                  </span>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl" asChild>
                <Link href={`/freelancers/${course.freelancer.id}`}>
                  <UserRound className="mr-2 h-4 w-4" />
                  Профайл үзэх
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Тайлбар</h3>
            <p className="whitespace-pre-line text-lg leading-8 text-slate-600">
              {course.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
