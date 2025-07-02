import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Welcome from "./components/Welcome";
import TemplateSelection from "./components/TemplateSelection";
import CapturePage from "./components/CapturePage";
import Preview from "./components/Preview";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/select-template" element={ <TemplateSelection/> }  />
        <Route path="/capture" element={ <CapturePage/> }  />
        <Route path="/preview" element={ <Preview/> }  />
      </Routes>
    </div>
  );
};

export default App;
