import { FC } from "react";
import { Metadata } from "next";
import RoomPage from "@/libs/scopes/room/ui/RoomPage";
import { RoomsApi } from "@/libs/scopes/room/data-access/Rooms.api";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const room = await RoomsApi.findById(id);

  return {
    title: `Draw together! - ${room.name}`,
  };
}

const Page: FC<PageProps> = async ({ params }) => {
  const { id } = await params;
  const room = await RoomsApi.findById(id);

  return <RoomPage currentRoom={room} />;
};

export default Page;
