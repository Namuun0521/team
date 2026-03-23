import Link from "next/link";
import { CheckCircle } from "lucide-react";
import HelpButton from "../_components/HelpButton";

const steps = [
  {
    number: 1,
    title: "Бүртгүүлэх хуудас руу орох",
    description:
      'Freelancer.mn сайтад орж, цэсний баруун дээд булангийн "Бүртгүүлэх" товчийг дарна уу.',
    tip: "Google эсвэл GitHub аккаунтаараа нэг товшилтоор бүртгүүлэх боломжтой.",
  },
  {
    number: 2,
    title: "Мэдээлэл бөглөх",
    description:
      "Нэр, и-мэйл хаяг, нууц үгээ оруулна уу. Нууц үг дор хаяж 8 тэмдэгт байх ёстой.",
    tip: "Нэр нь таны профайлд харагдах тул жинхэнэ нэрээ ашиглахыг зөвлөж байна.",
  },
  {
    number: 3,
    title: "И-мэйл баталгаажуулах",
    description:
      "Бүртгүүлсний дараа таны и-мэйл хаяг руу баталгаажуулах код ирнэ. 6 оронтой кодыг оруулж дуусгана уу.",
    tip: "И-мэйл 5 минутын дотор ирэхгүй бол spam хавтасыг шалгаарай.",
  },
  {
    number: 4,
    title: "Профайл тохируулах",
    description:
      "Ур чадварын чиглэлээ сонгоод профайлынхаа зургийг оруулж, өөрийгөө товч танилцуулна уу.",
    tip: "Профайл бүрэн гүйцэд байвал хичээл олохдоо хялбар болно.",
  },
];

const faqs = [
  {
    q: "Хичээл хэрхэн оруулах вэ?",
    a: 'Нэвтэрсний дараа "Хичээл нэмэх" товчийг дарж, нэр, тайлбар, категори, үнийг бөглөн нийтэлнэ.',
  },
  {
    q: "Төлбөр хэрхэн хийдэг вэ?",
    a: "QPay болон банкны шилжүүлгээр төлбөр хийх боломжтой. Хичээл авсны дараа автоматаар нэвтрэх эрх нээгдэнэ.",
  },
  {
    q: "Нууц үгээ мартсан",
    a: 'Нэвтрэх хуудсан дахь "Нууц үг мартсан" холбоосыг дарж, и-мэйлээр сэргээх холбоос авна уу.',
  },
  {
    q: "Хичээлийг хэнд зориулсан бэ?",
    a: "Монголын залуучуудад — ур чадвараа бусдад зааж орлого олохыг хүсэгчид болон шинэ зүйл суралцахыг хүсэгчдэд.",
  },
];

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      {/* Hero */}
      <div className="mb-12 text-center">
        <span className="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
          Гарын авлага
        </span>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Хэрхэн эхлэх вэ?
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Freelancer.mn дээр бүртгүүлж, хичээл авах эсвэл нийтлэх алхмуудыг дагана уу.
        </p>
      </div>

      {/* Steps */}
      <section className="mb-14">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-400">
          Бүртгүүлэх алхмууд
        </h2>
        <ol className="flex flex-col gap-4">
          {steps.map((step, i) => (
            <li
              key={step.number}
              className="relative flex gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[2.1rem] top-[4.5rem] h-[calc(100%+1rem)] w-px bg-zinc-200 dark:bg-zinc-700" />
              )}

              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
                {step.number}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {step.title}
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{step.description}</p>
                <p className="mt-1 flex items-start gap-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                  <CheckCircle className="mt-px h-3.5 w-3.5 flex-shrink-0" />
                  {step.tip}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <div className="mb-14 flex flex-col items-center gap-3 rounded-2xl bg-emerald-50 px-6 py-8 text-center dark:bg-emerald-900/20">
        <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
          Бүртгүүлэхэд бэлэн үү?
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Хэдхэн минутын дотор аккаунтаа үүсгэж эхэлнэ үү.
        </p>
        <Link
          href="/sign-up"
          className="mt-1 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Бүртгүүлэх
        </Link>
      </div>

      {/* FAQ */}
      <section className="mb-14">
        <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-zinc-400">
          Нийтлэг асуулт
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{faq.q}</p>
              <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Help button */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Асуулт хариулт олдсонгүй юу?
        </p>
        <HelpButton />
      </div>
    </main>
  );
}