"use client";

import { FC, useEffect, useState } from "react";
import RoomItem from "@/libs/scopes/room/ui/RoomItem";
import CreateRoom from "@/libs/scopes/room/feature/CreateRoom";
import { useRooms } from "@/libs/scopes/room/hooks/useRooms";
import { socket } from "@/libs/scopes/room/data-access/websocket";
import { Room } from "@/libs/types/Room.type";
import { SocketEvents } from "@/libs/enums/SocketEvents.enum";
import RoomPreloader from "@/libs/scopes/room/ui/RoomPreloader";

const RoomList: FC = () => {
  const { set, rooms } = useRooms();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    socket.emit(SocketEvents.GET_ROOMS);

    socket.on(SocketEvents.SET_ROOMS, (rooms: Room[]) => {
      set(rooms);

      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    });

    return () => {
      socket.off(SocketEvents.SET_ROOMS);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6 w-1/2">
      {!isLoading &&
        rooms.map((room) => <RoomItem room={room} key={room.id} />)}
      {isLoading &&
        Array.from({ length: 2 }, (_, i) => <RoomPreloader key={i} />)}
      <CreateRoom />
    </div>
  );
};

export default RoomList;
