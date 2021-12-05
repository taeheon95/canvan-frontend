import React from "react";
import CanvanBoardContainer from "./CanvanBoardContainer";
import { useAppSelector } from "../../hooks";

function CanvanBoard() {
  const { canvan } = useAppSelector((state) => state);
  return <CanvanBoardContainer listArray={canvan} />;
}

export default CanvanBoard;
