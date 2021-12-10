import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { List } from "../types";
// import CardBox from "./CardBox";

const Box = styled.div`
  background-color: #f4f5f7;
  width: 300px;
  margin: 5px;
`;

const CardInput = styled.input`
  background-color: #ffffff;
  padding: 10px;
  width: "100%";
  border: none;
  margin: 5px;
`;

const CardButton = styled.button`
  background-color: #ffffff;
  padding: 10px;
  width: "100%";
  border: none;
  margin: 5px;
`;

const TitleBox = React.memo(
  styled.div`
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 5px;
  `,
  (prev, next) => prev.children === next.children
);

const AddButtonBox = styled.div`
  width: "100%";
  display: flex;
  cursor: pointer;
`;

interface PropTypes {
  list: List;
  provided: DraggableProvided;
}

function ListField(props: PropTypes) {
  const { list, provided } = props;
  return (
    <>
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <TitleBox>{list.title}</TitleBox>
        <Droppable droppableId={`card_droppable_${list.id}`} type="card">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.cardList.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={`card_${card.id}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <CardBox
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {card.title}
                    </CardBox>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <AddButtonBox>
          <CardInput />
          <CardButton>+</CardButton>
        </AddButtonBox>
      </Box>
    </>
  );
}

const CardBox = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin: 5px;
`;

export default React.memo(ListField, (prev, next) => {
  return prev.list === next.list && prev.provided === next.provided;
});
