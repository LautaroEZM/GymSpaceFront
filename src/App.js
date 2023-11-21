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
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import Services from "./pages/Services/Services";
import Marketplace from "./pages/Marketplace/Marketplace";
import UserList from "./pages/UserList/UserList";
import DetailProduct from "./components/Date/DetailProduct";
import { storage } from './firebaseConfig';
import Profile from './pages/Profile/Profile'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";


export default function App() {

  const user = useAuth0()

  // if() useNavigate('/signUp')

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu></TopBarMenu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/Users" element={<UserList />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/CreateProduct" element={<CreateProduct/>} />
            <Route path="/CreateService" element={<CreateService />} />
            <Route path="/marketplace/detail/:id" component={<DetailProduct />} />
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </LocalizationProvider>
  );
}
