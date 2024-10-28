import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Room } from "@/libs/types/Room.type";

export interface State {
  rooms: Room[];
}

const initialState: State = {
  rooms: [],
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    createRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.push(action.payload);
    },
    deleteRoom: (state, action: PayloadAction<Room>) => {
      state.rooms.filter((room) => room.id !== action.payload.id);
    },
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
  },
});

export const {
  deleteRoom: deleteRoomAction,
  createRoom: createRoomAction,
  setRooms: setRoomsAction,
} = roomsSlice.actions;

export default roomsSlice.reducer;
