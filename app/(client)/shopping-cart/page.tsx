"use client";

import { useEffect, useMemo, useState } from "react";
import { ShoppingCartList } from "@/app/_components/shopping-cart/shopping-cart-list";
import { CartSummary } from "@/app/_components/shopping-cart/cart-summary";
import { RecommendedCourses } from "@/app/_components/shopping-cart/recommended-courses";
import { useRouter } from "next/navigation";

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
}

export interface Course {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  imageUrl?: string | null;
  totalHours?: number | null;
  lectures?: number | null;
  level?: string | null;
  isBestseller?: boolean | null;
  isPremium?: boolean | null;
  freelancer?: {
    id: string;
    bio?: string | null;
    user?: {
      name?: string | null;
      email?: string | null;
    } | null;
  } | null;
  reviews?: Review[];
}

export interface CartItem {
  id: string;
  course: Course;
}

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/shopping-cart", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Cart fetch error:", res.status, errorText);
        throw new Error(`Failed to fetch cart: ${res.status}`);
      }

      const data: CartItem[] = await res.json();
      setCartItems(data);

      const uniqueCourses = Array.from(
        new Map(data.map((item) => [item.course.id, item.course])).values(),
      );
      setRecommendedCourses(uniqueCourses);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId: string) => {
    try {
      setRemovingId(itemId);

      const res = await fetch(`/api/shopping-cart/${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setRemovingId(null);
    }
  };

  const router = useRouter();

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.course.price, 0);
  }, [cartItems]);

  const originalTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (item.course.originalPrice ?? item.course.price),
      0,
    );
  }, [cartItems]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="mb-8 text-5xl font-bold text-slate-900">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground">Loading cart...</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-10 text-5xl font-bold tracking-tight text-slate-900">
        Таны сагс
      </h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_340px]">
        <ShoppingCartList
          cartItems={cartItems}
          onRemove={handleRemove}
          removingId={removingId}
        />

        <CartSummary total={total} originalTotal={originalTotal} />
      </div>

      <RecommendedCourses courses={recommendedCourses} />
    </main>
  );
}
