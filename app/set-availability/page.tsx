"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Clock,
  CalendarCheck,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  PartyPopper,
  Sparkles,
} from "lucide-react";

const DAYS = [
  { id: 0, short: "Ня", label: "Ням" },
  { id: 1, short: "Да", label: "Даваа" },
  { id: 2, short: "Мя", label: "Мягмар" },
  { id: 3, short: "Лх", label: "Лхагва" },
  { id: 4, short: "Пү", label: "Пүрэв" },
  { id: 5, short: "Ба", label: "Баасан" },
  { id: 6, short: "Бя", label: "Бямба" },
];

const TIME_OPTIONS = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

type DaySchedule = {
  enabled: boolean;
  startTime: string;
  endTime: string;
};

export default function SetAvailabilityPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [schedule, setSchedule] = useState<Record<number, DaySchedule>>({
    0: { enabled: false, startTime: "09:00", endTime: "17:00" },
    1: { enabled: true, startTime: "09:00", endTime: "17:00" },
    2: { enabled: true, startTime: "09:00", endTime: "17:00" },
    3: { enabled: true, startTime: "09:00", endTime: "17:00" },
    4: { enabled: true, startTime: "09:00", endTime: "17:00" },
    5: { enabled: true, startTime: "09:00", endTime: "17:00" },
    6: { enabled: false, startTime: "09:00", endTime: "17:00" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const toggleDay = (dayId: number) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], enabled: !prev[dayId].enabled },
    }));
  };

  const updateTime = (
    dayId: number,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setSchedule((prev) => ({
      ...prev,
      [dayId]: { ...prev[dayId], [field]: value },
    }));
  };

  const enabledCount = Object.values(schedule).filter((s) => s.enabled).length;

  const handleSubmit = async () => {
    setError(null);

    const enabledSlots = Object.entries(schedule)
      .filter(([, s]) => s.enabled)
      .map(([dayId, s]) => ({
        dayOfWeek: Number(dayId),
        startTime: s.startTime,
        endTime: s.endTime,
        slotDuration: 60,
      }));

    if (enabledSlots.length === 0) {
      setError("Хамгийн багадаа 1 өдрийн цаг сонгоно уу");
      return;
    }

    // Validate start < end
    for (const slot of enabledSlots) {
      if (slot.startTime >= slot.endTime) {
        const dayLabel = DAYS.find((d) => d.id === slot.dayOfWeek)?.label;
        setError(`${dayLabel}: Эхлэх цаг дуусах цагаас өмнө байх ёстой`);
        return;
      }
    }

    setLoading(true);

    try {
      const res = await fetch("/api/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots: enabledSlots }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Алдаа гарлаа");

      setSuccess(true);

      // 3 секундийн дараа нүүр хуудас руу шилжих
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Амжилттай дууссан UI ──
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <PartyPopper className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-[#0F172A]">
            Баяр хүргэе! 🎉
          </h1>
          <p className="mb-1 text-lg font-semibold text-green-600">
            Та амжилттай Freelancer боллоо!
          </p>
          <p className="mb-6 text-[#64748B]">
            Хичээл үүсгэгдэж, цагийн хуваарь тохируулагдлаа. Одоо суралцагчид
            таныг олж захиалга өгөх боломжтой.
          </p>

          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            <div className="flex items-center justify-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Профайл, хичээл, цагийн хуваарь бүгд бэлэн!
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-[#94A3B8]">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Нүүр хуудас руу шилжүүлж байна...</span>
          </div>
        </div>
      </div>
    );
  }

  // ── Цагийн хуваарь тохируулах UI ──
  return (
    <div className="min-h-screen bg-[#f8f9fb] py-10">
      <div className="mx-auto flex max-w-[600px] flex-col gap-8 px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-[#94A3B8]">
          Профайл үүсгэх {" > "} Хичээл оруулах {" > "}
          <span className="font-medium text-[#135BEC]">Цагийн хуваарь</span>
        </div>

        {/* Title */}
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <CalendarCheck className="h-5 w-5 text-[#135BEC]" />
            </div>
            <div>
              <h1 className="text-[26px] font-bold text-[#0F172A]">
                Цагийн хуваарь тохируулах
              </h1>
              <p className="text-[14px] text-[#64748B]">
                Суралцагчид таныг хэзээ захиалах боломжтойг тохируулна уу
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Steps indicator */}
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
            ✓
          </div>
          <div className="h-0.5 flex-1 bg-green-500" />
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
            ✓
          </div>
          <div className="h-0.5 flex-1 bg-green-500" />
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#135BEC] text-xs font-bold text-white">
            3
          </div>
        </div>
        <div className="flex justify-between text-xs text-[#94A3B8] -mt-5">
          <span>Профайл</span>
          <span>Хичээл</span>
          <span className="font-semibold text-[#135BEC]">Хуваарь</span>
        </div>

        {/* Day selector cards */}
        <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="mb-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                Ажиллах өдрүүд сонгох
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Идэвхтэй өдрүүд дээр дарж сонгоно уу
              </p>
            </div>

            {/* Day toggle buttons */}
            <div className="flex justify-center gap-2">
              {DAYS.map((day) => {
                const isActive = schedule[day.id].enabled;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => toggleDay(day.id)}
                    className={`flex h-14 w-14 flex-col items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#135BEC] text-white shadow-md shadow-blue-200"
                        : "border border-gray-200 bg-gray-50 text-gray-400 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-500"
                    }`}
                  >
                    <span className="text-[13px] font-bold">{day.short}</span>
                    <span className="mt-0.5 text-[9px] opacity-70">
                      {day.label}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-center text-xs text-[#94A3B8]">
              <span className="font-semibold text-[#135BEC]">
                {enabledCount}
              </span>{" "}
              өдөр сонгогдсон
            </p>
          </CardContent>
        </Card>

        {/* Time settings for each enabled day */}
        <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-sm">
          <CardContent className="p-6 space-y-1">
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                Цагийн хуваарь
              </p>
              <p className="mt-1 text-xs text-[#94A3B8]">
                Өдөр бүрийн ажиллах эхлэх, дуусах цагийг тохируулна уу
              </p>
            </div>

            {DAYS.map((day) => {
              const daySchedule = schedule[day.id];
              if (!daySchedule.enabled) return null;

              return (
                <div
                  key={day.id}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-[#FAFBFF] p-4 transition hover:border-blue-100"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#135BEC] text-xs font-bold text-white">
                    {day.short}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0F172A]">
                      {day.label}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#94A3B8]" />

                    <Select
                      value={daySchedule.startTime}
                      onValueChange={(v) => updateTime(day.id, "startTime", v)}
                    >
                      <SelectTrigger className="h-9 w-[100px] rounded-lg text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <span className="text-xs text-[#94A3B8]">—</span>

                    <Select
                      value={daySchedule.endTime}
                      onValueChange={(v) => updateTime(day.id, "endTime", v)}
                    >
                      <SelectTrigger className="h-9 w-[100px] rounded-lg text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              );
            })}

            {enabledCount === 0 && (
              <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
                <CalendarCheck className="mx-auto h-8 w-8 text-gray-300" />
                <p className="mt-2 text-sm text-gray-400">
                  Дээрээс ажиллах өдрүүдээ сонгоно уу
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => history.back()}
            className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#334155]"
          >
            <ChevronLeft className="h-4 w-4" />
            Буцах
          </button>

          <Button
            onClick={handleSubmit}
            disabled={loading || enabledCount === 0}
            className="h-12 gap-2 rounded-xl bg-[#135BEC] px-8 text-[15px] font-semibold text-white hover:bg-[#0f4fd4]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Хадгалж байна...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Бүгдийг дуусгах
              </>
            )}
          </Button>
        </div>

        {/* Tip */}
        <div className="flex items-start gap-3 rounded-xl bg-[#1E293B] p-5 text-sm">
          <CalendarCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
          <span className="text-[#CBD5E1]">
            <b className="text-white">Зөвлөгөө:</b> Суралцагчид таны идэвхтэй
            өдрүүдэд захиалга өгөх боломжтой. Та дараа нь хуваариа хэдийд ч
            өөрчлөх боломжтой.
          </span>
        </div>

        <p className="pb-4 text-center text-xs text-[#94A3B8]">
          © 2024 Freelancer.mn. Залууст зориулсан боломжийн талбар.
        </p>
      </div>
    </div>
  );
}
