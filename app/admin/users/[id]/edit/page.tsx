"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type UserItem = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "FREELANCER";
};

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [user, setUser] = useState<UserItem | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/users/${params.id}`);
        if (!res.ok) throw new Error("Failed to fetch user");

        const data = await res.json();
        setUser(data);
        setName(data.name ?? "");
        setEmail(data.email ?? "");
      } catch (error) {
        console.error(error);
        alert("Хэрэглэгч дуудахад алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to update user");

      router.push(`/admin/users/${params.id}`);
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

  if (!user) {
    return <div className="text-sm text-red-500">Хэрэглэгч олдсонгүй</div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хэрэглэгч засах</h1>
        <p className="text-sm text-gray-400">Нэр болон имэйл өөрчлөх</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Нэр</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Нэр"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Имэйл</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Имэйл"
            type="email"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Role</label>
          <input
            value={user.role}
            disabled
            className="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-500 outline-none"
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