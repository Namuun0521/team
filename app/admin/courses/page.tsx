"use client";

import { useEffect, useState } from "react";
import { Search, BookOpen, MoreHorizontal } from "lucide-react";

type CourseItem = {
  id: string;
  title: string;
  price: number;
  category: string;
  createdAt: string;
  instructor: string;
};

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`/api/admin/courses?search=${encodeURIComponent(search)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch courses");
          return res.json();
        })
        .then((data) => setCourses(data))
        .catch((err) => {
          console.error(err);
          setCourses([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хичээлүүд</h1>
        <p className="text-sm text-gray-400">
          Платформ дээрх бүх хичээлийн жагсаалт
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Хичээлээр хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2 text-sm border border-gray-100 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-5 text-sm text-gray-400">Уншиж байна...</div>
        ) : courses.length === 0 ? (
          <div className="p-5 text-sm text-gray-400">Хичээл олдсонгүй</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {["ID", "ХИЧЭЭЛ", "АНГИЛАЛ", "БАГШ", "ҮНЭ", "ҮҮССЭН", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 tracking-wider uppercase"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                    {course.id.slice(0, 8)}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      {course.title}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {course.category}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {course.instructor}
                  </td>
                  <td className="px-5 py-4 text-sm font-bold text-gray-900">
                    {course.price.toLocaleString()}₮
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {formatDate(course.createdAt)}
                  </td>
                  <td className="px-5 py-4">
                    <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}