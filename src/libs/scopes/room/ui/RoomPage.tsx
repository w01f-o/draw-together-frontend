"use client";

import { FC, useEffect, useMemo } from "react";
import Canvas from "@/libs/scopes/room/ui/Canvas";
import Container from "@/libs/shared/ui/Container";
import PageTitle from "@/libs/shared/ui/PageTitle";
import { socket } from "@/libs/scopes/room/data-access/websocket";
import { SocketEvents } from "@/libs/enums/SocketEvents.enum";
import { Room } from "@/libs/types/Room.type";
import { useRooms } from "@/libs/scopes/room/hooks/useRooms";
import { useUser } from "@/libs/scopes/user/hooks/useUser";
import { Avatar } from "@nextui-org/avatar";

interface RoomProps {
  currentRoom: Room;
}

const RoomPage: FC<RoomProps> = ({ currentRoom }) => {
  const {
    user: { id: userId, name: username },
  } = useUser();
  const { rooms: roomsGlobalState } = useRooms();

  const globalCurrentRoom = useMemo(() => {
    return roomsGlobalState.find((room) => room.id === currentRoom.id);
  }, [roomsGlobalState, currentRoom.id])!;

  useEffect(() => {
    if (globalCurrentRoom.users.every((user) => user.id !== userId)) {
      socket.emit(SocketEvents.JOIN_ROOM, {
        room: currentRoom,
        user: {
          name: username,
          id: userId,
        },
      });
    }
  }, [roomsGlobalState]);

  useEffect(() => {
    return () => {
      socket.emit(SocketEvents.LEAVE_ROOM, {
        room: currentRoom,
        user: {
          name: username,
          id: userId,
        },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { set } = useRooms();

  useEffect(() => {
    socket.on(SocketEvents.SET_ROOMS, (rooms: Room[]) => {
      set(rooms);
    });

    return () => {
      socket.off(SocketEvents.SET_ROOMS);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <PageTitle>Room - {currentRoom.name}</PageTitle>
      <Canvas room={currentRoom} />
      <div className="flex flex-col gap-4 fixed right-12 bottom-6">
        {globalCurrentRoom.users.map((user) => (
          <Avatar key={user.id} name={user.name} />
        ))}
      </div>
    </Container>
  );
};

export default RoomPage;
