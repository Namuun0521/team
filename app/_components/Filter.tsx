"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  "Бүгд",
  "Ерөнхий эрдэм",
  "Маркетинг",
  "Фитнес",
  "Дизайн",
  "Хэл сурах",
  "Код бичих",
  "Зураг",
];

export const Filter = () => {
  const [active, setActive] = useState("Бүгд");

  return (
    <div className="w-full ">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center gap-3 overflow-x-auto">
          {CATEGORIES.map((item) => (
            <button key={item} onClick={() => setActive(item)}>
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
