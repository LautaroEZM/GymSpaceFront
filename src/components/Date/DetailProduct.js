import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card, CardMedia, Typography, CardContent } from "@mui/material";

export default function DetailProduct() {
  const { id } = useParams();
  const [product, setProd] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "999",
      }}
    >
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="400"
            image={product.image}
          ></CardMedia>
          <CardContent sx={{
              backgroundColor:"brown",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Typography
              variant="h6"
              sx={{ color: "Black", textAlign: "center" }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#text.secondary", textAlign: "center" }}
            >
              {product.description}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#text.secondary", textAlign: "center" }}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#text.secondary", textAlign: "center" }}
            >
              Brand= {product.brand}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#text.secondary", textAlign: "center" }}
            >
              Category= {product.category}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#text.secondary", textAlign: "center" }}
            >
              Status= {product.status}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#text.secondary", textAlign: "center" }}
            >
              Stock= {product.stockNow}
            </Typography>
          </CardContent>
        </Card>
        <Link to="/marketplace">
          <button>X</button>
        </Link>
      </div>
    </div>
  );
}