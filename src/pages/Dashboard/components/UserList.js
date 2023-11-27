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
  MenuItem,
} from "@mui/material";
import theme from "../../../theme";
import {
  OrangeContainedButton,
  RedOutlinedButton,
  StyledSelect,
  StyledMenuItemSelect,
  TextFieldForm,
  LinkNoDeco,
} from "../../../styles/ComponentStyles";

import ChangeRole from "./ChangeRole";

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

  const reduxUser = useSelector((state) => state.user);

  useEffect(() => {
    fetch("https://gymspace-backend.onrender.com/Users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
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
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user[selectedCategory].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (userId) => {
    if (reduxUser.systemRole !== "Admin") {
      window.alert("You do not have permission to do that");
      return;
    }
    fetch(`https://gymspace-backend.onrender.com/Users/${userId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedUsers = users.filter((user) => user.userID !== userId);
        setUsers(updatedUsers);
      })
      .catch((error) => console.error("Error deleting user:", error));
  };

  const sortedUsers = () => {
    const sortableUsers = [...filteredUsers];
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
          maxWidth={200}
        />
        <SortableTableCell
          onClick={() => handleSort("lastName")}
          label="LAST NAME"
          sorted={sortConfig.key === "lastName"}
          direction={sortConfig.direction}
          maxWidth={200}
        />
        <SortableTableCell
          onClick={() => handleSort("gender")}
          label="GENDER"
          sorted={sortConfig.key === "gender"}
          direction={sortConfig.direction}
          maxWidth={150}
        />
        <SortableTableCell
          onClick={() => handleSort("phone")}
          label="PHONE"
          sorted={sortConfig.key === "phone"}
          direction={sortConfig.direction}
          maxWidth={150}
        />
        <SortableTableCell
          onClick={() => handleSort("status")}
          label="STATUS"
          sorted={sortConfig.key === "status"}
          direction={sortConfig.direction}
          maxWidth={50}
        />
        <TableCell
          sx={{
            fontSize: 18,
            color: "white",
            minWidth: 150,
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
    const userRedux = useSelector((state) => state.user)


    return (
      <TableBody>
        {sortedUsers().map((user, index) => (
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
              {user.gender}
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
              {user.status}
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
              <RedOutlinedButton onClick={() => handleDelete(user.userID)}>
                DELETE
              </RedOutlinedButton>
            </TableCell>
            {userRedux.systemRole === "Admin" ? (
              <TableCell
                sx={{
                  fontSize: 14,
                  color: "white",
                  maxWidth: 100,
                  border: "1px solid white",
                }}
              >
                <ChangeRole role={user.systemRole} userID={user.userID} />
              </TableCell>
            ) : null}
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
        <Box
          sx={{
            py: 1,
            flexGrow: 1,
            width: "90%",
            marginTop: 5,
          }}
        >
          <TextFieldForm
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <StyledSelect
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <StyledMenuItemSelect value="firstName">
              First Name
            </StyledMenuItemSelect>
            <StyledMenuItemSelect value="lastName">
              Last Name
            </StyledMenuItemSelect>
            <StyledMenuItemSelect value="phone">Phone</StyledMenuItemSelect>
          </StyledSelect>
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
