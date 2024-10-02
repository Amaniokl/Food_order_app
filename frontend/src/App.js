import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Restaurants from "./pages/restaurant";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<Restaurants />} />
      </Routes>
    </Router>
  );
};

export default App;