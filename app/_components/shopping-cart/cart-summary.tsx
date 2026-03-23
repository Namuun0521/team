"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  total: number;
  originalTotal: number;
}

export function CartSummary({ total, originalTotal }: Props) {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [message, setMessage] = useState("");

  const discount =
    originalTotal > total
      ? Math.round(((originalTotal - total) / originalTotal) * 100)
      : 0;

  useEffect(() => {
    const validateCheckout = async () => {
      try {
        const res = await fetch("/api/checkout/validate");
        const data = await res.json();

        setAllowed(data.allowed);
        setMessage(data.message || "");
      } catch (error) {
        console.error("Validate error:", error);
        setAllowed(false);
        setMessage("Шалгах үед алдаа гарлаа");
      }
    };

    validateCheckout();
  }, []);

  const handleProceed = async () => {
    try {
      setChecking(true);

      const res = await fetch("/api/checkout/validate");
      const data = await res.json();

      if (!data.allowed) {
        setAllowed(false);
        setMessage(data.message || "Checkout хийх боломжгүй");
        return;
      }

      router.push("/checkout");
    } catch (error) {
      console.error("Checkout validation failed:", error);
      setMessage("Шалгах үед алдаа гарлаа");
    } finally {
      setChecking(false);
    }
  };

  return (
    <aside className="h-fit">
      <p className="text-xl font-semibold text-slate-700">Total:</p>

      <h2 className="mt-2 text-5xl font-bold text-slate-900">
        ₮{total.toFixed(2)}
      </h2>

      {originalTotal > total && (
        <>
          <p className="mt-2 text-2xl text-slate-400 line-through">
            ₮{originalTotal.toFixed(2)}
          </p>
          <p className="mt-1 text-2xl text-slate-700">{discount}% off</p>
        </>
      )}

      <button
        onClick={handleProceed}
        disabled={!allowed || checking}
        className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {checking ? "Шалгаж байна..." : "Төлбөр төлөх"}
      </button>

      {message && <p className="mt-3 text-sm text-red-500">{message}</p>}

      <p className="mt-3 text-sm text-slate-500">
        You won&apos;t be charged yet
      </p>

      <div className="my-8 border-t" />
    </aside>
  );
}
