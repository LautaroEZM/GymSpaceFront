import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CssBaseline,
  ThemeProvider,
  Box,
} from "@mui/material";
import theme from "../../../theme";
import {
  OrangeContainedButton,
  BlueContainedButton,
  RedOutlinedButton,
  StyledSelect,
  StyledMenuItemSelect,
  TextFieldForm,
  LinkNoDeco,
} from "../../../styles/ComponentStyles";

import UpdateUser from "../../UpdateUser/UpdateUser";
import { API_URL } from "../../../utils/constants";
import { buildReq } from "../../../utils/auth0Utils";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../../components/Loading/loading";
import { useSelector } from "react-redux";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [hoveredRow, setHoveredRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("firstName");
  const [selectedRole, setSelectedRole] = useState("all");

  const { getAccessTokenSilently } = useAuth0();

  const loadingImage =
    "https://firebasestorage.googleapis.com/v0/b/gymspace-d93d8.appspot.com/o/loading.gif?alt=media&token=9b285b61-c22f-4f7f-a3ca-154db8d99d73";

  const [loading, setLoading] = useState(false);

  const reduxUser = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    fetch("https://gymspace-backend.onrender.com/Users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedRole("all"); // Reinicia el filtro de roles al cambiar la categoría
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (id) => {
    if (reduxUser.systemRole !== "Admin") {
      window.alert("You do not have permission to do that");
      return;
    }
    try {
      const req = await buildReq({}, getAccessTokenSilently);
      const response = await axios.delete(`${API_URL}/Users/${id}`, req);
      const { data } = response;
      if (data) {
        const updatedUsers = users.filter((user) => user.userID !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  const sortedUsers = () => {
    const sortableUsers = users.slice(); // Copia el array para evitar mutar el estado directamente
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  };

  const renderTableHeader = () => (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#414141" }}>
        <SortableTableCell
          onClick={() => handleSort("firstName")}
          label="FIRST NAME"
          sorted={sortConfig.key === "firstName"}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort("lastName")}
          label="LAST NAME"
          sorted={sortConfig.key === "lastName"}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort("phone")}
          label="PHONE"
          sorted={sortConfig.key === "phone"}
          direction={sortConfig.direction}
          maxWidth={70}
        />
        <SortableTableCell
          onClick={() => handleSort("email")}
          label="EMAIL"
          sorted={sortConfig.key === "email"}
          direction={sortConfig.direction}
          maxWidth={400}
        />
        <TableCell
          sx={{
            fontSize: 18,
            color: "white",
            width: 100,
            backgroundColor: "#414141",
            border: "1px solid white",
            textAlign: "center",
          }}
        >
          ACTIONS
        </TableCell>
      </TableRow>
    </TableHead>
  );

  const renderTableData = () => {
    const userRedux = useSelector((state) => state.user);

    const filteredByRole =
      selectedRole === "all"
        ? sortedUsers()
        : sortedUsers().filter((user) => user.systemRole === selectedRole);

    return (
      
      <TableBody>
        {filteredByRole.map((user, index) => (
          <TableRow
            key={user.userID}
            sx={{
              backgroundColor: index === hoveredRow ? "#333333" : "#414141",
              color: "white",
              border: "1px solid white",
            }}
            onMouseEnter={() => setHoveredRow(index)}
            onMouseLeave={() => setHoveredRow(null)}
          >
            <TableCell
              sx={{
                fontSize: 14,
                color: "white",
                maxWidth: 100,
                border: "1px solid white",
              }}
            >
              {user.firstName}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: "white",
                maxWidth: 100,
                border: "1px solid white",
              }}
            >
              {user.lastName}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: "white",
                maxWidth: 100,
                border: "1px solid white",
              }}
            >
              {user.phone}
            </TableCell>
            <TableCell
              sx={{
                fontSize: 14,
                color: "white",
                maxWidth: 100,
                border: "1px solid white",
              }}
            >
              {user.email}
            </TableCell>
            <TableCell
              sx={{
                display: "flex",
                gap: "8px",
                minWidth: 150,
                border: "1px solid white",
                justifyContent: "center",
              }}
            >
              <LinkNoDeco to={`/UsersDetail/${user.userID}`}>
                <OrangeContainedButton>DETAIL</OrangeContainedButton>
              </LinkNoDeco>
              {userRedux.systemRole === "Admin" && (
                <>
                  <LinkNoDeco to={`/UpdateUser/${user.userID}`}>
                    <BlueContainedButton>UPDATE</BlueContainedButton>
                  </LinkNoDeco>
                  <RedOutlinedButton onClick={() => handleDelete(user.userID)}>
                    DELETE
                  </RedOutlinedButton>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  };

  const SortableTableCell = ({
    onClick,
    label,
    sorted,
    direction,
    maxWidth,
  }) => (
    <TableCell
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: 18,
        color: "white",
        maxWidth,
        backgroundColor: sorted ? "#333333" : "#414141",
        border: "1px solid white",
        textAlign: "center",
      }}
    >
      {label} {sorted && (direction === "ascending" ? "▲" : "▼")}
    </TableCell>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          margin: "0 auto",
          minHeight: "100vh",
        }}
      >
        <Box sx={{
          color: "#f3a143",
          fontSize: "40px",
        }}>USERS LIST</Box>
        <Box
          sx={{
            py: 1,
            flexGrow: 1,
            width: "90%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
              marginBottom: "5px",
            }}
          >
            <StyledSelect
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                width: "100%",
                maxWidth: "200px",
                marginBottom: "5px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "black",
                  },
                },
              }}
            >
              <StyledMenuItemSelect value="firstName">
                First Name
              </StyledMenuItemSelect>
              <StyledMenuItemSelect value="lastName">
                Last Name
              </StyledMenuItemSelect>
              <StyledMenuItemSelect value="phone">Phone</StyledMenuItemSelect>
              <StyledMenuItemSelect value="email">Email</StyledMenuItemSelect>
            </StyledSelect>

            <TextFieldForm
              label="Search"
              value={searchTerm}
              onChange={handleSearchTermChange}
              sx={{
                width: "100%",
                maxWidth: "400px",
                marginBottom: "10px",
              }}
            />

            <StyledSelect
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              sx={{
                width: "100%",
                maxWidth: "200px",
                marginBottom: "10px",
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "black",
                  },
                },
              }}
            >
              <StyledMenuItemSelect value="all">All Roles</StyledMenuItemSelect>
              <StyledMenuItemSelect value="Admin">Admin</StyledMenuItemSelect>
              <StyledMenuItemSelect value="User">User</StyledMenuItemSelect>
              <StyledMenuItemSelect value="Coach">Coach</StyledMenuItemSelect>
            </StyledSelect>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              {renderTableHeader()}
              {renderTableData()}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
