"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  AtSign,
  Play,
  ChevronRight,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 text-lg font-semibold text-blue-600 sm:text-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-base shadow-sm sm:h-11 sm:w-11">
                ★
              </div>
              <span>Freelancer.mn</span>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-[15px]">
              Монголын залуучуудад зориулсан ур чадвар солилцох платформ. Бид
              таны мэдлэг, чадварыг үнэ цэнтэй боломж болгон холбож өгнө.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Холбоос
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 transition hover:text-blue-600"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:text-blue-600" />
                  Нүүр хуудас
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2 transition hover:text-blue-600"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:text-blue-600" />
                  Бүх хичээлүүд
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="group inline-flex items-center gap-2 transition hover:text-blue-600"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:text-blue-600" />
                  Ангилалууд
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 transition hover:text-blue-600"
                >
                  <ChevronRight className="h-4 w-4 text-gray-400 transition group-hover:text-blue-600" />
                  Бидний тухай
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Холбоо барих
            </h4>

            <div className="mt-4 space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-gray-100 p-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <span className="leading-6">info@freelancer.mn</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-gray-100 p-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                </div>
                <span className="leading-6">+976 9911-1111</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-gray-100 p-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
                <span className="leading-6">
                  Улаанбаатар хот, Сүхбаатар дүүрэг
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-900">
              Сошиал суваг
            </h4>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Бидэнтэй сошиал сувгуудаар холбогдож, шинэ хичээл болон
              боломжуудыг цаг алдалгүй аваарай.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                aria-label="Website"
              >
                <Globe className="h-5 w-5 text-gray-600" />
              </a>

              <a
                href="https://www.instagram.com/mongoliancoders_2025?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                aria-label="Email"
              >
                <AtSign className="h-5 w-5 text-gray-600" />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50"
                aria-label="Youtube"
              >
                <Play className="h-5 w-5 text-gray-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="my-8 h-px w-full bg-gray-200 sm:my-10" />

        <div className="flex flex-col gap-4 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <span className="leading-6">
            © 2024 Freelancer.mn. Бүх эрх хуулиар хамгаалагдсан.
          </span>

          <div className="flex flex-wrap gap-4 sm:gap-6">
            <Link href="/terms" className="transition hover:text-blue-600">
              Үйлчилгээний нөхцөл
            </Link>
            <Link href="/privacy" className="transition hover:text-blue-600">
              Нууцлалын бодлого
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
