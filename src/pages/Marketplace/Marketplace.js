import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Stack,
  Box,
  Typography,
  Container,
  ThemeProvider,
  Menu,
  MenuItem,
  Chip,
} from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Category as CategoryIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import theme from "../../theme";

export default function Marketplace() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/services")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        const uniqueCategories = Array.from(
          new Set(data.map((service) => service.category))
        );
        setCategories(uniqueCategories);
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
          position: "relative",
        }}
      >
        <main>
          <Container sx={{ py: 1, flexGrow: 1 }} maxWidth="xl">
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box sx={{ pt: 1, pb: 6 }}>
                  <Container maxWidth="md">
                    <Typography
                      variant="h2"
                      align="center"
                      color="white"
                      gutterBottom
                    >
                      List of classes
                    </Typography>
                  </Container>
                </Box>
              </Grid>
            </Grid>
            <Stack
              sx={{
                width: "100%",
                height: "40px",
                backgroundColor: "#131313",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
              spacing={2}
            >
              <Button
                variant="outlined"
                color="orangeButton"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  borderRadius: 0,
                  border: 0,
                  marginRight: 2,
                  minWidth: 300,
                }}
              >
                ADD SERVICE
              </Button>
              <Button
                variant="outlined"
                color="orangeButton"
                onClick={handleMenuClick}
                startIcon={<CategoryIcon />}
                sx={{
                  minWidth: 300,
                  borderRadius: 0,
                  border: 0,
                }}
              >
                {selectedCategories.length > 0
                  ? "Selected Categories"
                  : "Select Category"}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    backgroundColor: "#000000e8",
                    color: "#ff9721",
                    width: "200px",
                    borderRadius: "0px",
                    position: "absolute",
                    transform: "translate(0, 5px)",
                    boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    onClick={() => handleMenuItemClick(category)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
            </Stack>
          </Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "60px",
            }}
          >
            {selectedCategories.map((category, index) => (
              <Chip
                key={index}
                label={category}
                onDelete={() => handleClearFilter(category)}
                deleteIcon={
                  <ClearIcon style={{ color: "black", fontWeight: "bold" }} />
                }
                color="secondary"
                sx={{
                  marginRight: "8px",
                  backgroundColor: "#ff9721",
                  color: "black",
                  fontWeight: "bold", 
                }}
              />
            ))}
          </Box>
          <Container sx={{ py: 1, flexGrow: 1 }} maxWidth="xl">
            <Grid container spacing={5} marginTop={0.1}>
              {services
                .filter(
                  (service) =>
                    selectedCategories.length === 0 ||
                    selectedCategories.includes(service.category)
                )
                .map((service) => (
                  <Grid item key={service.serviceID} xs={12} sm={3} md={3}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#414141",
                        color: "white",
                        boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
                      }}
                    >
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
                        <Button size="small" color="orangeButton">
                          View
                        </Button>
                        <Button size="small" color="orangeButton">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </main>
      </Box>
    </ThemeProvider>
  );
}
