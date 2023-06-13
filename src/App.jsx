import React from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import { Router, Route, useLocation, Routes } from "react-router-dom";

import axios from "axios";

function App() {
  const location = useLocation();

  return (
    <div className="bg-blue-600 min-h-screen flex">
      <div className="w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl text-white mb-5 mt-5">My Notes</h3>
        </div>
        <Routes>
          {location.pathname === "/" && (
            <Route path="/" exact element={<AddNote />} />
          )}{" "}
          else {<Route path="/edit/:id" element={<EditNote />} />}
        </Routes>
        <Notes />
      </div>
    </div>
  );
}

export default App;
