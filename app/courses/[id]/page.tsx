import { CourseHero } from "@/app/_components/course-detail/course-hero";
import { InstructorCard } from "@/app/_components/course-detail/instructor-card";
import { LearningPoints } from "@/app/_components/course-detail/learning-points";
import { BookingCard } from "@/app/_components/course-detail/booking-card";

const mockCourse = {
  id: "1",
  title: "UX/UI Дизайн анхан шатны хичээл",
  subtitle: "Мэргэжлийн түвшинд дизайн хийж сурцгаая",
  category: "DESIGN COURSE",
  image:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
  hourlyPrice: 25000,
  instructor: {
    name: "Номин-Эрдэнэ",
    role: "Ахлах дизайнер",
    experience: "5+ жил",
    rating: 4.9,
    reviews: 120,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
  },
  learnPoints: [
    "Figma програм дээр ажиллах үндсэн чадвар",
    "User Experience (UX) судалгааны аргууд",
    "Visual Design болон өнгө зохиол",
    "Mobile болон Web аппликэйшн дизайн",
  ],
  description:
    "Энэхүү сургалт нь UX/UI дизайн сонирхогч залууст зориулсан суурь мэдлэг олгох зорилготой. Бид онол практик хослуулан бодит төсөл дээр ажиллаж, дизайнаа хэрхэн хөгжүүлэх талаар алхам алхмаар суралцах болно.",
};

export default function CourseDetailPage() {
  return (
    <div className="bg-[#f8f8fb] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          <div className="space-y-8">
            <CourseHero
              image={mockCourse.image}
              category={mockCourse.category}
              title={mockCourse.title}
              subtitle={mockCourse.subtitle}
            />

            <InstructorCard instructor={mockCourse.instructor} />

            <LearningPoints points={mockCourse.learnPoints} />

            <div className="text-slate-600 leading-8 text-lg space-y-6">
              <p>{mockCourse.description}</p>
              <p>
                Сургалт бүрэн дууссаны дараа та өөрийн портфолиог бэлдэх анхан
                шатны мэдлэгтэй болж үлдэнэ.
              </p>
            </div>
          </div>

          <BookingCard hourlyPrice={mockCourse.hourlyPrice} />
        </div>
      </div>
    </div>
  );
}
