"use client";

import { createContext, Dispatch, SetStateAction } from "react";

export type Data = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  ProfileImage: File | undefined;
};
export type StepContextType = {
  step: number;
  handleNext: () => void;
  handleBack: () => void;
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType,
);
