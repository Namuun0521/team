"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="mb-2 text-3xl font-bold text-[#0F172A]">
          Төлбөр амжилттай! 🎉
        </h1>

        <p className="mb-6 text-[#64748B]">
          Таны захиалга баталгаажлаа. Сайхан суралцаарай!
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={() => router.push("/")}
            className="rounded-xl bg-[#135BEC] px-8"
          >
            Нүүр хуудас руу буцах
          </Button>

          <Button
            onClick={() => router.push("/shopping-cart")}
            variant="outline"
            className="rounded-xl px-8"
          >
            Сагс харах
          </Button>
        </div>
      </div>
    </div>
  );
}
