import { UnsentCard } from "@/components/unsent/UnsentCard";
import { type demoUnsentMessages } from "@/lib/demoContent";

type UnsentFeedProps = {
  messages: typeof demoUnsentMessages;
};

export function UnsentFeed({ messages }: UnsentFeedProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {messages.map((message) => (
        <UnsentCard key={message.id} message={message} />
      ))}
    </div>
  );
}
