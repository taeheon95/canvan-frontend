import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../types";
import CardBox from "./CardBox";

test("<CardBox/>", () => {
  const card = { id: 0, name: "hello" };
  render(<CardBox card={card} />);
});

test("card box fail", () => {
  const card = { id: 0, name: "eeeeee" };
  render(<CardBox card={card} />);
});
