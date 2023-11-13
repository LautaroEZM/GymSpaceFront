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

export default function CreateProduct() {
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
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      console.log("trying to submit");
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

  useEffect(() => {
    console.log(productData);
  }, [productData]);

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
          Create a new product
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl>
            <TextField
              name="name"
              label="Name"
              fullWidth
              required
              autoFocus
              value={productData.name}
              onChange={handleChange}
              sx={{
                marginTop: "10px",
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
            <TextField
              name="category"
              label="Category"
              fullWidth
              required
              value={productData.category}
              onChange={handleChange}
              sx={{
                marginTop: "10px",
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
            <TextField
              name="brand"
              label="Brand"
              fullWidth
              required
              value={productData.brand}
              onChange={handleChange}
              sx={{
                marginTop: "10px",
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
          </FormControl>
          <PhotoUpload photo={newImage} setPhoto={setNewImage} />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            required
            value={productData.description}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <RadioGroup
            aria-label="Status"
            name="status"
            value={productData.status}
            onChange={handleChange}
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '10px',
              '& .Mui-checked': {
                color: '#ff9721', // Cambia el color del icono cuando está seleccionado
              },
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
          <TextField
            name="stockNow"
            label="Stock now"
            type="number"
            fullWidth
            required
            value={productData.stockNow}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            fullWidth
            required
            value={productData.price}
            onChange={handleChange} sx={{
              marginTop: '10px',
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ff9721',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: '#ff9721',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="orangeButton"
            onClick={() => handleSubmit()}
            sx={{ mt: 3, mb: 2 }}
          >
            Create Product
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
