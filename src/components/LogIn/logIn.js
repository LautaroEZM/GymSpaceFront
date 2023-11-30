import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import style from './login.module.css'
import { buildReq } from "../../utils/auth0Utils";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import axios from "axios";
import { API_URL } from "../../utils/constants";

export default function logIn() {
  const { user, loginWithRedirect, isAuthenticated, logout, getAccessTokenSilently } = useAuth0();

  const [productsCart, setproductsCart] = useLocalStorage("product", []);
  const [servicesCart, setServicesCart] = useLocalStorage("service", []);
  const handleLogout = async ()=>{
    const req = await buildReq({products: productsCart, services:servicesCart},getAccessTokenSilently)
    console.log(req)
    await axios.put(API_URL + "/cart/"+user.sub,req)
    window.localStorage.clear()

    logout()
  }

  if (isAuthenticated) {
    return (
      <Button
        variant="contained"
        color="regularButton"
        fullWidth
        required
        onClick={handleLogout}
        className={style.button}
      >
        Logout
      </Button>
    );
  } else {
    return (
      <Container maxWidth="xs">
        <Button
          variant="contained"
          color="regularButton"
          fullWidth
          required
          onClick={()=>loginWithRedirect()}
          className={style.button}
        >
          Login
        </Button>
      </Container>
    );
  }
}
