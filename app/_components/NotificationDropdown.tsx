"use client";

import { useEffect, useState } from "react";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: string;
  bookingId?: string | null;
  isRead: boolean;
  createdAt: string;
};

export function NotificationDropdown() {
  const [items, setItems] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchNotifications = async () => {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setItems(data);
    };

    fetchNotifications();
  }, [open]);

  return (
    <div className="relative">
      <button onClick={() => setOpen((prev) => !prev)}>Notify</button>

      {open && (
        <div className="absolute right-0 mt-2 w-[360px] rounded-xl border bg-white p-4 shadow-lg">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Мэдэгдэл алга</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="rounded-lg border p-3">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-600">{item.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
