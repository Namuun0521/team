"use client";

import { Heart, Star } from "lucide-react";

type CourseCardProps = {
  course: {
    id: string;
    category: string;
    instructorName: string;
    instructorAvatar: string;
    title: string;
    rating: number;
    reviewCount: number;
    price: number;
    image: string;
  };
};

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="overflow-hidden rounded-[28px] border bg-white shadow-sm">
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover"
        />

        <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <Heart className="h-5 w-5 text-gray-400" />
        </button>

        <div className="absolute bottom-4 left-4 rounded-lg bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
          {course.category}
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-center gap-3">
          <img src={course.instructorAvatar} className="h-8 w-8 rounded-full" />
          <span className="text-sm text-gray-500">{course.instructorName}</span>
        </div>

        <h3 className="mb-3 text-lg font-semibold">{course.title}</h3>

        <div className="mb-4 flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{course.rating}</span>
          <span className="text-sm text-gray-400">({course.reviewCount})</span>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-lg font-bold text-blue-600">
            ₮{course.price.toLocaleString()}
          </span>

          <button className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-semibold">
            Захиалах
          </button>
        </div>
      </div>
    </div>
  );
};
