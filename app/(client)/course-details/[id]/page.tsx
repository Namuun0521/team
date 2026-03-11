"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CourseHero } from "@/app/_components/course-detail/course-hero";
import { InstructorCard } from "@/app/_components/course-detail/instructor-card";
import { LearningPoints } from "@/app/_components/course-detail/learning-points";
import { BookingCard } from "@/app/_components/course-detail/booking-card";

interface CourseData {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string | null;
  freelancer?: {
    bio?: string | null;
    skills?: string | null;
    phone?: string | null;
    imageUrl?: string | null;
    user?: {
      name?: string | null;
      email: string;
    };
  };
  reviews?: {
    id: string;
    rating: number;
    comment?: string | null;
  }[];
}

export default function CourseDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/course-details/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch course details");
        }

        const data = await res.json();
        setCourse(data);
      } catch (error) {
        console.error("course details fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Уншиж байна...</div>;
  }

  if (!course) {
    return <div className="p-8 text-center">Course олдсонгүй</div>;
  }

  const averageRating =
    course.reviews && course.reviews.length > 0
      ? course.reviews.reduce((sum, review) => sum + review.rating, 0) /
        course.reviews.length
      : 0;

  const learnPoints =
    course.freelancer?.skills
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) || [];

  const instructor = {
    name: course.freelancer?.user?.name || "Нэр оруулаагүй",
    role: course.category || "Freelancer",
    experience: course.freelancer?.bio || "Туршлага оруулаагүй",
    rating: Number(averageRating.toFixed(1)),
    reviews: course.reviews?.length || 0,
    avatar:
      course.freelancer?.imageUrl ||
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
  };

  return (
    <div className="bg-[#f8f8fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-8">
            <CourseHero
              image={
                course.imageUrl ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
              }
              category={course.category}
              title={course.title}
              subtitle={course.freelancer?.bio || ""}
            />

            <InstructorCard instructor={instructor} />

            <LearningPoints points={learnPoints} />

            <div className="text-slate-600 leading-8 text-lg space-y-6">
              <p>{course.description}</p>
              <p>
                Сургалт бүрэн дууссаны дараа та өөрийн мэдлэгээ бодит ажил дээр
                ашиглах суурь ойлголттой болно.
              </p>
            </div>
          </div>

          <BookingCard hourlyPrice={course.price} />
        </div>
      </div>
    </div>
  );
}
