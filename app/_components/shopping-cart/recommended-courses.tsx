// import Image from "next/image";
// import { Star } from "lucide-react";
// import type { Course } from "@/app/(client)/shopping-cart/page";

// interface Props {
//   courses: Course[];
// }

// function getAverageRating(ratings: { rating: number }[] = []) {
//   if (!ratings.length) return 0;
//   const total = ratings.reduce((sum, item) => sum + item.rating, 0);
//   return total / ratings.length;
// }

// export function RecommendedCourses({ courses }: Props) {
//   return (
//     <section className="mt-16">
//       <h2 className="mb-6 text-4xl font-bold text-slate-900">
//         You might also like
//       </h2>

//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
//         {courses.map((course) => {
//           const averageRating = getAverageRating(course.reviews || []);
//           const totalReviews = course.reviews?.length || 0;

//           return (
//             <div key={course.id} className="group">
//               <div className="relative h-44 w-full overflow-hidden rounded-lg bg-slate-100">
//                 <Image
//                   src={course.imageUrl || "/placeholder-course.jpg"}
//                   alt={course.title}
//                   fill
//                   className="object-cover transition group-hover:scale-105"
//                 />
//               </div>

//               <h3 className="mt-3 line-clamp-2 text-xl font-bold text-slate-900">
//                 {course.title}
//               </h3>

//               <p className="mt-1 text-sm text-slate-500">
//                 {course.freelancer?.user?.name || "Unknown Instructor"}
//               </p>

//               <div className="mt-2 flex items-center gap-2 text-sm">
//                 <span className="font-bold text-amber-700">
//                   {averageRating.toFixed(1)}
//                 </span>
//                 <div className="flex items-center gap-1 text-amber-500">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={13}
//                       fill={
//                         i < Math.round(averageRating) ? "currentColor" : "none"
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="text-slate-500">({totalReviews})</span>
//               </div>

//               <div className="mt-2 flex items-center gap-2">
//                 <span className="text-3xl font-bold text-slate-900">
//                   ₮{course.price.toFixed(2)}
//                 </span>
//                 {course.originalPrice && (
//                   <span className="text-lg text-slate-400 line-through">
//                     ₮{course.originalPrice.toFixed(2)}
//                   </span>
//                 )}
//               </div>

//               <div className="mt-3 flex gap-2">
//                 {course.isPremium && (
//                   <span className="rounded bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
//                     Premium
//                   </span>
//                 )}
//                 {course.isBestseller && (
//                   <span className="rounded bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
//                     Bestseller
//                   </span>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
import Image from "next/image";
import { Star } from "lucide-react";

// Define Course type locally instead of importing
type Course = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  freelancer: {
    user: {
      firstName: string | null;
      lastName: string | null;
    };
  };
  _count?: {
    bookings: number;
  };
};

interface Props {
  courses: Course[];
}

export default function RecommendedCourses({ courses }: Props) {
  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-[#0F172A]">
        Санал болгох хичээлүүд
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const freelancerName =
            `${course.freelancer.user.firstName || ""} ${course.freelancer.user.lastName || ""}`.trim() ||
            "Багш";

          return (
            <div
              key={course.id}
              className="overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-md"
            >
              {course.imageUrl && (
                <div className="relative h-40 w-full">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-[#0F172A]">{course.title}</h3>
                <p className="mt-1 text-sm text-[#64748B]">{freelancerName}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#135BEC]">
                    ₮{course.price.toLocaleString()}
                  </span>
                  {course._count && course._count.bookings > 0 && (
                    <div className="flex items-center gap-1 text-sm text-[#64748B]">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course._count.bookings}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
