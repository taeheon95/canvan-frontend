import React from "react";
import CanvanBoardContainer from "./CanvanBoardContainer";
import { useAppSelector } from "../../hooks";

function CanvanBoard() {
  const listArray = useAppSelector((state) => state.canvan);
  return <CanvanBoardContainer listArray={listArray} />;
}

export default React.memo(CanvanBoard);
