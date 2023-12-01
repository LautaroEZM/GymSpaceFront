import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { OrangeOutlinedButton, RedOutlinedButton, StyledSelect, TextFieldForm } from "../../../styles/ComponentStyles";

const ProductEditPopup = ({ product, open, onClose, onUpdate }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  useEffect(() => {
    setEditedProduct({ ...product });
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue =
      name === "stockNow" || name === "price" ? Math.max(0, value) : value;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: sanitizedValue,
    }));
  };

  const handleUpdate = () => {
    axios
      .put(
        `https://gymspace-backend.onrender.com/products/${editedProduct.productID}`,
        editedProduct
      )
      .then((response) => {
        console.log("Product updated successfully", response);
        onUpdate(editedProduct);
        onClose();
      })
      .catch((error) => console.error("Error updating product", error));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": { backgroundColor: "#141414", color: "white" },
      }}
    >
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldForm
              label="Name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                width: "500px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldForm
              label="Description"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                width: "500px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldForm
              label="Category"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                width: "240px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldForm
              label="Price"
              name="price"
              type="number"
              value={editedProduct.price}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                width: "240px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldForm
              label="Stock"
              name="stockNow"
              type="number"
              value={editedProduct.stockNow}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                width: "240px",
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextFieldForm
              label="Brand"
              name="brand"
              value={editedProduct.brand}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                width: "240px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldForm
              label="Image URL"
              name="image"
              value={editedProduct.image}
              onChange={handleChange}
              fullWidth
              margin="normal"
              sx={{
                width: "500px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Status</InputLabel>
              <StyledSelect
                name="status"
                value={editedProduct.status || ""}
                onChange={handleChange}
              >
                <MenuItem value="not available">Not Available</MenuItem>
                <MenuItem value="available">Available</MenuItem>
              </StyledSelect>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <RedOutlinedButton onClick={onClose}>Cancel</RedOutlinedButton>
        <OrangeOutlinedButton onClick={handleUpdate} color="primary">
          Confirm
        </OrangeOutlinedButton>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditPopup;
