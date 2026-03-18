import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error(" Missing stripe signature");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error(" Webhook verify failed:", err.message);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  console.log(" EVENT:", event.type);

  // PAYMENT SUCCESS
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    //  metadata шалгах
    if (!session.metadata?.bookingIds) {
      console.error(" Missing bookingIds in metadata");
      return NextResponse.json({ error: "No bookingIds" }, { status: 400 });
    }

    let bookingIds: string[];

    try {
      bookingIds = JSON.parse(session.metadata.bookingIds);
    } catch {
      console.error(" bookingIds parse error");
      return NextResponse.json({ error: "Invalid metadata" }, { status: 400 });
    }

    //  давхар update хийхээс хамгаалах (idempotency)
    const existing = await prisma.booking.findMany({
      where: {
        id: { in: bookingIds },
        paymentStatus: "PAID",
      },
    });

    if (existing.length > 0) {
      console.log(" Already paid, skipping...");
      return NextResponse.json({ received: true });
    }

    //UPDATE DB
    await prisma.booking.updateMany({
      where: {
        id: { in: bookingIds },
      },
      data: {
        paymentStatus: "PAID",
      },
    });

    console.log(" PAYMENT SUCCESS → DB UPDATED:", bookingIds);
  }

  return NextResponse.json({ received: true });
}
