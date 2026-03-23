"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SendHorizonal, Loader2, MessageCircle, UserRound } from "lucide-react";

type Message = {
  id?: string;
  text: string;
  senderId: string;
  createdAt?: string;
};

function formatTime(value?: string) {
  if (!value) return "";
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("mn-MN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatPage() {
  const params = useParams();
  const id = params?.id as string;

  const { user, isLoaded } = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const res = await fetch(`/api/chat/${id}`);

        if (!res.ok) return;

        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim() || !id || sending) return;

    try {
      setSending(true);

      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: id,
          text: text.trim(),
        }),
      });

      if (!res.ok) return;

      const newMsg = await res.json();

      setMessages((prev) => [...prev, newMsg]);
      setText("");
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const title = useMemo(() => {
    return "Чат";
  }, []);

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="flex flex-col items-center gap-3 rounded-3xl bg-white px-8 py-10 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <Loader2 className="h-8 w-8 animate-spin text-[#135BEC]" />
          <p className="text-sm text-slate-500">Чат ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-3xl bg-white px-8 py-10 text-center shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <p className="text-lg font-semibold text-slate-800">Chat олдсонгүй</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto flex h-[calc(100vh-3rem)] max-w-4xl flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
              <MessageCircle className="h-5 w-5 text-[#135BEC]" />
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-900">{title}</h1>
              <p className="text-sm text-slate-500">Харилцан яриа</p>
            </div>
          </div>

          <div className="hidden rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 sm:block">
            {messages.length} зурвас
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-slate-50/70 px-4 py-5 md:px-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <UserRound className="h-7 w-7 text-slate-400" />
              </div>
              <p className="text-base font-semibold text-slate-700">
                Одоогоор зурвас алга
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Эхний мессежээ илгээгээрэй
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => {
                const isMine = m.senderId === user?.id;

                return (
                  <div
                    key={m.id || i}
                    className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] sm:max-w-[70%] ${
                        isMine ? "items-end" : "items-start"
                      } flex flex-col`}
                    >
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                          isMine
                            ? "rounded-br-md bg-[#135BEC] text-white"
                            : "rounded-bl-md bg-white text-slate-700"
                        }`}
                      >
                        {m.text}
                      </div>

                      <span className="mt-1 px-1 text-[11px] text-slate-400">
                        {formatTime(m.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 bg-white p-4 md:p-5">
          <div className="flex items-end gap-3">
            <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-blue-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Мессеж бичих..."
                className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
              />
            </div>

            <button
              onClick={send}
              disabled={!text.trim() || sending}
              className="flex h-12 items-center gap-2 rounded-2xl bg-[#135BEC] px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizonal size={18} />
              )}
              Илгээх
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
