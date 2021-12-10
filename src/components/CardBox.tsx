import React from "react";
import styled from "styled-components";
import { Card } from "../types";

const Box = styled.div`
  background-color: #ffffff;
  padding: 10px;
  margin: 5px;
`;

function CardBox({ card }: { card: Card }) {
  return <Box>{card.title}</Box>;
}

export default CardBox;
