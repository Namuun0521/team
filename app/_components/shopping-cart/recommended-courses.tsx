import Image from "next/image";
import { Star } from "lucide-react";

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
        Санал болгох үйлчилгээнүүд
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
