import React from "react";
import { Route, Routes } from "react-router-dom";
import CanvanBoard from "./pages/CanvanBoard";
import BoardList from "./pages/BoardList";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <CanvanBoard />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="board" element={<BoardList />}>
          <Route path=":id" element={<CanvanBoard />} />
        </Route>
        <Route path="*" element={<div>there's nothing</div>} />
      </Routes>
    </>
  );
}

export default App;
