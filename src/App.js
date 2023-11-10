import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import SignUp from "./pages/Form/SignUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./App.css";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className="contentContainer">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </LocalizationProvider>
  );
}
