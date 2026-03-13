"use client";

import { CourseCard } from "./Course-Card";

const courses = [
  {
    id: "1",
    category: "СУРГАЛТ",
    instructorName: "Г. Тэмүүлэн",
    instructorAvatar: "https://i.pravatar.cc/100?img=1",
    title: "Брэндинг болон Лого дизайны цогц сургалт (Анхан шат)",
    rating: 4.9,
    reviewCount: 42,
    price: 120000,
    image: "https://picsum.photos/500/300?1",
  },
  {
    id: "2",
    category: "ҮЙЛЧИЛГЭЭ",
    instructorName: "Б. Анударь",
    instructorAvatar: "https://i.pravatar.cc/100?img=2",
    title: "Мобайл апп UX/UI дизайн боловсруулах",
    rating: 5.0,
    reviewCount: 15,
    price: 45000,
    image: "https://picsum.photos/500/300?2",
  },
  {
    id: "3",
    category: "СУРГАЛТ",
    instructorName: "С. Бат-Эрдэнэ",
    instructorAvatar: "https://i.pravatar.cc/100?img=3",
    title: "3ds Max & V-Ray: Интерьер Дизайн мастер класс",
    rating: 4.8,
    reviewCount: 89,
    price: 250000,
    image: "https://picsum.photos/500/300?3",
  },
  {
    id: "3",
    category: "СУРГАЛТ",
    instructorName: "С. Бат-Эрдэнэ",
    instructorAvatar: "https://i.pravatar.cc/100?img=3",
    title: "3ds Max & V-Ray: Интерьер Дизайн мастер класс",
    rating: 4.8,
    reviewCount: 89,
    price: 250000,
    image: "https://picsum.photos/500/300?3",
  },
  {
    id: "3",
    category: "СУРГАЛТ",
    instructorName: "С. Бат-Эрдэнэ",
    instructorAvatar: "https://i.pravatar.cc/100?img=3",
    title: "3ds Max & V-Ray: Интерьер Дизайн мастер класс",
    rating: 4.8,
    reviewCount: 89,
    price: 250000,
    image: "https://picsum.photos/500/300?3",
  },
  {
    id: "3",
    category: "СУРГАЛТ",
    instructorName: "С. Бат-Эрдэнэ",
    instructorAvatar: "https://i.pravatar.cc/100?img=3",
    title: "3ds Max & V-Ray: Интерьер Дизайн мастер класс",
    rating: 4.8,
    reviewCount: 89,
    price: 250000,
    image: "https://picsum.photos/500/300?3",
  },
];

export const CourseSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};
