import * as React from "react";
import { useState , useEffect } from "react";
import {
  CssBaseline,
  Box,
  List,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import {
  DashBoardCategory,
  DashBoardListItem,
} from "../../styles/ComponentStyles";
import UserList from "./components/UserList";
import ServiceCardList from "./components/ServiceCardList";
import ServiceGraph from "./components/ServiceGraph";
import { API_URL } from "./../../utils/constants";
import axios from 'axios';

function Dashboard() {
  const [showClientsUserList, setShowClientsUserList] = useState(false);
  const [showCardServiceList, setShowCardServiceList] = useState(false);
  const [showServiceGraph, setShowServiceGraph] = useState(false);
  const [services, setServices] = useState([]);
  const [userservices, setUserservices] = useState([]);

  useEffect(()=>{
    const getServices = async () => {
      try {
        const response = await axios.get(`${API_URL}/services`);
        const { data } = response;

        setServices(data);

      } catch (error) {
        console.error('Error fetching Services:',error.message);
      }
    }
    const getUserservices = async () => {
      try {
        const response = await axios.get(`${API_URL}/userservices`);
        const { data } = response;

        setUserservices(data);

      } catch (error) {
        console.error('Error fetching Userservices:',error.message);
      }
    }
    getServices();
    getUserservices();
  },[]);

  const enrolledPeople = ['angel', 'lautaro', 'adrian', 'kevin'];

  const transformedServices = services.map(service => {
    const enrolledPeople = userservices
      .filter(userService => userService.serviceID === service.serviceID)
      .map(userService => `${userService.User.firstName} ${userService.User.lastName}`);
  
    return {
      serviceName: service.name,
      extraInfo: service.description,
      coaches: service.Users.map(user => `${user.firstName} ${user.lastName}`),
      enrolledPeople: enrolledPeople
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
  
  const formattedGraphData = Object.keys(graphdata).map(service => ({
    service: service,
    users: graphdata[service]
  }));

  return (
    <Box sx={{ display: "flex", height: "90vh" }}>
      <CssBaseline />
      <Box
        sx={{
          width: "13%",
          height: "100%",
          backgroundColor: "#141414",
        }}
      >
        {/* Menú lateral */}
        <List sx={{ marginTop: "20px" }}>
          <DashBoardCategory>
            <ListItemIcon>
              <BusinessIcon sx={{ color: "#bbbbbb" }} />
            </ListItemIcon>
            <ListItemText primary="Management" sx={{ color: "#bbbbbb" }} />
          </DashBoardCategory>
          <List>
            <DashBoardListItem button>
              <ListItemText primary="Option 1" />
            </DashBoardListItem>
            <DashBoardListItem button>
              <ListItemText primary="Option 2" />
            </DashBoardListItem>
            <DashBoardListItem button>
              <ListItemText primary="Option 3" />
            </DashBoardListItem>
          </List>

          {/* Categoria de Servicios */}
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
            <ListItemText primary="Finances" sx={{ color: "#bbbbbb" }} />
          </DashBoardCategory>
          <List>
            <DashBoardListItem button>
              <ListItemText primary="Option 1" />
            </DashBoardListItem>
            <DashBoardListItem button>
              <ListItemText primary="Option 2" />
            </DashBoardListItem>
            <DashBoardListItem button>
              <ListItemText primary="Option 3" />
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

          {/* Categoría Personalization */}
          <DashBoardCategory>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#bbbbbb" }} />
            </ListItemIcon>
            <ListItemText primary="Personalization" sx={{ color: "#bbbbbb" }} />
          </DashBoardCategory>
          <List>
            <DashBoardListItem button>
              <ListItemText primary="Option 1" />
            </DashBoardListItem>
            <DashBoardListItem button>
              <ListItemText primary="Option 2" />
            </DashBoardListItem>
            <DashBoardListItem button>
              <ListItemText primary="Option 3" />
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
        {/* Contenido de la página a la derecha del menú */}
        {showClientsUserList && <UserList />}
        {showCardServiceList && <ServiceCardList services={transformedServices} />}
        {showServiceGraph && <ServiceGraph data={formattedGraphData} />}
      </Box>
    </Box>
  );
}

export default Dashboard;
