import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { List } from "../types";

interface DragList {
  startIdx: number;
  endIdx: number;
}

interface DragCard {
  startListId: string;
  endListId: string;
  startIdx: number;
  endIdx: number;
}

const initialState: List[] = [];

const canvan = createSlice({
  name: "canvan",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<List[]>) => {
      state = action.payload;
      return state;
    },
    dragList: (state, action: PayloadAction<DragList>) => {
      const { startIdx, endIdx } = action.payload;
      const [removed] = state.splice(startIdx, 1);
      state.splice(endIdx, 0, removed);
      return state;
    },
    dragCard: (state, action: PayloadAction<DragCard>) => {
      const { startListId, endListId, startIdx, endIdx } = action.payload;
      const startListIdx = state.findIndex(
        (list) => list.id === Number(startListId)
      );
      const endListIdx = state.findIndex(
        (list) => list.id === Number(endListId)
      );
      const [removed] = state[startListIdx].cardList.splice(startIdx, 1);
      state[endListIdx].cardList.splice(endIdx, 0, removed);
    },
  },
});

export const { dragList, dragCard, setList } = canvan.actions;
export default canvan.reducer;
