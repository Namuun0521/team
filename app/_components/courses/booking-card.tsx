"use client";

import { useMemo, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  hourlyPrice: number;
};

export function BookingCard({ hourlyPrice }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("2");

  const total = useMemo(() => {
    return hourlyPrice * Number(duration);
  }, [hourlyPrice, duration]);

  return (
    <aside className="sticky top-6 rounded-3xl border bg-white p-6 shadow-xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-slate-500">
          Нэг цагийн үнэ:
        </p>
        <h2 className="mt-2 text-5xl font-bold text-slate-900">
          {hourlyPrice.toLocaleString()}₮
        </h2>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">Өдөр сонгох</h3>
        <div className="rounded-2xl border p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">
          Үргэлжлэх хугацаа
        </h3>

        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue placeholder="Цаг сонгох" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 цаг</SelectItem>
            <SelectItem value="2">2 цаг (Зөвлөмж)</SelectItem>
            <SelectItem value="3">3 цаг</SelectItem>
            <SelectItem value="4">4 цаг</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <span className="text-lg text-slate-500">Нийт дүн:</span>
        <span className="text-3xl font-bold text-blue-600">
          {total.toLocaleString()}₮
        </span>
      </div>

      <Button className="h-14 w-full rounded-2xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">
        <CalendarIcon className="mr-2 h-5 w-5" />
        Захиалах
      </Button>

      <div className="rounded-2xl border bg-slate-50 p-4">
        <p className="font-semibold text-slate-800">Баталгаат төлбөр</p>
        <p className="mt-1 text-sm leading-6 text-slate-500">
          Таны мөнгө сургалт дуустал найдвартай хадгалагдана.
        </p>
      </div>
    </aside>
  );
}
