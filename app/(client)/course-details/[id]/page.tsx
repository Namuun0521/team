// import { CourseHero } from "@/app/_components/course-detail/course-hero";
// import { InstructorCard } from "@/app/_components/course-detail/instructor-card";
// import { LearningPoints } from "@/app/_components/course-detail/learning-points";
// import { BookingCard } from "@/app/_components/course-detail/booking-card";
// const mockCourse = {
//   id: "1",
//   title: "UX/UI Дизайн анхан шатны хичээл",
//   subtitle: "Мэргэжлийн түвшинд дизайн хийж сурцгаая",
//   category: "DESIGN COURSE",
//   image:
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
//   hourlyPrice: 25000,
//   instructor: {
//     name: "Номин-Эрдэнэ",
//     role: "Ахлах дизайнер",
//     experience: "5+ жил",
//     rating: 4.9,
//     reviews: 120,
//     avatar:
//       "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
//   },
//   learnPoints: [
//     "Figma програм дээр ажиллах үндсэн чадвар",
//     "User Experience (UX) судалгааны аргууд",
//     "Visual Design болон өнгө зохиол",
//     "Mobile болон Web аппликэйшн дизайн",
//   ],
//   description:
//     "Энэхүү сургалт нь UX/UI дизайн сонирхогч залууст зориулсан суурь мэдлэг олгох зорилготой. Бид онол практик хослуулан бодит төсөл дээр ажиллаж, дизайнаа хэрхэн хөгжүүлэх талаар алхам алхмаар суралцах болно.",
// };

// export default function CourseDetailPage() {
//   return (
//     <div className="bg-[#f8f8fb] min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
//           <div className="space-y-8">
//             <CourseHero
//               image={mockCourse.image}
//               category={mockCourse.category}
//               title={mockCourse.title}
//               subtitle={mockCourse.subtitle}
//             />

//             <InstructorCard instructor={mockCourse.instructor} />

//             <LearningPoints points={mockCourse.learnPoints} />

//             <div className="text-slate-600 leading-8 text-lg space-y-6">
//               <p>{mockCourse.description}</p>
//               <p>
//                 Сургалт бүрэн дууссаны дараа та өөрийн портфолиог бэлдэх анхан
//                 шатны мэдлэгтэй болж үлдэнэ.
//               </p>
//             </div>
//           </div>

//           <BookingCard hourlyPrice={mockCourse.hourlyPrice} />
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Loader2, Star, UserRound, CheckCircle2 } from "lucide-react";
// import { BookingCard } from "@/app/_components/course-detail/booking-card";
// import { Button } from "@/components/ui/button";

// type CourseData = {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   category: string;
//   imageUrl: string | null;
//   avgRating: number;
//   freelancer: {
//     id: string;
//     bio: string | null;
//     skills: string | null;
//     imageUrl: string | null;
//     user: { name: string | null };
//   };
//   _count: { bookings: number; reviews: number };
// };

// const CAT_LABEL: Record<string, string> = {
//   "\u0414\u0438\u0437\u0430\u0439\u043d": "DESIGN COURSE",
//   "\u0425\u04e8\u0413\u0416\u04ae\u04ae\u041b\u042d\u0413\u0427":
//     "DEVELOPMENT COURSE",
//   "\u0425\u044d\u043b_\u0441\u0443\u0440\u0430\u0445": "LANGUAGE COURSE",
//   "\u041c\u0430\u0440\u043a\u0435\u0442\u0438\u043d\u0433": "MARKETING COURSE",
//   "\u0424\u0438\u0442\u043d\u0435\u0441": "FITNESS COURSE",
//   "\u0415\u0440\u04e9\u043d\u0445\u0438\u0439_\u044d\u0440\u0434\u044d\u043c":
//     "GENERAL COURSE",
//   "\u0411\u0443\u0441\u0430\u0434": "OTHER",
// };

// export default function CourseDetailPage() {
//   const params = useParams();
//   const id = params.id as string;

//   const [course, setCourse] = useState<CourseData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;
//     fetch("/api/courses/" + id)
//       .then(async (r) => {
//         if (!r.ok) {
//           const d = await r.json();
//           throw new Error(d.error || "Олдсонгүй");
//         }
//         return r.json();
//       })
//       .then(setCourse)
//       .catch((e) => setError(e.message))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb]">
//         <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   if (error || !course) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb]">
//         <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
//           <p className="text-lg font-semibold text-gray-900">
//             {error || "Хичээл олдсонгүй"}
//           </p>
//           <a
//             href="/courses"
//             className="mt-4 inline-block text-sm text-blue-600 hover:underline"
//           >
//             Хичээлүүд рүү буцах
//           </a>
//         </div>
//       </div>
//     );
//   }

//   const instructorName = course.freelancer.user.name || "Нэргүй багш";
//   const rating = course.avgRating || 4.9;
//   const reviewCount = course._count.reviews;
//   const fallbackImg =
//     "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
//   const categoryLabel = CAT_LABEL[course.category] || course.category;

//   return (
//     <div className="bg-[#f8f8fb] min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-6 text-sm text-[#94A3B8]">
//           <a href="/" className="hover:text-blue-600">
//             Нүүр
//           </a>
//           {" > "}
//           <a href="/courses" className="hover:text-blue-600">
//             Сургалт
//           </a>
//           {" > "}
//           <span className="text-[#0F172A] font-medium">{course.title}</span>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
//           <div className="space-y-8">
//             {/* Hero */}
//             <div className="relative overflow-hidden rounded-3xl min-h-[340px]">
//               <img
//                 src={course.imageUrl || fallbackImg}
//                 alt={course.title}
//                 className="absolute inset-0 h-full w-full object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
//               <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end p-8 text-white">
//                 <span className="mb-4 inline-flex w-fit rounded-full bg-blue-600/80 px-4 py-1.5 text-xs font-semibold tracking-wide">
//                   {categoryLabel}
//                 </span>
//                 <h1 className="max-w-2xl text-3xl md:text-4xl font-bold leading-tight">
//                   {course.title}
//                 </h1>
//               </div>
//             </div>

//             {/* Instructor */}
//             <div className="rounded-3xl border bg-white p-6 shadow-sm">
//               <div className="flex items-center gap-4">
//                 <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
//                   {course.freelancer.imageUrl ? (
//                     <img
//                       src={course.freelancer.imageUrl}
//                       alt={instructorName}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <UserRound className="h-8 w-8 text-blue-400" />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {instructorName}
//                   </h2>
//                   <p className="text-sm text-slate-500">
//                     {course.freelancer.skills
//                       ? course.freelancer.skills.split(",")[0]
//                       : "Мэргэжилтэн"}
//                   </p>
//                   <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="font-semibold">{rating}</span>
//                     <span className="text-slate-400">
//                       ({reviewCount} үнэлгээ)
//                     </span>
//                   </div>
//                 </div>
//                 <Button variant="outline" className="rounded-xl" asChild>
//                   <a href="/freelancer/profile">
//                     <UserRound className="mr-2 h-4 w-4" />
//                     Профайл үзэх
//                   </a>
//                 </Button>
//               </div>
//             </div>

//             {/* Юу сурах вэ */}
//             <section className="space-y-5">
//               <h3 className="border-l-4 border-blue-600 pl-4 text-2xl font-bold text-slate-900">
//                 Юу сурах вэ?
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   "Суурь мэдлэг олгох практик сургалт",
//                   "Бодит төсөл дээр ажиллах дадлага",
//                   "Мэргэжлийн багшийн зөвлөгөө авах",
//                   "Портфолио бэлдэхэд тусална",
//                 ].map((pt) => (
//                   <div
//                     key={pt}
//                     className="rounded-2xl bg-white border p-5 shadow-sm flex items-start gap-3"
//                   >
//                     <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600 shrink-0" />
//                     <p className="text-slate-700 leading-7">{pt}</p>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Description */}
//             <div className="text-slate-600 leading-8 text-lg space-y-4">
//               <p>{course.description}</p>
//             </div>
//           </div>

//           {/* Booking Card */}
//           <BookingCard hourlyPrice={course.price} />
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, Star, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type CourseData = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  avgRating: number;
  freelancer: {
    id: string;
    bio: string | null;
    skills: string | null;
    imageUrl: string | null;
    user: { name: string | null };
  };
  _count: { bookings: number; reviews: number };
};

const CAT_LABEL: Record<string, string> = {
  Дизайн: "DESIGN COURSE",
  ХӨГЖҮҮЛЭГЧ: "DEVELOPMENT COURSE",
  Хэл_сурах: "LANGUAGE COURSE",
  Маркетинг: "MARKETING COURSE",
  Фитнес: "FITNESS COURSE",
  Ерөнхий_эрдэм: "GENERAL COURSE",
  Бусад: "OTHER",
};

function formatPrice(n: number) {
  return n.toLocaleString("mn-MN");
}

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [course, setCourse] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetch("/api/courses/" + id)
      .then(async (r) => {
        if (!r.ok) {
          const d = await r.json();
          throw new Error(d.error || "Олдсонгүй");
        }
        return r.json();
      })
      .then((data) => setCourse(data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb]">
        <Loader2 className="h-9 w-9 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f8fb]">
        <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-gray-900">
            {error || "Хичээл олдсонгүй"}
          </p>
          <a
            href="/courses"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline"
          >
            Хичээлүүд рүү буцах
          </a>
        </div>
      </div>
    );
  }

  const instructorName = course.freelancer.user.name || "Нэргүй багш";
  const rating = course.avgRating || 4.9;
  const reviewCount = course._count.reviews;
  const categoryLabel = CAT_LABEL[course.category] || course.category;
  const fallbackImg =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop";
  const heroImage = course.imageUrl || fallbackImg;
  const skillLabel = course.freelancer.skills
    ? course.freelancer.skills.split(",")[0]
    : "Мэргэжилтэн";

  return (
    <div className="bg-[#f8f8fb] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 text-sm text-[#94A3B8]">
          <a href="/" className="hover:text-blue-600">
            Нүүр
          </a>
          <span className="mx-1">&gt;</span>
          <a href="/courses" className="hover:text-blue-600">
            Сургалт
          </a>
          <span className="mx-1">&gt;</span>
          <span className="text-[#0F172A] font-medium">{course.title}</span>
        </div>

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-3xl min-h-[340px]">
            <img
              src={heroImage}
              alt={course.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="relative z-10 flex h-full min-h-[340px] flex-col justify-end p-8 text-white">
              <span className="mb-4 inline-flex w-fit rounded-full bg-blue-600/80 px-4 py-1.5 text-xs font-semibold tracking-wide">
                {categoryLabel}
              </span>
              <h1 className="max-w-2xl text-3xl md:text-4xl font-bold leading-tight">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Нэг цагийн үнэ</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">
                {formatPrice(course.price)}₮
              </p>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                {course.freelancer.imageUrl ? (
                  <img
                    src={course.freelancer.imageUrl}
                    alt={instructorName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound className="h-8 w-8 text-blue-400" />
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-slate-900">
                  {instructorName}
                </h2>
                <p className="text-sm text-slate-500">{skillLabel}</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-slate-400">
                    ({reviewCount} үнэлгээ)
                  </span>
                </div>
              </div>
              <Button variant="outline" className="rounded-xl" asChild>
                <a href="/freelancer/profile">
                  <UserRound className="mr-2 h-4 w-4" />
                  Профайл үзэх
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Тайлбар</h3>
            <p className="text-slate-600 leading-8 text-lg whitespace-pre-line">
              {course.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
