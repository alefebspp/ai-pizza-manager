import { Metadata } from "next";
import { getChatInfos } from "~/actions/chat";
import Chat from "~/components/Chat";

export const metadata: Metadata = {
  title: "Home | Luigi's Pizzaria",
  description: "...",
};

export default async function HomePage() {
  const infos = await getChatInfos();

  return <Chat infos={infos} />;
}
