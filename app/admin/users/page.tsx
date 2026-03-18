"use client";

import { useEffect, useState } from "react";
import { Search, Mail, ShieldCheck, MoreHorizontal } from "lucide-react";

type UserItem = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "FREELANCER";
  createdAt: string;
};

function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function roleBadge(role: UserItem["role"]) {
  if (role === "FREELANCER") {
    return "bg-blue-50 text-blue-700 border-blue-100";
  }
  return "bg-gray-50 text-gray-700 border-gray-100";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);

      fetch(`/api/admin/users?search=${encodeURIComponent(search)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch users");
          return res.json();
        })
        .then((data) => setUsers(data))
        .catch((err) => {
          console.error(err);
          setUsers([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хэрэглэгчид</h1>
        <p className="text-sm text-gray-400">
          Бүртгэлтэй хэрэглэгчдийн жагсаалт
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Нэр, имэйлээр хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2 text-sm border border-gray-100 outline-none"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-5 text-sm text-gray-400">Уншиж байна...</div>
        ) : users.length === 0 ? (
          <div className="p-5 text-sm text-gray-400">Хэрэглэгч олдсонгүй</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {["ID", "НЭР", "ИМЭЙЛ", "ЭРХ", "БҮРТГҮҮЛСЭН", ""].map((h) => (
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
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition"
                >
                  <td className="px-5 py-4 text-sm font-semibold text-gray-700">
                    {user.id.slice(0, 8)}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {user.name ?? "No name"}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-semibold ${roleBadge(
                        user.role
                      )}`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {formatDate(user.createdAt)}
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