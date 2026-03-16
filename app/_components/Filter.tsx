"use client";

import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORY_MAP: Record<string, string | null> = {
  Бүгд: null,
  Дизайн: "Дизайн",
  Хөгжүүлэгч: "ХӨГЖҮҮЛЭГЧ",
  "Хэл сурах": "Хэл_сурах",
  Маркетинг: "Маркетинг",
  Фитнес: "Фитнес",
  "Ерөнхий эрдэм": "Ерөнхий_эрдэм",
  Бусад: "Бусад",
};

const categories = Object.keys(CATEGORY_MAP);

type FilterProps = {
  vertical?: boolean;
  onSelect?: () => void;
};

export const Filter = ({ vertical = false, onSelect }: FilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/courses") {
      setActive(null);
      return;
    }

    const currentCategory = searchParams.get("category");

    if (!currentCategory) {
      setActive(null);
      return;
    }

    const matchedLabel =
      Object.keys(CATEGORY_MAP).find(
        (label) => CATEGORY_MAP[label] === currentCategory,
      ) ?? null;

    setActive(matchedLabel);
  }, [pathname, searchParams]);

  const handleClick = (category: string) => {
    setActive(category);

    const apiCategory = CATEGORY_MAP[category];

    if (!apiCategory) {
      router.push("/courses");
      onSelect?.();
      return;
    }

    router.push(`/courses?category=${apiCategory}`);
    onSelect?.();
  };

  return (
    <div className="w-full">
      <div className={vertical ? "py-2" : "mx-auto max-w-6xl px-4 py-3"}>
        <div
          className={
            vertical
              ? "flex flex-col gap-2"
              : "flex items-center gap-3 overflow-x-auto"
          }
        >
          {categories.map((item) => {
            const isActive = active === item;

            return (
              <button
                key={item}
                onClick={() => handleClick(item)}
                className={vertical ? "w-full text-left" : ""}
              >
                <Badge
                  className={`cursor-pointer text-sm transition ${
                    isActive
                      ? "border border-blue-300 bg-blue-100 text-blue-600"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                  } ${
                    vertical
                      ? "w-full justify-start rounded-xl px-4 py-3"
                      : "rounded-full px-5 py-2"
                  }`}
                >
                  {item}
                </Badge>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
