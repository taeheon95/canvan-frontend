import _ from "lodash";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import ListField from "../components/ListField";
import { testData } from "../testData";
import { List } from "../types";

const Box = styled.div`
  display: flex;
  padding: 5px;
`;

function reorderList<T>(
  listArray: T[],
  startIndex: number,
  endIndex: number
): T[] {
  const result = _.cloneDeep(listArray);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function TestBox() {
  const [testList, setTestList] = useState<List[]>(testData);
  const onDragEnd = (result: DropResult) => {
    const newTestList = _.cloneDeep(testList);
    console.log("onDragEnd", result);
    if (!result.destination) {
      return;
    }
    if (result.type === "list") {
      const reorderedList = reorderList(
        newTestList,
        result.source.index,
        result.destination.index
      );
      setTestList(reorderedList);
    } else {
      const [, , startListId] = result.source.droppableId.split("_");
      const [, , endListId] = result.destination.droppableId.split("_");
      const startListIdx = newTestList.findIndex(
        (list) => list.id === Number(startListId)
      );
      const endListIdx = newTestList.findIndex(
        (list) => list.id === Number(endListId)
      );
      if (startListId === endListId) {
        const contentList = newTestList[startListIdx].cardList;
        const newContentList = reorderList(
          contentList,
          result.source.index,
          result.destination.index
        );
        newTestList[startListIdx].cardList = newContentList;
      } else {
        const startList = newTestList[startListIdx].cardList;
        const endList = newTestList[endListIdx].cardList;
        const [removed] = startList.splice(result.source.index, 1);
        endList.splice(result.destination.index, 0, removed);
      }
      setTestList(newTestList);
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="list_droppable"
        direction="horizontal"
        type="list"
      >
        {(provided, snapshot) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {testList.map((list, index) => (
              <Draggable
                key={list.id}
                draggableId={`list_${list.id}`}
                index={index}
              >
                {(provided, snapshot) => (
                  <ListField list={list} provided={provided} />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TestBox;
