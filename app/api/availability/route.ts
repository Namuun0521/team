import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { dates, selectedTimes, freelancerId } = body

    console.log("adgadg",body)

    if (!dates || !selectedTimes || !freelancerId) {
      return NextResponse.json({ success: false, message: "Мэдээлэл дутуу байна" }, { status: 400 })
    }

    const dataToInsert: any[] = []

    for (const dateKey in selectedTimes) {
      const date = new Date(Number(dateKey))
      const times = selectedTimes[dateKey]

      times.forEach((time: string) => {
        dataToInsert.push({
          freelancerId,
          date,
          time,
        })
      })
    }

    console.log({dataToInsert});
    

    // Batch create
    await prisma.availabilityDateTime.createMany({
      data: dataToInsert
    })

    return NextResponse.json({ success: true, message: "Амжилттай хадгалагдлаа" })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: "Алдаа гарлаа" }, { status: 500 })
  }
}