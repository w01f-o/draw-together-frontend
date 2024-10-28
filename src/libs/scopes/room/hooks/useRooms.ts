import { Room } from "@/libs/types/Room.type";
import { useAppDispatch, useAppSelector } from "@/libs/hooks/redux";
import {
  createRoomAction,
  deleteRoomAction,
  setRoomsAction,
} from "@/libs/scopes/room/slice/slice";

export type useRoomsReturn = {
  rooms: Room[];
  create: (room: Room) => void;
  __delete: (id: Room) => void;
  set: (rooms: Room[]) => void;
};

export const useRooms = (): useRoomsReturn => {
  const dispatch = useAppDispatch();
  const { rooms } = useAppSelector((state) => state.rooms);

  const create = (room: Room) => dispatch(createRoomAction(room));

  const __delete = (room: Room) => dispatch(deleteRoomAction(room));

  const set = (rooms: Room[]) => dispatch(setRoomsAction(rooms));

  return {
    rooms,
    create,
    __delete,
    set,
  };
};
