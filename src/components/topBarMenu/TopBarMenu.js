import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, MenuItem, Container } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogIn from "../LogIn/logIn";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../../REDUX/actions";
import axios from "axios";
import { StatusChecker, status } from "../statusChecker/statusChecker";
import { warning } from "../../REDUX/actions";
import style from "./TopBarMenu.module.css";
import {
  TopBarButton,
  LinkNoDeco,
  StyledMenu,
} from "../../styles/ComponentStyles";
import { buildReq } from "../../utils/auth0Utils";
import { API_URL } from "../../utils/constants";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const loadingImage =
  "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

const TopBarMenu = () => {
  const [anchorElHome, setAnchorElHome] = useState(null);
  const [anchorElIcon, setAnchorElIcon] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [productsCart, setproductsCart] = useLocalStorage("product", "[]");
  const warningState = useSelector((state) => state.warning);
  const newUser = useSelector((state) => state.user);

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const currentStatus = status(newUser, user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      if (user && isAuthenticated) {
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
        if (data) {
          dispatch(getUser(data));
        }
      }
    };
    checkUser();
  }, [user]);
  useEffect(() => {
    const getcartAPI = async () => {
      if (user && isAuthenticated) {
        if(!productsCart.length){
        const req = await buildReq({},getAccessTokenSilently)
        const{data} = await axios.get(API_URL + "/cart/"+user.sub,req)
        console.log(data)
        setproductsCart(data)}
      }
    };
    getcartAPI();
  }, [user]);
  useEffect(() => {
    if (user && newUser.status === "unregistered") navigate("/signUp");
  }, [newUser]);

  const handleToggleMenuHome = (event) => {
    setAnchorElHome(anchorElHome ? null : event.currentTarget);
    setLoginOpen(false);
  };

  const handleToggleMenuIcon = (event) => {
    setAnchorElIcon(anchorElIcon ? null : event.currentTarget);
    setLoginOpen(!loginOpen);
  };

  const handleCloseMenu = () => {
    setAnchorElHome(null);
    setAnchorElIcon(null);
    setLoginOpen(false);
  };

  const handleRedirect = (url) => {
    handleCloseMenu();
    navigate(`/${url}`);
  };

  return (
    <AppBar
      position="static"
      sx={{
        width: "100%",
        marginTop: "10px",
        backgroundColor: "#414141",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Container
          sx={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <LinkNoDeco to="/">
            <TopBarButton disableElevation>HOME</TopBarButton>
          </LinkNoDeco>
          <TopBarButton onClick={handleToggleMenuHome} disableElevation>
            INFO
          </TopBarButton>
          <StyledMenu
            anchorEl={anchorElHome}
            open={Boolean(anchorElHome)}
            onClose={handleCloseMenu}
          >
            <MenuItem>asd1</MenuItem>
            <MenuItem>asd2</MenuItem>
            <MenuItem>asd3</MenuItem>
          </StyledMenu>
          <LinkNoDeco to="/Marketplace">
            <TopBarButton disableElevation>MARKETPLACE</TopBarButton>
          </LinkNoDeco>
          <LinkNoDeco to="/Services">
            <TopBarButton disableElevation>SERVICES</TopBarButton>
          </LinkNoDeco>
          <LinkNoDeco to="/Dashboard">
            <TopBarButton disableElevation>DASHBOARD</TopBarButton>
          </LinkNoDeco>
        </Container>
        <Box>
          <LinkNoDeco to="/ShopCart">
            <TopBarButton disableElevation>
              <ShoppingCartIcon />
            </TopBarButton>
          </LinkNoDeco>
        </Box>
        <Box className={style.accountContainer}>
          <TopBarButton disableElevation onClick={handleToggleMenuIcon}>
            {user && isAuthenticated ? (
              <img
                src={newUser.photo || loadingImage}
                className={style.picture}
              />
            ) : (
              <AccountCircleIcon />
            )}
          </TopBarButton>
          <StyledMenu
            anchorEl={anchorElIcon}
            open={loginOpen}
            onClose={handleCloseMenu}
          >
            <Box p={2}>
              {user ? (
                <Box className={style.accountContainer}>
                  <TopBarButton
                    variant="contained"
                    color="menuButton"
                    disableElevation
                    fullWidth={true}
                    onClick={() => handleRedirect("Profile")}
                  >
                    Profile
                  </TopBarButton>
                  <TopBarButton
                    variant="contained"
                    color="menuButton"
                    disableElevation
                    fullWidth={true}
                    onClick={() => handleRedirect("UserProducts")}
                  >
                    Your products
                  </TopBarButton>
                  <TopBarButton
                    variant="contained"
                    color="menuButton"
                    fullWidth="true"
                    disableElevation
                    onClick={() => handleRedirect("UserServices")}
                  >
                    Your services
                  </TopBarButton>
                  <LogIn />
                </Box>
              ) : (
                <LogIn />
              )}
            </Box>
          </StyledMenu>
        </Box>
      </Box>
      {currentStatus !== "safe" && warningState ? (
        <StatusChecker status={currentStatus} />
      ) : null}
    </AppBar>
  );
};

export default TopBarMenu;
