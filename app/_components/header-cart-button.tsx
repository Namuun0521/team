"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function HeaderCartButton() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await fetch("/api/shopping-cart", {
          cache: "no-store",
        });

        if (!res.ok) return;

        const data = await res.json();
        setCount(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartCount();
  }, []);

  return (
    <Link
      href="/shopping-cart"
      className="relative flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-100"
    >
      <ShoppingCart className="h-5 w-5" />
      <span className="font-medium">Cart</span>

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-700 px-1 text-xs font-bold text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
