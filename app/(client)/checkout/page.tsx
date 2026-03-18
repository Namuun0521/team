"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
  useEffect(() => {
    const startCheckout = async () => {
      try {
        console.log(" Starting checkout...");

        const res = await fetch("/api/checkout-data", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log(" Checkout data:", data);

        if (!res.ok) return;

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

        const checkoutData = await checkoutRes.json();

        console.log("Stripe URL:", checkoutData.url);

        if (checkoutData.url) {
          window.location.href = checkoutData.url;
        } else {
          console.error(" Stripe URL алга");
        }
      } catch (err) {
        console.error(" Checkout error:", err);
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
