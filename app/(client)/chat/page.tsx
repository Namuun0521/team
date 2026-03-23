"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareDot, ChevronRight, MessagesSquare } from "lucide-react";

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
};

export default function ChatDropdown() {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const load = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/chat/list");
      const data = await res.json();

      setChats(data.chats || []);
      setCount(data.count || 0);
    } catch (error) {
      console.error("Chat list load error:", error);
      setChats([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white transition hover:bg-blue-50"
      >
        <MessageSquareDot
          size={22}
          className="text-slate-700 transition hover:text-blue-700"
        />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-3 w-88 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.14)]">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50">
                <MessagesSquare className="h-5 w-5 text-[#135BEC]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">Чатууд</h3>
                <p className="text-xs text-slate-500">Таны сүүлийн ярианууд</p>
              </div>
            </div>

            {count > 0 && (
              <div className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-[#135BEC]">
                {count}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex h-40 items-center justify-center text-sm text-slate-500">
              Ачааллаж байна...
            </div>
          ) : chats.length === 0 ? (
            <div className="flex h-40 flex-col items-center justify-center px-6 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <MessageSquareDot className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">
                Чат байхгүй байна
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Энд таны эхлүүлсэн чатууд харагдана
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto p-2">
              {chats.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    router.push(`/chat/${c.id}`);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {c.name || "Чат"}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {c.lastMessage || "Шинэ чат"}
                    </p>
                  </div>

                  <ChevronRight className="ml-3 h-4 w-4 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
