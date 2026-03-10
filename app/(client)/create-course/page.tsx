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
import { SendHorizontal, OctagonAlert, ImagePlus } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function Page() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => {
        if (!res.ok) throw new Error("API алдаа: " + res.status);
        return res.json();
      })
      .then((data) => {
        console.log("Categories API:", data);
        setCategories(data);
      })
      .catch((err) => console.error("Fetch categories алдаа:", err));
  }, []);

  const handleImageUpload = (file: File) => {
    if (!file) return;

    setUploading(true);

    const preview = URL.createObjectURL(file);
    setImageUrl(preview);

    setTimeout(() => {
      setUploading(false);
    }, 500);
  };

  const handleSubmit = async () => {
    if (!title || !category || !price || !description || !imageUrl) {
      alert("Бүх талбарыг бөглөнө үү");
      return;
    }

    setLoading(true);

    try {
      console.log({
        title,
        category,
        price,
        description,
        imageUrl,
      });

      alert("Хичээл амжилттай нэмэгдлээ");

      router.push("/course-details/[id]");
    } catch (err: any) {
      alert("Алдаа гарлаа: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen py-[40px]">
      <div className="max-w-[768px] mx-auto flex flex-col gap-[32px]">
        <div className="text-[14px] text-[#94A3B8]">
          Профайл үүсгэх {" > "} Баталгаажуулалт {" > "}
          <span className="text-[#135BEC] font-medium"> Хичээл оруулах</span>
        </div>

        <div>
          <h1 className="text-[32px] font-bold text-[#0F172A] mb-[8px]">
            Хичээлээ оруулах
          </h1>
          <p className="text-[16px] text-[#64748B]">
            Өөрийн ур чадвараа бусадтай хуваалцаж, орлого олж эхлээрэй.
            Мэдээллээ үнэн зөв бөглөнө үү.
          </p>
        </div>

        <Card className="rounded-[16px] border-[#E5E7EB] bg-white">
          <CardContent className="p-[30px]">
            <div className="mb-[20px]">
              <p className="text-[14px] font-semibold mb-[6px] text-[#64748b]">
                ХИЧЭЭЛИЙН ГАРЧИГ
              </p>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Жишээ:  График дизайны анхан шатны хичээл"
                className="h-[64px] rounded-[12px] bg-[#F8FAFC]"
              />
            </div>

            <div className="flex gap-[24px] mb-[20px]">
              <div className="flex-1">
                <p className="text-[14px] font-semibold mb-[6px] text-[#64748b]">
                  АНГИЛАЛ
                </p>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-[56px] rounded-[12px] w-[339px]">
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
              <div className="flex-1">
                <p className="text-[14px] font-semibold mb-[6px] text-[#64748b]">
                  НЭГ ЦАГИЙН ҮНЭ (₮)
                </p>
                <div className="relative">
                  <span className="absolute left-[12px] top-[16px] text-[#64748B]">
                    ₮
                  </span>
                  <Input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="25,000"
                    className="h-[56px] rounded-[12px] pl-[28px]"
                  />
                </div>
              </div>
            </div>

            <div className="mb-[20px]">
              <p className="text-[14px] font-semibold mb-[6px] text-[#64748b]">
                ДЭЛГЭРЭНГҮЙ ТАЙЛБАР
              </p>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Энэхүү хичээлээр суралцагч юу сурч мэдэх вэ? Таны туршлага юу вэ?"
                className="h-[140px] rounded-[12px]"
              />
            </div>

            <div className="mb-[30px]">
              <p className="text-[14px] font-semibold mb-[10px] text-[#64748b]">
                ХИЧЭЭЛИЙН НҮҮР ЗУРАГ
              </p>
              <label className="border-2 border-dashed border-[#CBD5F5] rounded-[12px] h-[160px] flex flex-col items-center justify-center text-center cursor-pointer bg-[#F8FAFF]">
                <ImagePlus className="w-[28px] h-[28px] text-[#135BEC]" />
                <span className="mt-[8px] text-[16px] font-medium">
                  Зураг оруулах
                </span>
                <span className="text-[14px] text-[#64748B]">
                  PNG, JPG, WEBP (макс. 4MB)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && handleImageUpload(e.target.files[0])
                  }
                />
              </label>
              {uploading && (
                <p className="text-sm mt-2">Upload хийж байна...</p>
              )}
              {imageUrl && (
                <img src={imageUrl} className="mt-3 rounded-lg w-[200px]" />
              )}
            </div>

            <div className="flex justify-between items-center">
              <span
                onClick={() => router.push("/profile")}
                className="text-[#64748B] text-[14px] cursor-pointer"
              >
                Буцах
              </span>
              <Button
                onClick={handleSubmit}
                disabled={loading || uploading}
                className="bg-[#135BEC] h-[56px] px-[26px] rounded-[12px] text-[18px] text-white gap-[6px]"
              >
                {loading ? "Түр хүлээнэ үү..." : "Нийтлэх"}
                <SendHorizontal className="w-[18px]" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-[#EEF2FF] rounded-[12px] p-[24px] text-[14px] flex gap-[14px]">
          <OctagonAlert className="w-[20px] h-[20px]" color="#135BEC" />
          <span>
            <b>Зөвлөгөө:</b> Хичээлийн гарчиг болон тайлбар нь тодорхой,
            ойлгомжтой байх тусам суралцагчдын анхаарлыг татах магадлал 40% илүү
            байдаг. Мөн чанартай зураг ашиглахаа мартуузай.
          </span>
        </div>
      </div>
    </div>
  );
}
