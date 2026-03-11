"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from 'lucide-react';
import { useRouter } from "next/navigation"

const times = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

export default function AvailabilityPage() {
  const router = useRouter()
  const [dates, setDates] = useState<Date[] | undefined>([])
  const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string[] }>({})

  const toggleTime = (time: string, date: Date) => {
    const dateKey = date.getTime().toString()
    const timesForDate = selectedTimes[dateKey] || []

    if (timesForDate.includes(time)) {
      setSelectedTimes({
        ...selectedTimes,
        [dateKey]: timesForDate.filter(t => t !== time)
      })
    } else {
      setSelectedTimes({
        ...selectedTimes,
        [dateKey]: [...timesForDate, time]
      })
    }
  }

  // Өнөөдөр
  const today = new Date()
  today.setHours(0,0,0,0)

  return (
    <div className="flex justify-center p-10">
      <Card className="w-[1000px]">

        <div className="border-b p-8">
          <h1 className="text-[30px] font-bold">
            Боломжтой цаг тохируулах
          </h1>

          <p className="text-muted-foreground mt-2 text-[#64748B]">
            Та ажиллах боломжтой өдрүүд болон цагаа сонгож хуваариа шинэчилнэ үү.
          </p>
        </div>

        <div className="flex gap-10 p-8">

          {/* Calendar */}
          <div className="w-[542px] h-[469px]">
            <Calendar
              mode="multiple"
              selected={dates}
              onSelect={setDates}
              className="rounded-md border w-full h-full"
              modifiers={{
                disabled: (date: Date) => date < today
              }}
              modifiersClassNames={{
                disabled: "opacity-50 pointer-events-none",
                selected: "!bg-blue-600 !text-white rounded-md"
              }}
            />
          </div>

          {/* Times Selection */}
          <div className="w-[320px] h-[469px] space-y-6 overflow-y-auto">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#135BEC]" /> Боломжит цагууд
            </h3>

            {dates && dates.length > 0 ? (
              dates.sort((a, b) => a.getTime() - b.getTime()).map((date) => {
                const dateKey = date.getTime().toString()
                const timesForDate = selectedTimes[dateKey] || []

                return (
                  <div key={dateKey} className="mb-4">
                    <h4 className="font-semibold mb-2">
                      {date.getMonth() + 1}-р сарын {date.getDate()}-ны өдөр
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {times.map((time) => (
                        <button
                          key={time}
                          onClick={() => toggleTime(time, date)}
                          className={`py-1 px-3 rounded-lg border transition ${
                            timesForDate.includes(time)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-gray-500">Өдөр сонгоогүй байна</p>
            )}

            <div className="bg-blue-50 border rounded-xl p-4">
              <p className="text-blue-600 font-semibold mb-1">СОНГОСОН</p>
              {dates && dates.length > 0 ? (
                <div className="text-sm text-gray-700 space-y-1">
                  {dates.sort((a, b) => a.getTime() - b.getTime()).map((date) => {
                    const dateKey = date.getTime().toString()
                    const timesForDate = selectedTimes[dateKey] || []
                    return (
                      <p key={dateKey}>
                        {date.getMonth() + 1}-р сарын {date.getDate()}: {timesForDate.join(", ") || "Цаг сонгоогүй"}
                      </p>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-700">Өдөр сонгоогүй байна</p>
              )}
            </div>

            <Button 
               onClick={() => {
                 console.log(selectedTimes) 
                 router.push("/availability/confirm")
               }}
               className="w-full bg-[#135BEC] h-12"
            >
              Хадгалах
            </Button>

            <button className="text-sm text-muted-foreground w-full">
              Цуцлах
            </button>
          </div>

        </div>

        <div className="border-t p-6 flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded" />
            Боломжтой
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded" />
            Захиалгатай
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border rounded" />
            Амралтын өдөр
          </div>
        </div>

      </Card>
    </div>
  )
}