"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Star,
  UserRound,
  BookOpen,
  BadgeCheck,
  CalendarDays,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  const router = useRouter();
  const id = params.id as string;
  const { user } = useUser();
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullBio, setShowFullBio] = useState(false);

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

  const handleBook = () => {
    if (!course) return;
    router.push(
      `/freelancer/${course.freelancer.id}/booking?courseId=${course.id}`,
    );
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
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb] px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">
            {error || "Хичээл олдсонгүй"}
          </p>
          <Link
            href="/courses"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
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
  const bookingCount = course._count.bookings;
  const categoryLabel = CAT_LABEL[course.category] || course.category;

  const fallbackImg =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";

  const heroImage = course.imageUrl || fallbackImg;

  const skills = course.freelancer.skills
    ? course.freelancer.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const skillLabel = skills[0] || "Мэргэжилтэн";
  const isOwner = user?.id === course.freelancer.userId;

  const bioText = course.freelancer.bio || "Танилцуулга оруулаагүй байна";
  const shouldShowBioToggle = bioText.length > 180;

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <Button
            variant="ghost"
            className="h-9 rounded-xl px-3 text-slate-600 hover:bg-slate-100"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Буцах
          </Button>

          <div className="flex items-center">
            <Link href="/" className="hover:text-blue-600">
              Нүүр
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <Link href="/courses" className="hover:text-blue-600">
              Сургалт
            </Link>
            <span className="mx-2 text-slate-300">/</span>
            <span className="font-medium text-slate-800">{course.title}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="relative h-[260px] sm:h-[340px] md:h-[400px]">
                <img
                  src={heroImage}
                  alt={course.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-[#0f172a]/25 to-transparent" />

                <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-600/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-white shadow-sm">
                      {categoryLabel}
                    </span>
                  </div>

                  <div className="max-w-3xl text-white">
                    <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                      {course.title}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{rating}</span>
                        <span className="text-white/75">
                          ({reviewCount} үнэлгээ)
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4" />
                        <span>{bookingCount} захиалга</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.category?.replaceAll("_", " ")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <BookOpen className="h-5 w-5 text-[#135BEC]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Хичээлийн тайлбар
                  </h2>
                  <p className="text-sm text-slate-500">
                    Энэ хичээлээр юу сурах талаар
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 md:p-6">
                <p
                  className={`whitespace-pre-line text-[15px] leading-8 text-slate-700 md:text-base ${
                    showFullDesc ? "" : "line-clamp-5"
                  }`}
                >
                  {course.description}
                </p>
                {course.description.length > 200 && (
                  <button
                    type="button"
                    onClick={() => setShowFullDesc((prev) => !prev)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#135BEC] hover:underline"
                  >
                    {showFullDesc ? (
                      <>
                        See less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See more <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </Card>

            <Card className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <UserRound className="h-5 w-5 text-[#135BEC]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Багшийн тухай
                  </h2>
                  <p className="text-sm text-slate-500">
                    Туршлага болон танилцуулга
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 md:p-6">
                <p
                  className={`whitespace-pre-line text-[15px] leading-8 text-slate-700 transition-all ${
                    showFullBio ? "" : "line-clamp-4"
                  }`}
                >
                  {bioText}
                </p>

                {shouldShowBioToggle && (
                  <button
                    type="button"
                    onClick={() => setShowFullBio((prev) => !prev)}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#135BEC] hover:underline"
                  >
                    {showFullBio ? (
                      <>
                        See less <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        See more <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6  lg:top-6 lg:self-start">
            <Card className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-5">
                <p className="text-sm text-slate-500">Нэг цагийн үнэ</p>
                <p className="mt-1 text-3xl font-bold text-[#135BEC]">
                  {formatPrice(course.price)}₮
                </p>
              </div>

              <div className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Үнэлгээ</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-slate-900">
                        {rating}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-slate-500">Сэтгэгдэл</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {reviewCount}
                    </p>
                  </div>
                </div>

                {isOwner ? (
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-500">
                    Энэ бол таны өөрийн хичээл
                  </div>
                ) : (
                  <Button
                    onClick={handleBook}
                    className="h-12 w-full rounded-2xl bg-[#135BEC] text-base font-semibold text-white hover:bg-[#0f4fd4]"
                  >
                    Цаг сонгох
                  </Button>
                )}
              </div>
            </Card>

            <Card className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-100">
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

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {instructorName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{skillLabel}</p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating}</span>
                    <span className="text-slate-400">
                      ({reviewCount} үнэлгээ)
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-slate-200"
                  asChild
                >
                  <Link href={`/freelancers/${course.freelancer.id}`}>
                    Профайл үзэх
                  </Link>
                </Button>
              </div>
            </Card>

            <Card className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                  <BadgeCheck className="h-5 w-5 text-[#135BEC]" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Ур чадвар</h3>
                  <p className="text-sm text-slate-500">
                    Багшийн үндсэн чиглэлүүд
                  </p>
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-[#135BEC]"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  Ур чадвар оруулаагүй байна
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
