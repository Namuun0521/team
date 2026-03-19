"use client";

import { useEffect, useState } from "react";
import {
  Search,
  BookOpen,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

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
  const router = useRouter();

  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCourses = async (searchValue: string) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/courses?search=${encodeURIComponent(searchValue)}`);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCourses(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id: string) => {
    const ok = confirm("Энэ хичээлийг устгах уу?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/courses/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch (err) {
      console.error(err);
      alert("Устгах үед алдаа гарлаа");
    }
  };

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
                {["ID", "ХИЧЭЭЛ", "АНГИЛАЛ", "БАГШ", "ҮНЭ", "ҮҮССЭН", ""].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 tracking-wider uppercase"
                  >
                    {h}
                  </th>
                ))}
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/courses/${course.id}`)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/courses/${course.id}/edit`)}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(course.id)}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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