import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Grid,
  TextField, // Nueva importación para el campo de búsqueda
} from "@mui/material";
import axios from "axios";
import ProductEditPopup from "./ProductEditPopup";
import { OrangeOutlinedButton, TextFieldForm } from "../../../styles/ComponentStyles";

const ProductListDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Nuevo estado para el término de búsqueda

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

  const handleUpdate = (editedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productID === editedProduct.productID ? editedProduct : product
      )
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      {/* Campo de búsqueda */}
      <TextFieldForm
        label="Search by Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px" }}
      />

      <Grid container spacing={0} direction="column">
        {filteredProducts.map((product) => (
          <Grid item key={product.productID} xs={12} sm={12} md={12}>
            <Card
              onClick={() => handleCardClick(product)}
              style={{
                backgroundColor: "#414141",
                color: "white",
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
        onUpdate={handleUpdate}
        product={selectedProduct || {}}
      />
    </Container>
  );
};

export default ProductListDashboard;
