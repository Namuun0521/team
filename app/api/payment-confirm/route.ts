import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ error: "No sessionId" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Not paid" }, { status: 400 });
    }

    const bookingIds = JSON.parse(session.metadata?.bookingIds || "[]");

    if (!bookingIds.length) {
      return NextResponse.json({ ok: true });
    }

    await prisma.booking.updateMany({
      where: { id: { in: bookingIds } },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Payment confirm error:", err);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
