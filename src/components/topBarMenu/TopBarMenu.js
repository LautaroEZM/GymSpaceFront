import { Menu, Button, MenuItem, Box, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";
import style from "./TopBarMenu.module.css";
import fig from "../../img/fig.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogIn from "../LogIn/logIn";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { getUser } from "../../REDUX/actions";
import axios from "axios";

function TopBarMenu() {
  const [anchorElHome, setAnchorElHome] = useState(null);
  const [anchorElIcon, setAnchorElIcon] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const newUser = useSelector((state) => state.user)

  const navigate = useNavigate()

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch()

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
          dispatch(getUser(data))
        }
      }
    };
    checkUser();
  }, [user]);

  useEffect(() => {
    console.log(newUser);
    if (user && newUser.status === 'unregistered') navigate('/signUp')
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
    handleCloseMenu()
    navigate(`/${url}`)
  }

  return (
    <div className={style.topContainer}>
      <img src={fig} alt="Fig" className={style.overlayImage} />
      <div className={style.topBar}>
        <div className={style.buttonsContainer}>
          <Link to="/">
            <Button variant="contained" color="menuButton" disableElevation>
              HOME
            </Button>
          </Link>
          <Button
            variant="contained"
            color="menuButton"
            onClick={handleToggleMenuHome}
            disableElevation
            className={style.homeButton}
          >
            INFO
          </Button>
          <Menu
            anchorEl={anchorElHome}
            open={Boolean(anchorElHome)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            PaperProps={{
              style: {
                backgroundColor: "#1111119a",
                color: "white",
                width: "200px",
                borderRadius: "0px",
                position: "absolute",
                transform: "translate(0, 5px)",
                boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
              },
            }}
          >
            <MenuItem className={style.menuItemPaper}>asd1</MenuItem>
            <MenuItem>asd2</MenuItem>
            <MenuItem>asd3</MenuItem>
            <div className={style.bottomLine}></div>
          </Menu>
          <Link to="/Marketplace">
            <Button variant="contained" color="menuButton" disableElevation>
              MARKETPLACE
            </Button>
          </Link>
          <Link to="/Services">
            <Button variant="contained" color="menuButton" disableElevation>
              SERVICES
            </Button>
          </Link>
          <Link to="/Dashboard">
            <Button variant="contained" color="menuButton" disableElevation>
              DASHBOARD
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/ShopCart">
            <Button variant="contained" color="menuButton" disableElevation>
              <ShoppingCartIcon/>
            </Button>
          </Link>
        </div>
        <div className={style.accountContainer}>
          <Button
            variant="contained"
            color="menuButton"
            disableElevation
            className={style.buttonAccount}
            onClick={handleToggleMenuIcon}
          >
            {
            user && isAuthenticated ? (
              <img src={ newUser.photo && newUser.photo } className={style.picture} />
            ) : (
              <AccountCircleIcon className={style.accountIcon} />
            )
            }
          </Button>
          <Menu
            anchorEl={anchorElIcon}
            open={loginOpen}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              style: {
                backgroundColor: "#111111",
                width: "200px",
                borderRadius: "0px",
                transform: "translate(0, 5px)",
                boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
              },
            }}
          >
            <Box p={2} >
              {user ? (
                <div className={style.accountContainer} >
                    <Button
                      variant="contained"
                      color="menuButton"
                      disableElevation
                      fullWidth={true}
                      onClick={() => handleRedirect('Profile')}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="contained"
                      color="menuButton"
                      disableElevation
                      fullWidth={true}
                      onClick={() => handleRedirect('UserProducts')}
                    >
                      Your products
                    </Button>
                    <Button
                      variant="contained"
                      color="menuButton"
                      fullWidth='true'
                      disableElevation
                      onClick={() => handleRedirect('UserServices')}
                    >
                      Your services
                    </Button>

                  <LogIn />
                </div>
              ) : <LogIn />}
            </Box>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopBarMenu;
