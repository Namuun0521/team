"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SendHorizonal } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const id = params?.id as string;

  const { user, isLoaded } = useUser();

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/chat/${id}`);

        if (!res.ok) return;

        const data = await res.json();
        setMessages(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const send = async () => {
    if (!text.trim() || !id) return;

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: id,
          text,
        }),
      });

      if (!res.ok) return;

      const newMsg = await res.json();

      setMessages((prev) => [...prev, newMsg]);
      setText("");
    } catch (e) {
      console.error(e);
    }
  };

  if (!isLoaded || loading) {
    return <div className="p-10 text-center">Ачааллаж байна...</div>;
  }

  if (!id) {
    return <div className="p-10 text-center">Chat олдсонгүй</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-xl h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={m.id || i}
            className={m.senderId === user?.id ? "text-right" : "text-left"}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                m.senderId === user?.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-5 bg-gray-100 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={send}
          className="bg-blue-500 text-white px-4 rounded-lg cursor-pointer flex items-center gap-1"
        >
          Илгээх <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}
