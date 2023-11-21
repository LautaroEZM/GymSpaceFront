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
  CardMedia,
} from "@mui/material";
import theme from "../../../theme";
import { OrangeContainedButton } from "../../../styles/ComponentStyles";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const sortedUsers = () => {
    const sortableUsers = [...users];
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
          onClick={() => handleSort("photo")}
          label="PHOTO"
          sorted={sortConfig.key === "photo"}
          direction={sortConfig.direction}
          maxWidth={500}
        />
        <SortableTableCell
          onClick={() => handleSort("firstName")}
          label="FIRST NAME"
          sorted={sortConfig.key === "firstName"}
          direction={sortConfig.direction}
          maxWidth={50}
        />
        <SortableTableCell
          onClick={() => handleSort("lastName")}
          label="LAST NAME"
          sorted={sortConfig.key === "lastName"}
          direction={sortConfig.direction}
          maxWidth={50}
        />
        <SortableTableCell
          onClick={() => handleSort("gender")}
          label="GENDER"
          sorted={sortConfig.key === "gender"}
          direction={sortConfig.direction}
          maxWidth={50}
        />
        <SortableTableCell
          onClick={() => handleSort("phone")}
          label="PHONE"
          sorted={sortConfig.key === "phone"}
          direction={sortConfig.direction}
          maxWidth={50}
        />
        <SortableTableCell
          onClick={() => handleSort("status")}
          label="STATUS"
          sorted={sortConfig.key === "status"}
          direction={sortConfig.direction}
          maxWidth={50}
        />
        <SortableTableCell
          onClick={() => handleSort("actions")}
          label="ACTIONS"
          sorted={sortConfig.key === "actions"}
          direction={sortConfig.direction}
          maxWidth={30}
        />
      </TableRow>
    </TableHead>
  );

  const renderTableData = () => (
    <TableBody>
      {sortedUsers().map((user, index) => (
        <TableRow
          key={user.userID}
          sx={{
            backgroundColor: index === hoveredRow ? "#333333" : "#414141",
            color: "white",
            border: "1px solid white",

            boxShadow: index === hoveredRow ? "0 0 5px white" : "none",
          }}
          onMouseEnter={() => setHoveredRow(index)}
          onMouseLeave={() => setHoveredRow(null)}
        >
          <TableCell sx={{ maxWidth: 200 }}>
            <CardMedia
              component="div"
              sx={{
                pt: "37.5%",
                background: `url(${user.photo})`,
              }}
            />
          </TableCell>
          <TableCell sx={{ fontSize: 16, color: "white", maxWidth: 100 }}>
            {user.firstName}
          </TableCell>
          <TableCell sx={{ fontSize: 16, color: "white", maxWidth: 100 }}>
            {user.lastName}
          </TableCell>
          <TableCell sx={{ fontSize: 16, color: "white", maxWidth: 100 }}>
            {user.gender}
          </TableCell>
          <TableCell sx={{ fontSize: 16, color: "white", maxWidth: 100 }}>
            {user.phone}
          </TableCell>
          <TableCell sx={{ fontSize: 16, color: "white", maxWidth: 100 }}>
            {user.status}
          </TableCell>
          <TableCell sx={{ maxWidth: 50 }}>
            <OrangeContainedButton>DETAIL</OrangeContainedButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );

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
        border: sorted ? "1px solid white" : "none",
        boxShadow: sorted ? "0 0 5px white" : "none",
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
