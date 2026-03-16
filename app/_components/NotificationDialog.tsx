"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, BellRing, Check, Inbox, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type NotificationItem = {
  id: string;
  isRead: boolean;
  booking: {
    id: string;
    startAt: string;
    status: string;
    course: {
      id: string;
      title: string;
    };
    user: {
      id: string;
      name: string | null;
      email: string | null;
    };
  };
};

function formatDateTime(date: string) {
  const d = new Date(date);

  return (
    d.toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) +
    " " +
    d.toLocaleTimeString("mn-MN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

export const NotificationDialog = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/notifications", {
        cache: "no-store",
      });

      const text = await res.text();

      if (!res.ok) {
        console.error("Notification API error:", text);
        setNotifications([]);
        return;
      }

      const data = JSON.parse(text);
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Notification fetch error:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleAccept = async (notificationId: string) => {
    try {
      setProcessingId(notificationId);

      const res = await fetch(`/api/notifications/${notificationId}/accept`, {
        method: "PATCH",
      });

      const text = await res.text();

      if (!res.ok) {
        console.error(text);
        throw new Error("accept failed");
      }

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId
            ? {
                ...n,
                isRead: true,
                booking: {
                  ...n.booking,
                  status: "ACCEPTED",
                },
              }
            : n,
        ),
      );
    } catch (error) {
      console.error(error);
      alert("Зөвшөөрөхөд алдаа гарлаа");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (notificationId: string) => {
    try {
      setProcessingId(notificationId);

      const res = await fetch(`/api/notifications/${notificationId}/reject`, {
        method: "DELETE",
      });

      const text = await res.text();

      if (!res.ok) {
        console.error(text);
        throw new Error("reject failed");
      }

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error(error);
      alert("Татгалзахад алдаа гарлаа");
    } finally {
      setProcessingId(null);
    }
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

      <DialogContent className="sm:max-w-[620px]">
        <DialogHeader>
          <DialogTitle>Захиалгын мэдэгдэл</DialogTitle>
        </DialogHeader>

        <div className="h-[420px] overflow-y-auto pr-2">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                <Inbox className="h-7 w-7 text-gray-400" />
              </div>
              <p className="text-base font-semibold text-gray-800">
                Танд одоогоор хүсэлт алга байна
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Шинэ захиалга ирэх үед энд харагдана.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((item) => {
                const studentName =
                  item.booking.user.name ||
                  item.booking.user.email ||
                  "Хэрэглэгч";

                return (
                  <div key={item.id} className="rounded-xl border p-4">
                    <p className="text-sm text-gray-500">Шинэ захиалга</p>

                    <p className="font-semibold">
                      {studentName} таны хичээлийг захиалах хүсэлт илгээсэн
                    </p>

                    <p className="text-sm text-gray-600">
                      {item.booking.course.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      {formatDateTime(item.booking.startAt)}
                    </p>

                    {item.booking.status === "PENDING" && (
                      <div className="mt-3 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(item.id)}
                          disabled={processingId === item.id}
                          className="bg-blue-600 text-white"
                        >
                          <Check className="mr-1 h-4 w-4" />
                          Зөвшөөрөх
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(item.id)}
                          disabled={processingId === item.id}
                        >
                          <X className="mr-1 h-4 w-4" />
                          Татгалзах
                        </Button>
                      </div>
                    )}

                    {item.booking.status === "ACCEPTED" && (
                      <div className="mt-3">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Төлбөр хүлээгдэж байна
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
