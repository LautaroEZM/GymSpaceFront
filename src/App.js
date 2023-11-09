import * as React from 'react';
import {Route, Routes } from "react-router-dom";
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import "./App.css";
import TopBarMenu from './components/topBarMenu/TopBarMenu';



export default function App() {
  return (
    <div className="App">
      <div className="contentContainer">
      <TopBarMenu></TopBarMenu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </div>
  );
}
