"use client";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CATEGORY_MAP: Record<string, string | null> = {
  Бүгд: null,
  Дизайн: "Дизайн",
  Хөгжүүлэгч: "ХӨГЖҮҮЛЭГЧ",
  "Хэл сурах": "Хэл_сурах",
  Маркетинг: "Маркетинг",
  Фитнес: "Фитнес",
  "Ерөнхий эрдэм": "Ерөнхий_эрдэм",
};

const categories = Object.keys(CATEGORY_MAP);

export const Filter = () => {
  const router = useRouter();
  const [active, setActive] = useState("Бүгд");

  const handleClick = (category: string) => {
    setActive(category);

    const apiCategory = CATEGORY_MAP[category];

    if (!apiCategory) {
      router.push("/");
      return;
    }

    router.push(`/courses?category=${apiCategory}`);
  };

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto">
          {categories.map((item) => (
            <button key={item} onClick={() => handleClick(item)}>
              <Badge
                className={`cursor-pointer rounded-full px-5 py-2 text-sm transition
                ${
                  active === item
                    ? "bg-blue-100 text-blue-600 border border-blue-300"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {item}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
