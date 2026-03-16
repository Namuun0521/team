import Image from "next/image";
import { Star } from "lucide-react";
import type { Course } from "@/app/(client)/shopping-cart/page";

interface Props {
  courses: Course[];
}

function getAverageRating(ratings: { rating: number }[] = []) {
  if (!ratings.length) return 0;
  const total = ratings.reduce((sum, item) => sum + item.rating, 0);
  return total / ratings.length;
}

export function RecommendedCourses({ courses }: Props) {
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-4xl font-bold text-slate-900">
        You might also like
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {courses.map((course) => {
          const averageRating = getAverageRating(course.reviews || []);
          const totalReviews = course.reviews?.length || 0;

          return (
            <div key={course.id} className="group">
              <div className="relative h-44 w-full overflow-hidden rounded-lg bg-slate-100">
                <Image
                  src={course.imageUrl || "/placeholder-course.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              </div>

              <h3 className="mt-3 line-clamp-2 text-xl font-bold text-slate-900">
                {course.title}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {course.freelancer?.user?.name || "Unknown Instructor"}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <span className="font-bold text-amber-700">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      fill={
                        i < Math.round(averageRating) ? "currentColor" : "none"
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-500">({totalReviews})</span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-bold text-slate-900">
                  ${course.price.toFixed(2)}
                </span>
                {course.originalPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    ${course.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                {course.isPremium && (
                  <span className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    Premium
                  </span>
                )}
                {course.isBestseller && (
                  <span className="rounded bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                    Bestseller
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
