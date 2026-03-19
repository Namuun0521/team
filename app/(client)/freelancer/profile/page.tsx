// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { BadgeCheck, Mail, Phone, UserSearch } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { user } = useUser();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user) return;

//       const res = await fetch(`/api/freelancers/profile?userId=${user.id}`);

//       if (!res.ok) {
//         console.error("Profile fetch error");
//         return;
//       }

//       const data = await res.json();
//       setProfile(data);
//     };

//     fetchProfile();
//   }, [user]);

//   console.log("PROFILE DATA", profile);

//   return (
//     <div className=" flex flex-col h-fit">
//       <div className="h-full w-full justify-center flex gap-4 py-8">
//         <div>
//           <Card className="flex p-0 w-[320px] m-0 h-152.25 flex-col">
//             <img
//               src={profile?.imageUrl || user?.imageUrl}
//               className="w-79.5 h-79.5 rounded-lg object-cover"
//             />

//             <div className="px-4 flex flex-col gap-2 py-4">
//               <h1 className="font-bold text-2xl mb-4 py-2 border-b">
//                 {user?.fullName}
//               </h1>

//               <span className="font-medium flex items-center gap-2 text-sm text-[#334155]">
//                 <Mail size={16} color="#135BEC" />
//                 {user?.primaryEmailAddress?.emailAddress}
//               </span>

//               <p className="font-medium flex items-center gap-2 text-sm text-[#334155]">
//                 <Phone size={16} color="#135BEC" />
//                 <span>{profile?.phone}</span>
//               </p>
//             </div>
//           </Card>
//         </div>

//         <div className="flex flex-col items-end gap-4 w-200">
//           <Card className="p-8 min-fit">
//             <h1 className="flex items-center gap-2 w-183.5 font-bold text-xl">
//               <UserSearch color="#135BEC" />
//               <span>Танилцуулга</span>
//             </h1>

//             <p className="font-medium text-lg text-[#475569] w-183.5 pr-6 whitespace-pre-line">
//               {profile?.bio}
//             </p>
//           </Card>

//           <Card className="h-fit w-200 p-8">
//             <h1 className="flex items-center gap-2 font-bold text-xl">
//               <BadgeCheck color="#135BEC" />
//               <span>Ур чадвар</span>
//             </h1>

//             <div className="flex flex-wrap gap-2">
//               {profile?.skills?.split(",").map((skill: string) => (
//                 <Button
//                   key={skill}
//                   className="items-center gap-1 bg-blue-50 hover:bg-blue-100 font-semibold border-blue-100 border text-[#135BEC] px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </Button>
//               ))}
//             </div>
//           </Card>

//           <div className="flex mt-24 justify-end">
//             <Button
//               className="flex bg-[#135BEC] hover:bg-blue-100 w-fit justify-center cursor-pointer"
//               disabled={loading}
//               onClick={() => {
//                 setLoading(true);
//                 router.push("/create-course");
//               }}
//             >
//               {loading ? "Шилжүүлж байна..." : "Хичээл үүсгэх"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// // }
// "use client";

// import { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { BadgeCheck, Mail, Phone, UserSearch } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();
//   const { user } = useUser();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user) return;

//       const res = await fetch("/api/freelancers/profile?userId=" + user.id);

//       if (!res.ok) {
//         console.error("Profile fetch error");
//         return;
//       }

//       const data = await res.json();
//       setProfile(data);
//     };

//     fetchProfile();
//   }, [user]);

//   const displayName = profile?.user?.name || user?.fullName || "Нэргүй";

//   return (
//     <div className="flex flex-col h-fit">
//       <div className="h-full w-full justify-center flex gap-4 py-8">
//         <div>
//           <Card className="flex p-0 w-[320px] m-0 h-152.25 flex-col">
//             <img
//               src={profile?.imageUrl || user?.imageUrl}
//               className="w-79.5 h-79.5 rounded-lg object-cover"
//             />

//             <div className="px-4 flex flex-col gap-2 py-4">
//               <h1 className="font-bold text-2xl mb-4 py-2 border-b">
//                 {displayName}
//               </h1>

//               <span className="font-medium flex items-center gap-2 text-sm text-[#334155]">
//                 <Mail size={16} color="#135BEC" />
//                 {user?.primaryEmailAddress?.emailAddress}
//               </span>

//               <p className="font-medium flex items-center gap-2 text-sm text-[#334155]">
//                 <Phone size={16} color="#135BEC" />
//                 <span>{profile?.phone}</span>
//               </p>
//             </div>
//           </Card>
//         </div>

//         <div className="flex flex-col items-end gap-4 w-200">
//           <Card className="p-8 min-fit">
//             <h1 className="flex items-center gap-2 w-183.5 font-bold text-xl">
//               <UserSearch color="#135BEC" />
//               <span>Танилцуулга</span>
//             </h1>

//             <p className="font-medium text-lg text-[#475569] w-183.5 pr-6 whitespace-pre-line">
//               {profile?.bio}
//             </p>
//           </Card>

//           <Card className="h-fit w-200 p-8">
//             <h1 className="flex items-center gap-2 font-bold text-xl">
//               <BadgeCheck color="#135BEC" />
//               <span>Ур чадвар</span>
//             </h1>

//             <div className="flex flex-wrap gap-2">
//               {profile?.skills?.split(",").map((skill: string) => (
//                 <Button
//                   key={skill}
//                   className="items-center gap-1 bg-blue-50 hover:bg-blue-100 font-semibold border-blue-100 border text-[#135BEC] px-3 py-1 rounded-full text-sm"
//                 >
//                   {skill}
//                 </Button>
//               ))}
//             </div>
//           </Card>

//           <div className="flex mt-24 justify-end">
//             <Button
//               className="flex bg-[#135BEC] hover:bg-blue-100 w-fit justify-center cursor-pointer"
//               disabled={loading}
//               onClick={() => {
//                 setLoading(true);
//                 router.push("/create-course");
//               }}
//             >
//               {loading ? "Шилжүүлж байна..." : "Хичээл үүсгэх"}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  BadgeCheck,
  Mail,
  Phone,
  UserSearch,
  Loader2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

type Profile = {
  userId: string;
  imageUrl?: string | null;
  phone?: string | null;
  bio?: string | null;
  skills?: string | null;
  user?: {
    name?: string | null;
  } | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [navLoading, setNavLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/freelancers/profile?userId=" + user.id);

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          console.error("Profile API error:", res.status, data);
          setError("Профайл ачаалахад алдаа гарлаа");
          return;
        }

        const data = await res.json();

        if (!data) {
          router.replace("/become-freelancer");
          return;
        }

        setProfile(data);
      } catch (err) {
        console.error("Profile fetch network error:", err);
        setError("Сүлжээний алдаа гарлаа");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, isLoaded, router]);

  const displayName = profile?.user?.name || user?.fullName || "Нэргүй";
  const skills =
    profile?.skills
      ?.split(",")
      .map((skill) => skill.trim())
      .filter(Boolean) || [];

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <p className="mb-4 text-base font-medium text-red-600">{error}</p>
          <Button
            className="rounded-2xl bg-[#135BEC] px-6 py-5 hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Дахин оролдох
          </Button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
          {/* Left profile card */}
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
                <p className="mt-1 text-sm text-slate-500">Миний профайл</p>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                    <Mail size={18} className="text-[#135BEC]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">И-мэйл</p>
                    <p className="truncate text-sm font-medium text-slate-700">
                      {user?.primaryEmailAddress?.emailAddress || "—"}
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

              <div className="mt-6">
                <Button
                  className="w-full rounded-2xl bg-[#135BEC] py-6 text-base font-semibold hover:bg-blue-700"
                  disabled={navLoading}
                  onClick={() => {
                    setNavLoading(true);
                    router.push("/create-course");
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {navLoading ? "Шилжүүлж байна..." : "Хичээл үүсгэх"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Right content */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <UserSearch className="h-5 w-5 text-[#135BEC]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Танилцуулга
                  </h2>
                  <p className="text-sm text-slate-500">
                    Таны тухай оруулсан мэдээлэл
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700">
                  {profile?.bio || "Танилцуулга оруулаагүй байна"}
                </p>
              </div>
            </Card>

            <Card className="rounded-3xl border-0 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
                  <BadgeCheck className="h-5 w-5 text-[#135BEC]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Ур чадвар
                  </h2>
                  <p className="text-sm text-slate-500">
                    Таны оруулсан ур чадварууд
                  </p>
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

            <div className="flex justify-end"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
