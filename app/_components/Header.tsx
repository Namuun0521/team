// "use client";

// import { Menu } from "lucide-react";
// import { useState } from "react";
// import { Filter } from "./Filter";
// import {
//   Show,
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   useUser,
// } from "@clerk/nextjs";
// import BecomeFreelancerButton from "./BecomeFreelancerButton";
// import { MobileSidebar } from "./MobileSidebar";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// import SearchPage from "../search/page";

// import Link from "next/link";
// import { ShoppingCart } from "lucide-react";
// type HeaderProps = {
//   cartCount: number;
// };

// export const Header = ({ cartCount }: HeaderProps) => {
//   const [open, setOpen] = useState(false);
//   const { isSignedIn } = useUser();
//   const router = useRouter();
//   return (
//     <>
//       <MobileSidebar open={open} setOpen={setOpen} />

//       <div className="w-full border-b bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
//           <div className="flex items-center gap-8">
//             <button className="lg:hidden" onClick={() => setOpen(true)}>
//               <Menu className="h-6 w-6" />
//             </button>

//             <div className="flex items-center gap-2 text-lg font-semibold text-blue-600 sm:text-xl">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
//                 ★
//               </div>
//               <span>Freelancer.mn</span>
//             </div>

//             {/* <div className="relative hidden lg:block lg:w-[360px] xl:w-[400px]">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Хайх..."
//                 className="w-full rounded-lg bg-gray-100 py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div> */}
//             <SearchPage />
//             <div className="hidden items-center gap-4 lg:flex">
//               <Button
//                 variant="link"
//                 onClick={() => router.push("/")}
//                 className="transition duration-200 hover:scale-105 hover:text-blue-600"
//               >
//                 Нүүр
//               </Button>

//               <Button
//                 variant="link"
//                 onClick={() => router.push("/about")}
//                 className="transition duration-200 hover:scale-105 hover:text-blue-600"
//               >
//                 Бидний тухай
//               </Button>
//               <Link href="/shopping-cart" className="relative inline-block">
//                 <ShoppingCart />
//                 {cartCount > 0 && (
//                   <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </span>
//                 )}
//               </Link>

//               {!isSignedIn && (
//                 <>
//                   <SignInButton>
//                     <button className="rounded-lg bg-gray-100 px-4 py-2">
//                       Нэвтрэх
//                     </button>
//                   </SignInButton>

//                   <SignUpButton>
//                     <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
//                       Бүртгүүлэх
//                     </button>
//                   </SignUpButton>
//                 </>
//               )}

//               {isSignedIn && (
//                 <>
//                   <UserButton />
//                   <BecomeFreelancerButton />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="hidden lg:block">
//           <Filter />
//         </div>
//       </div>
//     </>
//   );
// };

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
    } catch {
      // silent fail
    }
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
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {isFreelancer && (
                <button
                  onClick={() => router.push("/notifications")}
                  className="relative inline-block"
                  aria-label="Notifications"
                >
                  <Bell className="h-6 w-6 text-gray-700 transition hover:text-blue-600" />
                  {notificationCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-semibold text-white">
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

              {isSignedIn && (
                <>
                  <UserButton>
                    {isFreelancer && (
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
                          label="Миний хичээлүүд"
                          href="/my-courses"
                          labelIcon={<BookOpen className="h-4 w-4" />}
                        />
                      </UserButton.MenuItems>
                    )}
                  </UserButton>

                  <BecomeFreelancerButton />
                </>
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
