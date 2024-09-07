import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

type IconProps = {
  className: string;
};

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <nav className="bg-background hidden w-full flex-row gap-2 border-r p-4 md:flex md:w-64 md:flex-col">
        <Link
          href="#"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 transition-colors"
          prefetch={false}
        >
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          href="#"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 transition-colors"
          prefetch={false}
        >
          <MessageCircleIcon className="h-5 w-5" />
          <span>General Chat</span>
        </Link>
        <Link
          href="#"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 transition-colors"
          prefetch={false}
        >
          <BriefcaseIcon className="h-5 w-5" />
          <span>Business</span>
        </Link>
        <Link
          href="#"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 transition-colors"
          prefetch={false}
        >
          <BookIcon className="h-5 w-5" />
          <span>Education</span>
        </Link>
        <Link
          href="#"
          className="hover:bg-muted flex items-center gap-2 rounded-md px-3 py-2 transition-colors"
          prefetch={false}
        >
          <CodeIcon className="h-5 w-5" />
          <span>Tech</span>
        </Link>
      </nav>
      <div className="bg-muted/40 flex-1 p-4">
        <div className="bg-background mx-auto flex h-[80vh] flex-col rounded-xl shadow-lg md:max-w-2xl">
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
              <div className="font-medium">ChatGPT</div>
            </div>
            <Button variant="ghost" size="icon">
              <MoveVerticalIcon className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 space-y-4 overflow-auto p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
              <div className="bg-muted max-w-[80%] rounded-lg p-4">
                <div className="font-medium">You</div>
                <div className="text-sm">Hello, how can I help you today?</div>
              </div>
            </div>
            <div className="flex items-start justify-end gap-4">
              <div className="bg-primary text-primary-foreground max-w-[80%] rounded-lg p-4">
                <div className="font-medium">ChatGPT</div>
                <div className="text-sm">
                  Hi there! I'm an AI assistant created by Anthropic. I'd be
                  happy to help you with any questions or tasks you might have.
                  What would you like assistance with?
                </div>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start gap-4">
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
              <div className="bg-muted max-w-[80%] rounded-lg p-4">
                <div className="font-medium">You</div>
                <div className="text-sm">
                  I'm interested in learning more about the latest advancements
                  in artificial intelligence. Can you tell me about some of the
                  exciting developments in the field?
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end gap-4">
              <div className="bg-primary text-primary-foreground max-w-[80%] rounded-lg p-4">
                <div className="font-medium">ChatGPT</div>
                <div className="text-sm">
                  Absolutely! There have been some incredible advancements in AI
                  in recent years. Some of the most exciting developments
                  include: - Advancements in natural language processing, which
                  allow AI systems to understand and generate human-like text
                  with increasing sophistication. This has enabled the creation
                  of powerful language models like myself that can engage in
                  open-ended dialogue. - Breakthroughs in computer vision, where
                  AI can now analyze and understand the contents of images and
                  videos with human-level accuracy. This has enabled all sorts
                  of applications like autonomous vehicles, medical image
                  analysis, and visual search. - Rapid progress in reinforcement
                  learning, where AI agents learn to master complex tasks by
                  trial-and-error, like playing chess or Go at superhuman
                  levels. - The rise of generative AI models that can create
                  original content like images, music, and even computer code.
                  Tools like DALL-E and ChatGPT have captured the public's
                  imagination with their ability to generate human-like outputs.
                  - Advancements in AI safety and robustness, as researchers
                  work to ensure these powerful systems are aligned with human
                  values and behave in reliable and predictable ways. There's so
                  much more I could say, but those are some of the key frontiers
                  in AI that I find most exciting. Let me know if you have any
                  other questions!
                </div>
              </div>
              <Avatar className="h-8 w-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Image" />
                <AvatarFallback>OA</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="border-t p-4">
            <div className="relative">
              <Textarea
                placeholder="Type your message..."
                name="message"
                id="message"
                rows={1}
                className="min-h-[48px] resize-none rounded-2xl border border-neutral-400 p-4 pr-16 shadow-sm"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-3 top-3 h-8 w-8"
              >
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function CodeIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function HomeIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MessageCircleIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MoveVerticalIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  );
}

function SendIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
