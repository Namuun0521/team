"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "/hero.jpg",
    title: "Монголын залуучуудын\nур чадварын нэгдэл",
    description:
      "Өөрийн мэддэг зүйлээ бусдад зааж, эсвэл шинэ ур чадвар эзэмшээрэй.",
    primaryText: "Хичээл хайх",
    primaryLink: "/courses",
  },
  {
    id: 2,
    image: "https://picsum.photos/500/300?3",
    title: "Та өөрийн ур чадвараараа орлого\nолохыг хүсэж байна уу?",
    description:
      "Манай платформд нэгдэж, өөрийн хичээл болон үйлчилгээгээ санал болгоод Монголын шилдэг залуучуудын нэг болоорой.",
    primaryText: "Freelancer болох",
    primaryLink: "/become-freelancer",
    secondaryText: "Дэлгэрэнгүй",
    secondaryLink: "/about",
  },
];

export const HeroSection = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const currentSlide = slides[current] ?? slides[0];

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  if (!currentSlide) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="py-10"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                current === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-900/70" />
            </div>
          ))}

          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-3xl bg-white/10" />
          <div className="pointer-events-none absolute right-10 top-10 h-24 w-24 rounded-3xl bg-white/10" />

          <div className="relative z-10 flex min-h-[460px] items-center px-6 py-14 md:min-h-[520px] md:px-12 md:py-20">
            <div className="max-w-3xl text-white">
              <h1 className="whitespace-pre-line text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {currentSlide.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 md:text-lg">
                {currentSlide.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push(currentSlide.primaryLink)}
                  className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  {currentSlide.primaryText}
                </button>

                {currentSlide.secondaryText && currentSlide.secondaryLink && (
                  <button
                    onClick={() => router.push(currentSlide.secondaryLink)}
                    className="rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {currentSlide.secondaryText}
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow transition hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow transition hover:bg-white"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>

          <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition-all ${
                  current === index ? "w-8 bg-white" : "w-2.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
