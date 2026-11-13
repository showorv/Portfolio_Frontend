"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMessage, setMessageRead } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IMessage } from "@/types/messageTypes";
import { ConfirmDialog, EmptyState, PageHeader, Panel } from "./ui";
import { formatDate } from "@/lib/format";

export default function MessageList({ messages: initial }: { messages: IMessage[] }) {
  const router = useRouter();
  const [messages, setMessages] = useState(initial);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<IMessage | null>(null);

  const unread = messages.filter((m) => !m.isRead).length;
  const visible = filter === "unread" ? messages.filter((m) => !m.isRead) : messages;

  const markRead = async (message: IMessage, isRead: boolean) => {
    if (!message._id || Boolean(message.isRead) === isRead) return;
    setMessages((prev) => prev.map((m) => (m._id === message._id ? { ...m, isRead } : m)));
    const res = await setMessageRead(message._id, isRead);
    if (!res.success) {
      setMessages((prev) => prev.map((m) => (m._id === message._id ? { ...m, isRead: !isRead } : m)));
      toast.error(res.message || "Could not update the message");
    } else {
      router.refresh(); // keeps the sidebar badge in step
    }
  };

  const toggle = (message: IMessage) => {
    const opening = openId !== message._id;
    setOpenId(opening ? message._id ?? null : null);
    if (opening) markRead(message, true);
  };

  const remove = async () => {
    if (!toDelete?._id) return;
    const res = await deleteMessage(toDelete._id);
    if (!res.success) {
      toast.error(res.message || "Delete failed");
    } else {
      setMessages((prev) => prev.filter((m) => m._id !== toDelete._id));
      toast.success("Message deleted");
      router.refresh();
    }
    setToDelete(null);
  };

  return (
    <>
      <PageHeader title="Messages" description={`${messages.length} message${messages.length === 1 ? "" : "s"}, ${unread} unread`}>
        <div className="inline-flex rounded-lg border border-border bg-card p-1">
          {(["all", "unread"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                filter === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {key}
              {key === "unread" && unread > 0 ? ` (${unread})` : ""}
            </button>
          ))}
        </div>
      </PageHeader>

      {visible.length === 0 ? (
        <EmptyState
          icon={Mail}
          title={filter === "unread" ? "You're all caught up" : "No messages yet"}
          description={filter === "unread" ? "No unread messages." : "Messages from your contact form will show up here."}
        />
      ) : (
        <Panel className="divide-y divide-border overflow-hidden">
          {visible.map((message) => {
            const open = openId === message._id;
            return (
              <div key={message._id} className={cn(!message.isRead && "bg-primary/5")}>
                <button
                  onClick={() => toggle(message)}
                  aria-expanded={open}
                  className="flex w-full cursor-pointer items-start gap-3 p-4 text-left"
                >
                  <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", message.isRead ? "bg-transparent" : "bg-primary")} />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <span className={cn("truncate text-sm", message.isRead ? "font-medium" : "font-semibold")}>
                        {message.name || message.email}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</span>
                    </span>
                    {message.subject && <span className="block truncate text-sm">{message.subject}</span>}
                    {!open && <span className="block truncate text-sm text-muted-foreground">{message.description}</span>}
                  </span>
                  <ChevronDown className={cn("mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
                </button>

                {open && (
                  <div className="space-y-4 px-4 pb-4 pl-9">
                    <a href={`mailto:${message.email}`} className="break-all text-sm text-primary hover:underline">
                      {message.email}
                    </a>
                    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" asChild>
                        <a href={`mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || "your message"}`)}`}>
                          <Reply /> Reply
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => markRead(message, !message.isRead)}>
                        {message.isRead ? <Mail /> : <MailOpen />}
                        Mark as {message.isRead ? "unread" : "read"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setToDelete(message)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 /> Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </Panel>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        title="Delete this message?"
        description={`The message from ${toDelete?.name || toDelete?.email} will be removed permanently.`}
        onConfirm={remove}
      />
    </>
  );
}
