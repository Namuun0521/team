"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Mail,
  ShieldCheck,
  MoreHorizontal,
  Eye,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type UserItem = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "FREELANCER";
  createdAt: string;
  isBlocked?: boolean;
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
  const router = useRouter();

  const [users, setUsers] = useState<UserItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async (searchValue: string) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(searchValue)}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id: string) => {
    const ok = confirm("Энэ хэрэглэгчийг устгах уу?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Устгах үед алдаа гарлаа");
    }
  };

  const handleRoleChange = async (user: UserItem) => {
    const nextRole = user.role === "USER" ? "FREELANCER" : "USER";

    try {
      const res = await fetch(`/api/admin/users/${user.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: nextRole }),
      });

      if (!res.ok) throw new Error("Role update failed");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id
            ? {
                ...u,
                role: nextRole,
              }
            : u
        )
      );
    } catch (err) {
      console.error(err);
      alert("Role солих үед алдаа гарлаа");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Хэрэглэгчид</h1>
        <p className="text-sm text-gray-400">Бүртгэлтэй хэрэглэгчдийн жагсаалт</p>
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
                    <div className="flex items-center gap-2">
                      <span>{user.name ?? "No name"}</span>
                      {user.isBlocked && (
                        <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-600 border border-red-100">
                          BLOCKED
                        </span>
                      )}
                    </div>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                          className="cursor-pointer"
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleRoleChange(user)}
                          className="cursor-pointer"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Change Role
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleDelete(user.id)}
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