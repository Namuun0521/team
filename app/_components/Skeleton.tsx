"use client";

import React from "react";

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export const SkeletonBox = ({ className }: { className?: string }) => {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200/80", className)} />
  );
};
