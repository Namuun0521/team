"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type CourseItem = {
  id: string;
  title: string;
  price: number;
  category: string;
  description?: string | null;
};

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/admin/courses/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch course");

        const data = await res.json();
        setTitle(data.title ?? "");
        setPrice(String(data.price ?? ""));
        setCategory(data.category ?? "");
        setDescription(data.description ?? "");
      } catch (error) {
        console.error(error);
        alert("Хичээл ачаалахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/courses/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price),
          category,
          description,
        }),
      });

      if (!res.ok) throw new Error("Failed to update course");

      router.push(`/admin/courses/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Засах үед алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-sm text-gray-400">Уншиж байна...</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хичээл засах</h1>
        <p className="text-sm text-gray-400">Хичээлийн мэдээлэл шинэчлэх</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Гарчиг</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Үнэ</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Ангилал</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Тайлбар</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Хадгалж байна..." : "Хадгалах"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Буцах
          </button>
        </div>
      </form>
    </div>
  );
}