"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Loader2,
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  PartyPopper,
  X,
} from "lucide-react";

type Booking = {
  id: string;
  startAt: string;
  endAt: string;
  paymentStatus: string;
  course: {
    id: string;
    title: string;
    price: number;
    imageUrl: string | null;
    category: string;
    freelancer: {
      user: { name: string | null };
    };
  };
};

type ReviewState = {
  courseId: string;
  rating: number;
  comment: string;
};

const CAT_LABEL: Record<string, string> = {
  Дизайн: "Дизайн",
  ХӨГЖҮҮЛЭГЧ: "Хөгжүүлэгч",
  Хэл_сурах: "Хэл сурах",
  Маркетинг: "Маркетинг",
  Фитнес: "Фитнес",
  Ерөнхий_эрдэм: "Ерөнхий эрдэм",
  Бусад: "Бусад",
};

function StarRating({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            className={`h-8 w-8 ${
              star <= (hovered || value)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Per-booking review state
  const [reviewMap, setReviewMap] = useState<Record<string, ReviewState>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submittedIds, setSubmittedIds] = useState<Set<string>>(new Set());
  const [openReviewId, setOpenReviewId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/my-bookings")
      .then((r) => r.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const getReview = (bookingId: string, courseId: string): ReviewState =>
    reviewMap[bookingId] ?? { courseId, rating: 0, comment: "" };

  const setReview = (bookingId: string, partial: Partial<ReviewState>) => {
    setReviewMap((prev) => ({
      ...prev,
      [bookingId]: { ...getReview(bookingId, ""), ...partial },
    }));
  };

  const handleSubmitReview = async (booking: Booking) => {
    const review = getReview(booking.id, booking.course.id);
    if (review.rating === 0) return;

    setSubmittingId(booking.id);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: booking.course.id,
          rating: review.rating,
          comment: review.comment,
        }),
      });

      if (res.ok) {
        setSubmittedIds((prev) => new Set([...prev, booking.id]));
        setOpenReviewId(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingId(null);
    }
  };

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (s: string) =>
    new Date(s).toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const completedBookings = bookings.filter(
    (b) => b.paymentStatus === "COMPLETED",
  );
  const paidBookings = bookings.filter((b) => b.paymentStatus === "PAID");

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-10">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">
              Миний захиалгууд
            </h1>
            <p className="text-sm text-[#64748B]">
              Авсан хичээлүүд болон үнэлгээ өгөх
            </p>
          </div>
        </div>

        {bookings.length === 0 && (
          <Card className="rounded-2xl">
            <CardContent className="py-16 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700">
                Захиалга байхгүй байна
              </h3>
            </CardContent>
          </Card>
        )}

        {/* Completed — needs review */}
        {completedBookings.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#0F172A]">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              Үнэлгээ өгөх хүсэлт
            </h2>

            <div className="space-y-4">
              {completedBookings.map((booking) => {
                const isSubmitted = submittedIds.has(booking.id);
                const isOpen = openReviewId === booking.id;
                const review = getReview(booking.id, booking.course.id);
                const freelancerName =
                  booking.course.freelancer.user.name || "Багш";

                return (
                  <Card
                    key={booking.id}
                    className="overflow-hidden rounded-2xl border shadow-sm"
                  >
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        {booking.course.imageUrl ? (
                          <img
                            src={booking.course.imageUrl}
                            alt={booking.course.title}
                            className="h-40 w-full object-cover sm:h-auto sm:w-44"
                          />
                        ) : (
                          <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 sm:h-auto sm:w-44">
                            <BookOpen className="h-8 w-8 text-blue-400" />
                          </div>
                        )}

                        <div className="flex flex-1 flex-col p-5 gap-3">
                          <div>
                            <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                              {CAT_LABEL[booking.course.category] ||
                                booking.course.category}
                            </span>
                            <h3 className="mt-1 text-base font-bold text-[#0F172A]">
                              {booking.course.title}
                            </h3>
                            <p className="text-sm text-[#64748B]">
                              Багш: {freelancerName}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3 text-xs text-[#64748B]">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {formatDate(booking.startAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {formatTime(booking.startAt)}
                            </span>
                          </div>

                          {/* Review prompt banner */}
                          {!isSubmitted && !isOpen && (
                            <div className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3">
                              <p className="text-sm font-semibold text-yellow-800">
                                🌟 Та энэ хичээлд үнэлгээ өгөхгүй юу?
                              </p>
                              <p className="mt-0.5 text-xs text-yellow-700">
                                Таны санал бодол бусад суралцагчдад маш их тус
                                болно.
                              </p>
                              <Button
                                onClick={() => setOpenReviewId(booking.id)}
                                className="mt-2 h-8 rounded-lg bg-yellow-400 px-4 text-xs font-semibold text-yellow-900 hover:bg-yellow-500"
                              >
                                Үнэлгээ өгөх
                              </Button>
                            </div>
                          )}

                          {/* Review form */}
                          {isOpen && !isSubmitted && (
                            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-[#0F172A]">
                                  Үнэлгээ өгөх
                                </p>
                                <button
                                  onClick={() => setOpenReviewId(null)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>

                              <div>
                                <p className="mb-2 text-xs text-[#64748B]">
                                  Одоор үнэлнэ үү
                                </p>
                                <StarRating
                                  value={review.rating}
                                  onChange={(v) =>
                                    setReview(booking.id, { rating: v })
                                  }
                                />
                              </div>

                              <Textarea
                                placeholder="Хичээлийн талаар сэтгэгдлээ бичнэ үү... (заавал биш)"
                                value={review.comment}
                                onChange={(e) =>
                                  setReview(booking.id, {
                                    comment: e.target.value,
                                  })
                                }
                                className="min-h-[80px] rounded-xl bg-white text-sm"
                              />

                              <Button
                                onClick={() => handleSubmitReview(booking)}
                                disabled={
                                  review.rating === 0 ||
                                  submittingId === booking.id
                                }
                                className="h-10 w-full rounded-xl bg-[#135BEC] text-sm font-semibold text-white hover:bg-[#0f4fd4]"
                              >
                                {submittingId === booking.id ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Илгээж байна...
                                  </>
                                ) : (
                                  "Үнэлгээ илгээх"
                                )}
                              </Button>
                            </div>
                          )}

                          {/* Review submitted */}
                          {isSubmitted && (
                            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                              <PartyPopper className="h-4 w-4 text-green-600" />
                              <p className="text-sm font-semibold text-green-700">
                                Үнэлгээ амжилттай илгээгдлээ. Баярлалаа!
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Paid — in progress */}
        {paidBookings.length > 0 && (
          <div>
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#0F172A]">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              Явагдаж байгаа хичээлүүд
            </h2>

            <div className="space-y-3">
              {paidBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="overflow-hidden rounded-2xl border shadow-sm"
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      {booking.course.imageUrl ? (
                        <img
                          src={booking.course.imageUrl}
                          alt={booking.course.title}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                          <BookOpen className="h-6 w-6 text-blue-400" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#0F172A]">
                          {booking.course.title}
                        </h3>
                        <p className="text-xs text-[#64748B]">
                          {formatDate(booking.startAt)} ·{" "}
                          {formatTime(booking.startAt)}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Явагдаж байна
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
