"use client";
import { useEffect, useRef, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import ChatMessage from "./ChatMessage";
import { ChatInfos, Message } from "~/types";
import { sendMessage } from "~/actions/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";

const schema = z.object({
  message: z.string().min(1),
});

export default function Chat({ infos }: { infos: ChatInfos }) {
  const [messages, setMessages] = useState<Message[]>([...infos.data]);
  const ref = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: sendMessage,
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente",
        variant: "destructive",
      });
    },
  });

  function scrollToBottom() {
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 1);
  }

  async function onSubmit(values: z.infer<typeof schema>) {
    reset({ message: "" });

    setMessages((prev) => [
      ...prev,
      {
        user: "customer",
        message: values.message,
        id: `customer-${new Date().toISOString()}`,
      },
    ]);

    scrollToBottom();

    const { answer, message_id } = await mutateAsync({
      message: values.message,
    });

    if (answer) {
      setMessages((prev) => [
        ...prev,
        { user: "bot", message: answer, id: `bot-${message_id}` },
      ]);
    }
    scrollToBottom();
  }

  useEffect(() => {
    scrollToBottom();
  }, [ref]);

  return (
    <div className="mx-auto flex h-[80vh] flex-col rounded-xl bg-background shadow-lg md:max-w-2xl">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src="/luigi-logo.jpg" alt="Image" />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <div className="font-medium">Luigi</div>
        </div>
      </div>
      <div ref={ref} className="relative flex-1 space-y-4 overflow-auto p-4">
        <ChatMessage
          src="/luigi-logo.jpg"
          avatarFallback="LG"
          userName="Luigi"
          className="flex-row-reverse"
          messageClassName="bg-luigi-green text-primary-foreground"
        >
          <p>
            Olá! Eu sou a inteligência artificial atendente da pizzaria do
            Luigi. Comigo você pode fazer pedidos ou consultá-los. Como eu posso
            te ajudar?
          </p>
        </ChatMessage>
        {messages.map(({ user, message, id }) => (
          <ChatMessage
            key={id}
            src={user == "bot" ? "/luigi-logo.jpg" : "/user-placeholder.jpg"}
            avatarFallback={user == "customer" ? "YO" : "LG"}
            userName={user == "customer" ? "You" : "Luigi"}
            className={user == "bot" ? "flex-row-reverse" : ""}
            messageClassName={
              user == "bot" ? "bg-luigi-green text-primary-foreground" : ""
            }
          >
            <p>{message}</p>
          </ChatMessage>
        ))}
        {isPending && (
          <ChatMessage
            src="/luigi-logo.jpg"
            avatarFallback="LG"
            userName=""
            className="flex-row-reverse"
            messageClassName="bg-gray-200 text-primary-foreground flex justify-center items-center p-0 h-16 pt-2 w-20"
          >
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 animate-[pulse_1s_ease-in-out_0s_infinite] rounded-full bg-primary" />
              <div className="h-3 w-3 animate-[pulse_1s_ease-in-out_0.2s_infinite] rounded-full bg-primary" />
              <div className="h-3 w-3 animate-[pulse_1s_ease-in-out_0.4s_infinite] rounded-full bg-primary" />
            </div>
          </ChatMessage>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="border-t p-4">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            id="message"
            {...register("message")}
            rows={1}
            className="min-h-[48px] resize-none rounded-2xl border border-neutral-400 p-4 pr-16 shadow-sm"
          />
          <Button
            disabled={isPending}
            type="submit"
            size="icon"
            className={cn(
              "absolute right-3 top-3 h-8 w-8 bg-luigi-red hover:bg-luigi-red/90",
              {
                "bg-luigi-red/50": isPending,
              },
            )}
          >
            {isPending ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
