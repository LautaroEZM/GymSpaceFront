// Album.js
import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Container,
  ThemeProvider,
  Grid,
} from "@mui/material";
import theme from "../../theme";
import ServiceFilter from "./ServiceFilter";
import ServiceChip from "./ServiceChip";
import ServiceCard from "./ServiceCard";
import Loading from "../../components/Loading/loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CardMedia, CardContent, CardActions, Typography } from "@mui/material";
import {
  ServicesCard,
  LinkNoDeco,
  SmallOrangeOutlinedButtonLess,
} from "../../styles/ComponentStyles";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";
import dayjs from "dayjs";
export default function Album() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [servicesCart, setServicesCart] = useLocalStorage("service", []);

  useEffect(() => {}, [servicesCart]);

  useEffect(() => {
    fetch("https://gymspace-backend.onrender.com/Services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category))
        );
        setCategories(uniqueCategories);
        setLoading(false);
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
                 
                  <ServicesCard key={service.serviceID}>
                    <CardMedia
                      component="div"
                      sx={{
                        pt: "56.25%",
                        background: `url(${service.image})`,
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        color="black"
                        align="center"
                        fontWeight="bold"
                        sx={{
                          textTransform: "uppercase",
                          backgroundColor: "#ff9721",
                          width: "100%",
                          padding: "8px",
                          marginBottom: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        {service.category}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {service.name}
                      </Typography>
                      <Typography
                        color="white"
                        align="justify"
                        mb={1}
                        sx={{ height: "60px", overflow: "hidden" }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <LinkNoDeco to={`/ServiceDetail/${service.serviceID}`}>
                        <SmallOrangeOutlinedButtonLess>
                          View
                        </SmallOrangeOutlinedButtonLess>
                      </LinkNoDeco>
                      <SmallOrangeOutlinedButtonLess>
                        Edit
                      </SmallOrangeOutlinedButtonLess>
                      {servicesCart.filter(
                        (item) => item.serviceID === service.serviceID
                      ).length ? (
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                          sx={{ fontSize: "13px" }}
                          onClick={() =>
                            setServicesCart(
                              servicesCart.filter(
                                (item) => item.serviceID !== service.serviceID
                              )
                            )
                          }
                        >
                          <div>X</div>
                        </IconButton>
                      ) : (
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                          sx={{ fontSize: "13px" }}
                          onClick={() =>
                            setServicesCart([
                              ...servicesCart,
                              { ...service, quantity: 1, startDate: dayjs()  },
                            ])
                          }
                        >
                          <div>Añadir</div>
                          <div>Al</div>
                          <div>Carrito</div>

                          <AddShoppingCartIcon />
                        </IconButton>
                      )}
                    </CardActions>
                    </ServicesCard>
                    
                 
                ))}
            </Grid>
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}
