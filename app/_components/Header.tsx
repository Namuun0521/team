"use client";

import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Filter } from "./Filter";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import BecomeFreelancerButton from "./BecomeFreelancerButton";
import { MobileSidebar } from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import { NotificationDialog } from "./NotificationDialog";
import SearchPage from "../search/page";
import Link from "next/link";
=======
import SearchPage from "../search/page";
>>>>>>> 410e9df (search)

type HeaderProps = {
  cartCount: number;
};

export const Header = ({ cartCount }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <>
      <MobileSidebar open={open} setOpen={setOpen} />

      <div className="w-full border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-6">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-2 text-lg font-semibold text-blue-600 sm:text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                ★
              </div>
              <span>Freelancer.mn</span>
            </div>

<<<<<<< HEAD
            {/* SEARCH */}
            <SearchPage />

            {/* MENU */}
=======
            {/* <div className="relative hidden lg:block lg:w-[360px] xl:w-[400px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Хайх..."
                className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            <SearchPage />
>>>>>>> 410e9df (search)
            <div className="hidden items-center gap-4 lg:flex">
              <Button
                variant="link"
                onClick={() => router.push("/")}
                className="hover:text-blue-600"
              >
                Нүүр
              </Button>

              <Button
                variant="link"
                onClick={() => router.push("/about")}
                className="hover:text-blue-600"
              >
                Бидний тухай
              </Button>

              {/* CART */}
              <Link href="/shopping-cart" className="relative">
                <ShoppingCart />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* NOTIFICATION */}
              {isSignedIn && <NotificationDialog />}

              {/* AUTH */}
              {!isSignedIn && (
                <>
                  <SignInButton>
                    <button className="rounded-lg bg-gray-100 px-4 py-2">
                      Нэвтрэх
                    </button>
                  </SignInButton>

                  <SignUpButton>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                      Бүртгүүлэх
                    </button>
                  </SignUpButton>
                </>
              )}

              {/* PROFILE */}
              {isSignedIn && (
                <>
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Миний хичээлүүд"
                        labelIcon={<span>📚</span>}
                        href="/freelancer/profile"
                      />
                    </UserButton.MenuItems>
                  </UserButton>

                  <BecomeFreelancerButton />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-white border-b">
        <Filter />
      </div>
    </>
  );
};
