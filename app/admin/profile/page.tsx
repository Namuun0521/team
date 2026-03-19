"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  Loader2,
  LogOut,
} from "lucide-react";

type ProfileResponse = {
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  imageUrl?: string;
  createdAt?: string;
  lastLogin?: string;
  twoFactorEnabled?: boolean;
};

export default function AdminProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: "Админ",
    role: "Ерөнхий админ",
    email: "admin@freelancer.mn",
    phone: "+976 99112233",
    location: "Улаанбаатар, Монгол",
    bio: "Платформын хэрэглэгч, хичээл, захиалга болон тайлангийн удирдлагыг хариуцдаг.",
    imageUrl: "",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newUsers: true,
    newOrders: true,
    systemUpdates: false,
  });

  const [meta, setMeta] = useState({
    createdAt: "2025-09-12",
    lastLogin: "2026-03-19",
    twoFactorEnabled: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/profile", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Профайл мэдээлэл ачаалж чадсангүй");
        }

        const data: ProfileResponse = await res.json();

        setForm((prev) => ({
          ...prev,
          name: data.name ?? prev.name,
          role: data.role ?? prev.role,
          email: data.email ?? prev.email,
          phone: data.phone ?? prev.phone,
          location: data.location ?? prev.location,
          bio: data.bio ?? prev.bio,
          imageUrl: data.imageUrl ?? prev.imageUrl,
        }));

        setMeta({
          createdAt: formatDate(data.createdAt) || "2025-09-12",
          lastLogin: formatDate(data.lastLogin) || "2026-03-19",
          twoFactorEnabled: data.twoFactorEnabled ?? true,
        });
      } catch (err) {
        console.error(err);
        setError("Профайл мэдээлэл унших үед алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      setError(null);

      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          role: form.role,
          email: form.email,
          phone: form.phone,
          location: form.location,
          bio: form.bio,
          imageUrl: form.imageUrl,
          notifications,
        }),
      });

      if (!res.ok) {
        throw new Error("Хадгалах үед алдаа гарлаа");
      }

      setMessage("Профайл амжилттай хадгалагдлаа");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Өөрчлөлт хадгалах үед алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      setError(null);

      const res = await fetch("/api/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Гарах үед алдаа гарлаа");
      }

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Системээс гарах үед алдаа гарлаа");
    } finally {
      setLoggingOut(false);
    }
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      setMessage(null);

      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        throw new Error("Зураг upload хийж чадсангүй");
      }

      const data = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: data.url || "" }));
      setMessage("Профайл зураг амжилттай шинэчлэгдлээ");
    } catch (err) {
      console.error(err);
      setError("Зураг upload хийх үед алдаа гарлаа");
    } finally {
      setUploading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setError("Нууц үгийн бүх талбарыг бөглөнө үү");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setError("Шинэ нууц үг хамгийн багадаа 8 тэмдэгттэй байх ёстой");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Шинэ нууц үг таарахгүй байна");
      return;
    }

    try {
      setChangingPassword(true);
      setError(null);
      setMessage(null);

      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordForm),
      });

      if (!res.ok) {
        throw new Error("Нууц үг солих үед алдаа гарлаа");
      }

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setMessage("Нууц үг амжилттай солигдлоо");
    } catch (err) {
      console.error(err);
      setError("Нууц үг солих үед алдаа гарлаа");
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm border border-gray-100">
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Профайл ачаалж байна...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Админ профайл</h1>
          <p className="text-sm text-gray-500 mt-1">
            Хувийн мэдээлэл, аюулгүй байдал болон мэдэгдлийн тохиргоогоо удирдана.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
          >
            {loggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Гарах
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Өөрчлөлт хадгалах
          </button>
        </div>
      </div>

      {(message || error) && (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm font-medium ${
            error
              ? "border-red-200 bg-red-50 text-red-600"
              : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1 space-y-6">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt="Admin avatar"
                    className="h-24 w-24 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white shadow-sm">
                    {getInitial(form.name)}
                  </div>
                )}

                <button
                  onClick={handleOpenFilePicker}
                  disabled={uploading}
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border border-white bg-gray-900 text-white shadow-md transition hover:scale-105 disabled:opacity-60"
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">{form.name}</h2>
              <p className="text-sm text-blue-600 font-medium">{form.role}</p>

              <div className="mt-5 w-full space-y-3 text-left">
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700 break-all">{form.email}</span>
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
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.twoFactorEnabled ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700"}`}>
                  {meta.twoFactorEnabled ? "Идэвхтэй" : "Унтраалттай"}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-700">Сүүлд нэвтэрсэн</span>
                <span className="text-sm font-medium text-gray-900">{meta.lastLogin}</span>
              </div>
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
                <label className="mb-2 block text-sm font-medium text-gray-700">Нэр</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Албан тушаал</label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Имэйл</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Утас</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Байршил</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">Танилцуулга</label>
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
                  onChange={() => setNotifications((prev) => ({ ...prev, emailAlerts: !prev.emailAlerts }))}
                />
                <ToggleRow
                  title="Шинэ хэрэглэгч бүртгэгдэхэд"
                  checked={notifications.newUsers}
                  onChange={() => setNotifications((prev) => ({ ...prev, newUsers: !prev.newUsers }))}
                />
                <ToggleRow
                  title="Шинэ захиалга орж ирэхэд"
                  checked={notifications.newOrders}
                  onChange={() => setNotifications((prev) => ({ ...prev, newOrders: !prev.newOrders }))}
                />
                <ToggleRow
                  title="Системийн шинэчлэлт"
                  checked={notifications.systemUpdates}
                  onChange={() => setNotifications((prev) => ({ ...prev, systemUpdates: !prev.systemUpdates }))}
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
                <InfoRow label="Бүртгэл үүсгэсэн" value={meta.createdAt} />
                <InfoRow label="Сүүлд шинэчилсэн" value="Өнөөдөр" />
                <InfoRow label="Нэвтрэлтийн төлөв" value="Идэвхтэй" success />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Нууц үг солих</h3>
                <p className="text-sm text-gray-500">Админ аккаунтын нэвтрэх нууц үгээ шинэчилнэ</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Одоогийн нууц үг</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Шинэ нууц үг</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Шинэ нууц үг давтах</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={handleChangePassword}
                disabled={changingPassword}
                className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
              >
                {changingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                Нууц үг шинэчлэх
              </button>
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
        className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`}
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
      <span className={`text-sm font-semibold ${success ? "text-green-600" : "text-gray-900"}`}>
        {value}
      </span>
    </div>
  );
}

function getInitial(name: string) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "A";
}

function formatDate(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
}
