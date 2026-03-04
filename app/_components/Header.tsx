import { Search } from "lucide-react";
import { Filter } from "./Filter";

export const Header = () => {
  return (
    <div className="w-full bg-white border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-xl font-semibold text-blue-600">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            ★
          </div>
          Freelancer.mn
        </div>

        <div className="relative w-[400px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Хайх..."
            className="w-full rounded-lg bg-gray-100 py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-6 text-sm font-medium">
          <a href="#" className="hover:text-blue-600">
            Нүүр
          </a>
          <a href="#" className="hover:text-blue-600">
            Ангилал
          </a>
          <a href="#" className="hover:text-blue-600">
            Бидний тухай
          </a>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Freelancer болох
          </button>

          <button className="rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200">
            Нэвтрэх
          </button>
        </div>
      </div>

      <div className="">
        <Filter />
      </div>
    </div>
  );
};
