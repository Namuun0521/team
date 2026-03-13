"use client";

import { Heart, Star } from "lucide-react";

const fallbackImg =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  freelancer?: { user?: { name?: string | null } };
};

type Props = {
  courses: Course[];
};

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}

export const CoursesGrid = ({ courses }: Props) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((c) => {
        const heroImage = c.imageUrl || fallbackImg;

        return (
          <div
            key={c.id}
            className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative h-[160px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
              <img
                src={heroImage}
                alt={c.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <span className="absolute left-3 top-3 rounded-md bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                СУРГАЛТ
              </span>

              <button
                type="button"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 hover:bg-white"
                aria-label="wishlist"
              >
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
                  👤
                </span>
                <span className="truncate">
                  {c.freelancer?.user?.name || "Нэргүй хэрэглэгч"}
                </span>
              </div>

              <h3 className="mt-2 line-clamp-2 text-base font-semibold text-gray-900">
                {c.title}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium">4.9</span>
                <span className="text-gray-400">(42)</span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-lg font-bold text-blue-700">
                  ₮{formatMNT(c.price)}
                </div>

                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-200">
                  Захиалах
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
