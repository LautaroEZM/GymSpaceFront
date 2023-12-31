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
import UserList from "./pages/Dashboard/components/UserList";
import DetailProduct from "./pages/Marketplace/DetailProduct";
import ShopCart from "./pages/Shopping/ShopCart";
import Dashboard from "./pages/Dashboard/Dashboard";
import DetailService from "./components/DetailService/DetailService";
import DetailUsers from "./components/DetailUsers/DetailUsers";
import Profile from "./pages/Profile/Profile";
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import ChatWidget from "./components/ChatWidget";
import useChatWidgetVisibility from "./hooks/ChatWidget/useChatWidgetVisibility";
import UserServices from "./pages/UserServices/UserServices";
import UserProducts from "./pages/UserProducts/UserProducts";

export default function App() {
  const chatWidgetVisible = useChatWidgetVisibility();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu></TopBarMenu>
          {chatWidgetVisible && <ChatWidget />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/ShopCart" element={<ShopCart />} />
            <Route path="/Users" element={<UserList />} />
            <Route path="/Marketplace/detail/:id" element={<DetailProduct />} />
            <Route path="/ServiceDetail/:id" element={<DetailService />} />
            <Route path="/UsersDetail/:id" element={<DetailUsers />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/CreateProduct" element={<CreateProduct />} />
            <Route path="/CreateService" element={<CreateService />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/UpdateUser/:id" element={<UpdateUser />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/CreateProduct" element={<CreateProduct />} />
            <Route path="/CreateService" element={<CreateService />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="UserServices" element={<UserServices />} />
            <Route path="UserProducts" element={<UserProducts />} />
          </Routes>
        </div>
      </div>
    </LocalizationProvider>
  );
}
