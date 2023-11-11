import axios from "axios";
import {
  Container,
  TextField,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useState, useEffect } from "react";
import PhotoUPload from "../../components/PhotoUpload/PhotoUpload";
import theme from "../../theme";
import { useNavigate } from "react-router";
import Errors from './Errors'

export default function () {
  const [productData, setProductData] = useState({
    productID: Math.random().toString(),
    name: "",
    description: "",
    category: "",
    price: 0,
    stockNow: 0,
    brand: "",
    image: undefined,
    status: "",
  });

  const [newImage, setNewImage] = useState(undefined);

  const handleChange = (event) => {
    // handles the input changes of the form
    const { name, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("trying to submit");
      const product = await axios.post(
        "http://localhost:3001/products",
        productData
      );
      if (product) {
        window.alert("Product created");
        useNavigate("/");
      } else {
        window.alert("could not create product");
      }
    } catch (error) {
      console.error("Could not create product: ", error.message);
    }
  };

  useEffect(() => {
    setProductData((prevData) => ({ ...prevData, image: newImage }));
  }, [newImage]);

  useEffect(() => {
    //debugging
    console.log(productData);
  }, [productData]);

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        borderRadius: 1,
        p: 2,
        minWidth: 300,
      }}
    >
      <FormControl >
        <TextField
          name="name"
          label="Name"
          value={productData.name}
          onChange={handleChange}
        />
        <TextField
          name="category"
          label="Category"
          value={productData.category}
          onChange={handleChange}
        />
        <TextField
          name="brand"
          label="Brand"
          value={productData.brand}
          onChange={handleChange}
        />
      </FormControl>
      <PhotoUPload photo={newImage} setPhoto={setNewImage} />
      <TextareaAutosize
        aria-label="minimum height"
        name="description"
        minRows={3}
        placeholder="Description"
        value={productData.description}
        onChange={handleChange}
      />
      <InputLabel name="selectStatus">Status:</InputLabel>
      <Select
        labelId="selectStatus"
        name="status"
        label="Status"
        value={productData.status}
        onChange={handleChange}
      >
        <MenuItem id="status" value={"available"}>
          Available
        </MenuItem>
        <MenuItem id="status" value={"unavailable"}>
          Unavailable
        </MenuItem>
      </Select>
      <TextField
        name="stockNow"
        label="Stock now"
        type="number"
        value={productData.stockNow}
        onChange={handleChange}
      />
      <InputLabel htmlFor="price">Price:</InputLabel>
      <Input
        name="price"
        type="number"
        value={productData.price}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />
      <Errors productData={productData} />
      <Button
        variant="contained"
        color={theme.primary}
        onClick={() => handleSubmit()}
      >
        Create Product
      </Button>
    </Container>
  );
}
