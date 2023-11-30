import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  ThemeProvider,
  IconButton,
  AppBar,
  Toolbar,
  Badge,
} from "@mui/material";
import {
  AddCircleOutline as AddCircleOutlineIcon,
  Sort as SortIcon,
  FilterList as FilterListIcon,
} from "@mui/icons-material";
import theme from "../../theme";
import { OrangeOutlinedButton, LinkNoDeco } from "../../styles/ComponentStyles";
import FilterBar from "./FilterBar";
import SortMenu from "./SortMenu";
import ProductList from "./ProductList";
import { useSelector, useDispatch} from "react-redux";
import Loading from "../../components/Loading/loading";
import { setUser } from "../../REDUX/actions";
import axios from "axios";

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sorting, setSorting] = useState({ type: "none", order: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);
  const user = useSelector((state) => state.user);
  const [noProducts, setNoProducts] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    const getFavorites = async () => {
      const userFavorites = `https://gymspace-backend.onrender.com/users/favorites/${user.userID}`;
      const { data } = await axios.get(userFavorites);
      const favoriteProducts = [];
      const favoriteServices = [];
      for (const fav of data) {
        if (fav.type === "prod") {
          favoriteProducts.push(fav.id);
        }
        if (fav.type === "serv") {
          favoriteServices.push(fav.id);
        }
      }
      dispatch(
        setUser({
          ...user,
          favoriteProducts,
          favoriteServices,
        })
      );
    };
    if (user.userID) getFavorites();
  }, [user.userID]);

  useEffect(() => {
    setLoading(true);
    fetch("https://gymspace-backend.onrender.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .then(() => setLoading(false))
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

  const handleShowOnlyFavorites = (newShowOnlyFavorites) => {
    setShowOnlyFavorites(newShowOnlyFavorites);
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
    Math.max(...products.map((product) => product.price))
  );

  const [priceRange, setPriceRange] = useState([0, 10000]);

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

  useEffect(() => {
    if (filteredProducts.length === 0) setNoProducts(true);
    else setNoProducts(false);
  }, [filteredProducts]);

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
              <Typography sx={{ flexGrow: 1, color: "#ff9721" }}>
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
              {user.systemRole === "Admin" ? (
                <LinkNoDeco to="/CreateProduct">
                  <OrangeOutlinedButton
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    NEW PRODUCT
                  </OrangeOutlinedButton>
                </LinkNoDeco>
              ) : null}
            </Toolbar>
            <FilterBar
              allCategories={allCategories}
              selectedCategories={selectedCategories}
              handleCategoryFilter={handleCategoryFilter}
              priceRange={priceRange}
              handleManualPriceChange={handleManualPriceChange}
              handlePriceFilter={handlePriceFilter}
              filterOpen={filterOpen}
              setFilterOpen={setFilterOpen}
              maxProductPrice={maxProductPrice}
              handleShowOnlyFavorites={handleShowOnlyFavorites}
            />
          </AppBar>
        </Box>
        <SortMenu
          anchorEl={anchorEl}
          handleSortChange={handleSortChange}
          sorting={sorting}
          setAnchorEl={setAnchorEl}
        />
        {noProducts && !loading ? <h1>No products found</h1> : null}
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <ProductList
              user={user}
              showOnlyFavorites={showOnlyFavorites}
              sortedProducts={sortedProducts}
              maxProductPrice={maxProductPrice}
            />
          </>
        )}
      </Box>
    </ThemeProvider>
  );
}