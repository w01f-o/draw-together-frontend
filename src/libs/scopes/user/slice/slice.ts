import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as uuid from "uuid";

export interface State {
  name: string;
  id: string;
}

const initialState: State = {
  name: "Guest",
  id: uuid.v4(),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName: setNameAction } = userSlice.actions;

export default userSlice.reducer;
