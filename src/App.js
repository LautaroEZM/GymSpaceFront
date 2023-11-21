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
import DetailProduct from "./components/Date/DetailProduct";
import ShopCart from "./pages/Shopping/ShopCart";
import { storage } from './firebaseConfig';
import Dashboard from "./pages/Dashboard/Dashboard";
import { storage } from "./firebaseConfig";
import Profile from "./pages/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const navigate= useNavigate()

  const [newUser, setNewUser] = useState({
    status: '',
    email: '',
  })

  useEffect(() => {
    const checkUser = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://gymspacebackend-production-421c.up.railway.app/",
            scope: "read:current_user",
          },
        });
        const userDetailsByIdUrl = `https://gymspacebackend-production-421c.up.railway.app/users/${user.sub}`;
        const { data } = await axios.get(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(data);
        if(data) setNewUser({
          status: data.status,
          email: data.email,
        })
      }
    };
    checkUser();
  }, [user]);

  useEffect(() => {
    console.log('newUser:' , newUser);
    if(newUser.status = "unregistered") navigate('/signUp')
  }, [newUser])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <div className="contentContainer">
          <TopBarMenu></TopBarMenu>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/Marketplace" element={<Marketplace />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/ShopCart" element={<ShopCart/>} />
            <Route path="/Users" element={<UserList />} />
            <Route path="/Marketplace/detail/:id" element={<DetailProduct />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/CreateProduct" element={<CreateProduct/>} />
            <Route path="/CreateService" element={<CreateService />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/signUp" element={<SignUp newUser={newUser} />} />
            <Route path="/CreateProduct" element={<CreateProduct />} />
            <Route path="/CreateService" element={<CreateService />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </LocalizationProvider>
  );
}
