import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card, CardMedia, CardContent, Box, Typography, TextField } from "@mui/material";
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
import { useSelector } from "react-redux";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProd] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [productsCart, setProductsCart] = useLocalStorage("product", []);
  const [units, setUnits] = useState(1)
  const [icon, setIcon] = useState(AddShoppingCartIcon)
  const user = useSelector((state) => state.user);

  const handleChangeUnits = (event) => {
    const {value} = event.target
    if(value < 1 ) {
      setUnits(1)
      return
    }
    if(value > product.stockNow){
      setUnits(product.stockNow)
      return
    }
    else {
      setUnits(value)
    }
  }

  const handleAddProduct = (product) => {
    setProductsCart([...productsCart, { ...product, quantity: units }]);
    navigate("/ShopCart");
  };

  const handleDeleteFromCart = (product) => {

    const updatedCart = productsCart.filter(
      (item) => {
        if (item.productID !== product.productID){
          return item
        }
      }
    );
    setProductsCart(updatedCart);
    setIcon(AddShoppingCartIcon)
    setUnits(1)
  };

  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    let found = false;
    const search = productsCart.forEach((e) => {
      if (e.productID && product.productID && e.productID === product.productID) {
        setUnits(e.quantity)
        setIcon(RemoveShoppingCartIcon)
        found = true;
      }
    });
    setIsAdded(found);
  }, [product, productsCart]);

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
    return <Loading loading={isLoading}></Loading>;
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
        { user.systemRole !== 'Guest'?<>
        {isAdded ? (
          <OrangeOutlinedButton
          onClick={() => handleDeleteFromCart(product)}
            sx={{ height: "80px", marginTop: 5, border: "1px solid orange" }}
          >
            <RemoveShoppingCartIcon/>
            <Typography sx={{ color: "ORANGE" }} variant="h3">
              REMOVE FROM SHOP CART
            </Typography>
          </OrangeOutlinedButton>
        ) : (
          <OrangeContainedButton
            onClick={() => handleAddProduct(product)}
            sx={{ height: "80px", marginTop: 5, }}
          >
            <AddShoppingCartIcon/>
            <Typography sx={{ color: "white" }} variant="h3">
              BUY S/{product.price}
            </Typography>
          </OrangeContainedButton>
        )}
        </>:null}

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
          <TextField
            id="units"
            label="units"
            type="number"
            value={units}
            onChange={handleChangeUnits}
            sx={{
              margin: "2px",
              width: "100px",
              marginTop: "10px",
              marginLeft: 10,
              "& .MuiInputBase-input": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ff9721",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
                "&.Mui-focused": {
                  color: "#ff9721",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
