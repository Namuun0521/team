"use client";

import Link from "next/link";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

import { Filter } from "./Filter";
import BecomeFreelancerButton from "./BecomeFreelancerButton";
import { MobileSidebar } from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { NotificationDialog } from "./NotificationDialog";
import SearchPage from "../search/page";

type HeaderProps = {
  cartCount: number;
};

import SearchPage from "../search/page";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
type HeaderProps = {
  cartCount: number;
};

export const Header = ({ cartCount }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const isFreelancer = user?.publicMetadata?.role === "FREELANCER";

  return (
    <>
      <MobileSidebar open={open} setOpen={setOpen} />

      <div className="w-full border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-6">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center gap-2 text-lg font-semibold text-blue-600 sm:text-xl">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                ★
              </div>
              <span>Freelancer.mn</span>
            </div>

            <SearchPage />

            <div className="hidden items-center gap-4 lg:flex">
              <Button
                variant="link"
                onClick={() => router.push("/")}
                className="transition duration-200 hover:scale-105 hover:text-blue-600"
              >
                Нүүр
              </Button>

              <Button
                variant="link"
                onClick={() => router.push("/about")}
                className="transition duration-200 hover:scale-105 hover:text-blue-600"
              >
                Бидний тухай
              </Button>
              <Link href="/shopping-cart" className="relative inline-block">
                <ShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {isSignedIn && isFreelancer && <NotificationDialog />}

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

      <div className="hidden border-b bg-white lg:block">
        <Filter />
      </div>
    </>
  );
};
