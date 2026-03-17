"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

type Availability = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
};

const DAYS = ["Ням", "Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба"];

function generateSlots(start: string, end: string, duration: number) {
  const slots: string[] = [];

  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  let current = startH * 60 + startM;
  const endTime = endH * 60 + endM;

  while (current + duration <= endTime) {
    const h = Math.floor(current / 60)
      .toString()
      .padStart(2, "0");

    const m = (current % 60).toString().padStart(2, "0");

    slots.push(`${h}:${m}`);

    current += duration;
  }

  return slots;
}

export default function AvailabilityBooking({
  freelancerId,
  courseId,
}: {
  freelancerId: string;
  courseId: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [availability, setAvailability] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/availability/${freelancerId}`)
      .then((res) => res.json())
      .then((data) => {
        setAvailability(data.availability || []);
      })
      .finally(() => setLoading(false));
  }, [freelancerId]);

  const handleBooking = async () => {
    if (!selectedSlot || !courseId) return;

    setBooking(true);

    const [dayOfWeek, time] = selectedSlot.split("-");
    const startAt = new Date();
    const [hour, minute] = time.split(":");

    startAt.setHours(Number(hour));
    startAt.setMinutes(Number(minute));
    startAt.setSeconds(0);

    const endAt = new Date(startAt.getTime() + 60 * 60 * 1000);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          freelancerId,
          courseId,
          startAt,
          endAt,
        }),
      });

      if (!res.ok) {
        throw new Error("Booking алдаа");
      }

      router.refresh();
      setSuccess(true);
    } catch {
      alert("Захиалга илгээхэд алдаа гарлаа");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (success) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="py-16 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
          <h2 className="text-xl font-semibold">Хүсэлт амжилттай илгээгдлээ</h2>
          <p className="mt-2 text-sm text-gray-500">
            Багш таны захиалгыг шалгаж баталгаажуулна.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!availability.length) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="py-10 text-center text-gray-500">
          Завтай цаг олдсонгүй
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
          <CalendarCheck className="h-5 w-5 text-[#135BEC]" />
        </div>

        <div>
          <h1 className="text-[26px] font-bold text-[#0F172A]">
            Хичээлийн цаг сонгох
          </h1>
          <p className="text-sm text-[#64748B]">
            Доорх боломжит цагуудаас өөрт тохирохыг сонгоно уу
          </p>
        </div>
      </div>

      {availability.map((day) => {
        const slots = generateSlots(
          day.startTime,
          day.endTime,
          day.slotDuration,
        );

        return (
          <Card key={day.id} className="rounded-2xl border bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#0F172A]">
                <Clock className="h-4 w-4 text-[#94A3B8]" />
                {DAYS[day.dayOfWeek]}
              </div>

              <div className="flex flex-wrap gap-3">
                {slots.map((slot) => {
                  const value = `${day.dayOfWeek}-${slot}`;

                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(value)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                        selectedSlot === value
                          ? "border-[#135BEC] bg-[#135BEC] text-white"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="flex justify-end">
        <Button
          onClick={handleBooking}
          disabled={!selectedSlot || booking}
          className="h-12 rounded-xl bg-[#135BEC] px-8 font-semibold text-white"
        >
          {booking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Илгээж байна...
            </>
          ) : (
            "Цаг захиалах"
          )}
        </Button>
      </div>
    </div>
  );
}
