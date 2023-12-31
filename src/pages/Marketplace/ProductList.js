import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Rating,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  SmallOrangeOutlinedButton,
  ProductCard,
  LinkNoDeco,
} from "../../styles/ComponentStyles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocalStorage } from "../../components/Hooks/useLocalStorage";
import { setFavorites } from "../../REDUX/actions";

export default function ProductList({ sortedProducts, showOnlyFavorites }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);
  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [selectedProducts, setSelectedProducts] = useLocalStorage(
    "product",
    []
  );
  useEffect(() => {}, [selectedProducts]);

  const handleFavoriteToggle = async (index) => {
    try {
      if (user && user.userID) {
        const productId = String(sortedProducts()[index].productID);

        await axios.put(
          `https://gymspace-backend.onrender.com/Users/${user.userID}`,
          {
            ...user,
            favoriteProducts: productId,
          }
        );

        const userFavorites = `https://gymspace-backend.onrender.com/users/favorites/${user.userID}`;
        const { data } = await axios.get(userFavorites);
        dispatch(setFavorites(data));

        const updatedStatus = [...favoriteStatus];
        updatedStatus[index] = !updatedStatus[index];
        setFavoriteStatus(updatedStatus);
      } else {
        console.error("user.userID no es válido");
      }
    } catch (error) {
      console.error("Error al actualizar la base de datos del usuario:", error);
    }
  };

  return (
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
          {sortedProducts()
            .filter((product) => {
              if (showOnlyFavorites) {
                return favorites.find((fav) => fav.id === product.productID);
              } else {
                return true;
              }
            })
            .map((product, i) => {
              if(product.status === 'available') return (
              <Grid item key={i} xs={12} sm={6} md={4} lg={2} xl={2}>
                <ProductCard
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    style={{
                      color: "#fff",
                      fontStyle: "italic",
                      fontSize: "14px",
                    }}
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
                      variant="h6"
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
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <IconButton
                      color={
                        favorites.find((fav) => fav.id === product.productID)
                          ? "error"
                          : "default"
                      }
                      aria-label="add to favorites"
                      onClick={() => handleFavoriteToggle(i)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      aria-label="add to shopping cart"
                    ></IconButton>
                  </CardActions>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <LinkNoDeco to={`/Marketplace/detail/${product.productID}`}>
                      <SmallOrangeOutlinedButton>
                        VIEW DETAIL
                      </SmallOrangeOutlinedButton>
                    </LinkNoDeco>
                  </CardActions>
                  { user.systemRole !== 'Guest'?<CardActions sx={{ justifyContent: "center" }}>
                    {selectedProducts.filter(
                      (item) => item.productID === product.productID
                    ).length ? (
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        sx={{ fontSize: "13px" }}
                        onClick={() =>
                          setSelectedProducts(
                            selectedProducts.filter(
                              (item) => item.productID !== product.productID
                            )
                          )
                        }
                      >
                        <Box>X</Box>
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        sx={{ fontSize: "13px" }}
                        onClick={() =>
                          setSelectedProducts([
                            ...selectedProducts,
                            { ...product, quantity: 1 },
                          ])
                        }
                      >
                        <Typography>Add to cart</Typography>
                        <AddShoppingCartIcon />
                      </IconButton>
                    )}
                  </CardActions> :null}
                </ProductCard>
              </Grid>
            )})}
        </Grid>
      </Box>
    </Box>
  );
}