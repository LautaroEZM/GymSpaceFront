import {
  Container,
  TextField,
  Button,
  FormControl,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import PhotoUpload from "../../components/PhotoUpload/PhotoUpload";
import { useNavigate } from "react-router";
import axios from "axios";
import { OrangeContainedButton, TextFieldForm } from "../../styles/ComponentStyles";
import { useSelector } from "react-redux";

export default function CreateProduct() {

  const user = useSelector((state) => state.user )

  const navigate = useNavigate();

  if (user.systemRole !== 'admin') navigate('/')

  const [productData, setProductData] = useState({
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
    const { name, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
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
          sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <FormControl>
            <TextFieldForm
              label="Name"
              required
              autoFocus
              value={productData.name}
              onChange={handleChange}
            />
            <TextFieldForm
              label="Category"
              required
              value={productData.category}
              onChange={handleChange}
            />
            <TextFieldForm
              label="Brand"
              required
              value={productData.brand}
              onChange={handleChange}
            />
          </FormControl>
          <PhotoUpload photo={newImage} setPhoto={setNewImage} />
          <TextFieldForm
            label="Description"
            multiline
            required
            value={productData.description}
            onChange={handleChange}
          />
          <RadioGroup
            aria-label="Status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            sx={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: '10px',
            }}
          >
            <FormControlLabel
              value="available"
              control={<Radio sx={{ color: 'white' }} />}
              label="Available"
            />
            <FormControlLabel
              value="unavailable"
              control={<Radio sx={{ color: 'white' }} />}
              label="Unavailable"
            />
          </RadioGroup>
          <TextFieldForm
            label="Stock now"
            type="number"
            required
            value={productData.stockNow}
            onChange={handleChange}
          />
          <TextFieldForm
            label="Price"
            type="number"
            required
            value={productData.price}
            onChange={handleChange}
          />
          <OrangeContainedButton
            onClick={() => handleSubmit()}
            sx={{ marginTop: '20px' }}
          >
            Create Product
          </OrangeContainedButton>
        </Box>
      </Box>
    </Container>
  );
}
