import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Box, Typography } from "@mui/material";
import {
  OrangeOutlinedButton,
  OrangeContainedButton,
} from "../../styles/ComponentStyles";
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Loading from "../../components/Loading/loading";

import styles from "./DetailProduct.module.css";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProd] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [productsCart, setProductsCart] = useLocalStorage("product", []);

  const handleAddProduct = (product) => {
    setProductsCart([...productsCart, { ...product, quantity: 1 }]);
    navigate("/ShopCart");
  };

  useEffect(() => {
    const getProd = async (id) => {
      try {
        const response = await axios.get(
          `https://gymspace-backend.onrender.com/products/${id}`
        );
        const data = response.data;
        if (data) {
          setProd(data);
        } else {
          setError("Internal server error");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching Product:", error);
        setError("Internal server error");
        setIsLoading(false);
      }
    };
    getProd(id);
  }, [id]);

  if (isLoading) {
    return <Loading loading={isLoading} ></Loading>
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        marginTop: 5,
        justifyContent: "space-evenly",
      }}
    >
      <OrangeOutlinedButton onClick={() => navigate("/Marketplace")}>
        BACK
      </OrangeOutlinedButton>
      <img
        className={styles.image}
        src={product.image}
        alt={product.name}
      ></img>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ color: "Orange" }} variant="h3">
          {product.name}
        </Typography>
        <Typography sx={{ color: "white", marginTop: 2 }} variant="h4">
          Category: {product.category}
        </Typography>
        <Typography sx={{ color: "white", marginTop: 2 }} variant="h4">
          Brand: {product.brand}
        </Typography>
        <Typography sx={{ color: "white", marginTop: 5 }} variant="h6">
          Description: {product.description}
        </Typography>
        <OrangeContainedButton
          onClick={() => handleAddProduct(product)}
          sx={{ height: "80px", marginTop: 5 }}
        >
          <Typography sx={{ color: "white" }} variant="h3">
            COMPRAR US${product.price}
          </Typography>
        </OrangeContainedButton>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography sx={{ color: "white", marginTop: 2 }} variant="h5">
            Status: {product.status}
          </Typography>
          <Typography
            sx={{ color: "white", marginTop: 2, marginLeft: 10 }}
            variant="h5"
          >
            Stock: {product.stockNow}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
