// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function BecomeFreelancerButton({
//   onUpgraded,
// }: {
//   onUpgraded?: () => void;
// }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   async function onBecome() {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/role/become-freelancer", {
//         method: "POST",
//       });
//       const data = await res.json().catch(() => ({}));

//       if (!res.ok) {
//         alert(data?.error || "Алдаа гарлаа");
//         return;
//       }

//       alert(" Та одоо FREELANCER боллоо!");
//       onUpgraded?.();

//       router.push("/become-freelancer");
//       router.refresh();
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <button
//       onClick={onBecome}
//       disabled={loading}
//       className="h-10 px-4 rounded-full bg-blue-600 text-white disabled:opacity-50"
//     >
//       {loading ? "Шилжүүлж байна..." : "Business / Freelancer болох"}
//     </button>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function BecomeFreelancerButton({
  onUpgraded,
}: {
  onUpgraded?: () => void;
}) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      setChecking(false);
      return;
    }

    fetch("/api/me", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.role === "FREELANCER") {
          setIsFreelancer(true);
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, [isSignedIn]);

  // Don't render while checking role, or if already a freelancer
  if (checking || isFreelancer) return null;

  async function onBecome() {
    try {
      setLoading(true);

      const res = await fetch("/api/role/become-freelancer", {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.error || "Алдаа гарлаа");
        return;
      }

      alert("Та одоо FREELANCER боллоо!");
      setIsFreelancer(true); // hide the button immediately
      onUpgraded?.();

      router.push("/become-freelancer");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onBecome}
      disabled={loading}
      className="h-10 px-4 rounded-full bg-blue-600 text-white disabled:opacity-50"
    >
      {loading ? "Шилжүүлж байна..." : "Business / Freelancer болох"}
    </button>
  );
}
