"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <ShoppingCart className="h-8 w-8 text-slate-500" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900">
        Таны сагс хоосон байна
      </h2>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        Та одоогоор ямар нэгэн хичээл сагсанд нэмээгүй байна. Нүүр хуудас руу
        орж хичээлүүдээ сонгоно уу.
      </p>

      <Button
        onClick={() => router.push("/")}
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Нүүр хуудас руу буцах
      </Button>
    </div>
  );
}
