import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Details from "./views/Details";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
