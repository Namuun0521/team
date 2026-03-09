import { Search } from "lucide-react";
import { Filter } from "./Filter";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import BecomeFreelancerButton from "./BecomeFreelancerButton";

export const Header = () => {
  return (
    <div className="w-full border-b bg-white">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold text-blue-600 sm:text-xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              ★
            </div>
            <span>Freelancer.mn</span>
          </div>

          <div className="relative w-full sm:w-full md:w-full lg:w-[360px] xl:w-[400px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Хайх..."
              className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-medium sm:gap-3 md:gap-4 lg:justify-end">
            <a href="#" className="rounded-md px-2 py-1 hover:text-blue-600">
              Нүүр
            </a>
            <a href="#" className="rounded-md px-2 py-1 hover:text-blue-600">
              Ангилал
            </a>
            <a href="#" className="rounded-md px-2 py-1 hover:text-blue-600">
              Бидний тухай
            </a>

            <Show when="signed-out">
              <SignInButton>
                <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm whitespace-nowrap">
                  Нэвтрэх
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm whitespace-nowrap text-white">
                  Бүртгүүлэх
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
              <BecomeFreelancerButton />
            </Show>
          </div>
        </div>
      </div>

      <div className="border-t bg-white px-4 py-2 sm:px-6 lg:px-8">
        <Filter />
      </div>
    </div>
  );
};
