"use client";

import { useContext, useState } from "react";
import { StepContext } from "@/lib/type";
import { Card } from "@/components/ui/card";
import { BadgeCheck, Mail, Phone, UserSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const { data } = useContext(StepContext);
  const [loading, setLoading] = useState(false);

  console.log("PROFILE DATA", data);

  return (
    <div className="bg-blue-50 h-screen">
      <div className="h-full w-full justify-center flex gap-4 py-8">
        <div>
          <Card className="flex p-0 w-[320px] h-152.25">
            {data.ProfileImage && (
              <img
                src={URL.createObjectURL(data.ProfileImage)}
                className="w-79.5 h-79-5 rounded-lg"
              />
            )}
            <div className="px-4 flex flex-col gap-2">
              <h1 className="font-bold text-2xl mb-4 py-2 border-b">
                {data.name}
              </h1>
              <p className="font-medium flex items-center gap-2 text-sm text-[#334155]">
                <Mail
                  size={16}
                  color="#135BEC
                "
                />
                <span>{data.email}</span>
              </p>
              <p className="font-medium flex items-center gap-2 text-sm text-[#334155]">
                <Phone size={16} color="#135BEC" />
                <span>{data.phone}</span>
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
              {data.bio}
            </p>
          </Card>
          <Card className="h-fit w-full p-8">
            <h1 className="flex items-center gap-2 font-bold text-xl">
              <BadgeCheck color="#135BEC" />
              <span>Ур чадвар</span>
            </h1>

            <div className="flex flex-wrap gap-2">
              {data.skills?.map((skill, index) => (
                <Button
                  key={index}
                  className="items-center gap-1 bg-blue-50 hover:bg-blue-100 font-semibold border-blue-100 border text-[#135BEC] px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </Button>
              ))}
            </div>
          </Card>
          <div className="flex justify-end">
            <Link href={"/"}>
              <Button
                className="flex bg-[#135BEC] hover:bg-blue-100 w-fit justify-center cursor-pointer"
                disabled={loading}
              >
                {loading ? "Loading..." : "Хичээл үүсгэх"}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
