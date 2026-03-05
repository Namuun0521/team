"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Title } from "./Title";
import { Container } from "./Container";

export const HomePage = () => {
  return (
    <div className="w-full h-full py-8 flex bg-blue-50 justify-center items-center">
      <Card className="w-200 h-fit px-6">
        <CardTitle className="flex">
          <Title />
        </CardTitle>
        <CardContent>
          <Container />
        </CardContent>
      </Card>
    </div>
  );
};
