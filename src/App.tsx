import React from "react";
import { Route, Routes } from "react-router-dom";
import CanvanBoard from "./pages/CanvanBoard";
import BoardList from "./pages/BoardList";
import Home from "./pages/Home";
import ContactPage from "./pages/Contact";
import Spinner from "./components/Spinner";
import Calendar from "./components/Calendar";

function App() {
  return (
    <>
      <CanvanBoard />
      <Calendar />
      {/* <Spinner /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="board" element={<BoardList />}>
          <Route path=":id" element={<CanvanBoard />} />
        </Route>
        <Route path="contacts" element={<ContactPage />} />
        <Route path="*" element={<div>there's nothing</div>} />
      </Routes>
    </>
  );
}

export default App;
