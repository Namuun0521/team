"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  CalendarCheck,
  CreditCard,
  Star,
  UserPlus,
  Briefcase,
  BellRing,
  Wallet,
  ArrowRight,
  ChevronRight,
  MapPin,
} from "lucide-react";

const CLIENT_STEPS = [
  {
    icon: Search,
    title: "Мэргэжилтэн хайх",
    description:
      "Ангилал, үнэ, үнэлгээгээр шүүж өөрт тохирох freelancer-ээ олоорой.",
    where: 'Нүүр хуудас эсвэл "Бүх үйлчилгээ"',
    link: "/courses",
    linkLabel: "Үйлчилгээ хайх →",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: CalendarCheck,
    title: "Цаг сонгож захиалах",
    description:
      'Үйлчилгээний хуудсанд "Цаг сонгох" товч дарж, боломжит цагуудаас сонгоно.',
    where: "Үйлчилгээний дэлгэрэнгүй хуудас",
    link: "/courses",
    linkLabel: "Үйлчилгээ сонгох →",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: CreditCard,
    title: "Төлбөр төлөх",
    description:
      'Freelancer захиалгыг зөвшөөрсний дараа "Миний сагс" хуудаснаас төлбөрөө төлнө.',
    where: "Дээд цэсний 🛒 сагсны дүрс",
    link: "/shopping-cart",
    linkLabel: "Сагс харах →",
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
  },
  {
    icon: Star,
    title: "Үнэлгээ өгөх",
    description:
      'Ажил дууссаны дараа "Миний захиалгууд" хуудаснаас freelancer-т үнэлгээ өгнө.',
    where: 'Profile → "Миний захиалгууд"',
    link: "/my-bookings",
    linkLabel: "Захиалгууд →",
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200",
  },
];

const FREELANCER_STEPS = [
  {
    icon: UserPlus,
    title: "Профайл үүсгэх",
    description:
      '"Freelancer болох" товч дарж мэдээллээ бөглөж, ур чадвараа оруулна.',
    where: 'Дээд цэсний "Freelancer болох" товч',
    link: "/become-freelancer",
    linkLabel: "Бүртгүүлэх →",
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    icon: Briefcase,
    title: "Үйлчилгээ нэмэх",
    description:
      'Профайл дотроос "Үйлчилгээ нэмэх" товч дарж, үнэ болон цагийн хуваарь тохируулна.',
    where: 'Profile → "Ажил үүсгэх" товч',
    link: "/freelancer/profile",
    linkLabel: "Профайл →",
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    icon: BellRing,
    title: "Захиалга хүлээн авах",
    description:
      "Захиалагч захиалга өгөхөд 🔔 мэдэгдэл ирнэ. Тэндээс зөвшөөрөх эсвэл татгалзана.",
    where: "Дээд цэсний 🔔 мэдэгдэл дүрс",
    link: "/notifications",
    linkLabel: "Мэдэгдэл →",
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
  },
  {
    icon: Wallet,
    title: "Ажил дуусгаж орлого олох",
    description:
      'Төлбөр төлөгдсөний дараа "Миний ажлууд" хуудаснаас "Ажил дуусгах" товч дарна.',
    where: 'Profile → "Миний үйлчилгээнүүд"',
    link: "/my-courses",
    linkLabel: "Миний ажлууд →",
    color: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-200",
  },
];

type Tab = "client" | "freelancer";

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<Tab>("client");
  const router = useRouter();

  const steps = activeTab === "client" ? CLIENT_STEPS : FREELANCER_STEPS;

  return (
    <section className="mt-14 mb-4">
      <div className="mb-8 text-center">
        <p className="mb-2 inline-flex rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
          Хэрхэн ажилладаг вэ?
        </p>
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Ердөө 4 алхамаар эхлээрэй
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Та захиалагч ч, freelancer ч байсан хялбархан эхлэх боломжтой
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-2xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("client")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "client"
                ? "bg-[#135BEC] text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Search className="h-4 w-4" />
            Захиалагч
          </button>

          <button
            onClick={() => setActiveTab("freelancer")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "freelancer"
                ? "bg-[#135BEC] text-white shadow-md"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Briefcase className="h-4 w-4" />
            Freelancer
          </button>
        </div>
      </div>

      <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;

          return (
            <div key={`${activeTab}-${i}`} className="group relative">
              {i < steps.length - 1 && (
                <div className="absolute -right-3.5 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                </div>
              )}

              <div
                onClick={() => router.push(step.link)}
                className={`relative flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${step.borderColor}`}
              >
                <div className="absolute -top-3 left-5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#135BEC] text-xs font-bold text-white shadow-sm">
                    {i + 1}
                  </span>
                </div>

                <div className="mb-3 mt-3">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${step.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="mb-1.5 text-base font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-gray-500">
                  {step.description}
                </p>

                <div className="mt-auto pt-3">
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-3 py-2.5">
                    <div className="mb-1 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                        Хаана
                      </span>
                    </div>
                    <p className="text-xs font-medium leading-5 text-gray-600">
                      {step.where}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(step.link);
                    }}
                    className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gray-100 px-3 py-2 text-xs font-semibold text-[#135BEC] transition hover:bg-blue-50"
                  >
                    {step.linkLabel}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() =>
            router.push(
              activeTab === "client" ? "/courses" : "/become-freelancer",
            )
          }
          className="inline-flex items-center gap-2 rounded-xl bg-[#135BEC] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          {activeTab === "client" ? "Үйлчилгээ хайж эхлэх" : "Freelancer болох"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
