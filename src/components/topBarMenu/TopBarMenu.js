import { Menu, Button, MenuItem, Box, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./TopBarMenu.module.css";
import fig from "../../img/fig.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth0 } from "@auth0/auth0-react";
import LogIn from "../LogIn/logIn";

function TopBarMenu() {
  const [anchorElHome, setAnchorElHome] = useState(null);
  const [anchorElIcon, setAnchorElIcon] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user } = useAuth0();

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
          <Link to="/Users">
            <Button variant="contained" color="menuButton" disableElevation>
              USERS
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
            {user ? (
              <img src={user.picture} className={style.accountIcon} />
            ) : (
              <AccountCircleIcon className={style.accountIcon} />
            )}
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
                width: "350px",
                borderRadius: "0px",
                transform: "translate(0, 5px)",
                boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
              },
            }}
          >
            <Box p={2}>
              {user ? (
                <>
                  <Link to="/Profile">
                    <Button
                      variant="contained"
                      color="menuButton"
                      disableElevation
                    >
                      Profile
                    </Button>
                  </Link>
                  <Link to="/UserProducts">
                    <Button
                      variant="contained"
                      color="menuButton"
                      disableElevation
                    >
                      Your products
                    </Button>
                  </Link>
                  <Link to="/UserServices">
                    <Button
                      variant="contained"
                      color="menuButton"
                      disableElevation
                    >
                      Your services
                    </Button>
                  </Link>
                </>
              ) : null}
              <LogIn />
            </Box>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopBarMenu;
