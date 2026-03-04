import { Mail, Phone, MapPin, Globe, AtSign, Play } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-600">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                ★
              </div>
              Freelancer.mn
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Монголын залуучуудад зориулсан хамгийн том ур чадвар солилцооны
              талбар. Бид таны мэдлэгийг үнэ цэнтэй болгоход тусална.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">Холбоос</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <a className="hover:text-blue-600" href="#">
                  Нүүр хуудас
                </a>
              </li>
              <li>
                <a className="hover:text-blue-600" href="#">
                  Бүх хичээлүүд
                </a>
              </li>
              <li>
                <a className="hover:text-blue-600" href="#">
                  Ангилалууд
                </a>
              </li>
              <li>
                <a className="hover:text-blue-600" href="#">
                  Түгээмэл асуултууд
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Холбоо барих
            </h4>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span>info@freelancer.mn</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span>+976 9911-1111</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              Сошиал суваг
            </h4>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Website"
              >
                <Globe className="h-5 w-5 text-gray-600" />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Email"
              >
                <AtSign className="h-5 w-5 text-gray-600" />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Youtube"
              >
                <Play className="h-5 w-5 text-gray-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-gray-200" />

        <div className="flex flex-col items-start justify-between gap-4 text-sm text-gray-500 md:flex-row md:items-center">
          <span>© 2024 Freelancer.mn. Бүх эрх хуулиар хамгаалагдсан.</span>

          <div className="flex gap-6">
            <a className="hover:text-blue-600" href="#">
              Үйлчилгээний нөхцөл
            </a>
            <a className="hover:text-blue-600" href="#">
              Нууцлалын бодлого
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
