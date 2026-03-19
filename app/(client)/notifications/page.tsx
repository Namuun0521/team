"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle2,
  XCircle,
  Loader2,
  Calendar,
  Clock,
} from "lucide-react";

type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  booking: {
    id: string;
    startAt: string;
    endAt: string;
    status: string;
    isApproved: boolean;
    course: {
      title: string;
      price: number;
    };
    user: {
      name: string | null;
      email: string;
    };
  };
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    bookingId: string,
    action: "approve" | "reject",
  ) => {
    try {
      setActionLoading(bookingId);

      const res = await fetch(`/api/bookings/${bookingId}/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (!res.ok) throw new Error("Action failed");

      // Refresh notifications
      await fetchNotifications();

      alert(
        action === "approve"
          ? "Захиалга зөвшөөрөгдлөө!"
          : "Захиалга татгалзагдлаа",
      );
    } catch (error) {
      console.error("Action error:", error);
      alert("Алдаа гарлаа");
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("mn-MN", {
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fb]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] py-10">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
            <Bell className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">Мэдэгдэл</h1>
            <p className="text-sm text-[#64748B]">
              Танд ирсэн захиалгын хүсэлтүүд
            </p>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <Card className="rounded-2xl border-[#E5E7EB] bg-white shadow-sm">
            <CardContent className="py-16 text-center">
              <Bell className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900">
                Мэдэгдэл байхгүй байна
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Шинэ захиалга ирэхэд энд харагдана
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => {
              const isPending = notif.booking.status === "PENDING";
              const isApproved = notif.booking.isApproved;
              const isConfirmed = notif.booking.status === "CONFIRMED";
              const isCancelled = notif.booking.status === "CANCELLED";

              return (
                <Card
                  key={notif.id}
                  className={`rounded-2xl border shadow-sm transition hover:shadow-md ${
                    !notif.isRead
                      ? "border-blue-200 bg-blue-50/50"
                      : "border-[#E5E7EB] bg-white"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left side - Info */}
                      <div className="flex-1">
                        <div className="mb-3 flex items-center gap-2">
                          <h3 className="text-lg font-bold text-[#0F172A]">
                            {notif.booking.course.title}
                          </h3>
                          {!notif.isRead && (
                            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                              Шинэ
                            </span>
                          )}
                        </div>

                        <p className="mb-4 text-sm text-[#64748B]">
                          {notif.message}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-[#475569]">
                            <Calendar className="h-4 w-4 text-[#94A3B8]" />
                            <span className="font-medium">
                              {formatDate(notif.booking.startAt)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[#475569]">
                            <span className="font-semibold text-[#0F172A]">
                              Захиалагч:
                            </span>
                            <span>{notif.booking.user.name || "Нэргүй"}</span>
                            <span className="text-[#94A3B8]">
                              ({notif.booking.user.email})
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[#475569]">
                            <span className="font-semibold text-[#0F172A]">
                              Үнэ:
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              {notif.booking.course.price.toLocaleString()}₮
                            </span>
                          </div>
                        </div>

                        {/* Status badges */}
                        {isConfirmed && (
                          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                            Зөвшөөрөгдсөн
                          </div>
                        )}
                        {isCancelled && (
                          <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                            <XCircle className="h-4 w-4" />
                            Татгалзсан
                          </div>
                        )}
                      </div>

                      {/* Right side - Actions */}
                      {isPending && (
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() =>
                              handleAction(notif.booking.id, "approve")
                            }
                            disabled={actionLoading === notif.booking.id}
                            className="h-10 gap-2 rounded-xl bg-green-600 px-4 text-sm font-semibold text-white hover:bg-green-700"
                          >
                            {actionLoading === notif.booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                            Зөвшөөрөх
                          </Button>

                          <Button
                            onClick={() =>
                              handleAction(notif.booking.id, "reject")
                            }
                            disabled={actionLoading === notif.booking.id}
                            className="h-10 gap-2 rounded-xl bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
                          >
                            {actionLoading === notif.booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            Татгалзах
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
