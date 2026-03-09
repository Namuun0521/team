"use client";

import { X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const CATEGORY_MAP: Record<string, string | null> = {
  Дизайн: "Дизайн",
  Хөгжүүлэгч: "ХӨГЖҮҮЛЭГЧ",
  "Хэл сурах": "Хэл_сурах",
  Маркетинг: "Маркетинг",
  Фитнес: "Фитнес",
  "Ерөнхий эрдэм": "Ерөнхий_эрдэм",
  Бусад: "Бусад",
};

export const SkillSelect = ({ form }: any) => {
  const skillsList = Object.keys(CATEGORY_MAP);
  const [open, setOpen] = useState(false); // ✔ энд байх ёстой

  return (
    <FormField
      control={form.control}
      name="skills"
      render={({ field }) => {
        const skills = field.value || [];

        const addSkill = (skill: string) => {
          if (!skills.includes(skill)) {
            field.onChange([...skills, skill]);

            const category = CATEGORY_MAP[skill];
            if (category) {
              form.setValue("category", category);
            }
          }

          setOpen(false);
        };

        const removeSkill = (skill: string) => {
          field.onChange(skills.filter((s: string) => s !== skill));
        };

        return (
          <FormItem className="flex flex-col w-183.5 gap-2 border-b border-b-[#F1F5F9] pb-16">
            <div className="flex gap-2">
              <p className="font-semibold text-sm text-[#334155]">
                Ур чадварууд
              </p>
              <span className="font-semibold text-sm text-red-500">*</span>
            </div>

            <FormControl>
              <div className="relative w-full">
                <div
                  onClick={() => setOpen(!open)}
                  className="border rounded-md min-h-12 w-183.5 flex items-center flex-wrap gap-2 p-2 cursor-text"
                >
                  {skills.map((skill: string) => (
                    <div
                      key={skill}
                      className="flex items-center gap-1 bg-blue-50 font-semibold border-blue-100 border text-[#135BEC] px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <X
                        size={14}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSkill(skill);
                        }}
                      />
                    </div>
                  ))}

                  <span className="text-gray-400 text-sm">
                    Ур чадвар нэмэх...
                  </span>
                </div>

                {open && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-md shadow-md mt-1 z-10">
                    {skillsList.map((skill) => (
                      <div
                        key={skill}
                        onClick={() => addSkill(skill)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}

                <p className="font-medium text-xs mt-2 text-[#94A3B8]">
                  Хамгийн багадаа 1 ур чадвар сонгоно уу.
                </p>
              </div>
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
