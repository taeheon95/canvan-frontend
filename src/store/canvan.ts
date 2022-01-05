import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
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
      return state;
    },
    addList: (state, action: PayloadAction<string>) => {
      let newId = 0;
      const insertTime = Date.now();
      if (state.length !== 0) {
        const list = state[state.length - 1];
        newId = list.id + 1;
      }
      const newList: List = {
        id: newId,
        seq: state.length,
        title: action.payload,
        insert_time: insertTime,
        update_time: insertTime,
        cardList: [],
      };
      state.push(newList);
      return state;
    },
  },
});

export const { dragList, dragCard, setList, addList } = canvan.actions;
export default canvan.reducer;
