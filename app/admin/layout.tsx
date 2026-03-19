"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  ShoppingCart,
  BarChart2,
  Settings,
  Search,
  Bell,
  Star,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Хянах самбар", path: "/admin" },
  { icon: Users, label: "Хэрэглэгчид", path: "/admin/users" },
  { icon: BookOpen, label: "Хичээлүүд", path: "/admin/courses" },
  { icon: ShoppingCart, label: "Захиалгууд", path: "/admin/orders" },
  { icon: BarChart2, label: "Тайлан", path: "/admin/reports" },
  { icon: Settings, label: "Тохиргоо", path: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setOpenProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // Хэрвээ custom auth ашиглаж байгаа бол logout API дуудаарай
      await fetch("/api/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-blue-600" fill="#2563eb" />
            </div>
            <span className="font-bold text-gray-900 text-sm leading-tight">
              Freelancer
              <br />
              <span className="text-blue-600">Marketplace</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mx-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-2">
            Системийн төлөв
          </p>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-gray-600">Хэвийн ажиллаж байна</span>
          </div>
          <button className="w-full text-xs font-medium text-gray-700 border border-gray-200 rounded-lg py-1.5 hover:bg-white transition">
            Шинэчлэл үзэх
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4 shrink-0">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 rounded-xl pl-9 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 border border-gray-100"
            />
          </div>

          <div className="flex-1" />

          <span className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded-lg">
            АДМИН
          </span>

          <button className="relative w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition">
            <Bell className="w-4 h-4 text-gray-600" />
          </button>

          <div
            ref={profileRef}
            className="relative flex items-center gap-3 pl-3 border-l border-gray-100"
          >
            <button
              onClick={() => setOpenProfileMenu((prev) => !prev)}
              className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition"
            >
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-900">Админ</p>
                <p className="text-[10px] text-gray-400">Ерөнхий админ</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                А
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {openProfileMenu && (
              <div className="absolute right-0 top-14 w-56 bg-white border border-gray-100 rounded-2xl shadow-lg p-2 z-50">
                <Link
                  href="/admin/profile"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setOpenProfileMenu(false)}
                >
                  <User className="w-4 h-4" />
                  Профайл
                </Link>

                <Link
                  href="/admin/settings"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setOpenProfileMenu(false)}
                >
                  <Settings className="w-4 h-4" />
                  Тохиргоо
                </Link>

                <div className="my-2 h-px bg-gray-100" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  Гарах
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>
    </div>
  );
}