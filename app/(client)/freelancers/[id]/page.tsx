"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Mail,
  Phone,
  UserSearch,
  BadgeCheck,
  Loader2,
  BookOpen,
  Plus,
} from "lucide-react";

type Course = {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  freelancer?: { user?: { name?: string | null } | null } | null;
};

type Profile = {
  userId: string;
  imageUrl?: string | null;
  clerkEmail?: string | null;
  phone?: string | null;
  bio?: string | null;
  skills?: string | null;
  user?: {
    name?: string | null;
  } | null;
  courses?: Course[];
};

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}

export default function FreelancerPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();

  const id = params.id as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);

  const displayName = profile?.user?.name || user?.fullName || "Нэргүй";

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/freelancers/profile/${id}`);

        if (!res.ok) {
          console.error("Profile fetch error");
          setProfile(null);
          return;
        }

        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading || !isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-800">
            Профайл олдсонгүй
          </p>
        </div>
      </div>
    );
  }

  const isOwner = isSignedIn && user?.id === profile.userId;
  const skills =
    profile?.skills
      ?.split(",")
      .map((skill) => skill.trim())
      .filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Left Profile Card */}
          <Card className="h-fit overflow-hidden rounded-3xl border-0 bg-white p-0 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <div className="relative h-28 bg-gradient-to-r from-blue-600 to-blue-500" />

            <div className="relative px-6 pb-6">
              <div className="-mt-14 mb-4 flex justify-center">
                <img
                  src={
                    profile?.imageUrl || user?.imageUrl || "/placeholder.png"
                  }
                  alt={displayName}
                  className="h-28 w-28 rounded-2xl border-4 border-white object-cover shadow-md"
                />
              </div>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-900">
                  {displayName}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Freelancer profile
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Mail size={18} className="text-[#135BEC]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">И-мэйл</p>
                    <p className="truncate text-sm font-medium text-slate-700">
                      {profile?.clerkEmail || "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Phone size={18} className="text-[#135BEC]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Утас</p>
                    <p className="text-sm font-medium text-slate-700">
                      {profile?.phone || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {isOwner && (
                <div className="mt-6">
                  <Button
                    className="w-full rounded-2xl bg-[#135BEC] py-6 text-base font-semibold hover:bg-blue-700"
                    onClick={() => {
                      setNavLoading(true);
                      router.push("/create-course");
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {navLoading ? "Шилжүүлж байна..." : "Хичээл нэмэх"}
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {!isOwner && isSignedIn && (
            <Button
              className="bg-[#135BEC] hover:bg-blue-500 cursor-pointer"
              onClick={async () => {
                const res = await fetch("/api/chat/start", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    freelancerId: profile.id,
                  }),
                });

                const convo = await res.json();

                router.push(`/chat/${convo.id}`);
              }}
            >
              Чат бичих
            </Button>
          )}
          <div className="flex mt-24 justify-end">
            {isOwner && (
              <div className="flex justify-end">
                <Button
                  className="bg-[#135BEC] hover:bg-blue-500 cursor-pointer"
                  onClick={() => router.push("/create-course")}
                >
                  {navLoading ? "Шилжүүлж байна..." : "Хичээл нэмэх"}
                </Button>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
                  {profile?.bio || "Танилцуулга оруулаагүй байна"}
                </p>
              </div>
            </Card>

            {/* Skills */}
            <Card className="rounded-3xl border-0 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <BadgeCheck className="h-5 w-5 text-[#135BEC]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Ур чадвар
                  </h2>
                  <p className="text-sm text-slate-500">Оруулсан чадварууд</p>
                </div>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <div
                      key={skill}
                      className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#135BEC] shadow-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                  Ур чадвар оруулаагүй байна
                </div>
              )}
            </Card>

            {/* Courses */}
            <Card className="rounded-3xl border-0 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                    <BookOpen className="h-5 w-5 text-[#135BEC]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Бусад хичээлүүд
                    </h2>
                    <p className="text-sm text-slate-500">
                      Энэ freelancer-ийн нийт хичээлүүд
                    </p>
                  </div>
                </div>

                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {profile?.courses?.length || 0}
                </div>
              </div>

              {profile?.courses?.length === 0 ? (
                <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
                  Одоогоор хичээл оруулаагүй байна
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {profile?.courses?.map((course) => (
                    <div
                      key={course.id}
                      onClick={() =>
                        router.push(`/course-details/${course.id}`)
                      }
                      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                        {course.imageUrl ? (
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                            Зураггүй
                          </div>
                        )}
                      </div>

                      <div className="space-y-3 p-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
                          {course.category?.replaceAll("_", " ")}
                        </span>

                        <h3 className="line-clamp-2 min-h-[48px] text-base font-bold text-slate-900">
                          {course.title}
                        </h3>

                        <div className="flex items-center justify-between border-t pt-3">
                          <span className="truncate text-sm text-slate-500">
                            {displayName}
                          </span>

                          <span className="text-base font-bold text-[#135BEC]">
                            {formatMNT(course.price)}₮
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
