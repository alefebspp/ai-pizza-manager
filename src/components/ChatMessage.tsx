import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { PropsWithChildren } from "react";
import { cn } from "~/lib/utils";

type Props = {
  userName: string;
  src: string;
  avatarFallback: string;
  className?: string;
  messageClassName?: string;
} & PropsWithChildren;

export default function ChatMessage({
  userName,
  src,
  avatarFallback,
  className,
  messageClassName,
  children,
}: Props) {
  return (
    <div className={cn("flex items-start gap-4", className)}>
      <Avatar className="h-8 w-8">
        <AvatarImage className="rounded-full" src={src} alt="Image" />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn("max-w-[80%] rounded-lg bg-muted p-4", messageClassName)}
      >
        <div className="font-medium">{userName}</div>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
