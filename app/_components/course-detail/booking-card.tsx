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
import { Clock2Icon } from "lucide-react";
import * as React from "react";

export function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12),
  );
}

type Props = {
  hourlyPrice: number;
};

export function BookingCard({ hourlyPrice }: Props) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("2");
  0;

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
          <Card className="mx-auto w-fit">
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="p-0"
              />
            </CardContent>
            <CardFooter className="border-t bg-card">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-from"
                      type="time"
                      step="1"
                      defaultValue="10:30:00"
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <InputGroupAddon>
                      <Clock2Icon className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <FieldLabel htmlFor="time-to">End Time</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="time-to"
                      type="time"
                      step="1"
                      defaultValue="12:30:00"
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                    <InputGroupAddon>
                      <Clock2Icon className="text-muted-foreground" />
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              </FieldGroup>
            </CardFooter>
          </Card>
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
              Та энэ захиалгыг илгээх гэж байна.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Цуцлах</AlertDialogCancel>
            <AlertDialogAction className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              Тийм, захиалах
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
