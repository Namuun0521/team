"use client";

import { Menu, Bell, ShoppingCart, User, BookOpen, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Filter } from "./Filter";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import BecomeFreelancerButton from "./BecomeFreelancerButton";
import { MobileSidebar } from "./MobileSidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SearchPage from "../search/page";
import Link from "next/link";
import ChatDropdown from "../(client)/chat/page";

type HeaderProps = {
  cartCount: number;
};

export const Header = ({ cartCount }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const fetchNotificationCount = async () => {
    try {
      const res = await fetch("/api/notifications/count");
      if (!res.ok) return;
      const data = await res.json();
      setNotificationCount(data.count || 0);
    } catch {}
  };

  useEffect(() => {
    if (!isSignedIn) {
      setIsFreelancer(false);
      setNotificationCount(0);
      return;
    }

    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        const freelancer = data?.role === "FREELANCER";
        setIsFreelancer(freelancer);
        if (freelancer) fetchNotificationCount();
      })
      .catch(() => setIsFreelancer(false));
  }, [isSignedIn]);

  useEffect(() => {
    if (!isFreelancer) return;
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, [isFreelancer]);

  return (
    <>
      <MobileSidebar open={open} setOpen={setOpen} />

      <div className="w-full border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
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
                <ShoppingCart className="h-6 w-6 text-gray-700 transition hover:text-blue-600" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              <ChatDropdown />

              {isFreelancer && (
                <button
                  onClick={() => router.push("/notifications")}
                  className="relative inline-block"
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6 text-gray-700 transition hover:text-blue-600" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </span>
                  )}
                </button>
              )}

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

              {isSignedIn && !isFreelancer && (
                <>
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Миний захиалгууд"
                        href="/my-bookings"
                        labelIcon={<BookOpen className="h-4 w-4" />}
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                  <BecomeFreelancerButton />
                </>
              )}

              {isSignedIn && isFreelancer && (
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Link
                      label="Миний захиалгууд"
                      href="/my-bookings"
                      labelIcon={<BookOpen className="h-4 w-4" />}
                    />
                    <UserButton.Link
                      label="Profile үзэх"
                      href="/freelancer/profile"
                      labelIcon={<User className="h-4 w-4" />}
                    />
                    <UserButton.Link
                      label="Миний ажилууд"
                      href="/my-courses"
                      labelIcon={<BookOpen className="h-4 w-4" />}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <Filter />
        </div>
      </div>
    </>
  );
};
