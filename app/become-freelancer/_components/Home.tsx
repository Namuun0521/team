"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Title } from "./Title";
import { Container } from "./Container";

export const HomePage = () => {
  return (
    <div className="flex w-full min-h-screen">
      <div className="w-full min-h-screen py-8 flex  justify-center items-start">
        <Card className="w-200 py-6 h-fit">
          <CardTitle className="flex px-8">
            <Title />
          </CardTitle>
          <CardContent className="flex p-0 items-center justify-center">
            <Container />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
