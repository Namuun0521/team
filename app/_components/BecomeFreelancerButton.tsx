"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function BecomeFreelancerButton() {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setChecking(false);
      return;
    }

    fetch("/api/me")
      .then((res) => res.json())
      .then((data) => {
        if (data?.role === "FREELANCER") {
          setIsFreelancer(true);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [isSignedIn]);

  if (checking || isFreelancer) return null;

  return (
    <button
      onClick={() => router.push("/become-freelancer")}
      className="h-10 px-4 rounded-full bg-blue-600 text-white"
    >
      Freelancer болох
    </button>
  );
}
