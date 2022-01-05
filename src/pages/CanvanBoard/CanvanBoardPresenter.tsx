import React, { ChangeEventHandler, MouseEventHandler } from "react";
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
  onAddList: MouseEventHandler;
  onChangeTitle: ChangeEventHandler;
}

function CanvanBoardPresenter(props: PropsType) {
  const { listArray, onAddList, onChangeTitle } = props;
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
          <input title="listInput" onChange={onChangeTitle} />
          <button onClick={onAddList}>리스트 추가</button>
        </Box>
      )}
    </Droppable>
  );
}

export default CanvanBoardPresenter;

// export default React.memo(CanvanBoardPresenter, (prev, next) => {
//   return (
//     prev.listArray === next.listArray &&
//     prev.onChangeTitle === next.onChangeTitle
//   );
// });
