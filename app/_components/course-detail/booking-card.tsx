"use client";

import { useMemo, useState } from "react";
import { CalendarIcon, Clock2Icon, Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

import {
  InputGroupAddon,
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = {
  hourlyPrice: number;
  freelancerId: string;
};

export function BookingCard({ hourlyPrice, freelancerId }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("2");

  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");

  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = useMemo(() => {
    return hourlyPrice * Number(duration);
  }, [hourlyPrice, duration]);

  const handleBooking = async () => {
    if (!date) return;

    setBooking(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        freelancerId,
        date,
        startTime,
        endTime,
        duration,
      }),
    });

    if (res.ok) {
      setSuccess(true);
    }

    setBooking(false);
  };

  if (success) {
    return (
      <aside className="rounded-3xl border bg-white p-10 shadow-xl text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />

        <h2 className="text-xl font-semibold">Хүсэлт амжилттай илгээгдлээ</h2>

        <p className="mt-2 text-sm text-slate-500">
          Багш таны захиалгыг шалгаж баталгаажуулна.
        </p>
      </aside>
    );
  }

  return (
    <aside className="sticky top-6 rounded-3xl border bg-white p-6 shadow-xl space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-slate-500">
          Нэг цагийн үнэ
        </p>

        <h2 className="mt-2 text-5xl font-bold text-slate-900">
          {hourlyPrice.toLocaleString()}₮
        </h2>
      </div>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">Өдөр сонгох</h3>

        <div className="rounded-2xl border p-3">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel>Start Time</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />

                <InputGroupAddon>
                  <Clock2Icon />
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel>End Time</FieldLabel>

              <InputGroup>
                <InputGroupInput
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />

                <InputGroupAddon>
                  <Clock2Icon />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900">
          Үргэлжлэх хугацаа
        </h3>

        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="h-12 rounded-xl">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="0.5">30 минут</SelectItem>
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

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="h-14 w-full rounded-2xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Захиалах
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Захиалга баталгаажуулах</AlertDialogTitle>

            <AlertDialogDescription>
              Та энэ хичээлийг захиалах гэж байна.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleBooking}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {booking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Илгээж байна...
                </>
              ) : (
                "Тийм, захиалах"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="rounded-2xl border bg-slate-50 p-4">
        <p className="font-semibold text-slate-800">Баталгаат төлбөр</p>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Таны мөнгө сургалт дуустал найдвартай хадгалагдана.
        </p>
      </div>
    </aside>
  );
}
