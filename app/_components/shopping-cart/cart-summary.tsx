"use client";

import { useRouter } from "next/navigation";

interface Props {
  total: number;
  originalTotal: number;
}

export function CartSummary({ total, originalTotal }: Props) {
  const router = useRouter();

  const discount =
    originalTotal > total
      ? Math.round(((originalTotal - total) / originalTotal) * 100)
      : 0;

  return (
    <aside className="h-fit">
      <p className="text-xl font-semibold text-slate-700">Total:</p>

      <h2 className="mt-2 text-5xl font-bold text-slate-900">
        ${total.toFixed(2)}
      </h2>

      {originalTotal > total && (
        <>
          <p className="mt-2 text-2xl text-slate-400 line-through">
            ${originalTotal.toFixed(2)}
          </p>
          <p className="mt-1 text-2xl text-slate-700">{discount}% off</p>
        </>
      )}

      <button
        onClick={() => router.push("/checkout")}
        className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700"
      >
        Proceed to Checkout →
      </button>

      <p className="mt-3 text-sm text-slate-500">
        You won&apos;t be charged yet
      </p>

      <div className="my-8 border-t" />
    </aside>
  );
}
