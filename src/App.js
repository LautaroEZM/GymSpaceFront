import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import "./App.css";
import TopBarMenu from "./components/topBarMenu/TopBarMenu";
import SignUp from "./pages/Form/SignUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CreateService from "./pages/CreateService/CreateService";
import Services from "./pages/Services/Services";

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu></TopBarMenu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Marketplace" element={<Home />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="createService" element={<CreateService />} />
            <Route path="createProduct" element={<CreateService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </LocalizationProvider>
  );
}
