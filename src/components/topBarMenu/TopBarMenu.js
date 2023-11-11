import { Menu, Button, MenuItem, Box, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./TopBarMenu.module.css";
import fig from "../../img/fig.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function TopBarMenu() {
  const [anchorElHome, setAnchorElHome] = useState(null);
  const [anchorElIcon, setAnchorElIcon] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);

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
          <Button variant="contained" color="menuButton" disableElevation>
            MARKETPLACE
          </Button>
          <Link to="/Services">
          <Button variant="contained" color="menuButton" disableElevation>
            SERVICES
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
            <AccountCircleIcon className={style.accountIcon} />
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
              <TextField
                label="Username"
                variant="filled"
                fullWidth
                className={style.textFieldLogin}
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "gray" } }}
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                fullWidth
                className={style.textFieldLogin}
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "gray" } }}
              />
              <Button
                variant="contained"
                color="regularButton"
                fullWidth
                required
                className={style.buttonBot}
              >
                Login
              </Button>
              <Link to="/SignUp">
                <Button
                  injectFirst
                  variant="text"
                  color="primary"
                  fullWidth
                  required
                  className={style.buttonBot}
                >
                  Register
                </Button>
              </Link>
            </Box>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default TopBarMenu;
