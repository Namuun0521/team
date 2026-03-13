// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useUser } from "@clerk/nextjs";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   SendHorizontal,
//   OctagonAlert,
//   ImagePlus,
//   ChevronLeft,
//   X,
//   Loader2,
// } from "lucide-react";

// interface Category {
//   id: string;
//   name: string;
// }

// export default function CreateCoursePage() {
//   const router = useRouter();
//   const { user } = useUser();

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [imagePreview, setImagePreview] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("/api/categories")
//       .then((r) => r.json())
//       .then(setCategories)
//       .catch(() => {});
//   }, []);

//   const handleImageUpload = async (file: File) => {
//     if (!file) return;

//     const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
//     if (!allowed.includes(file.type)) {
//       setError("Зөвхөн PNG, JPG, WEBP зураг оруулна уу");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       setError("Файл 5MB-с хэтэрсэн байна");
//       return;
//     }

//     setError(null);
//     setUploading(true);
//     setImagePreview(URL.createObjectURL(file));

//     try {
//       const fd = new FormData();
//       fd.append("file", file);

//       const res = await fetch("/api/upload", { method: "POST", body: fd });
//       const data = await res.json();

//       if (!res.ok) throw new Error(data.error || "Upload алдаа");

//       setImageUrl(data.imageUrl);
//     } catch (err: any) {
//       setError(err.message);
//       setImagePreview("");
//       setImageUrl("");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removeImage = () => {
//     setImageUrl("");
//     setImagePreview("");
//   };

//   const handleSubmit = async () => {
//     setError(null);

//     if (!title.trim()) return setError("Хичээлийн гарчиг оруулна уу");
//     if (!category) return setError("Ангилал сонгоно уу");
//     if (!price || isNaN(Number(price)) || Number(price) <= 0)
//       return setError("Үнэ зөв оруулна уу");
//     if (!description.trim()) return setError("Тайлбар бичнэ үү");
//     if (!imageUrl) return setError("Хичээлийн нүүр зураг оруулна уу");

//     setLoading(true);

//     try {
//       const res = await fetch("/api/courses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: title.trim(),
//           category,
//           price: Number(price),
//           description: description.trim(),
//           imageUrl,
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Алдаа гарлаа");

//       alert("Хичээл амжилттай үүсгэгдлээ!");
//       router.push(`/course-details/${data.id}`);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fb] py-10">
//       <div className="mx-auto max-w-[540px] flex flex-col gap-8 px-4">
//         <div className="text-sm text-[#94A3B8]">
//           Профайл үүсгэх {" > "} Баталгаажуулалт {" > "}
//           <span className="font-medium text-[#135BEC]">Хичээл оруулах</span>
//         </div>

//         <div>
//           <h1 className="text-[28px] font-bold text-[#0F172A] mb-1">
//             Анхны хичээлээ оруулах
//           </h1>
//           <p className="text-[15px] text-[#64748B] leading-relaxed">
//             Өөрийн ур чадвараа бусадтай хуваалцаж, орлого олж эхлээрэй.
//             Мэдээллээ үнэн зөв бөглөнө үү.
//           </p>
//         </div>

//         {error && (
//           <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-sm">
//           <CardContent className="p-7 space-y-6">
//             <div>
//               <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
//                 Хичээлийн гарчиг
//               </label>
//               <Input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Жишээ нь: График дизайны анхан шатны хичээл"
//                 className="h-[52px] rounded-xl bg-[#F8FAFC]"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-5">
//               <div>
//                 <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
//                   Ангилал
//                 </label>
//                 <Select value={category} onValueChange={setCategory}>
//                   <SelectTrigger className="h-[52px] rounded-xl w-full">
//                     <SelectValue placeholder="Сонгох..." />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((c) => (
//                       <SelectItem key={c.id} value={c.id}>
//                         {c.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
//                   Нэг цагийн үнэ (₮)
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">
//                     ₮
//                   </span>
//                   <Input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="25,000"
//                     className="h-[52px] rounded-xl pl-7"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
//                 Дэлгэрэнгүй тайлбар
//               </label>
//               <Textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Энэхүү хичээлээр суралцагч юу сурч мэдэх вэ? Таны туршлага юу вэ?"
//                 className="min-h-[120px] rounded-xl"
//               />
//             </div>

//             <div>
//               <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-2 block">
//                 Хичээлийн нүүр зураг
//               </label>

//               {!imagePreview ? (
//                 <label className="border-2 border-dashed border-[#CBD5F5] rounded-xl h-[140px] flex flex-col items-center justify-center cursor-pointer bg-[#FAFBFF] hover:bg-[#F0F3FF] transition">
//                   {uploading ? (
//                     <Loader2 className="w-6 h-6 text-[#135BEC] animate-spin" />
//                   ) : (
//                     <ImagePlus className="w-6 h-6 text-[#135BEC]" />
//                   )}
//                   <span className="mt-2 text-sm font-medium text-[#0F172A]">
//                     {uploading ? "Хадгалж байна..." : "Зураг оруулах"}
//                   </span>
//                   <span className="text-xs text-[#94A3B8] mt-0.5">
//                     PNG, JPG эсвэл WEBP (макс. 5MB)
//                   </span>
//                   <input
//                     type="file"
//                     accept="image/png,image/jpeg,image/webp"
//                     className="hidden"
//                     disabled={uploading}
//                     onChange={(e) => {
//                       const f = e.target.files?.[0];
//                       if (f) handleImageUpload(f);
//                     }}
//                   />
//                 </label>
//               ) : (
//                 <div className="relative rounded-xl overflow-hidden border">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="w-full h-[180px] object-cover"
//                   />
//                   <button
//                     type="button"
//                     onClick={removeImage}
//                     className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white"
//                   >
//                     <X className="w-3.5 h-3.5" />
//                   </button>
//                   {uploading && (
//                     <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
//                       <Loader2 className="w-7 h-7 text-[#135BEC] animate-spin" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="flex justify-between items-center pt-2">
//               <button
//                 onClick={() => router.back()}
//                 className="flex items-center gap-1 text-[#64748B] text-sm hover:text-[#334155]"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//                 Буцах
//               </button>

//               <Button
//                 onClick={handleSubmit}
//                 disabled={loading || uploading}
//                 className="bg-[#135BEC] hover:bg-[#0f4fd4] h-12 px-7 rounded-xl text-[15px] text-white gap-2 font-semibold"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="w-4 h-4 animate-spin" />
//                     Түр хүлээнэ үү...
//                   </>
//                 ) : (
//                   <>
//                     Нийтлэх
//                     <SendHorizontal className="w-4 h-4" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="bg-[#1E293B] rounded-xl p-5 text-sm flex gap-3 items-start">
//           <OctagonAlert className="w-5 h-5 shrink-0 mt-0.5 text-yellow-400" />
//           <span className="text-[#CBD5E1]">
//             <b className="text-white">Зөвлөгөө:</b> Хичээлийн гарчиг болон
//             тайлбар нь тодорхой, ойлгомжтой байх тусам суралцагчдын анхаарлыг
//             татах магадлал 40% илүү байдаг. Мөн чанартай зураг ашиглахаа
//             мартуузай.
//           </span>
//         </div>

//         <p className="text-center text-xs text-[#94A3B8] pb-4">
//           © 2024 Freelancer.mn. Залууст зориулсан боломжийн талбар.
//         </p>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   SendHorizontal,
//   OctagonAlert,
//   ChevronLeft,
//   Loader2,
// } from "lucide-react";

// interface Category {
//   id: string;
//   name: string;
// }

// export default function CreateCoursePage() {
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("/api/categories")
//       .then(async (r) => {
//         if (!r.ok) throw new Error("Ангилал ачаалж чадсангүй");
//         return r.json();
//       })
//       .then(setCategories)
//       .catch(() => {
//         setCategories([]);
//       });
//   }, []);

//   const handleSubmit = async () => {
//     setError(null);

//     if (!title.trim()) return setError("Хичээлийн гарчиг оруулна уу");
//     if (!category) return setError("Ангилал сонгоно уу");
//     if (!price || Number.isNaN(Number(price)) || Number(price) <= 0) {
//       return setError("Үнэ зөв оруулна уу");
//     }
//     if (!description.trim()) return setError("Тайлбар бичнэ үү");

//     setLoading(true);

//     try {
//       const res = await fetch("/api/courses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: title.trim(),
//           category,
//           price: Number(price),
//           description: description.trim(),
//           imageUrl: null,
//         }),
//       });

//       const raw = await res.text();

//       let data: { id?: string; error?: string } = {};
//       try {
//         data = raw ? JSON.parse(raw) : {};
//       } catch {
//         throw new Error("Course API JSON биш response буцаалаа");
//       }

//       if (!res.ok) {
//         throw new Error(data?.error || "Алдаа гарлаа");
//       }

//       if (!data?.id) {
//         throw new Error("Course id буцаагдаагүй байна");
//       }

//       alert("Хичээл амжилттай үүсгэгдлээ!");
//       router.push(`/course-details/${data.id}`);
//     } catch (err) {
//       const message = err instanceof Error ? err.message : "Алдаа гарлаа";
//       setError(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#f8f9fb] py-10">
//       <div className="mx-auto flex max-w-[540px] flex-col gap-8 px-4">
//         <div className="text-sm text-[#94A3B8]">
//           Профайл үүсгэх {" > "} Баталгаажуулалт {" > "}
//           <span className="font-medium text-[#135BEC]">Хичээл оруулах</span>
//         </div>

//         <div>
//           <h1 className="mb-1 text-[28px] font-bold text-[#0F172A]">
//             Анхны хичээлээ оруулах
//           </h1>
//           <p className="text-[15px] leading-relaxed text-[#64748B]">
//             Өөрийн ур чадвараа бусадтай хуваалцаж, орлого олж эхлээрэй.
//             Мэдээллээ үнэн зөв бөглөнө үү.
//           </p>
//         </div>

//         {error && (
//           <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {error}
//           </div>
//         )}

//         <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-sm">
//           <CardContent className="space-y-6 p-7">
//             <div>
//               <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
//                 Хичээлийн гарчиг
//               </label>
//               <Input
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Жишээ нь: График дизайны анхан шатны хичээл"
//                 className="h-[52px] rounded-xl bg-[#F8FAFC]"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-5">
//               <div>
//                 <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
//                   Ангилал
//                 </label>
//                 <Select value={category} onValueChange={setCategory}>
//                   <SelectTrigger className="h-[52px] w-full rounded-xl">
//                     <SelectValue placeholder="Сонгох..." />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((c) => (
//                       <SelectItem key={c.id} value={c.id}>
//                         {c.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
//                   Нэг цагийн үнэ (₮)
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[#94A3B8]">
//                     ₮
//                   </span>
//                   <Input
//                     type="number"
//                     value={price}
//                     onChange={(e) => setPrice(e.target.value)}
//                     placeholder="25000"
//                     className="h-[52px] rounded-xl pl-7"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
//                 Дэлгэрэнгүй тайлбар
//               </label>
//               <Textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Энэхүү хичээлээр суралцагч юу сурч мэдэх вэ? Таны туршлага юу вэ?"
//                 className="min-h-[120px] rounded-xl"
//               />
//             </div>

//             <div className="flex items-center justify-between pt-2">
//               <button
//                 type="button"
//                 onClick={() => router.back()}
//                 className="flex items-center gap-1 text-sm text-[#64748B] hover:text-[#334155]"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 Буцах
//               </button>

//               <Button
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="h-12 gap-2 rounded-xl bg-[#135BEC] px-7 text-[15px] font-semibold text-white hover:bg-[#0f4fd4]"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                     Түр хүлээнэ үү...
//                   </>
//                 ) : (
//                   <>
//                     Нийтлэх
//                     <SendHorizontal className="h-4 w-4" />
//                   </>
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         <div className="flex items-start gap-3 rounded-xl bg-[#1E293B] p-5 text-sm">
//           <OctagonAlert className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
//           <span className="text-[#CBD5E1]">
//             <b className="text-white">Зөвлөгөө:</b> Demo хувилбарт зураггүй явж
//             болно. Гол нь course үүсэж, detail page зөв нээгдэж байвал
//             хангалттай.
//           </span>
//         </div>

//         <p className="pb-4 text-center text-xs text-[#94A3B8]">
//           © 2024 Freelancer.mn. Залууст зориулсан боломжийн талбар.
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  SendHorizontal,
  OctagonAlert,
  ImagePlus,
  ChevronLeft,
  X,
  Loader2,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function CreateCoursePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => {});
  }, []);

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    const allowed = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!allowed.includes(file.type)) {
      setError("Зөвхөн PNG, JPG, WEBP зураг оруулна уу");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Файл 5MB-с хэтэрсэн байна");
      return;
    }

    setError(null);
    setUploading(true);
    setImagePreview(URL.createObjectURL(file));

    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload алдаа");

      setImageUrl(data.imageUrl);
    } catch (err: any) {
      setError(err.message);
      setImagePreview("");
      setImageUrl("");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl("");
    setImagePreview("");
  };

  const handleSubmit = async () => {
    setError(null);

    if (!title.trim()) return setError("Хичээлийн гарчиг оруулна уу");
    if (!category) return setError("Ангилал сонгоно уу");
    if (!price || isNaN(Number(price)) || Number(price) <= 0)
      return setError("Үнэ зөв оруулна уу");
    if (!description.trim()) return setError("Тайлбар бичнэ үү");

    setLoading(true);

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category,
          price: Number(price),
          description: description.trim(),
          imageUrl: imageUrl || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Алдаа гарлаа");

      window.location.href = "/set-availability?courseId=" + data.id;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-10">
      <div className="mx-auto max-w-[540px] flex flex-col gap-8 px-4">
        <div className="text-sm text-[#94A3B8]">
          Профайл үүсгэх {" > "} Баталгаажуулалт {" > "}
          <span className="font-medium text-[#135BEC]">Хичээл оруулах</span>
        </div>

        <div>
          <h1 className="text-[28px] font-bold text-[#0F172A] mb-1">
            Анхны хичээлээ оруулах
          </h1>
          <p className="text-[15px] text-[#64748B] leading-relaxed">
            Өөрийн ур чадвараа бусадтай хуваалцаж, орлого олж эхлээрэй.
            Мэдээллээ үнэн зөв бөглөнө үү.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-sm">
          <CardContent className="p-7 space-y-6">
            <div>
              <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
                Хичээлийн гарчиг
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Жишээ нь: График дизайны анхан шатны хичээл"
                className="h-[52px] rounded-xl bg-[#F8FAFC]"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
                  Ангилал
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-[52px] rounded-xl w-full">
                    <SelectValue placeholder="Сонгох..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
                  Нэг цагийн үнэ (₮)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-sm font-medium">
                    ₮
                  </span>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="25000"
                    className="h-[52px] rounded-xl pl-7"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-1.5 block">
                Дэлгэрэнгүй тайлбар
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Энэхүү хичээлээр суралцагч юу сурч мэдэх вэ? Таны туршлага юу вэ?"
                className="min-h-[120px] rounded-xl"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-[#64748b] uppercase tracking-wider mb-2 block">
                Хичээлийн нүүр зураг
              </label>

              {!imagePreview ? (
                <label className="border-2 border-dashed border-[#CBD5F5] rounded-xl h-[140px] flex flex-col items-center justify-center cursor-pointer bg-[#FAFBFF] hover:bg-[#F0F3FF] transition">
                  {uploading ? (
                    <Loader2 className="w-6 h-6 text-[#135BEC] animate-spin" />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-[#135BEC]" />
                  )}
                  <span className="mt-2 text-sm font-medium text-[#0F172A]">
                    {uploading ? "Хадгалж байна..." : "Зураг оруулах"}
                  </span>
                  <span className="text-xs text-[#94A3B8] mt-0.5">
                    PNG, JPG эсвэл WEBP (макс. 5MB)
                  </span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleImageUpload(f);
                    }}
                  />
                </label>
              ) : (
                <div className="relative rounded-xl overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-[180px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  {uploading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                      <Loader2 className="w-7 h-7 text-[#135BEC] animate-spin" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center gap-1 text-[#64748B] text-sm hover:text-[#334155]"
              >
                <ChevronLeft className="w-4 h-4" />
                Буцах
              </button>

              <Button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="bg-[#135BEC] hover:bg-[#0f4fd4] h-12 px-7 rounded-xl text-[15px] text-white gap-2 font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Түр хүлээнэ үү...
                  </>
                ) : (
                  <>
                    Нийтлэх
                    <SendHorizontal className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-[#1E293B] rounded-xl p-5 text-sm flex gap-3 items-start">
          <OctagonAlert className="w-5 h-5 shrink-0 mt-0.5 text-yellow-400" />
          <span className="text-[#CBD5E1]">
            <b className="text-white">Зөвлөгөө:</b> Хичээлийн гарчиг болон
            тайлбар нь тодорхой, ойлгомжтой байх тусам суралцагчдын анхаарлыг
            татах магадлал 40% илүү байдаг.
          </span>
        </div>

        <p className="text-center text-xs text-[#94A3B8] pb-4">
          © 2024 Freelancer.mn. Залууст зориулсан боломжийн талбар.
        </p>
      </div>
    </div>
  );
}
