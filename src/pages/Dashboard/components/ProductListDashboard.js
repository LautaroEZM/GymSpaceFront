import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import axios from "axios";
import ProductEditPopup from "./ProductEditPopup"; // Importa el nuevo componente
import { OrangeOutlinedButton } from "../../../styles/ComponentStyles";

const ProductListDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://gymspace-backend.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = () => {
    axios
      .delete(
        `https://gymspace-backend.onrender.com/products/${selectedProduct.productID}`
      )
      .then((response) => {
        console.log("Product deleted successfully", response);
        setProducts(
          products.filter(
            (product) => product.productID !== selectedProduct.productID
          )
        );
        setSelectedProduct(null);
      })
      .catch((error) => console.error("Error deleting product", error));
  };

  const handleEditClick = () => {
    setEditPopupOpen(true);
  };

  return (
    <Container>
      <Grid container spacing={0} direction="column">
        {products.map((product) => (
          <Grid item key={product.productID} xs={12} sm={12} md={12}>
            <Card
              onClick={() => handleCardClick(product)}
              style={{
                backgroundColor: "#414141", // Cambiado a #141414
                color: "white", // Texto en blanco
                height: "250px",
                marginBottom: "10px",
              }}
            >
              <CardContent>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={8} md={8}>
                    <Typography variant="h6" style={{ color: "white" }}>
                      {product.name}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: "white" }}>
                      {product.description}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: "white" }}>
                      Category: {product.category}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: "white" }}>
                      Price: ${product.price}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: "white" }}>
                      Stock: {product.stockNow}
                    </Typography>
                    <Typography color="text.secondary" style={{ color: "white" }}>
                      Brand: {product.brand}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        maxWidth: "150px",
                        height: "auto",
                        maxHeight: "150px",
                        objectFit: "contain",
                        float: "right",
                      }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <OrangeOutlinedButton
                  size="small"
                  onClick={handleEditClick}
                  disabled={!selectedProduct}
                  
                >
                  Edit
                </OrangeOutlinedButton>
                <OrangeOutlinedButton
                  size="small"
                  onClick={handleDelete}
                  disabled={!selectedProduct}
                  style={{ marginLeft: "8px", marginRight: "8px" }}
                >
                  Delete
                </OrangeOutlinedButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* PopUp para editar productos */}
      <ProductEditPopup
        open={isEditPopupOpen}
        onClose={() => setEditPopupOpen(false)}
        onUpdate={(editedProduct) => {
          console.log("Product updated:", editedProduct);
          setEditPopupOpen(false);
        }}
        product={selectedProduct || {}}
      />
    </Container>
  );
};

export default ProductListDashboard;
