"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  useEffect(() => {
    const startCheckout = async () => {
      try {
        console.log("🚀 Starting checkout...");

        // 1️⃣ Checkout data авах
        const res = await fetch("/api/checkout-data", {
          method: "GET",
          credentials: "include",
        });

        // ❗ ЭНЭ ХАМГИЙН ЧУХАЛ FIX
        if (!res.ok) {
          const text = await res.text();
          console.error("❌ checkout-data error:", text);
          return;
        }

        const data = await res.json();
        console.log("✅ Checkout data:", data);

        if (!data.bookingIds || data.bookingIds.length === 0) {
          console.error("❌ Booking байхгүй");
          return;
        }

        // 2️⃣ Stripe checkout session үүсгэх
        const checkoutRes = await fetch("/api/checkout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingIds: data.bookingIds,
            totalPrice: data.totalPrice,
          }),
        });

        // ❗ ЭНЭ БАС ЧУХАЛ FIX
        if (!checkoutRes.ok) {
          const text = await checkoutRes.text();
          console.error("❌ checkout error:", text);
          return;
        }

        const checkoutData = await checkoutRes.json();
        console.log("✅ Stripe URL:", checkoutData.url);

        // 3️⃣ Redirect хийх
        if (checkoutData.url) {
          window.location.href = checkoutData.url;
        } else {
          console.error("❌ Stripe URL алга");
        }
      } catch (err) {
        console.error("❌ Checkout error:", err);
      }
    };

    startCheckout();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-lg">Төлбөрийн хуудас руу шилжиж байна...</p>
    </div>
  );
}
