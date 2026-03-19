"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareDot } from "lucide-react";

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
};

export default function ChatDropdown() {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [count, setCount] = useState(0);

  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  console.log(count);
  const load = async () => {
    const res = await fetch("/api/chat/list");
    const data = await res.json();

    setChats(data.chats || []);
    setCount(data.count || 0);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open]);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="relative">
        <MessageSquareDot
          size={22}
          className="cursor-pointer mt-2 hover:text-blue-700"
        />

        {count > 0 && (
          <span className="absolute -top-0.5 flex -right-2 bg-red-500 h-5 w-5 items-center justify-center text-white text-xs px-1.5 rounded-full">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow rounded-xl z-50">
          <div className="p-3 font-bold border-b">Чатууд</div>

          {chats.length === 0 && (
            <p className="p-4 text-center text-gray-500">Чат байхгүй</p>
          )}

          <div className="max-h-75 overflow-y-auto">
            {chats.map((c, i) => (
              <div
                key={c.id}
                onClick={() => {
                  router.push(`/chat/${c.id}`);
                  setOpen(false);
                }}
                className="p-3 border-b cursor-pointer hover:bg-gray-100"
              >
                <p className="font-semibold text-sm">{c.name}</p>
                <p className="text-xs text-gray-500 line-clamp-1">
                  {c.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
