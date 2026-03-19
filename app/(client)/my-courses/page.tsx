"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Loader2,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  PartyPopper,
  Wallet,
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
  };
  user: {
    name: string | null;
    email: string;
  };
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

export default function MyCoursesPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/my-courses")
      .then((res) => res.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const handleComplete = async (bookingId: string) => {
    setCompletingId(bookingId);
    try {
      const res = await fetch(`/api/my-courses/${bookingId}/complete`, {
        method: "POST",
      });
      if (res.ok) {
        setCompletedIds((prev) => new Set([...prev, bookingId]));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingId(null);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (dateStr: string) =>
    new Date(dateStr).toLocaleTimeString("mn-MN", {
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
              Миний хичээлүүд
            </h1>
            <p className="text-sm text-[#64748B]">
              Төлөгдсөн захиалгууд — ажил эхэлсэн
            </p>
          </div>
        </div>

        {/* Empty state */}
        {bookings.length === 0 && (
          <Card className="rounded-2xl">
            <CardContent className="py-16 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700">
                Одоогоор төлөгдсөн захиалга байхгүй байна
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Суралцагч захиалга төлсний дараа энд харагдана
              </p>
            </CardContent>
          </Card>
        )}

        {/* Booking cards */}
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isCompleted = completedIds.has(booking.id);
            const studentName = booking.user.name || booking.user.email;

            return (
              <Card
                key={booking.id}
                className="overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    {/* Course image */}
                    {booking.course.imageUrl ? (
                      <img
                        src={booking.course.imageUrl}
                        alt={booking.course.title}
                        className="h-40 w-full object-cover sm:h-auto sm:w-48"
                      />
                    ) : (
                      <div className="flex h-40 w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 sm:h-auto sm:w-48">
                        <BookOpen className="h-10 w-10 text-blue-400" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div className="space-y-3">
                        {/* Category + title */}
                        <div>
                          <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                            {CAT_LABEL[booking.course.category] ||
                              booking.course.category}
                          </span>
                          <h3 className="mt-1 text-lg font-bold text-[#0F172A]">
                            {booking.course.title}
                          </h3>
                        </div>

                        {/* Student info */}
                        <div className="flex items-center gap-2 text-sm text-[#64748B]">
                          <User className="h-4 w-4" />
                          <span>
                            Суралцагч:{" "}
                            <span className="font-medium text-[#0F172A]">
                              {studentName}
                            </span>
                          </span>
                        </div>

                        {/* Time info */}
                        <div className="flex flex-wrap gap-4 text-sm text-[#64748B]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-[#94A3B8]" />
                            {formatDate(booking.startAt)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-[#94A3B8]" />
                            {formatTime(booking.startAt)} —{" "}
                            {formatTime(booking.endAt)}
                          </div>
                        </div>

                        {/* Price */}
                        <p className="text-xl font-bold text-blue-600">
                          {booking.course.price.toLocaleString()}₮
                        </p>
                      </div>

                      {/* Status / Action */}
                      <div className="mt-4">
                        {isCompleted ? (
                          /* Completed success state */
                          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                            <div className="flex items-center gap-2 text-green-700">
                              <PartyPopper className="h-5 w-5" />
                              <span className="font-semibold">
                                Ажил амжилттай дууслаа!
                              </span>
                            </div>
                            <div className="mt-2 flex items-start gap-2 text-sm text-green-600">
                              <Wallet className="mt-0.5 h-4 w-4 shrink-0" />
                              <span>
                                Удахгүй таны ажлын хөлс <strong>balance</strong>{" "}
                                хэсэгт шилжинэ. Баярлалаа!
                              </span>
                            </div>
                          </div>
                        ) : (
                          /* Active work state */
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
                              <CheckCircle2 className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">
                                Төлбөр төлөгдсөн тул таны ажил эхэллээ
                              </span>
                            </div>
                            <Button
                              onClick={() => handleComplete(booking.id)}
                              disabled={completingId === booking.id}
                              className="h-11 w-full rounded-xl bg-[#135BEC] font-semibold text-white hover:bg-[#0f4fd4]"
                            >
                              {completingId === booking.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Боловсруулж байна...
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Ажил дуусгах
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
