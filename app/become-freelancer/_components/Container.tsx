"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CircleUser,
  IdCard,
  Mail,
  Phone,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SkillSelect } from "./Select";
import { Button } from "@/components/ui/button";
import { StepContext } from "@/lib/type";
import Link from "next/link";
import { toast } from "sonner";
const schema = z.object({
  name: z.string().min(2, "Нэр оруулна уу"),
  phone: z.string().regex(/^\+?\d{8}$/, "Утасны дугаар буруу"),
  email: z.string().email("И-мэйл буруу"),
  ProfileImage: z
    .any()
    .refine((file) => file instanceof File, "Зураг оруулна уу"),
  bio: z.string().min(10, "Bio дор хаяж 10 тэмдэгт байна"),
  skills: z.array(z.string()).min(1, "Хамгийн багадаа 1 ур чадвар сонгоно уу"),
});

type schemaType = z.infer<typeof schema>;

export const Container = () => {
  const { data, handleBack, setData } = useContext(StepContext);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(
    data.ProfileImage ? URL.createObjectURL(data.ProfileImage) : null,
  );
  const router = useRouter();

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      phone: data.phone,
      email: data.email,
      ProfileImage: data.ProfileImage,
      bio: data.bio,
      skills: data.skills ?? [],
    },
  });

  const onSubmit = (values: schemaType) => {
    setLoading(true);

    setData((prev) => ({
      ...prev,
      name: values.name,
      phone: values.phone,
      email: values.email,
      ProfileImage: values.ProfileImage,
      bio: values.bio,
      skills: values.skills,
    }));

    toast.success("Амжилттай!", {
      description: "Таны freelancer profile үүслээ.",
    });

    setTimeout(() => {
      setLoading(false);
      router.push("/freelancer/profile");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-12">
      <Form {...form}>
        <form className="space-y-12" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-4 w-full justify-center items-center">
              <FormField
                control={form.control}
                name="ProfileImage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-32 h-32">
                        <Input
                          type="file"
                          className="absolute flex justify-center w-32 h-32 inset-0 opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            setPreview(URL.createObjectURL(file));

                            field.onChange(file);
                          }}
                        />

                        <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
                          {preview ? (
                            <img
                              src={preview}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <CircleUser size={144} color="white" />
                          )}
                        </div>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <p className="font-bold text-lg text-[#0F172A]">Зураг оруулах</p>
              <p className="text-[#64748B] font-medium text-sm">
                Зураг заавал байх шаардлагатай (PNG, JPG)
              </p>
            </div>

            <div className="flex gap-8.5">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="h-fit gap-2 mb-3 justify-center items-center">
                      <FormLabel>
                        <p className="font-semibold text-sm text-[#334155]">
                          Овог нэр
                        </p>
                        <span className="font-semibold text-sm text-red-500">
                          *
                        </span>
                      </FormLabel>

                      <FormControl>
                        <div className="relative w-88.75">
                          <IdCard
                            className="absolute left-2.5 top-4.5"
                            color="#94A3B8"
                            size={16}
                          />

                          <Input
                            placeholder="Таны бүтэн нэр"
                            {...field}
                            className="w-88.75 h-12.25 font-normal pl-10 text-[16px] text-[#8B8E95]"
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="h-fit gap-2 mb-3 justify-center items-center">
                      <FormLabel>
                        <p className="font-semibold text-sm text-[#334155]">
                          Утасны дугаар
                        </p>
                        <span className="font-semibold text-sm text-red-500">
                          *
                        </span>
                      </FormLabel>

                      <FormControl>
                        <div className="relative w-88.75">
                          <Phone
                            className="absolute left-2.5 top-4.5"
                            color="#94A3B8"
                            size={16}
                          />

                          <Input
                            placeholder="9911XXXX"
                            {...field}
                            className="w-88.75 h-12.25 font-normal pl-10 text-[16px] text-[#8B8E95]"
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="h-fit gap-2 mb-3 justify-center items-center">
                  <FormLabel>
                    <p className="font-semibold text-sm text-[#334155]">
                      И-мэйл хаяг
                    </p>
                    <span className="font-semibold text-sm text-red-500">
                      *
                    </span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative w-183.5">
                      <Mail
                        className="absolute left-2.5 top-4"
                        color="#94A3B8"
                        size={16}
                      />

                      <Input
                        placeholder="example@gmail.com"
                        {...field}
                        className="w-183.5 h-11 font-normal pl-10 text-[16px] text-[#8B8E95]"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <p className="font-semibold text-sm text-[#334155]">
                    Өөрийн тухай (Bio)
                  </p>
                  <span className="font-semibold text-sm text-red-500">*</span>
                </div>

                <FormControl>
                  <Textarea
                    placeholder="Өөрийн туршлага, ур чадварын талаар товч танилцуулна уу..."
                    className="w-183.5"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <SkillSelect form={form} />

          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <p className="flex items-center-safe gap-2" onClick={handleBack}>
                <ChevronLeft size={16} />
                Буцах
              </p>
            </Link>

            <Button className="bg-[#135BEC]" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Дараах"}
              <ChevronRight />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
