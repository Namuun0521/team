"use client";

import { useState } from "react";
import { StepContext, Data } from "@/lib/type";

const initialData: Data = {
  name: "",
  email: "",
  phone: "",
  ProfileImage: undefined,
  bio: "",
  skills: [],
};

export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>(initialData);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <StepContext.Provider
      value={{
        step,
        handleNext,
        handleBack,
        data,
        setData,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
