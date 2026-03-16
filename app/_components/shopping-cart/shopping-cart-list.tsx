import Image from "next/image";
import { Star } from "lucide-react";
import type { CartItem } from "@/app/(client)/shopping-cart/page";

interface Props {
  cartItems: CartItem[];
  onRemove: (itemId: string) => void;
  removingId: string | null;
}

function getAverageRating(ratings: { rating: number }[] = []) {
  if (!ratings.length) return 0;
  const total = ratings.reduce((sum, item) => sum + item.rating, 0);
  return total / ratings.length;
}

export function ShoppingCartList({ cartItems, onRemove, removingId }: Props) {
  return (
    <section>
      <p className="mb-4 text-2xl font-semibold text-slate-800">
        {cartItems.length} Course in Cart
      </p>

      <div className="space-y-6 border-t pt-6">
        {cartItems.map((item) => {
          const course = item.course;
          const averageRating = getAverageRating(course.reviews || []);
          const totalReviews = course.reviews?.length || 0;

          return (
            <div
              key={item.id}
              className="grid grid-cols-1 gap-4 border-b pb-6 md:grid-cols-[160px_1fr_120px]"
            >
              <div className="relative h-28 w-full overflow-hidden rounded-md bg-slate-100">
                <Image
                  src={course.imageUrl || "/placeholder-course.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {course.title}
                </h2>

                <p className="mt-1 text-sm text-slate-600">
                  By {course.freelancer?.user?.name || "Unknown Instructor"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                  {course.isBestseller && (
                    <span className="rounded bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                      Bestseller
                    </span>
                  )}

                  <span className="font-bold text-amber-700">
                    {averageRating.toFixed(1)}
                  </span>

                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={
                          i < Math.round(averageRating)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-slate-500">
                    ({totalReviews} ratings)
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span>{course.totalHours ?? 0} total hours</span>
                  <span>•</span>
                  <span>{course.lectures ?? 0} lectures</span>
                  <span>•</span>
                  <span>{course.level || "All Levels"}</span>
                </div>

                {course.isPremium && (
                  <div className="mt-4 inline-flex rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                    Premium
                  </div>
                )}
              </div>

              <div className="flex flex-col items-start gap-2 md:items-end">
                <button
                  onClick={() => onRemove(item.id)}
                  disabled={removingId === item.id}
                  className="text-sm font-medium text-blue-600 hover:underline disabled:opacity-50"
                >
                  {removingId === item.id ? "Removing..." : "Remove"}
                </button>

                <button className="text-sm font-medium text-blue-600 hover:underline">
                  Save for Later
                </button>

                <button className="text-sm font-medium text-blue-600 hover:underline">
                  Move to Wishlist
                </button>

                <div className="mt-3 text-right">
                  <p className="text-3xl font-bold text-blue-700">
                    ${course.price.toFixed(2)}
                  </p>

                  {course.originalPrice && (
                    <p className="text-lg text-slate-400 line-through">
                      ${course.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
