import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  OrangeContainedButton,
  TextFieldForm,
} from "../../styles/ComponentStyles";

export default function CreateProduct() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    price: NaN,
    stockNow: NaN,
    brand: "",
    image: undefined,
    status: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    stockNow: "",
    price: "",
  });

  const [newImage, setNewImage] = useState(undefined);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    const fieldValue = value.trim();

    setProductData((prevData) => ({ ...prevData, [name]: fieldValue }));

    if (fieldValue !== "") {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: validateField(name, fieldValue) }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateAllFields(productData);
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setErrors(validationErrors);
      return;
    }

    try {
      const product = await axios.post(
        "https://gymspace-backend.onrender.com/products",
        productData
      );
      if (product) {
        window.alert("Product created");
        navigate("/Marketplace");
      } else {
        window.alert("Could not create product");
      }
    } catch (error) {
      window.alert("Could not create product. ", error.message);
    }
  };

  useEffect(() => {
    setProductData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return /^[a-zA-Z0-9\s]+$/.test(value)
          ? ""
          : "Only letters, numbers, and spaces are allowed.";
      case "category":
        return /^[a-zA-Z]+$/.test(value) ? "" : "Only letters are allowed.";
      case "brand":
        return /^[a-zA-Z0-9\s]+$/.test(value)
          ? ""
          : "Only letters, numbers, and spaces are allowed.";
      case "stockNow":
        return /^[1-9]\d*$/.test(value)
          ? ""
          : "Stock must be a positive integer greater than 0.";
      case "price":
        return /^[1-9]\d*$/.test(value)
          ? ""
          : "Price must be a positive integer greater than 0.";
      default:
        return "";
    }
  };

  const validateAllFields = (data) => {
    const errors = {};
    for (const key in data) {
      errors[key] = validateField(key, data[key]);
    }
    return errors;
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: "white",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid white",
          width: "70%",
          textAlign: "center",
          backgroundColor: "#212020",
          padding: 4,
          marginTop: 8,
        }}
      >
        <Typography component="h1" variant="h5" marginTop="10px">
          CREATE NEW PRODUCT
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <FormControl>
            <TextFieldForm
              name="name"
              label="Name"
              required
              autoFocus
              value={productData.name}
              onChange={handleChange}
              error={errors.name !== ""}
            />
            <FormHelperText error={errors.name !== ""}>{errors.name}</FormHelperText>

            <TextFieldForm
              name="category"
              label="Category"
              required
              value={productData.category}
              onChange={handleChange}
              error={errors.category !== ""}
            />
            <FormHelperText error={errors.category !== ""}>{errors.category}</FormHelperText>

            <TextFieldForm
              name="brand"
              label="Brand"
              required
              value={productData.brand}
              onChange={handleChange}
              error={errors.brand !== ""}
            />
            <FormHelperText error={errors.brand !== ""}>{errors.brand}</FormHelperText>
          </FormControl>

          <PhotoUpload photo={newImage} setPhoto={setNewImage} />

          <TextFieldForm
            name="description"
            label="Description"
            multiline
            required
            value={productData.description}
            onChange={handleChange}
            error={errors.description !== ""}
          />
          <FormHelperText error={errors.description !== ""}>{errors.description}</FormHelperText>

          <RadioGroup
            aria-label="Status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            sx={{
              flexDirection: "row",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            <FormControlLabel
              value="available"
              control={<Radio sx={{ color: "white" }} />}
              label="Available"
            />
            <FormControlLabel
              value="unavailable"
              control={<Radio sx={{ color: "white" }} />}
              label="Unavailable"
            />
          </RadioGroup>

          <TextFieldForm
            name="stockNow"
            label="Stock now"
            type="number"
            required
            value={productData.stockNow}
            onChange={handleChange}
            error={errors.stockNow !== ""}
          />
          <FormHelperText error={errors.stockNow !== ""}>{errors.stockNow}</FormHelperText>

          <TextFieldForm
            name="price"
            label="Price"
            type="number"
            required
            value={productData.price}
            onChange={handleChange}
            error={errors.price !== ""}
          />
          <FormHelperText error={errors.price !== ""}>{errors.price}</FormHelperText>

          <OrangeContainedButton
            onClick={() => handleSubmit()}
            sx={{ marginTop: "20px" }}
          >
            Create Product
          </OrangeContainedButton>
        </Box>
      </Box>
    </Container>
  );
}
