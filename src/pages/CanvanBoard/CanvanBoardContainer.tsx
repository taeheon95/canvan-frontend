import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CanvanBoardPresenter from "./CanvanBoardPresenter";
import { List } from "../../types";
import { useAppDispatch } from "../../hooks";
import { dragList, dragCard } from "../../store/canvan";

interface PropsType {
  listArray: List[];
}

function CanvanBoardContainer(props: PropsType) {
  const { listArray } = props;
  const dispatch = useAppDispatch();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      if (result.type === "list") {
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
