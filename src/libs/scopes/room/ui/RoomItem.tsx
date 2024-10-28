import { FC, memo } from "react";
import { Room } from "@/libs/types/Room.type";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { RoutePaths } from "@/libs/enums/RoutePaths.enum";
import { Card, CardBody } from "@nextui-org/card";

interface RoomItemProps {
  room: Room;
}

const RoomItem: FC<RoomItemProps> = ({ room }) => {
  return (
    <Link href={`${RoutePaths.ROOM}/${room.id}`}>
      <Card className="px-4 py-3" isHoverable>
        <CardBody className="gap-4">
          <div className="text-xl">{room.name}</div>
          <div className="flex gap-3 flex-grow">
            {room.users.map((user) => (
              <Avatar key={user.id} name={user.name} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};

export default memo(RoomItem);
