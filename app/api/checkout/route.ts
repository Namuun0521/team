import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    console.log(" Checkout API called");

    const body = await req.json();
    console.log(" Body:", body);

    const { bookingIds, totalPrice } = body;

    if (!bookingIds || bookingIds.length === 0) {
      console.error(" bookingIds байхгүй");
      return NextResponse.json(
        { error: "bookingIds required" },
        { status: 400 },
      );
    }

    if (!totalPrice || totalPrice <= 0) {
      console.error(" totalPrice буруу:", totalPrice);
      return NextResponse.json(
        { error: "Invalid totalPrice" },
        { status: 400 },
      );
    }

    console.log(" Creating Stripe session...");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Courses (${bookingIds.length})`,
            },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        bookingIds: JSON.stringify(bookingIds),
      },

      success_url: `${process.env.NEXT_PUBLIC_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/shopping-cart`,
    });

    console.log(" Stripe session created:", session.id);

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error(" STRIPE ERROR:", error.message);
    return NextResponse.json(
      { error: error.message || "Stripe error" },
      { status: 500 },
    );
  }
}
