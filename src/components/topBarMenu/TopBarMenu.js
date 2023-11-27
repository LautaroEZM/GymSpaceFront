import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./TopBarMenu.module.css";
import fig from "../../img/fig.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogIn from "../LogIn/logIn";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../../REDUX/actions";
import axios from "axios";
import {
  TopBarButton,
  LinkNoDeco,
  StyledMenu,
  StyledMenuItemBar,
} from "../../styles/ComponentStyles";

function TopBarMenu() {
  const [anchorElHome, setAnchorElHome] = useState(null);
  const [anchorElIcon, setAnchorElIcon] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const newUser = useSelector((state) => state.user);

  const loadingImage =
    "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

  const navigate = useNavigate();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      console.log("user: ", user);
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
    console.log(newUser);
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
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#414141",
        backgroundImage: `url(${fig})`,
        backgroundSize: "20%",
        backgroundPosition: "left",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#414141",
          width: "100%",
          height: "5%",
          marginTop: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
        }}
      >
        {/*<img src={fig} alt="Fig" className={style.overlayImage} />*/}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <LinkNoDeco to="/">
            <TopBarButton
              variant="contained"
              color="menuButton"
              disableElevation
            >
              HOME
            </TopBarButton>
          </LinkNoDeco>
          <TopBarButton
            variant="contained"
            color="menuButton"
            onClick={handleToggleMenuHome}
            disableElevation
          >
            INFO
          </TopBarButton>
          <StyledMenu
            anchorEl={anchorElHome}
            open={Boolean(anchorElHome)}
            onClose={handleCloseMenu}
          >
            <StyledMenuItemBar>asd1</StyledMenuItemBar>
            <StyledMenuItemBar>asd2</StyledMenuItemBar>
            <StyledMenuItemBar>asd3</StyledMenuItemBar>
          </StyledMenu>
          <LinkNoDeco to="/Marketplace">
            <TopBarButton
              variant="contained"
              color="menuButton"
              disableElevation
            >
              MARKETPLACE
            </TopBarButton>
          </LinkNoDeco>
          <LinkNoDeco to="/Services">
            <TopBarButton
              variant="contained"
              color="menuButton"
              disableElevation
            >
              SERVICES
            </TopBarButton>
          </LinkNoDeco>
          <LinkNoDeco to="/Dashboard">
            <TopBarButton
              variant="contained"
              color="menuButton"
              disableElevation
            >
              DASHBOARD
            </TopBarButton>
          </LinkNoDeco>
        </Box>
        <Box>
          <LinkNoDeco to="/ShopCart">
            <TopBarButton
              variant="contained"
              color="menuButton"
              disableElevation
            >
              <ShoppingCartIcon />
            </TopBarButton>
          </LinkNoDeco>
        </Box>
        <Box className={style.accountContainer}>
          <TopBarButton
            variant="contained"
            color="menuButton"
            disableElevation
            onClick={handleToggleMenuIcon}
          >
            {user && isAuthenticated ? (
              <img
                src={newUser.photo || loadingImage}
                className={style.picture}
              />
            ) : (
              <AccountCircleIcon className={style.accountIcon} />
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
    </Box>
  );
}

export default TopBarMenu;
