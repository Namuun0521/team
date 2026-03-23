"use client";

import { useState } from "react";
import { X, Send, Loader2, CheckCircle } from "lucide-react";

const ISSUE_TYPES = [
  "Бүртгэл / нэвтрэхтэй холбоотой",
  "Төлбөр / гүйлгээ",
  "Хичээл / контент",
  "Техникийн алдаа",
  "Бусад",
];

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

type Step = "form" | "loading" | "success";

export default function HelpModal({ open, onClose }: HelpModalProps) {
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("form");
  const [errors, setErrors] = useState<{ email?: string; description?: string }>({});

  if (!open) return null;

  function validate() {
    const newErrors: typeof errors = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Зөв и-мэйл хаяг оруулна уу";
    }
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description = "Асуудлаа дэлгэрэнгүй бичнэ үү (дор хаяж 10 тэмдэгт)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(
    
  ) {
    if (!validate()) return;
    setStep("loading");

    // Simulate API call — replace with your actual endpoint
    await new Promise((r) => setTimeout(r, 1500));

    await fetch("/api/help", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ issueType, description, email }),
});

    setStep("success");
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep("form");
      setDescription("");
      setEmail("");
      setErrors({});
    }, 300);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl dark:bg-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
          <h2 className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            Тусламж хүсэх
          </h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-1 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "form" && (
            <div className="flex flex-col gap-5">
              {/* Issue type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Асуудлын төрөл
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {ISSUE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Асуудлаа дэлгэрэнгүй бичнэ үү
                </label>
                <textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (errors.description) setErrors((p) => ({ ...p, description: undefined }));
                  }}
                  placeholder="Юу болсон талаар тайлбарлана уу..."
                  rows={4}
                  className={`w-full resize-none rounded-lg border px-3 py-2 text-sm text-zinc-800 outline-none transition focus:ring-2 dark:bg-zinc-800 dark:text-zinc-200 ${
                    errors.description
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-zinc-300 focus:border-emerald-500 focus:ring-emerald-100 dark:border-zinc-600"
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">{errors.description}</p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Холбоо барих и-мэйл
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="tanii@email.mn"
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-zinc-800 outline-none transition focus:ring-2 dark:bg-zinc-800 dark:text-zinc-200 ${
                    errors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-zinc-300 focus:border-emerald-500 focus:ring-emerald-100 dark:border-zinc-600"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Info box */}
              <p className="rounded-lg bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                Бид ажлын <span className="font-medium text-zinc-700 dark:text-zinc-300">1–2 өдрийн</span> дотор хариу өгнө.
                Яаралтай тохиолдолд{" "}
                <a href="mailto:info@freelancer.mn" className="text-emerald-600 hover:underline">
                  info@freelancer.mn
                </a>{" "}
                хаягт шууд бичнэ үү.
              </p>
            </div>
          )}

          {step === "loading" && (
            <div className="flex flex-col items-center gap-4 py-10">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-sm text-zinc-500">Илгээж байна...</p>
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-500" />
              <div>
                <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                  Таны хүсэлт амжилттай илгээгдлээ!
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  Удахгүй{" "}
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{email}</span>{" "}
                  хаяг руу хариу ирнэ.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {step === "form" && (
          <div className="flex justify-end gap-2 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
            <button
              onClick={handleClose}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Болих
            </button>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 active:scale-95"
            >
              <Send className="h-3.5 w-3.5" />
              Илгээх
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="flex justify-center border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
            <button
              onClick={handleClose}
              className="rounded-lg bg-emerald-600 px-6 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Хаах
            </button>
          </div>
        )}
      </div>
    </div>
  );
}