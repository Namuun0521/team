"use client";

import { useMemo, useState } from "react";
import { Bell, BellRing, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NotificationItem = {
  id: number;
  studentName: string;
  courseTitle: string;
  requestedDate: string;
  requestedTime: string;
  status: "pending" | "accepted" | "rejected";
  isRead: boolean;
};

export const NotificationDialog = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      studentName: "Тэмүүлэн",
      courseTitle: "UX/UI дизайн хичээл",
      requestedDate: "2026-03-15",
      requestedTime: "15:00",
      status: "pending",
      isRead: false,
    },
    {
      id: 2,
      studentName: "Тэмүүлэн",
      courseTitle: "UX/UI дизайн хичээл",
      requestedDate: "2026-03-15",
      requestedTime: "15:00",
      status: "pending",
      isRead: false,
    },
  ]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const handleAccept = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "accepted", isRead: true } : n,
      ),
    );
  };

  const handleReject = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "rejected", isRead: true } : n,
      ),
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5 text-gray-500" />
          ) : (
            <Bell className="h-5 w-5 text-gray-500" />
          )}

          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Захиалгын мэдэгдэл</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {notifications.map((item) => (
            <div key={item.id} className="rounded-xl border p-4">
              <p className="text-sm text-gray-500">Шинэ захиалга</p>

              <p className="font-semibold">
                {item.studentName} таны хичээлийг захиалах хүсэлт илгээсэн
              </p>

              <p className="text-sm text-gray-600">{item.courseTitle}</p>

              <p className="text-sm text-gray-500">
                {item.requestedDate} {item.requestedTime}
              </p>

              {item.status === "pending" && (
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(item.id)}
                    className="bg-blue-600 text-white"
                  >
                    <Check className="mr-1 h-4 w-4 " />
                    Зөвшөөрөх
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReject(item.id)}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Татгалзах
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
