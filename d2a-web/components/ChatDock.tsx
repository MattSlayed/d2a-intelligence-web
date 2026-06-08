"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/types";
import Icon from "./Icon";

export default function ChatDock({
  open,
  onClose,
  messages,
  onSend,
  busy,
  accountName,
}: {
  open: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  busy: boolean;
  accountName?: string;
}) {
  const [text, setText] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [messages]);

  // Escape-to-close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = () => {
    const t = text.trim();
    if (!t || busy) return;
    onSend(t);
    setText("");
  };

  return (
    <div className={"scrim" + (open ? " open" : "")} onClick={onClose}>
      <div
        className="chat"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Analyst co-pilot"
        aria-modal="true"
      >
        <div className="chat-head">
          <div className="chat-av">D2A</div>
          <div className="chat-id">
            <strong>Analyst co-pilot</strong>
            <span>{accountName ? `focus · ${accountName}` : "ask about any account"}</span>
          </div>
          <button className="chat-x" onClick={onClose} aria-label="Close chat">
            <Icon name="close" />
          </button>
        </div>
        <div className="chat-body" ref={bodyRef}>
          {messages.length === 0 ? (
            <div className="chat-empty">
              Ask the analyst anything — &ldquo;Why is account X class A?&rdquo;, &ldquo;Draft a CFO
              opener for &hellip;&rdquo;, or &ldquo;Find recent triggers at &hellip;&rdquo;. Answers
              are grounded with live web search where current facts are needed.
            </div>
          ) : (
            messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              const showTyping = m.role === "assistant" && !m.content && busy && isLast;
              return (
                <div key={i} className={"msg-row " + m.role}>
                  <span className={"msg-avatar " + m.role}>
                    {m.role === "user" ? "LM" : "D2A"}
                  </span>
                  <div className={"msg " + m.role}>
                    {showTyping ? (
                      <span className="typing" aria-label="Analyst is typing">
                        <span />
                        <span />
                        <span />
                      </span>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="chat-input">
          <textarea
            rows={2}
            value={text}
            placeholder="Ask the analyst…"
            aria-label="Message the analyst"
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
          />
          <button className="btn-send" onClick={send} disabled={busy || !text.trim()} aria-label="Send message">
            {busy ? <span className="spinner" /> : <Icon name="send" />}
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
