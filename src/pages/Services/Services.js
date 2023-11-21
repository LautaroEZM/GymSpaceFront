// Album.js
import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Container,
  Typography,
  ThemeProvider,
  Grid,
} from "@mui/material";
import theme from "../../theme";
import ServiceFilter from "./ServiceFilter";
import ServiceChip from "./ServiceChip";
import ServiceCard from "./ServiceCard";
import Loading from '../../components/Loading/loading'

export default function Album() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://gymspace-backend.onrender.com/Services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category))
        );
        setCategories(uniqueCategories);
        setLoading(false)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
    setAnchorEl(null);
  };

  const handleClearFilter = (category) => {
    const updatedCategories = selectedCategories.filter(
      (selectedCategory) => selectedCategory !== category
    );
    setSelectedCategories(updatedCategories);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
  
          width: "85%",
          margin: "0 auto",
          marginTop: "45px",
          marginBottom: "45px",
          borderRadius: "5px",
        }}
      >

        <main>
          <Container sx={{ py: 1, flexGrow: 1 }} maxWidth="xl">
            <ServiceFilter
              categories={categories}
              selectedCategories={selectedCategories}
              anchorEl={anchorEl}
              handleMenuClick={handleMenuClick}
              handleMenuItemClick={handleMenuItemClick}
              handleClearFilter={handleClearFilter}
              handleClose={handleClose}
            />
          </Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            {loading ? <Loading loading={loading} /> : null}
            {selectedCategories.map((category, index) => (
              <ServiceChip
                key={index}
                category={category}
                handleClearFilter={handleClearFilter}
              />
            ))}
          </Box>
          <Container sx={{ py: 1, flexGrow: 1 }} maxWidth="xl">
            <Grid container spacing={5} marginTop={0.1} justifyContent="center">
              {" "}
              {services
                .filter(
                  (service) =>
                    selectedCategories.length === 0 ||
                    selectedCategories.includes(service.category)
                )
                .map((service) => (
                  <ServiceCard key={service.serviceID} service={service} />
                ))}
            </Grid>
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}
