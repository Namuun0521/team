import { Star, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type Instructor = {
  name: string;
  role: string;
  experience: string;
  rating: number;
  reviews: number;
  avatar: string;
};

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={instructor.avatar}
          alt={instructor.name}
          className="h-24 w-24 rounded-full object-cover border"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900">
            {instructor.name}
          </h2>
          <p className="mt-1 text-slate-500">
            {instructor.role} ({instructor.experience})
          </p>

          <div className="mt-3 flex items-center gap-2 text-slate-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{instructor.rating}</span>
            <span>({instructor.reviews} үнэлгээ)</span>
          </div>
        </div>
      </div>

      <Button variant="outline" className="mt-6 rounded-xl">
        <UserRound className="mr-2 h-4 w-4" />
        Профайл үзэх
      </Button>
    </div>
  );
}
