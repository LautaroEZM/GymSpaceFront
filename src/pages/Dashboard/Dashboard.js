import * as React from "react";
import { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  List,
  ListItemText,
  ListItemIcon,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import IconButton from "@mui/material/IconButton";
import {
  DashBoardCategory,
  DashBoardListItem,
} from "../../styles/ComponentStyles";
import UserList from "./components/UserList";
import ServiceCardList from "./components/ServiceCardList";
import ServiceGraph from "./components/ServiceGraph";
import { API_URL } from "./../../utils/constants";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductListDashboard from "./components/ProductListDashboard";

function Dashboard() {
  const [showMenu, setShowMenu] = useState(true); // Cambiado a true para que siempre se muestre en pantallas grandes
  const [showClientsUserList, setShowClientsUserList] = useState(false);
  const [showCardServiceList, setShowCardServiceList] = useState(false);
  const [showProductListDashboard, setShowProductListDashboard] =
    useState(false);
  const [showServiceGraph, setShowServiceGraph] = useState(true);
  const [services, setServices] = useState([]);
  const [userservices, setUserservices] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const newUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    ["Admin", "Coach"].includes(newUser.systemRole) ? null : navigate("/");
  }, []);
  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);
        const { data } = response;
        setServices(data);
      } catch (error) {
        console.error("Error fetching Services:", error.message);
      }
    };

    const getUserservices = async () => {
      try {
        const response = await axios.get(`${API_URL}/userservices`);
        const { data } = response;
        setUserservices(data);
      } catch (error) {
        console.error("Error fetching Userservices:", error.message);
      }
    };

    getServices();
    getUserservices();
  }, []);

  const enrolledPeople = ["angel", "lautaro", "adrian", "kevin"];

  const transformedServices = services.map((service) => {
    const enrolledPeople = userservices
      .filter((userService) => userService.serviceID === service.serviceID)
      .map(
        (userService) =>
          `${userService.User.firstName} ${userService.User.lastName}`
      );

    return {
      serviceName: service.name,
      extraInfo: service.description,
      coaches: service.Users.map(
        (user) => `${user.firstName} ${user.lastName}`
      ),
      enrolledPeople: enrolledPeople,
    };
  });

  const graphdata = userservices.reduce((acc, userService) => {
    const serviceKey = `${userService.Service.name} ${userService.Service.startTime}`;
    if (acc[serviceKey]) {
      acc[serviceKey] += 1;
    } else {
      acc[serviceKey] = 1;
    }
    return acc;
  }, {});

  const formattedGraphData = Object.keys(graphdata).map((service) => ({
    service: service,
    users: graphdata[service],
  }));

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Box sx={{ display: "flex", height: "90vh", backgroundColor: "#141414" }}>
      <CssBaseline />
      {isMobile ? (
        // En dispositivos móviles, utiliza el diseño original con Drawer
        <>
          <Box
            sx={{
              width: "auto",
              height: "100%",
              backgroundColor: "#141414",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleToggleMenu}
              sx={{
                marginLeft: "20px",
                color: "orange",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              padding: "20px",
              overflowY: "auto",
            }}
          >
            {showClientsUserList && <UserList />}
            {showCardServiceList && (
              <ServiceCardList services={transformedServices} />
            )}
            {showServiceGraph && <ServiceGraph data={formattedGraphData} />}
          </Box>
          <Drawer
            anchor="left"
            open={showMenu}
            onClose={handleToggleMenu}
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "transparent",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              },
              width: "10%",
            }}
          >
            <List sx={{ marginTop: "20px", backgroundColor: "#141414" }}>
              {/* Categoría de Servicios */}
              <DashBoardCategory>
                <ListItemIcon>
                  <HomeRepairServiceIcon sx={{ color: "#bbbbbb" }} />
                </ListItemIcon>
                <ListItemText primary="Services" sx={{ color: "#bbbbbb" }} />
              </DashBoardCategory>
              <List>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowClientsUserList(false);
                    setShowServiceGraph(false);
                    setShowCardServiceList(true);
                  }}
                >
                  <ListItemText primary="List" />
                </DashBoardListItem>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowClientsUserList(false);
                    setShowCardServiceList(false);
                    setShowServiceGraph(true);
                  }}
                >
                  <ListItemText primary="Stats" />
                </DashBoardListItem>
              </List>

              {/* Categoría Finances */}
              <DashBoardCategory>
                <ListItemIcon>
                  <AccountBalanceIcon sx={{ color: "#bbbbbb" }} />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ color: "#bbbbbb" }} />
              </DashBoardCategory>
              <List>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowClientsUserList(false);
                    setShowServiceGraph(false);
                    setShowCardServiceList(false);
                    setShowProductListDashboard(true);
                    setShowMenu(false);
                    console.log(
                      "showProductListDashboard:",
                      showProductListDashboard
                    );
                  }}
                >
                  <ListItemText primary="Product List" />
                </DashBoardListItem>
              </List>

              {/* Categoría Users */}
              <DashBoardCategory>
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "#bbbbbb" }} />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ color: "#bbbbbb" }} />
              </DashBoardCategory>
              <List>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowCardServiceList(false);
                    setShowServiceGraph(false);
                    setShowClientsUserList(true);
                  }}
                >
                  <ListItemText primary="People" />
                </DashBoardListItem>
              </List>
            </List>
          </Drawer>
        </>
      ) : (
        // En pantallas grandes, utiliza un diseño de dos columnas
        <>
          <Box
            sx={{
              width: "20%",
              height: "100%",
              backgroundColor: "#141414",
            }}
          >
            {/* Contenido del menú lateral */}
            <List sx={{ marginTop: "20px", backgroundColor: "#141414" }}>
              {/* Categoría de Servicios */}
              <DashBoardCategory>
                <ListItemIcon>
                  <HomeRepairServiceIcon sx={{ color: "#bbbbbb" }} />
                </ListItemIcon>
                <ListItemText primary="Services" sx={{ color: "#bbbbbb" }} />
              </DashBoardCategory>
              <List>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowClientsUserList(false);
                    setShowServiceGraph(false);
                    setShowCardServiceList(true);
                  }}
                >
                  <ListItemText primary="List" />
                </DashBoardListItem>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowClientsUserList(false);
                    setShowCardServiceList(false);
                    setShowServiceGraph(true);
                  }}
                >
                  <ListItemText primary="Stats" />
                </DashBoardListItem>
              </List>

              {/* Categoría Finances */}
              <DashBoardCategory>
                <ListItemIcon>
                  <AccountBalanceIcon sx={{ color: "#bbbbbb" }} />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ color: "#bbbbbb" }} />
              </DashBoardCategory>
              <List>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowClientsUserList(false);
                    setShowServiceGraph(false);
                    setShowCardServiceList(false);
                    setShowProductListDashboard(true);
                  }}
                >
                  <ListItemText primary="Product List" />
                </DashBoardListItem>
              </List>

              {/* Categoría Users */}
              <DashBoardCategory>
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "#bbbbbb" }} />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ color: "#bbbbbb" }} />
              </DashBoardCategory>
              <List>
                <DashBoardListItem
                  button
                  onClick={() => {
                    setShowCardServiceList(false);
                    setShowServiceGraph(false);
                    setShowClientsUserList(true);
                  }}
                >
                  <ListItemText primary="People" />
                </DashBoardListItem>
              </List>
            </List>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              padding: "20px",
              overflowY: "auto",
            }}
          >
            {/* Contenido principal */}
            {showClientsUserList && <UserList />}
            {showCardServiceList && (
              <ServiceCardList services={transformedServices} />
            )}
            {showServiceGraph && <ServiceGraph data={formattedGraphData} />}
            {showProductListDashboard && <ProductListDashboard />}
          </Box>
        </>
      )}
    </Box>
  );
}

export default Dashboard;
