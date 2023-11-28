import * as React from "react";
import { useState } from "react";
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
import {
  DashBoardCategory,
  DashBoardListItem,
} from "../../styles/ComponentStyles";
import UserList from "./components/UserList";
import CoachesList from "./components/CoachesList";

function Dashboard() {
  const [showClientsUserList, setShowClientsUserList] = useState(false);
  const [showCoachesList, setShowCoachesList] = useState(false);

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
              onClick={() => {setShowClientsUserList(true);setShowCoachesList(false)}}
            >
              <ListItemText primary="People" />
            </DashBoardListItem>
            {/* <DashBoardListItem 
              button
              onClick={() => {setShowCoachesList(true);setShowClientsUserList(false)}}
            >
              <ListItemText primary="Professors" />
            </DashBoardListItem> */}
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
        {/* {showCoachesList && <CoachesList />} */}
      </Box>
    </Box>
  );
}

export default Dashboard;
