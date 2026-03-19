"use client";

import { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CalendarDays,
  KeyRound,
  Bell,
  Save,
  User2,
} from "lucide-react";

export default function AdminProfilePage() {
  const [form, setForm] = useState({
    name: "Админ",
    role: "Ерөнхий админ",
    email: "admin@freelancer.mn",
    phone: "+976 99112233",
    location: "Улаанбаатар, Монгол",
    bio: "Платформын хэрэглэгч, хичээл, захиалга болон тайлангийн удирдлагыг хариуцдаг.",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newUsers: true,
    newOrders: true,
    systemUpdates: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    console.log("Saved:", { form, notifications });
    alert("Профайл амжилттай хадгалагдлаа");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Админ профайл</h1>
          <p className="text-sm text-gray-500 mt-1">
            Хувийн мэдээлэл, аюулгүй байдал болон мэдэгдлийн тохиргоогоо удирдана.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          Өөрчлөлт хадгалах
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1 space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-sm">
                  А
                </div>
                <button className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-gray-900 text-white shadow-md transition hover:scale-105">
                  <Camera className="h-4 w-4" />
                </button>
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">{form.name}</h2>
              <p className="text-sm text-blue-600 font-medium">{form.role}</p>

              <div className="mt-5 w-full space-y-3 text-left">
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{form.email}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{form.phone}</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{form.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-green-50 p-3 text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Аюулгүй байдал</h3>
                <p className="text-sm text-gray-500">Нууцлал ба эрхийн төлөв</p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-700">2 шатлалт баталгаажуулалт</span>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  Идэвхтэй
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-700">Сүүлд нэвтэрсэн</span>
                <span className="text-sm font-medium text-gray-900">2026-03-19</span>
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                <KeyRound className="h-4 w-4" />
                Нууц үг солих
              </button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                <User2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ерөнхий мэдээлэл</h3>
                <p className="text-sm text-gray-500">Профайлын үндсэн мэдээллээ шинэчилнэ</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Нэр
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Албан тушаал
                </label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Имэйл
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Утас
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Байршил
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Танилцуулга
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={form.bio}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-2xl bg-purple-50 p-3 text-purple-600">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Мэдэгдлийн тохиргоо</h3>
                  <p className="text-sm text-gray-500">Ямар төрлийн alert авах вэ</p>
                </div>
              </div>

              <div className="space-y-4">
                <ToggleRow
                  title="Имэйл мэдэгдэл"
                  checked={notifications.emailAlerts}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      emailAlerts: !notifications.emailAlerts,
                    })
                  }
                />
                <ToggleRow
                  title="Шинэ хэрэглэгч бүртгэгдэхэд"
                  checked={notifications.newUsers}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      newUsers: !notifications.newUsers,
                    })
                  }
                />
                <ToggleRow
                  title="Шинэ захиалга орж ирэхэд"
                  checked={notifications.newOrders}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      newOrders: !notifications.newOrders,
                    })
                  }
                />
                <ToggleRow
                  title="Системийн шинэчлэлт"
                  checked={notifications.systemUpdates}
                  onChange={() =>
                    setNotifications({
                      ...notifications,
                      systemUpdates: !notifications.systemUpdates,
                    })
                  }
                />
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-2xl bg-orange-50 p-3 text-orange-600">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Админ товч мэдээлэл</h3>
                  <p className="text-sm text-gray-500">Систем дээрх ерөнхий статус</p>
                </div>
              </div>

              <div className="space-y-4">
                <InfoRow label="Эрхийн түвшин" value="Super Admin" />
                <InfoRow label="Бүртгэл үүсгэсэн" value="2025-09-12" />
                <InfoRow label="Сүүлд шинэчилсэн" value="Өнөөдөр" />
                <InfoRow label="Нэвтрэлтийн төлөв" value="Идэвхтэй" success />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  checked,
  onChange,
}: {
  title: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-700">{title}</span>
      <button
        type="button"
        onClick={onChange}
        className={`relative h-7 w-12 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function InfoRow({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span
        className={`text-sm font-semibold ${
          success ? "text-green-600" : "text-gray-900"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
