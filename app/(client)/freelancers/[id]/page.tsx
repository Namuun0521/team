"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Mail, Phone, UserSearch, BadgeCheck, Loader2 } from "lucide-react";

type Course = {
  id: string;
  category: string;
  title: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  freelancer?: { user?: { name?: string | null } | null } | null;
};

function formatMNT(n: number) {
  return n.toLocaleString("mn-MN");
}
export default function FreelancerPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [navLoading, setNavLoading] = useState(false);
  const id = params.id as string;
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const displayName = profile?.user?.name || user?.fullName || "Нэргүй";
  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/freelancers/profile/${id}`);

        if (!res.ok) {
          console.error("Profile fetch error");
          return;
        }

        const data = await res.json();

        setProfile(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading || !isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center">
        Профайл олдсонгүй
      </div>
    );
  }

  const isOwner = isSignedIn && user?.id === profile.userId;

  return (
    <div className="flex flex-col h-fit">
      <div className="h-full w-full justify-center flex gap-4 py-8">
        <div>
          <Card className="flex p-0 w-[320px] m-0 h-152.25 flex-col">
            <img
              src={profile?.imageUrl || user?.imageUrl}
              className="w-79.5 h-79.5 rounded-lg object-cover"
            />

            <div className="px-4 flex flex-col gap-2 py-4">
              <h1 className="font-bold text-2xl mb-4 py-2 border-b">
                {displayName}
              </h1>

              <span className="font-medium flex items-center gap-2 text-sm text-[#334155]">
                <Mail size={16} color="#135BEC" />
                {user?.primaryEmailAddress?.emailAddress}
              </span>

              <p className="font-medium flex items-center gap-2 text-sm text-[#334155]">
                <Phone size={16} color="#135BEC" />
                <span>{profile?.phone || "—"}</span>
              </p>
            </div>
          </Card>
        </div>

        <div className="flex flex-col items-end gap-4 w-200">
          <Card className="p-8 min-fit">
            <h1 className="flex items-center gap-2 w-183.5 font-bold text-xl">
              <UserSearch color="#135BEC" />
              <span>Танилцуулга</span>
            </h1>

            <p className="font-medium text-lg text-[#475569] w-183.5 pr-6 whitespace-pre-line">
              {profile?.bio || "Танилцуулга оруулаагүй байна"}
            </p>
          </Card>

          <Card className="h-fit w-200 p-8">
            <h1 className="flex items-center gap-2 font-bold text-xl">
              <BadgeCheck color="#135BEC" />
              <span>Ур чадвар</span>
            </h1>

            <div className="flex flex-wrap gap-2">
              {profile?.skills?.split(",").map((skill: string) => (
                <Button
                  key={skill}
                  className="items-center gap-1 bg-blue-50 hover:bg-blue-100 font-semibold border-blue-100 border text-[#135BEC] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </Button>
              ))}
            </div>
          </Card>

          {/* course map */}
          <Card className="p-5 w-200">
            <h1 className="text-xl font-bold mb-2">Бусад хичээлүүд</h1>

            <div className="flex flex-wrap gap-4.5">
              {profile?.courses?.length === 0 && (
                <p className="text-gray-500">
                  Одоогоор хичээл оруулаагүй байна
                </p>
              )}

              {profile?.courses?.map((course: Course) => (
                <div
                  key={course.id}
                  className="w-60 shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md cursor-pointer"
                  onClick={() => router.push(`/course-details/${course.id}`)}
                >
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      className="h-32 w-full object-cover"
                    />
                  )}

                  <div className="p-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
                      {course.category?.replaceAll("_", " ")}
                    </span>

                    <h3 className="mt-2 line-clamp-2 text-sm font-semibold text-gray-900">
                      {course.title}
                    </h3>

                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-gray-500">{displayName}</span>

                      <div className="text-sm font-semibold text-blue-700">
                        {formatMNT(course.price)}₮
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex mt-24 justify-end">
            {isOwner && (
              <div className="flex justify-end">
                <Button
                  className="bg-[#135BEC]"
                  onClick={() => router.push("/create-course")}
                >
                  {navLoading ? "Шилжүүлж байна..." : "Хичээл нэмэх"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
