import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Box,
  Typography,
  ThemeProvider,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
  Rating,
  Collapse,
  Slider,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import theme from "../../theme";
import { Link } from "react-router-dom";
export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sorting, setSorting] = useState({ type: "none", order: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetch("https://gymspace-backend.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const allCategories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const handleCategoryFilter = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  const handlePriceFilter = (event, newValue) => setPriceRange(newValue);

  const handleManualPriceChange = (event, type) => {
    const value = parseFloat(event.target.value);

    setPriceRange((prevPriceRange) => {
      if (type === "min") {
        return [Math.min(value, prevPriceRange[1]), prevPriceRange[1]];
      } else if (type === "max") {
        return [prevPriceRange[0], Math.max(value, prevPriceRange[0])];
      }
      return prevPriceRange;
    });
  };

  const handleSortClick = (event) => setAnchorEl(event.currentTarget);

  const handleSortChange = (type) => {
    setSorting((prevSorting) => ({
      type,
      order:
        prevSorting.type === type && prevSorting.order === "asc"
          ? "desc"
          : "asc",
    }));
    setAnchorEl(null);
  };

  const maxProductPrice = Math.ceil(
    Math.max(...products.map((product) => parseFloat(product.price)))
  );

  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price);
    const isCategoryFiltered =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const isPriceFiltered = price >= priceRange[0] && price <= priceRange[1];
    return isCategoryFiltered && isPriceFiltered;
  });

  const sortedProducts = () => {
    if (sorting.type === "price") {
      return [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return sorting.order === "asc" ? priceA - priceB : priceB - priceA;
      });
    } else if (sorting.type === "alphabetical") {
      return [...filteredProducts].sort((a, b) =>
        sorting.order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else {
      return filteredProducts;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <AppBar
            position="static"
            sx={{ backgroundColor: "transparent", boxShadow: "none" }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <FilterListIcon style={{ color: "#ff9721" }} />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "#ff9721" }}
              >
                FILTER BY
              </Typography>
              <IconButton
                color="inherit"
                style={{ color: "#ff9721", width: "48px", height: "48px" }}
                onClick={handleSortClick}
              >
                <Badge color="secondary">
                  <SortIcon />
                </Badge>
              </IconButton>
              <Link to="/CreateProduct">
                <Button
                  variant="outlined"
                  color="orangeButton"
                  startIcon={<AddCircleOutlineIcon />}
                  style={{
                    color: "#ff9721",
                    textTransform: "none",
                    height: "50px",
                    width: "auto",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  ADD PRODUCT
                </Button>
              </Link>
            </Toolbar>
            <Collapse in={filterOpen} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  width: "90%",
                  border: "1px solid white",
                  boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
                  margin: "auto", // Agrega esta línea
                }}
              >
                <Typography variant="h6" sx={{ color: "#ff9721", mb: 1 }}>
                  CATEGORY
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {allCategories.slice(0, 10).map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategories.includes(category)
                          ? "contained"
                          : "outlined"
                      }
                      color="orangeButton"
                      onClick={() => handleCategoryFilter(category)}
                      sx={{ margin: 0.5 }}
                    >
                      {category}
                    </Button>
                  ))}
                </Box>
                <Typography
                  variant="h6"
                  sx={{ color: "#ff9721", mt: 2, mb: 1 }}
                >
                  PRICE
                </Typography>
                <Box
                  sx={{
                    width: "80%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      color: "#ff9721",
                      marginLeft: "16px",
                      marginRight: "16px",
                    }}
                  >
                    <TextField
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => handleManualPriceChange(e, "min")}
                      label="Min"
                      variant="filled"
                      InputLabelProps={{ style: { color: "#ff9721" } }}
                      InputProps={{
                        inputProps: { min: 0 },
                        style: {
                          color: "#ff9721",
                          "& input": { color: "#ff9721" },
                          "& fieldset": { borderColor: "#ff9721" },
                        },
                      }}
                    />
                    <Slider
                      value={priceRange}
                      onChange={handlePriceFilter}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      valueLabelFormat={(value) => `$${value}`}
                      max={maxProductPrice}
                      sx={{
                        width: "calc(100% - 32px)",
                        marginLeft: "16px",
                        marginRight: "16px",
                        color: "#ff9721",
                      }}
                    />
                    <TextField
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => handleManualPriceChange(e, "max")}
                      label="Max"
                      variant="filled"
                      InputLabelProps={{ style: { color: "#ff9721" } }}
                      InputProps={{
                        inputProps: { min: 0 },
                        style: {
                          color: "#ff9721",
                          "& input": { color: "#ff9721" },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Collapse>
          </AppBar>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          PaperProps={{
            style: {
              backgroundColor: "#111111",
              width: "350px",
              borderRadius: "0px",
              transform: "translate(0, 5px)",
              boxShadow: "0px 0px 5px 1px rgba(207, 207, 207, 0.75)",
              color: "#ff9721",
            },
          }}
        >
          <MenuItem onClick={() => handleSortChange("price")}>
            Sort by Price{" "}
            {sorting.type === "price" && sorting.order === "asc" && "▲"}
            {sorting.type === "price" && sorting.order === "desc" && "▼"}
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("alphabetical")}>
            Sort Alphabetically{" "}
            {sorting.type === "alphabetical" && sorting.order === "asc" && "▲"}
            {sorting.type === "alphabetical" && sorting.order === "desc" && "▼"}
          </MenuItem>
        </Menu>

        <Box
          sx={{
            mt: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "90%", marginBottom: "40px" }}>
            <Grid container spacing={2}>
              {sortedProducts().map((product) => (
                <Grid
                  item
                  key={product.productID}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={2}
                  xl={2}
                >
                  <Card
                    sx={{
                      height: "100%",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      border: "none",
                      transition: "box-shadow 0.3s, border 0.3s",
                      "&:hover": {
                        border: "1px solid #fff",
                        boxShadow: "0px 0px 10px 0px rgba(255,255,255,0.5)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}
                      style={{ color: "#fff", fontStyle: "italic", fontSize: "14px" }} // Añade este estilo
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name={`rating-${product.productID}`}
                        value={4}
                        precision={0.5}
                        readOnly
                        sx={{ marginBottom: 1, color: "#ff9721" }}
                      />
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{ color: "#fff", textAlign: "center" }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ color: "#fff", textAlign: "center" }}
                      >
                        ${product.price}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "center" }}>
                      <Button size="small" color="orangeButton">
                        VIEW DETAIL
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
