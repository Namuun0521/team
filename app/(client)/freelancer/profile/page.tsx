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
import { BadgeCheck, Mail, Phone, UserSearch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
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

        // Profile олдоогүй бол become-freelancer руу шилжүүлэх
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
  }, [user, isLoaded]);

  const displayName = profile?.user?.name || user?.fullName || "Нэргүй";

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
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

          <div className="flex mt-24 justify-end">
            <Button
              className="flex bg-[#135BEC] hover:bg-blue-100 w-fit justify-center cursor-pointer"
              disabled={navLoading}
              onClick={() => {
                setNavLoading(true);
                router.push("/create-course");
              }}
            >
              {navLoading ? "Шилжүүлж байна..." : "Хичээл үүсгэх"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
