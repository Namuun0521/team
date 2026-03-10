"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import BecomeFreelancerButton from "./BecomeFreelancerButton";
import { Filter } from "./Filter";

export const MobileSidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { isSignedIn } = useUser();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
      <div className="h-full w-[280px] overflow-y-auto bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          <Link href="/" onClick={() => setOpen(false)}>
            Нүүр
          </Link>
          <Link href="/categories" onClick={() => setOpen(false)}>
            Ангилал
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            Бидний тухай
          </Link>

          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="rounded-lg bg-gray-100 px-4 py-2">
                  Нэвтрэх
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                  Бүртгүүлэх
                </button>
              </SignUpButton>
            </>
          )}

          {isSignedIn && (
            <>
              <UserButton />
              <BecomeFreelancerButton />
            </>
          )}

          <div className="border-t pt-4">
            <p className="mb-3 text-sm font-semibold text-gray-900">
              Ангиллууд
            </p>
            <Filter vertical onSelect={() => setOpen(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};
