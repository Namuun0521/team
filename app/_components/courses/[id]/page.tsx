import { notFound } from "next/navigation";

type Course = {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
};

async function getCourse(id: string): Promise<Course | null> {
  const res = await fetch(`https://api.example.com/courses/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch course");
  }

  const data = await res.json();
  return data;
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <p className="text-gray-600 mb-4">Instructor: {course.instructor}</p>

      <p className="text-gray-700 mb-6">{course.description}</p>

      <div className="text-xl font-semibold">Price: ${course.price}</div>
    </div>
  );
}
