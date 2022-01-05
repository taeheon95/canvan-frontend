import React, { useCallback, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import CanvanBoardPresenter from "./CanvanBoardPresenter";
import { List } from "../../types";
import { useAppDispatch } from "../../hooks";
import { dragList, dragCard, addList } from "../../store/canvan";
import { useMutation } from "react-query";
import axios from "axios";

interface PropsType {
  listArray: List[];
}

function CanvanBoardContainer(props: PropsType) {
  const { listArray } = props;
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

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

  const onAddList = useCallback(() => {
    dispatch(addList(title));
  }, [dispatch, title]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setTitle(value);
    },
    []
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CanvanBoardPresenter
        listArray={listArray}
        onAddList={onAddList}
        onChangeTitle={onChangeTitle}
      />
    </DragDropContext>
  );
}

export default CanvanBoardContainer;

// export default React.memo(CanvanBoardContainer, (prevProps, nextProps) => {
//   return prevProps.listArray === nextProps.listArray;
// });
