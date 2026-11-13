import { getMessages } from "@/actions/admin";
import MessageList from "@/components/admin/MessageList";

export default async function MessagesPage() {
  const res = await getMessages();
  return <MessageList messages={res.data ?? []} />;
}
