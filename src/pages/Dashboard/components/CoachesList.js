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
    RedOutlinedButton,
    TextFieldForm,
} from "../../../styles/ComponentStyles";
import { Link } from "react-router-dom";

export default function CoachesList() {

    const [coaches, setCoaches] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });
    const [hoverRow, setHoverRow] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch("https://gymspace-backend.onrender.com/coaches")
            .then((response) => response.json())
            .then((data) => {
                setCoaches(data);
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

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredCoaches = coaches.filter((coach) =>
        coach['firstName'].toLowerCase().includes(searchTerm.toLowerCase().trim()) || coach['lastName'].toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    const handleDelete = (coachId) => {
        fetch(`https://gymspace-backend.onrender.com/coaches/${coachId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                const updatedCoaches = coaches.filter((coach) => coach.userID !== coachId);
                setCoaches(updatedCoaches);
            })
            .catch((error) => console.error("Error deleting coach:", error));
    };

    const sortedCoaches = () => {
        const sortableCoaches = [...filteredCoaches];
        if (sortConfig.key !== null) {
            sortableCoaches.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCoaches;
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
                    onClick={() => handleSort("valuation")}
                    label="VALUATION"
                    sorted={sortConfig.key === "valuation"}
                    direction={sortConfig.direction}
                    maxWidth={150}
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


    const renderTableData = () => (
        <TableBody>
            {sortedCoaches().map((coach, index) => (
                <TableRow
                    key={coach.userID}
                    sx={{
                        backgroundColor: index === hoverRow ? "#333333" : "#414141",
                        color: "white",
                        border: "1px solid white",
                    }}
                    onMouseEnter={() => setHoverRow(index)}
                    onMouseLeave={() => setHoverRow(null)}
                >
                    <TableCell
                        sx={{
                            fontSize: 14,
                            color: "white",
                            maxWidth: 100,
                            border: "1px solid white",
                        }}
                    >
                        {coach.firstName}
                    </TableCell>
                    <TableCell
                        sx={{
                            fontSize: 14,
                            color: "white",
                            maxWidth: 100,
                            border: "1px solid white",
                        }}
                    >
                        {coach.lastName}
                    </TableCell>
                    <TableCell
                        sx={{
                            fontSize: 14,
                            color: "white",
                            maxWidth: 100,
                            border: "1px solid white",
                        }}
                    >
                        {coach.valuation}
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
                        <Link to={`/UsersDetail/${coach.userID}`}>
                            <OrangeContainedButton>
                                DETAIL
                            </OrangeContainedButton>
                        </Link>
                        <RedOutlinedButton onClick={() => handleDelete(coach.userID)}>
                            DELETE
                        </RedOutlinedButton>
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
