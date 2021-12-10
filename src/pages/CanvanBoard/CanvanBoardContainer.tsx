import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CanvanBoardPresenter from "./CanvanBoardPresenter";
import { List } from "../../types";
import { useAppDispatch } from "../../hooks";
import { dragList, dragCard } from "../../store/canvan";
import { useMutation } from "react-query";
import axios from "axios";

interface PropsType {
  listArray: List[];
}

function CanvanBoardContainer(props: PropsType) {
  const { listArray } = props;
  const dispatch = useAppDispatch();
  const mutation = useMutation(async (list: Partial<List[]>) => {
    return await axios.put(`list`, {
      list,
    });
  });

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result);
      if (!result.destination) {
        return;
      }
      if (result.type === "list") {
        const [, dragListId] = result.draggableId.split("_");
        dispatch(
          dragList({
            startIdx: result.source.index,
            endIdx: result.destination.index,
          })
        );
      } else {
        const [, , startListId] = result.source.droppableId.split("_");
        const [, , endListId] = result.destination.droppableId.split("_");
        dispatch(
          dragCard({
            startListId,
            endListId,
            startIdx: result.source.index,
            endIdx: result.destination.index,
          })
        );
      }
    },
    [dispatch]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CanvanBoardPresenter listArray={listArray} />
    </DragDropContext>
  );
}

export default React.memo(CanvanBoardContainer, (prev, next) => {
  return prev.listArray === next.listArray;
});
