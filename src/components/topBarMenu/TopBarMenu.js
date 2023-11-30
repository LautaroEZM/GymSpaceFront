import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  MenuItem,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuPosition, setMobileMenuPosition] = useState({
    top: 0,
    left: 0,
  });

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

  useEffect(() => {
    updateMobileMenuPosition();
  }, [mobileMenuOpen]);

  const updateMobileMenuPosition = () => {
    if (anchorElHome) {
      const rect = anchorElHome.getBoundingClientRect();
      setMobileMenuPosition({ top: rect.bottom, left: rect.left });
    }
  };
  const handleToggleMenuIcon = (event) => {
    setAnchorElIcon(anchorElIcon ? null : event.currentTarget);
    setLoginOpen(!loginOpen);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
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
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMobileMenuToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <LinkNoDeco to="/">
            <TopBarButton disableElevation>HOME</TopBarButton>
          </LinkNoDeco>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <LinkNoDeco to="/Marketplace">
            <TopBarButton disableElevation>MARKETPLACE</TopBarButton>
          </LinkNoDeco>
          <LinkNoDeco to="/Services">
            <TopBarButton disableElevation>SERVICES</TopBarButton>
          </LinkNoDeco>
          <LinkNoDeco to="/Dashboard">
            <TopBarButton disableElevation>DASHBOARD</TopBarButton>
          </LinkNoDeco>
        </Box>
        <Box sx={{ display: "flex" }}>
          <LinkNoDeco to="/ShopCart">
            <TopBarButton disableElevation>
              <ShoppingCartIcon />
            </TopBarButton>
          </LinkNoDeco>
          <Box className={style.accountContainer}>
            <TopBarButton disableElevation onClick={handleToggleMenuIcon}>
              {user && isAuthenticated ? (
                <img
                  src={newUser.photo || loadingImage}
                  className={style.picture}
                  alt="user"
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
                  <Box className={style.accountContainer} >
                    <TopBarButton
                      variant="contained"
                      color="menuButton"
                      disableElevation
                      sx={{width: 1}}
                      onClick={() => handleRedirect("Profile")}
                    >
                      Profile
                    </TopBarButton>
                    <TopBarButton
                      variant="contained"
                      color="menuButton"
                      disableElevation
                      sx={{width: 1}}
                      onClick={() => handleRedirect("UserProducts")}
                    >
                      Your products
                    </TopBarButton>
                    <TopBarButton
                      variant="contained"
                      color="menuButton"
                      disableElevation
                      sx={{width: 1}}
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
      </Container>

      {/* Mobile Menu */}
      <StyledMenu
        anchorEl={mobileMenuOpen ? anchorElHome : null}
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{
          marginTop: `${mobileMenuPosition.top}px`,
          marginLeft: `${mobileMenuPosition.left}px`,
        }}
        sx={{
          "& .MuiTypography-root": {
            color: "orange",
            
          },
        }}
      >
        <MenuItem onClick={handleMobileMenuToggle}>
          <LinkNoDeco to="/Marketplace">
            <Typography variant="inherit">MARKETPLACE</Typography>
          </LinkNoDeco>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuToggle}>
          <LinkNoDeco to="/Services">
            <Typography variant="inherit">SERVICES</Typography>
          </LinkNoDeco>
        </MenuItem>
        <MenuItem onClick={handleMobileMenuToggle}>
          <LinkNoDeco to="/Dashboard">
            <Typography variant="inherit">DASHBOARD</Typography>
          </LinkNoDeco>
        </MenuItem>
      </StyledMenu>

      {currentStatus !== "safe" && warningState ? (
        <StatusChecker status={currentStatus} />
      ) : null}
    </AppBar>
  );
};

export default TopBarMenu;
