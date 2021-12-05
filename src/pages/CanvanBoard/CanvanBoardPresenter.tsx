import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ListField from "../../components/ListField";
import { List } from "../../types";

const Box = styled.div`
  display: flex;
  padding: 5px;
`;

interface PropsType {
  listArray: List[];
}

function CanvanBoardPresenter(props: PropsType) {
  const { listArray } = props;
  return (
    <Droppable droppableId="list_droppable" direction="horizontal" type="list">
      {(provided, snapshot) => (
        <Box {...provided.droppableProps} ref={provided.innerRef}>
          {listArray.map((list, index) => (
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
  );
}

export default React.memo(CanvanBoardPresenter, (prev, next) => {
  return prev.listArray === next.listArray;
});
